import { createContext, useState } from 'react';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const[candidates, setCandidates] = useState([])
    const [ candidateColor, setCandidateColor] = useState('#aabbcc')
    const [ votes, setVotes] = useState([])
    const [ candidateVotesTotal, setCandidateVotesTotal] = useState({})


    return(
        <DataContext.Provider value={{
            candidates, setCandidates, candidateColor, setCandidateColor,
            votes, setVotes, candidateVotesTotal, setCandidateVotesTotal
        }}>
            {children}
        </DataContext.Provider>
    )
    
};


export default DataContext;
