import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import DataContext from './context/DataContext';
import { createElement } from 'react';
import ColorPicker from './ColorPicker';

const Hero = () => {
  const  { candidates, setCandidates, candidateColor, votes, setVotes, candidateVotesTotal, setCandidateVotesTotal
   } = useContext(DataContext);

  const [ candidateFormVisibility, setCandidateFormVisibility ] = useState(false)
  const [ voteFormVisibility, setVoteFormVisibility] = useState(false)

  const [ candidateName, setCandidateName] = useState('')
  const [ candidateParty, setCandidateParty] = useState('')

  const [ addButtonLocked, setAddButtonLocked] = useState(false)

  const addCandidate = () => {
    //check if candidate limit is reached
    if(candidates.length >= 12){
      alert("Candidate limit reached")
    //check if no name entered
    }else if(candidateName == ""){
      alert("Please enter candidate name")
    //check if candidate with that name already exists
    }else if((candidates.find(c => c.name == candidateName)) != null){
      alert("That candidate is already added")
    }else{
      console.log(candidates)
      const id = candidates.length ? candidates[candidates.length - 1].id + 1 : 1;
      const newCandidate = { key: id, name : candidateName, party : candidateParty, color : candidateColor};
      console.log(newCandidate);
      const newCandidates = candidates ? [...candidates, newCandidate] : [newCandidate];
      console.log(newCandidates);

      //also add to graph as zero
      const updatedCandidateVotesTotal = candidateVotesTotal
      updatedCandidateVotesTotal[candidateName] = 1
      setCandidateVotesTotal(updatedCandidateVotesTotal)

      setCandidates(newCandidates);
      setCandidateName("");
      setCandidateParty("");

    }
  }

  const createVote = (event) => {
    event.preventDefault();
    const voteArray = [];
    let voteChoices = document.getElementById("voteChoices");
    //find if unique
    let dupe = false

    for (const child of voteChoices.children){
      let candidate = child.options[child.selectedIndex].text
      console.log(candidate)
      if(voteArray.includes(candidate)){
        dupe = true
      }
      voteArray.push(candidate);
    }
    if(dupe){
      alert("Please make sure all candidates are different.")
    }else{
      const newVotes = [...votes, voteArray]
      setVotes(newVotes)
    }
  }

  
  return (
    <section className='flex flex-col justify-evenly items-center content-center flex-wrap min-h-screen'>
        <title className='flex content-center justify-center'>
            <h1 className=' text-3xl sm:text-5xl font font-democracy text-center'>True Election</h1>
        </title>
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-12 mt-10 max-w-8/12" id="candidateDisplay">
            {candidates.map((c) => (
                <figure style={{ backgroundColor: c.color}}className='w-40 h-40 border-2 border-solid border-black text-center' key = {c.id}><h1 className='font-democracy text-3xl'>{c.name}</h1><p className='font-democracy text-1xl'>{c.party}</p></figure>
            ))}
            {/*<figure className="w-40 h-40 bg-white border-2 border-solid border-black"></figure>*/}
        </section>
        
    
        <div className=" mb-4 mt-4 sm:mb-0 sm:mt-0 w-1/2 bg-black rounded-full h-1 relative"><button className='w-10 h-10 bg-red-600 hover:bg-red-400 disabled:bg-red-200 disabled:cursor-not-allowed border-2 border-solid border-black font-democracy text-3xl absolute right-0 -bottom-5 z-10 font-bold' disabled={addButtonLocked} onClick={() =>  setCandidateFormVisibility(true)}>+</button></div>
        <h1 className=' mb-4 sm:mb-0 text-2xl sm:text-3xl font font-democracy text-center'>Add Candidates</h1>

        <button className='w-48 h-20 bg-red-600 hover:bg-red-400 border-2 border-solid border-black font-democracy text-1.5xl' onClick={() => {setVoteFormVisibility(true); setAddButtonLocked(true); }}>Start Election</button>
        
        {/* refractor and make pop ups there own components */}

        {/* pop up for voting for candidates*/}
        <form className={voteFormVisibility ? ' w-3/4 md:w-1/4 h-1/2 bg-neutral-200 border-2 border-solid border-black z-50 flex flex-col absolute top:1/2 items-center justify-evenly' : 'hidden'}name='vote' id="currentVote">
        <figure className='absolute font-democracy text-3xl right-2 top-2 hover:text-white' onClick={() => setVoteFormVisibility(false)}>X</figure>
          <div id="voteChoices" className='h-1/2 w-4/5 max-h-1/2 overflow-scroll'>
            {candidates.map((c) => (

                <select className=' max-h-12 h-1/6 w-full border-2 border-solid border-black sm:mb-2'>

                  {candidates.map((c) => (
                    <option className='text-center'>{c.name}</option>
                  ))}

                </select>

              ))}
          </div>
          <button className='max-h-48 w-48 h-1/6 bg-blue-600 hover:bg-blue-400 border-2 border-solid border-black font-democracy text-1.5xl' onClick={createVote}>Vote!</button>
        </form>

        {/* pop up for adding election candidates */}
        <form className={ candidateFormVisibility ? ' w-3/4 md:w-1/4 h-1/2 bg-neutral-200 border-2 border-solid border-black z-50 flex flex-col absolute top:1/2 items-center justify-evenly' : "hidden"} name='addCandidate' id="addCandiate">
          <figure className='absolute font-democracy text-3xl right-2 top-2 hover:text-white' onClick={() => setCandidateFormVisibility(false)}>X</figure>
          <div className='flex items-center justify-evenly w-3/4'>
            {/* <figure className=" w-24 h-24 sm:w-32 sm:h-32 bg-white border-2 border-solid border-black"></figure>
            <button className='max-h-24 sm:w-32 sm:h-20 h-16 w-16 bg-blue-600 hover:bg-blue-400 border-2 border-solid border-black font-democracy text-1.5xl'>Choose color</button> */}
            <ColorPicker />
          </div>
          <input className=' max-h-12 h-1/6 w-3/4 border-2 border-solid border-black font-democracy' placeholder="name" name="candidateName" id="candidateName" 
          onChange={(e) => {setCandidateName(e.target.value)}} value={candidateName}></input>
          <input className='max-h-12 h-1/6 w-3/4 border-2 border-solid border-black font-democracy' placeholder="party" name="candidateParty" id="candidateParty"
          onChange={(e) => {setCandidateParty(e.target.value)}} value={candidateParty}></input>
          <div className='w-48 h-20 bg-red-600 hover:bg-red-400 border-2 border-solid border-black font-democracy text-1.5xl flex items-center justify-center' onClick={() => {addCandidate()}}>Add Candidate</div>
        </form>



    </section>
  );
}

export default Hero;
