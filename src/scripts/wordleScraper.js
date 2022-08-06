const WORDLE_URL = 'https://www.nytimes.com/games-assets/v2/wordle.ad4d1f42a5aee771f8d6557988a5fb7e99877fdc.js';
const PROXY_URL = 'https://sleepy-hamlet-25032.herokuapp.com/';
const START_DATE = new Date('2022-08-06');
const START_WORD = 'alien';

export const fetchWordleData = async (wordleUrl) => {
    const response = await fetch(wordleUrl);
    const data = await response.text();
    return data;
}

export const getWordleData = async () => {
    const data = await fetchWordleData(PROXY_URL + WORDLE_URL);

    const solutionWordListStart = data.indexOf('he=[') + 3;
    const solutionWordListEnd = data.indexOf(']', solutionWordListStart);
    const solutionWordList = JSON.parse(data.substring(solutionWordListStart, solutionWordListEnd + 1));

    const validWordListStart = data.indexOf('be=[') + 3;
    const validWordListEnd = data.indexOf(']', validWordListStart);
    const validWordList = JSON.parse(data.substring(validWordListStart, validWordListEnd + 1));

    const today = new Date();
    const distFromStartDate = Math.floor((today.getTime() - START_DATE.getTime())/(1000*60*60*24));

    const startWordIndex = solutionWordList.indexOf(START_WORD);
    const solutionWordIndex = (startWordIndex + distFromStartDate) % solutionWordList.length;
    const solutionWord = solutionWordList[solutionWordIndex];

    return {solutionWord, validWordList};
};