#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 需要检查版本的包路径
const packagePaths = [
  'package.json',
  'apps/web/package.json',
  'packages/ui/package.json',
  'packages/typescript-config/package.json',
  'packages/eslint-config/package.json'
];

function readPackageVersion(packagePath) {
  try {
    const fullPath = path.resolve(packagePath);
    const packageJson = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    return {
      path: packagePath,
      version: packageJson.version,
      name: packageJson.name
    };
  } catch (error) {
    console.error(`Error reading ${packagePath}:`, error.message);
    return null;
  }
}

function checkVersionSync() {
  console.log('🔍 Checking version synchronization across packages...\n');
  
  const packages = packagePaths
    .map(readPackageVersion)
    .filter(Boolean);
  
  if (packages.length === 0) {
    console.error('❌ No packages found!');
    process.exit(1);
  }
  
  // 获取第一个包的版本作为基准
  const baseVersion = packages[0].version;
  let allSynced = true;
  
  packages.forEach(pkg => {
    const status = pkg.version === baseVersion ? '✅' : '❌';
    console.log(`${status} ${pkg.name || pkg.path}: ${pkg.version}`);
    
    if (pkg.version !== baseVersion) {
      allSynced = false;
    }
  });
  
  console.log('\n' + '='.repeat(50));
  
  if (allSynced) {
    console.log(`✅ All packages are synchronized at version: ${baseVersion}`);
    process.exit(0);
  } else {
    console.log('❌ Version mismatch detected!');
    console.log(`Expected version: ${baseVersion}`);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  checkVersionSync();
}

module.exports = { checkVersionSync, readPackageVersion }; 