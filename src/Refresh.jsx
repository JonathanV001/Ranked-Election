import React from 'react';

const Refresh = () => {

    const refreshPage = () => {
        window.location.reload()
    }

  return (
    <div onClick={refreshPage} className='text-center w-16 h-26 ml-10 bg-red-600 hover:bg-red-400 disabled:bg-red-200 disabled:cursor-not-allowed border-2 border-solid border-black font-democracy z-10'>
      <p className='text-1.5xl'>restart</p>
    </div>
  );
}

export default Refresh;
