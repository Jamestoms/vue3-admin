const files = require.context("./modules", false, /\.js$/);

const modules = files.keys().reduce((modules, path) => {
  const value = files(path)?.default;
  const name = path.replace(/^\.\/(.*)\.\w+$/, "$1");
  const clazz = value.name;
  if (modules[clazz] === undefined) {
    modules[clazz] = value;
  } else {
    console.error(`Api 模块类名: ${clazz} 已在 ${name} 文件中存在`);
  }
  return modules;
}, {});

module.exports = modules;
