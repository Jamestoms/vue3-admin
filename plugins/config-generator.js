class ConfigGenerator {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const pluginName = this.constructor.name;
    compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
      const assets = compilation.assets;
      const fileName = "config.js";
      const config = assets[fileName];
      // 增量更新可能会不包含 config 文件
      if (config !== undefined) {
        let content = config.source().toString();
        const baseUrl = process.env.API_BASE_URL;
        const wsUrl = process.env.VUE_APP_WS_URL;
        const fileUrl = process.env.VUE_APP_FILE_URL;
        const fileMediaUrl = process.env.VUE_APP_FILE_Media_URL;
        content = content.replace("$url", baseUrl);
        content = content.replace("$wsUrl", wsUrl);
        content = content.replace("$fileUrl", fileUrl);
        content = content.replace("$fileMediaUrl", fileMediaUrl);

        compilation.assets[fileName] = {
          source: function () {
            return content;
          },
          size: function () {
            return content.length;
          },
        };
      }

      callback();
    });
  }
}

module.exports = ConfigGenerator;
