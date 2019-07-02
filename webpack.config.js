module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname,
        filename: 'dialog-helper.js',
        libraryTarget: 'commonjs2'
    },
    devtool: 'none',
    externals: {
        uxp: 'uxp',
        application: 'application'
    }
};
