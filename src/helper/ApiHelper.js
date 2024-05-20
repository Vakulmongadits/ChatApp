export const fetcher = async object => {
    console.log('object --> ', object.url)
    const response = await fetch(object.url, { method: object?.method, headers: object?.headers });
    return await response.json();
}