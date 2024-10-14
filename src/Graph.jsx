import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useContext } from 'react';
import DataContext from './context/DataContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { data } from 'autoprefixer';

const Graph = () => {
    const  { candidateVotesTotal, setCandidateVotesTotal ,candidates, votes, setVotes } = useContext(DataContext);
    const  [chartData, setChartData] = useState([])
    const [chartLabels, setChartLabels] = useState([])
    const [chartColors, setChartColors] = useState([])

    //when votes change retally and set new vote totals
    useEffect(() => {
        //first set all candidate votes to 0
      const newCandidateVotesTotal = {}
      for(const key in candidateVotesTotal){
        console.log(key)
        newCandidateVotesTotal[key] = 0
      }
      //then count again

      const updatedCandidateVotesTotal = newCandidateVotesTotal
      for(let i = 0; i < votes.length; i++){
          console.log("reading this vote: " + votes[i] + " from votes: " + votes)
          let firstPlaceCandidate = votes[i][0]
          console.log("counting votes again for: " + firstPlaceCandidate)
          updatedCandidateVotesTotal[firstPlaceCandidate] += 1
      }
      setCandidateVotesTotal(updatedCandidateVotesTotal)
    }, [votes])
    
    // recalculates votes when another one is cast (candidateVotesTotal)
    useEffect(() => {
      let newChartData = []
      let newChartLabels = []
      let newChartColors = []
      for(const candidate in candidateVotesTotal){
        console.log("current candidates: " + candidateVotesTotal)
        let votes = candidateVotesTotal[candidate]
        let newChartLabel = candidate
        console.log("setting candidate: " + candidate)
        let newCandidateColor = candidates.find(c => c.name == candidate).color
        console.log(votes)
        newChartData = [...newChartData, votes]
        newChartLabels = [...newChartLabels, newChartLabel]
        newChartColors = [...newChartColors, newCandidateColor]
        console.log(newChartData)
      }
      setChartData(newChartData)
      setChartLabels(newChartLabels)
      setChartColors(newChartColors)
      console.log(chartData)
      
    }, [candidateVotesTotal, setChartData, votes])

    const resetBallot = (vote, eliminatedCandidate) => {
      /*deletes candidate from ballots and adjust ballot rankings*/
      let foundEliminatedCandidate = false
      let leftArray = []
      let rightArray = []

      for(let i = 0; i < vote.length; i++){ 
        if(vote[i] != eliminatedCandidate && foundEliminatedCandidate == false){
          leftArray.push(vote[i])
        }else if (vote[i] != eliminatedCandidate && foundEliminatedCandidate == true){
          rightArray.push(vote[i])
        }else if(vote[i] == eliminatedCandidate){
          foundEliminatedCandidate = true
        }
      }
      
      console.log(leftArray)
      console.log(rightArray)
      const newBallot = leftArray.concat(rightArray);

      return newBallot
    }

    const eliminateCandidate = (event) => {
      event.preventDefault();

      /*deletes candidate from candidateVotesTotal list*/
      let min = Number.MAX_SAFE_INTEGER
      let minCandidate = ""
      for (const candidate in candidateVotesTotal){
        if(candidateVotesTotal[candidate] < min){
          min = candidateVotesTotal[candidate]
          minCandidate = candidate
        }
      }
      let newCandidateVotesTotal = candidateVotesTotal
      delete newCandidateVotesTotal[minCandidate]
      setCandidateVotesTotal(newCandidateVotesTotal)

      let newVotes = []
      for(let i = 0; i < votes.length; i++){
        console.log(minCandidate)
        console.log(votes[i])
        let newVote = resetBallot(votes[i], minCandidate)
        console.log(newVote)
        newVotes.push(newVote)
      }

      setVotes(newVotes)


    }


  return (
    <>
        <section className='flex flex-col justify-evenly items-center content-center flex-wrap min-h-screen'>
          <BarChart
              series={[{data: chartData}]}
              colors={chartColors}
              height={500}
              xAxis={[{data: chartLabels, scaleType: 'band', colorMap: {
                type: 'ordinal',
                values: chartLabels,
                colors: chartColors
                  }
                }
              ]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
          <button className='h-24 w-52 mb-4 bg-blue-600 hover:bg-blue-400 border-2 border-solid border-black font-democracy text-1.5xl' onClick={eliminateCandidate}>Next Round</button>
        </section> 
    </>
  );
}

export default Graph;
