export const fetchWordleData = async (wordleUrl) => {
    const response = await fetch(wordleUrl);
    const data = await response.text();
    return data;
}