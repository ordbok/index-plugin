({
    generateSourceMaps: true,
    name: "@ordbok/index-plugin",
    out: "dist/client.js",
    exclude: [
        "@ordbok/core"
    ],
    paths: {
        "@ordbok/core": "node_modules/@ordbok/core/dist/client",
        "@ordbok/index-plugin": "dist/client/index"
    }
})
