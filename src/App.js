import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import LoginPage from './components/LoginPage'
import PostPage from './components/PostPage'
import ReadPage from './components/ReadPage'

function App(){
  const [route, setRoute] = useState(() => (window.location.hash || '#home').replace('#',''))

  useEffect(()=>{
    const onHash = () => setRoute((window.location.hash || '#home').replace('#',''))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  },[])

  const render = () => {
    if(route === 'login') return <LoginPage navigate={(r)=>{window.location.hash = r}} />
    if(route === 'post') return <PostPage navigate={(r)=>{window.location.hash = r}} />
    if(route === 'read') return <ReadPage />
    return <Home />
  }

  return (
    <div className="background-image">
      <div className="app-root">
        <Header current={route} />
        <main className="hero">
          {render()}
        </main>
      </div>
    </div>
  )
}

export default App