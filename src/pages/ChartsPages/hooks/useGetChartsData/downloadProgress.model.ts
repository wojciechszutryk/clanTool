export type IDownloadProgress =
    | Record<string, { downloaded: number; total: number; completed: boolean }>
    | undefined
