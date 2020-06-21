const { execSync } = require('child_process');
const { program } = require('commander');


program.description('Publish a version of Generator Dot on Github Packages').action(() => {
  if (!process.env.GITHUB_API_KEY) {
    throw new Error('To release you need to set the GITHUB_API_KEY environment variable');
  }
  execSync('npm publish');
});

program.parse(process.argv);
