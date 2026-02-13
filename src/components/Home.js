import React, { useEffect, useRef, useState } from 'react'
import bild_heart_3 from '../pictures/heart.png'
import picture_heart from '../pictures/Sample.png'
import audio_hug from '../audio/Audio.mp3'
import arrow from '../pictures/arrows.gif'

export default function Home(){
  const defaultImages = [bild_heart_3, picture_heart]
  const [uploadedImage, setUploadedImage] = useState(null)
  const [randomImages, setRandomImages] = useState([])
  const [message, setMessage] = useState('upload image, touch the white screen and turn on sound :)')
  const [audioStarted, setAudioStarted] = useState(false)
  const [floatPos, setFloatPos] = useState({
    arrow1: { x: 0, y: 0 },
    arrow2: { x: 0, y: 0 },
    arrow3: { x: 0, y: 0 },
    arrow4: { x: 0, y: 0 }
  })
  const audioRef = useRef()

  useEffect(()=>{
    return ()=>{ if(uploadedImage) URL.revokeObjectURL(uploadedImage) }
  },[uploadedImage])

  // Arrow floating animations
  useEffect(()=>{
    const interval = setInterval(()=>{
      setFloatPos({
        arrow1: {
          x: Math.sin(Date.now() / 3000) * 25,
          y: Math.cos(Date.now() / 4000) * 25
        },
        arrow2: {
          x: Math.sin(Date.now() / 3500) * 25,
          y: Math.cos(Date.now() / 4500) * 25
        },
        arrow3: {
          x: Math.sin(Date.now() / 3200) * 25,
          y: Math.cos(Date.now() / 4200) * 25
        },
        arrow4: {
          x: Math.sin(Date.now() / 3700) * 25,
          y: Math.cos(Date.now() / 4100) * 25
        }
      })
    }, 50)
    return ()=> clearInterval(interval)
  },[])

  const handleUpload = (e)=>{
    const f = e.target.files && e.target.files[0]
    if(!f) return
    const url = URL.createObjectURL(f)
    if(uploadedImage) URL.revokeObjectURL(uploadedImage)
    setUploadedImage(url)
  }

  const addHeart = (x,y)=>{
    const img = uploadedImage || defaultImages[Math.floor(Math.random()*defaultImages.length)]
    const id = Date.now()+Math.random()
    setRandomImages(prev=>[...prev,{id,image:img,x,y}])
    setTimeout(()=>{
      setRandomImages(prev=>prev.filter(p=>p.id!==id))
    },1800)
  }

  const handlePlay = ()=>{
    if(!audioStarted){
      const p = audioRef.current.play()
      if(p && p.catch) p.catch(()=>{}).then(()=>setAudioStarted(true))
      else setAudioStarted(true)
    }
  }

  const handleBgClick = (e)=>{
    handlePlay()
    const rect = e.currentTarget.getBoundingClientRect()
    addHeart(e.clientX-rect.left, e.clientY-rect.top)
  }

  const storedName = typeof window !== 'undefined' ? (localStorage.getItem('valentine_name') || '') : ''
  const display = storedName ? `${storedName}, ${message}` : message

  return (
    <div className="home-root" onClick={handleBgClick}>
      {/* Floating arrows pointing toward center */}
      <img src={arrow} alt="arrow left" style={{
        position:'fixed',
        left:'15%',
        top:'50%',
        width:100,
        opacity:1,
        pointerEvents:'none',
        zIndex:0,
        transform: `translateY(-50%) translate(${floatPos.arrow1.x}px, ${floatPos.arrow1.y}px)`,
        transition:'transform 0.5s ease-in-out'
      }} />

      <img src={arrow} alt="arrow right" style={{
        position:'fixed',
        right:'15%',
        top:'50%',
        width:100,
        opacity:1,
        pointerEvents:'none',
        zIndex:0,
        transform: `translateY(-50%) scaleX(-1) translate(-${floatPos.arrow2.x}px, ${floatPos.arrow2.y}px)`,
        transition:'transform 0.5s ease-in-out'
      }} />

      {/* Bottom left arrow pointing toward center at 45 degrees */}
      <img src={arrow} alt="arrow bottom left" style={{
        position:'fixed',
        bottom:'20%',
        left:'25%',
        width:100,
        opacity:1,
        pointerEvents:'none',
        zIndex:0,
        transform: `rotate(-45deg) translate(${floatPos.arrow3.x}px, ${floatPos.arrow3.y}px)`,
        transition:'transform 0.5s ease-in-out',
        transformOrigin:'center'
      }} />

      {/* Bottom right arrow pointing toward center at 45 degrees */}
      <img src={arrow} alt="arrow bottom right" style={{
        position:'fixed',
        bottom:'20%',
        right:'25%',
        width:100,
        opacity:1,
        pointerEvents:'none',
        zIndex:0,
        transform: `rotate(45deg) scaleX(-1) translate(-${floatPos.arrow4.x}px, ${floatPos.arrow4.y}px)`,
        transition:'transform 0.5s ease-in-out',
        transformOrigin:'center'
      }} />
      <div className="hero-content">
        <div className="card">
          <h1 className="my-text">{display}</h1>

          <div className="controls" onClick={(e)=>e.stopPropagation()}>
            <input className="input-message" value={message} onChange={e=>setMessage(e.target.value)} />
            <label className="btn btn-file">Upload image<input type="file" accept="image/*" onChange={handleUpload} /></label>
            <button className="btn btn-play" onClick={(e)=>{e.stopPropagation(); handlePlay()}}>{audioStarted? 'Playing':'Play Music'}</button>
            {uploadedImage && <img src={uploadedImage} className="uploaded-preview" alt="preview" />}
          </div>
        </div>

        {randomImages.map(r=> (
          <img key={r.id} src={r.image} alt="heart" className="heart-image" style={{left:r.x, top:r.y}} />
        ))}
      </div>

      <audio ref={audioRef} src={audio_hug} loop />
    </div>
  )
}
