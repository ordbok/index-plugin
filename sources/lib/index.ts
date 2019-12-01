/*---------------------------------------------------------------------------*/
/* Copyright (c) ORDBOK contributors. All rights reserved.                   */
/* Licensed under the MIT License. See the LICENSE file in the project root. */
/*---------------------------------------------------------------------------*/

import {
    AJAX,
    Utilities,
    Dictionary
} from '@ordbok/core';

/* *
 *
 *  Interfaces
 *
 * */

/**
 * File index with highest page index
 */
export interface IFileIndex {
    [file: string]: number;
}

/* *
 *
 *  Classes
 *
 * */

/**
 * Manages index communication with a server
 */
export class Index extends AJAX {

    /* *
     *
     *  Static Properties
     *
     * */

    /**
     * Subfolder of index files
     */
    public static readonly SUBFOLDER = 'index/';

    /* *
     *
     *  Static Functions
     *
     * */

    /**
     * Converts a text into a file index.
     *
     * @param stringified
     *        Index text
     */
    public static parse (stringified: string): IFileIndex {

        const fileIndex = {} as IFileIndex;

        let pair: Array<string>;

        stringified
            .split(Dictionary.LINE_SEPARATOR)
            .forEach(line => {

                if (line.indexOf(Dictionary.PAIR_SEPARATOR) === -1) {
                    return;
                }

                pair = line.split(Dictionary.PAIR_SEPARATOR);

                if (pair.length < 2) {
                    return;
                }

                fileIndex[pair[0]] = parseInt(pair[1]);
            });

        return fileIndex;
    }

    /**
     * Converts a file index into a text.
     *
     * @param fileIndex
     *        File index
     */
    public static stringify(fileIndex: IFileIndex): string {

        return Object
            .keys(fileIndex)
            .map(fileTarget =>
                Utilities.getKey(fileTarget) +
                Dictionary.PAIR_SEPARATOR +
                fileIndex[fileTarget]
            )
            .join(Dictionary.LINE_SEPARATOR);
    }

    /**
     * Converts the headline index into a text.
     *
     * @param headlines
     *        Headlines index
     */
    public static stringifyHeadlines(headlines: Array<string>): string {

        return headlines.join(Dictionary.LINE_SEPARATOR);
    }

    /* *
     *
     *  Constructor
     *
     * */

    /**
     * Creates a new managed index instance.
     *
     * @param baseUrl
     *        Base URL of the server
     *
     * @param cacheTimeout
     *        Use 0 milliseconds to turn off all cache systems
     *
     * @param responseTimeout
     *        Time in milliseconds to wait for a server response
     */
    public constructor (baseUrl: string = '', cacheTimeout?: number, responseTimeout?: number) {

        super((baseUrl + Index.SUBFOLDER), cacheTimeout, responseTimeout);
    }

    /* *
     *
     *  Functions
     *
     * */

    /**
     * Loads the index of headline keys from the server.
     */
    public loadHeadlines (): Promise<Array<string>> {

        return this
            .request('index' + Dictionary.FILE_EXTENSION)
            .then(response => {

                if (response instanceof Error ||
                    response.serverStatus >= 400
                ) {
                    throw new Error('HTTP ' + response.serverStatus);
                }

                return response.result.split(Dictionary.LINE_SEPARATOR);
            });
    }

    /**
     * Loads an index file from the server.
     *
     * @param headline
     *        Headline of the index
     */
    public loadFileIndex (headline: string): Promise<IFileIndex> {

        return this
            .request(Utilities.getKey(headline) + Dictionary.FILE_EXTENSION)
            .then(response => {

                if (response instanceof Error ||
                    response.serverStatus >= 400
                ) {
                    return {};
                }

                return Index.parse(response.result);
            })
            .catch(error => {

                console.error(error);

                return {};
            });
    }
}
