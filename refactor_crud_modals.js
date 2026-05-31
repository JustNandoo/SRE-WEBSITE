const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) { 
      results.push(file);
    }
  });
  return results;
}

const files = walk('apps/frontend/src/app/admin-sre');

files.forEach(file => {
  // Skip login & accounts
  if (file.includes('login') || file.includes('accounts')) {
    return;
  }

  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Inject useEffect to hook notice state changes to global toast
  const noticeRegex = /const\s+\[notice,\s*setNotice\]\s*=\s*useState[\s\S]*?\);/g;
  if (noticeRegex.test(content) && !content.includes('showToast(notice.type')) {
    content = content.replace(noticeRegex, (match) => {
      return `${match}\n\n  useEffect(() => {
    if (notice) {
      if (typeof window !== "undefined" && (window as any).showToast) {
        (window as any).showToast(notice.type === "success" ? "success" : "error", (notice as any).text || (notice as any).message || "");
      }
    }
  }, [notice]);`;
    });
    changed = true;
  }

  // 2. Replace confirm() in handleDelete with the custom Promise-based confirm modal
  const confirmRegex = /if\s*\(\s*!confirm\s*\(\s*["'`][^"'`]+["'`]\s*\)\s*\)\s*return\s*;/g;
  if (confirmRegex.test(content)) {
    content = content.replace(confirmRegex, `if (!(await new Promise((resolve) => {
      if (typeof window !== "undefined" && (window as any).showConfirmModal) {
        (window as any).showConfirmModal({
          title: "Konfirmasi Hapus",
          message: "Apakah Anda yakin ingin menghapus data ini secara permanen?",
          onConfirm: () => resolve(true),
          onCancel: () => resolve(false)
        });
      } else {
        resolve(confirm("Apakah Anda yakin ingin menghapus data ini secara permanen?"));
      }
    }))) return;`);
    changed = true;
  }

  // 3. Inject confirmation dialog inside handleSubmit right after preventDefault()
  const handleSubmitRegex = /const\s+handleSubmit\s*=\s*async\s*\(\s*e:\s*React\.FormEvent\s*\)\s*=>\s*\{\s*e\.preventDefault\(\);/g;
  if (handleSubmitRegex.test(content) && !content.includes('Konfirmasi Simpan')) {
    content = content.replace(handleSubmitRegex, `const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(await new Promise((resolve) => {
      if (typeof window !== "undefined" && (window as any).showConfirmModal) {
        (window as any).showConfirmModal({
          title: "Konfirmasi Simpan",
          message: "Apakah Anda yakin data yang dimasukkan sudah benar?",
          onConfirm: () => resolve(true),
          onCancel: () => resolve(false)
        });
      } else {
        resolve(true);
      }
    }))) return;`);
    changed = true;
  }

  // 4. Remove inline notices block
  const noticeBlockRegex = /\{\/\*\s*Notices\s*\*\/\}\s*\{\s*notice\s*&&\s*\([\s\S]*?onClick\s*=\s*\{\s*\(\s*\)\s*=>\s*setNotice\(null\)\s*\}[\s\S]*?<\/button>\s*<\/div>\s*\)\s*\}/g;
  if (noticeBlockRegex.test(content)) {
    content = content.replace(noticeBlockRegex, '');
    changed = true;
  }

  // 5. Special case for profile page
  if (file.includes('profile')) {
    const profileNoticeRegex = /\{\/\*\s*NOTICE\s*BAR\s*\*\/\}\s*\{\s*notice\s*&&\s*\([\s\S]*?<\/div>\s*\)\s*\}/g;
    if (profileNoticeRegex.test(content)) {
      content = content.replace(profileNoticeRegex, '');
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Successfully refactored CRUD modals, Toasts, and cleaned up notices in:', file);
  }
});
