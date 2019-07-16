({
    generateSourceMaps: true,
    name: "@ordbok/index-plugin",
    out: "dist/client.js",
    packages: [{
        name: "@ordbok/index-plugin",
        main: "index",
        location: 'dist/lib'
    }, {
        name: "@ordbok/core",
        main: "index",
        location: "node_modules/@ordbok/core/dist/client"
    }]
})
