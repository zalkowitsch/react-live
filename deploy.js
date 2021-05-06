const { execSync } = require('child_process');
const { program } = require('commander');

program
  .description('Publish a version of Generator Dot on Github Packages')
  .action(() => {
    console.log('---------GITHUB_TOKEN----------');
    console.log(process.env.GITHUB_TOKEN);
    console.log('---------GITHUB_TOKEN----------');

    if (!process.env.GITHUB_TOKEN) {
      throw new Error(
        'To release you need to set the GITHUB_TOKEN environment variable'
      );
    }
    execSync('npm publish');
  });

program.parse(process.argv);
