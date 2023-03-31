export const fetchDataFromPublicDir = async (resourceName: string) => {
    const res = await fetch(
        `${process.env.PUBLIC_URL}/data/${resourceName}.json`,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
    )

    return await res.json()
}
