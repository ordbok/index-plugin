ORDBOK index plugin
===================

Index files by the assembler and creates for each headline a separate index file.



Index structure
---------------

Each index file contains all related files with their highest page counter.



Plugin usage
------------

You have to create a `ordbok.json` configuration file in the folder in which you will run the ordbok
assembler.

In the configuration file you can specify folders where the ORDBOK assembler should search for
plugins:

```
{
    "plugins": [
        "node_modules/@ordbok/core",
        "node_modules/@ordbok/index-plugin"
    ]
}
```
