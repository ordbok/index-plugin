import { AJAX } from '@ordbok/core';
/**
 * File index with highest page index
 */
export interface IFileIndex {
    [file: string]: number;
}
/**
 * Manages index communication with a server
 */
export declare class Index extends AJAX {
    /**
     * Subfolder of index files
     */
    static readonly SUBFOLDER = "index/";
    /**
     * Converts a text into a file index.
     *
     * @param stringified
     *        Index text
     */
    static parse(stringified: string): IFileIndex;
    /**
     * Converts a file index into a text.
     *
     * @param fileIndex
     *        File index
     */
    static stringify(fileIndex: IFileIndex): string;
    /**
     * Converts the headline index into a text.
     *
     * @param headlines
     *        Headlines index
     */
    static stringifyHeadlines(headlines: Array<string>): string;
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
    constructor(baseUrl?: string, cacheTimeout?: number, responseTimeout?: number);
    /**
     * Loads the index of headline keys from the server.
     */
    loadHeadlines(): Promise<Array<string>>;
    /**
     * Loads an index file from the server.
     *
     * @param headline
     *        Headline of the index
     */
    loadFileIndex(headline: string): Promise<IFileIndex>;
}
