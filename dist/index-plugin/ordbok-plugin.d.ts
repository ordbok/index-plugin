import { IMarkdownPage } from '@ordbok/core';
import { IPlugin } from '@ordbok/core/dist/plugin';
/**
 * Plugin to create index files.
 */
export declare class IndexPlugin implements IPlugin {
    /**
     * Creates a plugin instance.
     */
    constructor();
    /**
     * Indexes
     */
    private _indexes;
    /**
     * Dictionary folder
     */
    private _targetFolder;
    /**
     * Gets called after the assembling has been done.
     */
    onAssembled(): void;
    /**
     * Gets called before the assembling begins.
     *
     * @param sourceFolder
     *        Markdown folder
     *
     * @param targetFolder
     *        Dictionary folder
     */
    onAssembling(sourceFolder: string, targetFolder: string): void;
    /**
     * Gets called after a markdown file has been read.
     */
    onReadFile(): void;
    /**
     * Gets called before a dictionary file will be written.
     *
     * @param targetFile
     *        Dictionary file path
     *
     * @param markdownPage
     *        Logical file content
     */
    onWriteFile(targetFile: string, markdownPage: IMarkdownPage): void;
}
export declare const ordbokPlugin: IndexPlugin;
