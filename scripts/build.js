
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const jsonfile = require('jsonfile');
const transform = require('@babel/core').transform;
const rimraf = require('rimraf');

const PACKAGE_PATH = process.cwd();
const PROJECT_PATH = __dirname;

console.log('PACKAGE_PATH', PACKAGE_PATH);
console.log('PROJECT_PATH', PROJECT_PATH);


const cleanDist = function () {
  return new Promise((resolve, reject) => {
      rimraf(
        resolve(PACKAGE_PATH, './dist'),
        { force: true },
        (err, result)=>err ? reject(err) : resolve(result)
      )
    });
}

const getPackageConfig = function () {
  const pkgFileName = path.resolve(PACKAGE_PATH, './package.json');
  const pkg = require(pkgFileName);
  return [pkg, pkgFileName];
}

const transformOne = function (srcPath, distPath, babelrc) {
  console.log(`Transforming ${srcPath} to ${distPath}`);
  const srcCode = fs.readFileSync(srcPath).toString();
  const { code } = transform(srcCode, babelrc);

  fse.outputFileSync(distPath, code);
}

const transformDir = function (srcDir, distDir, babelrc) {
  fs.readdir(srcDir, (err, files) => {
    if (!files) return;
    files.forEach( (file) => {
      const srcPath = `${srcDir}/${file}`;
      const distPath = `${distDir}/${file}`;
      if (fs.lstatSync(srcPath).isDirectory() === true) {
        if (file === 'graphql') return;

        transformDir(srcPath, distPath, babelrc);
        return
      }
      transformOne(srcPath, distPath, babelrc);
    });
  });
}

const transformSrc = function () {
  const srcDir = path.resolve(PACKAGE_PATH, './src');
  const distDir = path.resolve(PACKAGE_PATH, './dist');
  const babelrcFileName = path.resolve(PROJECT_PATH, '../.babelrc');
  const babelrc = jsonfile.readFileSync(babelrcFileName);
  transformDir(srcDir, distDir, babelrc);
}

const touchApi = function () {
  const apiSrcTouchPath = path.resolve(__dirname, '../../api-server/src/gql.nada');
  fs.appendFile(
    apiSrcTouchPath,
    `update from schema ${String(new Date())}\n`,
    (err) => {
      if (err) throw err;
    }
  );
}

async function build() {
  await cleanDist();
  console.log('Cleaned Old Dist Files.');
  let [pkg, pkgFileName] = getPackageConfig();
  transform();
  transformSrc();
}

build();
