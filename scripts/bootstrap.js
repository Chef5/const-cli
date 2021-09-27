const program = require('commander');
const error = require('chalk').bold.red;

program
  // cli版本号
  .version(require('../package').version, '-v, --version');

program
  // 初始化项目
  .command('init <name> [type]')
  .description('type: h5(default), vue2, nest, mp-wx, addon, laravel')
  .action((name, otherDirs) => {
    console.log(name, JSON.stringify(otherDirs));
    // 查看是否有除init外的剩余参数
    if (otherDirs) {
      switch (otherDirs) {
        case 'h5':
        case 'vue2':
        case 'nest':
        case 'mp-wx':
        case 'addon':
        case 'laravel':
          require('./init')(
            `direct:${require('../package').template[otherDirs]}`,
            `${process.cwd()}/${name}`,
            {clone: false}
          );
          break;
        default: 
          console.log(error(`error: ${otherDirs} doesn't exist.`));
          break;
      }
    } else {
      require('./init')(
        `direct:${require('../package').template.h5}`,
        `${process.cwd()}/${name}`,
        {clone: false}
      );
    }
  });

program.parse(process.argv);

// 如果参数为空，则显示帮助
if (!program.args.length) program.help();
