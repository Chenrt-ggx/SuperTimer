const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    publicPath: process.env.NODE_ENV === 'BuildAction' ? './' : '/',
    transpileDependencies: ['vuetify'],
    productionSourceMap: false
});
