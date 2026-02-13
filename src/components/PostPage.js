import React, { useState } from 'react'
import bird from '../pictures/bird.gif'
import hearts from '../pictures/heartss.gif'

export default function PostPage({ navigate }){
  const [text, setText] = useState('')
  const [hidden, setHidden] = useState(true)
  const [floatPos, setFloatPos] = useState({
    bird1: { x: 0, y: 0 },
    bird2: { x: 0, y: 0 },
    hearts1: { x: 0, y: 0 },
    hearts2: { x: 0, y: 0 }
  })

  // Multiple independent drift animations
  React.useEffect(()=>{
    const interval = setInterval(()=>{
      setFloatPos({
        bird1: {
          x: Math.sin(Date.now() / 3000) * 25,
          y: Math.cos(Date.now() / 4000) * 25
        },
        bird2: {
          x: Math.sin(Date.now() / 3500) * 20,
          y: Math.cos(Date.now() / 4500) * 20
        },
        hearts1: {
          x: Math.sin(Date.now() / 4000) * 30,
          y: Math.cos(Date.now() / 3500) * 30
        },
        hearts2: {
          x: Math.sin(Date.now() / 3200) * 28,
          y: Math.cos(Date.now() / 4200) * 28
        }
      })
    }, 50)
    return ()=> clearInterval(interval)
  },[])

  const submit = (e)=>{
    e.preventDefault()
    const msg = { text: text.trim(), hidden, createdAt: Date.now() }
    try{
      const existing = JSON.parse(localStorage.getItem('valentine_messages') || '[]')
      existing.unshift(msg)
      localStorage.setItem('valentine_messages', JSON.stringify(existing))
    }catch{}
    setText('')
    navigate('read')
  }

  return (
    <div className="hero-content" style={{position:'relative'}}>
      {/* Floating images on the RIGHT side */}
      <img src={bird} alt="bird 1" style={{
        position:'fixed',
        top:'10%',
        right:'2%',
        width:100,
        opacity:1,
        pointerEvents:'none',
        zIndex:0,
        transform: `translate(${floatPos.bird1.x}px, ${floatPos.bird1.y}px)`,
        transition:'transform 0.5s ease-in-out'
      }} />

      <img src={hearts} alt="hearts 1" style={{
        position:'fixed',
        bottom:'15%',
        right:'1%',
        width:110,
        opacity:1,
        pointerEvents:'none',
        zIndex:0,
        transform: `translate(${floatPos.hearts1.x}px, ${floatPos.hearts1.y}px)`,
        transition:'transform 0.5s ease-in-out'
      }} />

      {/* Floating images on the LEFT side */}
      <img src={hearts} alt="hearts 2" style={{
        position:'fixed',
        top:'20%',
        left:'1%',
        width:105,
        opacity:1,
        pointerEvents:'none',
        zIndex:0,
        transform: `translate(-${floatPos.hearts2.x}px, ${floatPos.hearts2.y}px)`,
        transition:'transform 0.5s ease-in-out'
      }} />

      <img src={bird} alt="bird 2" style={{
        position:'fixed',
        bottom:'20%',
        left:'15%',
        width:95,
        opacity:1,
        pointerEvents:'none',
        zIndex:0,
        transform: `translate(-${floatPos.bird2.x}px, ${floatPos.bird2.y}px)`,
        transition:'transform 0.5s ease-in-out'
      }} />

      <div className="card" style={{position:'relative',zIndex:1}}>
        <h2 className="my-text">Write a message</h2>
        <form onSubmit={submit}>
          <textarea className="input-message" style={{border:'3px solid #a3002b'}} rows={6} value={text} onChange={(e)=>setText(e.target.value)} placeholder="Write something heartfelt (or not)." />
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:12,marginTop:12}}>
            <label style={{display:'flex',alignItems:'center',gap:8}}><input type="checkbox" checked={hidden} onChange={e=>setHidden(e.target.checked)} /> Hidden</label>
            <button className="btn" type="submit">Post message</button>
          </div>
        </form>
      </div>
    </div>
  )
}
