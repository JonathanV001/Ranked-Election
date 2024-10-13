import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useContext } from 'react';
import DataContext from './context/DataContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { data } from 'autoprefixer';

const Graph = () => {
    const  { candidateVotesTotal, candidates } = useContext(DataContext);
    const  [chartData, setChartData] = useState([])
    const [chartLabels, setChartLabels] = useState([])
    const [chartColors, setChartColors] = useState([])
    
    // recalculates votes when another one is cast (candidateVotesTotal)
    useEffect(() => {
      let newChartData = []
      let newChartLabels = []
      let newChartColors = []
      for(const candidate in candidateVotesTotal){
        let votes = candidateVotesTotal[candidate]
        let newChartLabel = candidate
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
      
    }, [candidateVotesTotal, setChartData])
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
        </section> 
    </>
  );
}

export default Graph;
