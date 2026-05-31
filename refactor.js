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
  let content = fs.readFileSync(file, 'utf8');
  // Match: userRole === "staff" || userRole === "DIVISION"
  // Capture the DIVISION string
  const regex = /userRole === "staff" \|\| userRole === "([a-z-]+)"/g;
  
  if (regex.test(content)) {
    content = content.replace(regex, 'userRole === "staff" || userRole === "$1" || userRole === "staff-$1"');
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated:', file);
  }
});
