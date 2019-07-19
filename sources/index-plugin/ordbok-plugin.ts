/*---------------------------------------------------------------------------*/
/* Copyright (c) ORDBOK contributors. All rights reserved.                   */
/* Licensed under the MIT License. See the LICENSE file in the project root. */
/*---------------------------------------------------------------------------*/

import * as FS from 'fs';
import * as Path from 'path';
import { IMarkdownPage, Utilities } from '@ordbok/core';
import { IPlugin, PluginUtilities } from '@ordbok/core/dist/plugin';
import { IFileIndex, Index } from '../lib';

/* *
 *
 *  Interfaces
 *
 * */

/**
 * Headline entry
 */
interface IHeadlineEntry {
    headline: string;
    fileIndex: IFileIndex;
}

/**
 * Headline index with file indexes
 */
interface IHeadlineIndex {
    [headlineKey: string]: IHeadlineEntry;
}

/* *
 *
 *  Classes
 *
 * */

/**
 * Plugin to create index files.
 */
export class IndexPlugin implements IPlugin {

    /* *
     *
     *  Constructors
     *
     * */

    /**
     * Creates a plugin instance.
     */
    public constructor () {

        this._indexes = {};
        this._targetFolder = Index.SUBFOLDER;
    }

    /* *
     *
     *  Properties
     *
     * */

    /**
     * Indexes
     */
    private _indexes: IHeadlineIndex;

    /**
     * Dictionary folder
     */
    private _targetFolder: string;

    /* *
     *
     *  Functions
     *
     * */

    /**
     * Gets called after the assembling has been done.
     */
    public onAssembled (): void {

        const indexes = this._indexes;

        if (Object.keys(indexes).length === 0) {
            return;
        }

        const headlineKeys = Object.keys(indexes);

        const targetFolder = this._targetFolder;

        let filePath: string;

        filePath = Path.join(targetFolder, '_') + Index.FILE_EXTENSION;

        PluginUtilities.makeFilePath(filePath);

        FS.writeFileSync(
            filePath,
            Index.stringifyHeadlines(
                headlineKeys.map(headlineKey => indexes[headlineKey].headline)
            )
        );

        headlineKeys.forEach(headline => {

            filePath = Path.join(targetFolder, headline) + Index.FILE_EXTENSION;

            PluginUtilities.makeFilePath(filePath);

            FS.writeFileSync(
                filePath,
                Index.stringify(indexes[headline].fileIndex)
            );
        });
    }

    /**
     * Gets called before the assembling begins.
     *
     * @param sourceFolder
     *        Markdown folder
     *
     * @param targetFolder
     *        Dictionary folder
     */
    public onAssembling (sourceFolder: string, targetFolder: string): void {

        this._targetFolder = Path.join(targetFolder, Index.SUBFOLDER);
    }

    /**
     * Gets called after a markdown file has been read.
     */
    public onReadFile (): void {

        // nothing to do
    }

    /**
     * Gets called before a dictionary file will be written.
     *
     * @param targetFile
     *        Dictionary file path
     *
     * @param markdownPage
     *        Logical file content
     */
    public onWriteFile (targetFile: string, markdownPage: IMarkdownPage): void {

        targetFile = Path.basename(targetFile);

        const lastDashPosition = targetFile.lastIndexOf('-');

        if (lastDashPosition === -1) {
            return;
        }

        const targetFilePrefix = targetFile.substr(0, lastDashPosition);
        const targetFileSuffix = parseInt(targetFile.substr(lastDashPosition + 1));

        let headlineEntry: IHeadlineEntry;
        let headlineKey: string;

        Object
            .keys(markdownPage)
            .forEach(headline => {

                headlineKey = Utilities.getKey(headline);
                headlineEntry = this._indexes[headlineKey];

                if (!headlineEntry) {
                    headlineEntry = this._indexes[headlineKey] = {
                        headline,
                        fileIndex: {}
                    };
                }

                headlineEntry.fileIndex[targetFilePrefix] = targetFileSuffix;
            });
    }
}

/* *
 *
 *  Plugin Export
 *
 * */

export const ordbokPlugin = new IndexPlugin();
