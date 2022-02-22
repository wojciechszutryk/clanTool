export const fetchDataFromPublicDir = async (fileLocation: string) => {
    const response = await fetch(`${process.env.PUBLIC_URL}/${fileLocation}`
        ,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    )
    return response.json();
}