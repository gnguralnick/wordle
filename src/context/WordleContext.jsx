import React, { useState, useEffect } from 'react';
import { getWordleData } from '../scripts/wordleScraper';

export const BaseCtx = React.createContext({});

const useWordleData = () => {
  const [wordleData, setWordleData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getWordleData().then(data => {
      setWordleData(data);
      setLoading(false);
    }).catch(err => {
      console.log(err);
      setLoading(false);
    }).finally(() => {
      setLoading(false);
    }
    );
  }, []);

  return {wordleData, loading};
}

const WordleContext = ({children}) => {

  const {wordleData, loading} = useWordleData();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BaseCtx.Provider value={wordleData}>
      {children}
    </BaseCtx.Provider>
  );
}

export const useSolutionWord = () => {
  const ctx = React.useContext(BaseCtx);

  return ctx.solutionWord;
}

export const useValidWordList = () => {
  const ctx = React.useContext(BaseCtx);

  return ctx.validWordList;
}

export default WordleContext;