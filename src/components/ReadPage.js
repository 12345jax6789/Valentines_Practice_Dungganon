import React, { useEffect, useState } from 'react'
import love_letter from '../pictures/loveletter.gif'
import cupid from '../pictures/cupid.gif'

export default function ReadPage(){
  const [msgs, setMsgs] = useState([])
  const [revealed, setRevealed] = useState({})
  const [floatPos, setFloatPos] = useState({
    letter1: { x: 0, y: 0 },
    letter2: { x: 0, y: 0 },
    cupid1: { x: 0, y: 0 },
    cupid2: { x: 0, y: 0 }
  })

  useEffect(()=>{
    try{ const existing = JSON.parse(localStorage.getItem('valentine_messages') || '[]'); setMsgs(existing) }catch{}
  },[])

  // Multiple independent drift animations
  useEffect(()=>{
    const interval = setInterval(()=>{
      setFloatPos({
        letter1: {
          x: Math.sin(Date.now() / 3000) * 25,
          y: Math.cos(Date.now() / 4000) * 25
        },
        letter2: {
          x: Math.sin(Date.now() / 3500) * 20,
          y: Math.cos(Date.now() / 4500) * 20
        },
        cupid1: {
          x: Math.sin(Date.now() / 4000) * 30,
          y: Math.cos(Date.now() / 3500) * 30
        },
        cupid2: {
          x: Math.sin(Date.now() / 3200) * 28,
          y: Math.cos(Date.now() / 4200) * 28
        }
      })
    }, 50)
    return ()=> clearInterval(interval)
  },[])

  const toggle = (i)=> setRevealed(r=>({ ...r, [i]: !r[i]}))

  return (
    <div className="hero-content" style={{position:'relative'}}>
      {/* Floating images on the RIGHT side */}
      <img src={love_letter} alt="love letter 1" style={{
        position:'fixed',
        top:'30%',
        right:'12%',
        width:100,
        opacity:1,
        pointerEvents:'none',
        zIndex:0,
        transform: `translate(${floatPos.letter1.x}px, ${floatPos.letter1.y}px)`,
        transition:'transform 0.5s ease-in-out'
      }} />

      <img src={cupid} alt="cupid 1" style={{
        position:'fixed',
        bottom:'15%',
        right:'10%',
        width:110,
        opacity:1,
        pointerEvents:'none',
        zIndex:0,
        transform: `translate(${floatPos.cupid1.x}px, ${floatPos.cupid1.y}px)`,
        transition:'transform 0.5s ease-in-out'
      }} />

      {/* Floating images on the LEFT side */}
      <img src={cupid} alt="cupid 2" style={{
        position:'fixed',
        top:'20%',
        left:'10%',
        width:105,
        opacity:1,
        pointerEvents:'none',
        zIndex:0,
        transform: `translate(-${floatPos.cupid2.x}px, ${floatPos.cupid2.y}px)`,
        transition:'transform 0.5s ease-in-out'
      }} />

      <img src={love_letter} alt="love letter 2" style={{
        position:'fixed',
        bottom:'20%',
        left:'2%',
        width:95,
        opacity:1,
        pointerEvents:'none',
        zIndex:0,
        transform: `translate(-${floatPos.letter2.x}px, ${floatPos.letter2.y}px)`,
        transition:'transform 0.5s ease-in-out'
      }} />

      <div style={{maxWidth:980,margin:'0 auto',width:'100%',position:'relative',zIndex:1}}>
        <h2 className="my-text">Hidden messages</h2>
        {msgs.length === 0 && <p>No messages yet — be the first to post.</p>}
        {msgs.map((m,i)=> (
          <div key={i} className="card" style={{marginBottom:16}}>
            <div style={{color:'#888',fontSize:12}}>{new Date(m.createdAt).toLocaleString()}</div>
            <div style={{marginTop:8,filter: m.hidden && !revealed[i] ? 'blur(6px)' : 'none', transition:'filter 220ms'}}>{m.text}</div>
            {m.hidden && !revealed[i] && <button className="btn" style={{marginTop:10}} onClick={()=>toggle(i)}>Reveal</button>}
          </div>
        ))}
      </div>
    </div>
  )
}
