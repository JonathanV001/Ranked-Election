import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useContext } from 'react';
import DataContext from './context/DataContext';
import { useEffect } from 'react';
import { useState } from 'react';

const Graph = () => {
    const  { candidateVotesTotal, candidates } = useContext(DataContext);
    const  [chartData, setChartData] = useState([])
    
    // recalculates votes when another one is cast (candidateVotesTotal)
    useEffect(() => {
      let newChartData = []
      for(const candidate in candidateVotesTotal){
        let voteTotalAsArray = [candidateVotesTotal[candidate]]
        let chartDataUnit = {data: voteTotalAsArray , label: candidate, color: (candidates.find(c => c.name == candidate)).color}
        console.log(chartDataUnit)
        newChartData = [...newChartData, chartDataUnit]
        console.log(newChartData)
      }
      setChartData(newChartData)
      console.log(chartData)
      
    }, [candidateVotesTotal, setChartData])
  return (
    <>
        <section className='flex flex-col justify-evenly items-center content-center flex-wrap min-h-screen'>
        <BarChart
            series={chartData}
            height={500}
            xAxis={[{scaleType: 'band', data: chartData.map((c) => c.label)}]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
         />
        </section> 
    </>
  );
}

export default Graph;
