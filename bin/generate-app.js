#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs')
const path = require('path')

if (process.argv.length < 3) {
  console.log('You have to provide a name to your app.');
  console.log('For example :');
  console.log('    npx create-my-boilerplate my-app');
  process.exit(1);
}

const projectName = process.argv[2];
let currentPath = process.cwd();
currentPath = currentPath.replace(/(\s+)/g, '\\$1')
currentPath.replace(/(\s+)/g, '\\$1');

const projectPath = path.join(currentPath, projectName);
const git_repo = "https://github.com/bhavenjain/basic-npx-boilerplate.git";

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
  } else {
    console.log(err);
  }
  process.exit(1);
}

async function main() {
  try {
    console.log('Downloading files...');
    execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

    process.chdir(projectPath);

    console.log('Installing dependencies...');
    execSync('npm i --legacy-peer-deps');

    console.log('Removing useless files');
    execSync('npx rimraf ./.git');
    fs.rm(path.join(projectPath, 'bin'), { recursive: true }, (err) => {
      if (err) {
        console.log(err)
      }
    });

    console.log('The installation is done, this is ready to use !');

  } catch (error) {
    console.log(error);
  }
}
main();

// compScript