/**
 * The download progress model.
 * @typedef {Object} IDownloadProgress
 * @property {number} downloaded - The number of downloaded bytes.
 * @property {number} total - The total number of bytes to download.
 * @property {boolean} completed - Whether the download is completed.
 */
export type IDownloadProgress =
    | Record<string, { downloaded: number; total: number; completed: boolean }>
    | undefined
