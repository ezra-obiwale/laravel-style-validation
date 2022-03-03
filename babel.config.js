module.exports = api => {
    var config = {
        presets: ['@babel/preset-env', ['minify', { builtIns: false }]],
        ignore: [
            "**/*.test.js"
        ]
    }

    if (api.env('test')) {
        delete config.ignore
    }

    return config
}