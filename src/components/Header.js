import React, { useEffect, useState } from 'react'

export default function Header({ current }){
  const [name, setName] = useState('')

  useEffect(()=>{
    try{ setName(localStorage.getItem('valentine_name') || '') }catch{}
  },[])

  const logout = ()=>{
    try{ localStorage.removeItem('valentine_name') }catch{}
    setName('')
    window.location.hash = 'login'
  }

  return (
    <header className="site-header">
      <div className="site-brand">
        <a href="#home" className="site-title">Be My Valentine</a>
        <div className="site-subtitle">Create a heartfelt message</div>
      </div>

      <nav className="site-actions">
        <a className={current==='home'? 'nav-active':''} href="#home">Home</a>
        <a className={current==='read'? 'nav-active':''} href="#read">Read</a>
        <a className={current==='post'? 'nav-active':''} href="#post">Post</a>
        {name ? (
          <>
            <span className="nav-name">{name}</span>
            <button className="btn logout" onClick={logout}>Logout</button>
          </>
        ) : (
          <a href="#login" className={current==='login' ? 'nav-active':''}>Login</a>
        )}
      </nav>
    </header>
  )
}
