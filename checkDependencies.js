const fs = require('fs');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const packageLockJson = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));

const packageJsonDependencies = packageJson.dependencies;
const packageLockDependencies = packageLockJson.packages[""].dependencies;

const missingDependencies = [];
const versionMismatch = [];

Object.keys(packageJsonDependencies).forEach(dep => {
  if (!packageLockDependencies[dep]) {
    missingDependencies.push(dep);
  } else if (packageJsonDependencies[dep] !== packageLockDependencies[dep]) {
    versionMismatch.push({
      package: dep,
      packageJsonVersion: packageJsonDependencies[dep],
      packageLockVersion: packageLockDependencies[dep]
    });
  }
});

if (missingDependencies.length > 0) {
  console.log('Missing dependencies in package-lock.json:', missingDependencies);
} else {
  console.log('No missing dependencies found.');
}

if (versionMismatch.length > 0) {
  console.log('Version mismatches found:', versionMismatch);
} else {
  console.log('No version mismatches found.');
}
