module.exports = (api, opts, rootOpts) => {
    const helpers = require('./helpers')(api)
  
    // Add plugin dependencies to package.json
    api.extendPackage({
      dependencies: {
        '@fortawesome/fontawesome-svg-core': '^1.2.31',
        '@fortawesome/free-solid-svg-icons': '^5.15.0',
        '@fortawesome/vue-fontawesome': '^2.0.0'
      }
    })

    // Add plugin to project plugins folder
    api.render({
      './src/plugins/fontawesome.js': './templates/default/src/plugins/fontawesome.js'
    }, opts)
  
    // Add plugin reference in main.js
    api.onCreateComplete(() => {
      helpers.updateMain(src => {
        const vueImportIndex = src.findIndex(line => line.match(/^import Vue/))
  
        src.splice(vueImportIndex + 1, 0, 'import \'./plugins/fontawesome\'')
  
        return src
      })
    })
  }