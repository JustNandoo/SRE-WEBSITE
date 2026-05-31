const fs = require('fs');

let content = fs.readFileSync('apps/frontend/src/app/components/admin/AdminSidebar.tsx', 'utf8');

const divisions = ['secretary', 'treasurer', 'education', 'content-marketing', 'crd', 'hr', 'pr', 'graphic-design', 'finance'];

divisions.forEach(div => {
  content = content.replace(
    'if (role === "' + div + '") {',
    'if (role === "' + div + '" || role === "staff-' + div + '") {'
  );
});

fs.writeFileSync('apps/frontend/src/app/components/admin/AdminSidebar.tsx', content, 'utf8');
console.log('AdminSidebar updated');
