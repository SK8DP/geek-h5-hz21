//用于覆盖webpack的配置 //5-1-14
const { override, fixBabelImports, addWebpackAlias, addPostcssPlugins } = require('customize-cra')
const px2viewport = require('postcss-px-to-viewport') //注意：当前这个config-overrides.js是配置文件，配置文件是运行在node.js环境下的，所以这里导入包要用require而不能用import
const path = require('path')

// antd的按需加载 //5-1-14
const babelPlugin = fixBabelImports('import', {
  libraryName: 'antd-mobile',
  style: 'css',
})

//配置快捷路径(路径别名) //5-1-15
const alias = addWebpackAlias({ //配置快捷路径(路径别名) //5-1-15
  '@': path.join(__dirname, 'src'),
  '@scss': path.join(__dirname, 'src/assets/styles')
})

// 配置 PostCSS 样式转换插件
const postcssPlugins = addPostcssPlugins([
  px2viewport({
    viewportWidth: 375,
  }),
])

module.exports = override(babelPlugin, alias, postcssPlugins)
