import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PhasePoint } from 'models/data.model'

interface Args {
    resourceName: string
}

const useFetchPhasePointData = ({ resourceName }: Args) => {
    const [isLoading, setIsLoading] = useState(false)
    const [downloaded, setDownloaded] = useState(0)
    const [data, setData] = useState<PhasePoint[] | undefined>(undefined)
    const [downloadSize, setDownloadSize] = useState<number | undefined>(
        undefined
    ) //meybe insted of this convert 'downloaded' state to 'downloaded x/y mb' string

    useEffect(() => {
        const getDataFromPublicDir = async () => {
            setIsLoading(true)
            await axios
                .get(`${process.env.PUBLIC_URL}/data/${resourceName}.json`, {
                    onDownloadProgress: (progressEvent) => {
                        const total = parseFloat(
                            progressEvent.event.currentTarget.responseHeaders[
                                'Content-Length'
                            ]
                        )
                        const current =
                            progressEvent.event.currentTarget.response.length

                        let percentCompleted = Math.floor(
                            (current / total) * 100
                        )
                        setDownloaded(percentCompleted)
                        console.log('completed: ', percentCompleted)
                    },
                })
                .then((res) => {
                    console.log('All DONE: ', res.headers)

                    setData(res.data)
                })

            setIsLoading(false)
        }

        getDataFromPublicDir()
    })
}

export default useFetchPhasePointData
