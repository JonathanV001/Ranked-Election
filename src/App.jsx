import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Hero from './Hero'
import Graph from './Graph'
import { DataProvider } from './context/DataContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col align-middle bg-neutral-200 min-h-screen'>
      <DataProvider>
        <Hero />
        <Graph />
      </DataProvider>
    </div>
  )
}

export default App
