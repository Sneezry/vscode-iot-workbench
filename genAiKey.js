const fs = require('fs');

if (process.env.TRAVIS_TAG) {
  console.log(`TAG: ${process.env.TRAVIS_TAG}`);
  const ISPROD = /^v?[0-9]+\.[0-9]+\.[0-9]+$/.test(process.env.TRAVIS_TAG || '');
  const packageJson = JSON.parse(fs.readFileSync('package.json'));
  console.log(`PACKAGE: ${JSON.stringify(packageJson).substr(0, 100)}...`);
  if (ISPROD) {
    console.log(`PROD`);
    packageJson.aiKey = process.env['PROD_AIKEY'];
    console.log(`AI KEY: ${process.env['PROD_AIKEY']}`);
    console.log(JSON.stringify(packageJson, null, 4));
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n');
  } else {
    console.log('NOT PROD');
  }
} else {
  console.log(`NOT TAG`);
}