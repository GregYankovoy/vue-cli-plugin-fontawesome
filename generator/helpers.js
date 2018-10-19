const fs = require('fs')

module.exports = function (api) {
  return {
    updateMain (callback) {
      const tsPath = api.resolve('./src/main.ts')
      const jsPath = api.resolve('./src/main.js')

      const mainPath = fs.existsSync(tsPath) ? tsPath : jsPath
      let content = fs.readFileSync(mainPath, { encoding: 'utf8' })

      let lines = content.split(/\r?\n/g)

      lines = callback(lines)

      content = lines.join('\n')
      fs.writeFileSync(mainPath, content, { encoding: 'utf8' })
    }
  }
}