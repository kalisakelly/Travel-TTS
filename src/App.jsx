import React from 'react'
import Hero from './components/Hero'
import Destinations from './components/Destinations'
import Services from './components/Services'
import Stats from './components/Stats'
import Tours from './components/Tours'
import Gallery from './components/Gallery'

function App() {
  return (
    <div className="App">
      <Hero />
      <Destinations />
      <Services />
      <Tours />
      <Gallery />
      <Stats />
    </div>
  )
}

export default App