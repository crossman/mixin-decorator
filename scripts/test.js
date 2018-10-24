
const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

const PROJECT_PATH = __dirname;
const PACKAGE_PATH = process.cwd();
const TEST_PATH = `${PACKAGE_PATH}/test`;
const SOURCE_FOLDER = 'src';

console.log('PACKAGE_PATH', PACKAGE_PATH);
console.log('PROJECT_PATH', PROJECT_PATH);
console.log(TEST_PATH);

const mocha = new Mocha({compiler: "babel-core"});

const manifest = require(`${TEST_PATH}/./manifest`).manifest;

manifest.forEach(
  file => {
    mocha.addFile(path.join(TEST_PATH, file));
  }
);

mocha.run((failures) => process.exitCode = failures ? -1 : 0)


