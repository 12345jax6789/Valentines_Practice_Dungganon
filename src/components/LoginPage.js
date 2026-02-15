import React, { useState, useEffect } from 'react'

export default function LoginPage({ navigate }){
  const [name, setName] = useState('')

  useEffect(()=>{ try{ const s = localStorage.getItem('valentine_name'); if(s) navigate('home') }catch{} },[navigate])

  const submit = (e)=>{
    e.preventDefault()
    const t = name.trim()
    if(!t) return
    try{ localStorage.setItem('valentine_name', t) }catch{}
    navigate('home')
  }

  return (
    <div className="login-modal" onClick={(e)=>e.stopPropagation()}>
      <form className="login-card" onSubmit={submit}>
        <h2>Welcome</h2>
        <p>Enter your name to personalize messages</p>
        <input id="login-name" className="login-input" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name" />
        <div style={{display:'flex',gap:8,marginTop:8}}>
          <button className="btn" type="submit">Start</button>
          <button className="btn" type="button" onClick={(e)=>{e.preventDefault(); setName('')}}>Clear</button>
        </div>
      </form>
    </div>
  )
}
