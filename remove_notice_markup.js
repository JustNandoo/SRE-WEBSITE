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
  // Skip login
  if (file.includes('login') || file.includes('accounts')) {
    return;
  }

  let content = fs.readFileSync(file, 'utf8');
  
  // Regex to match: {/* Notices */} and the subsequent {notice && ( ... )} block
  const noticeBlockRegex = /\{\/\*\s*Notices\s*\*\/\}\s*\{\s*notice\s*&&\s*\([\s\S]*?\)\s*\}/g;
  
  if (noticeBlockRegex.test(content)) {
    content = content.replace(noticeBlockRegex, '');
    fs.writeFileSync(file, content, 'utf8');
    console.log('Successfully removed inline notice block from:', file);
  }
});
