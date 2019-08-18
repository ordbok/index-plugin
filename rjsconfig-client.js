({
    generateSourceMaps: true,
    name: "@ordbok/index-plugin",
    out: "dist/client/ordbok-index-plugin.js",
    exclude: [
        "@ordbok/core"
    ],
    packages: [{
        name: "@ordbok/core",
        main: "index",
        location: 'node_modules/@ordbok/core/dist/client/ordbok-core'
    }, {
        name: "@ordbok/index-plugin",
        main: "index",
        location: 'dist/client/ordbok-index-plugin'
    }]
})
