({
    generateSourceMaps: true,
    name: "@ordbok/index-plugin",
    out: "dist/client.js",
    exclude: [
        "@ordbok/core"
    ],
    packages: [{
        name: "@ordbok/index-plugin",
        main: "index",
        location: 'dist/client'
    }],
    paths: {
        "@ordbok/core": "node_modules/@ordbok/core/dist/client"
    }
})
