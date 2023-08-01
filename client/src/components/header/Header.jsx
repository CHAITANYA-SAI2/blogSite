import React from 'react'
import './header.css'
export default function Header() {
  return (
    <div className='header'>
      <div className='headerTitles'>
        <span className='headerTitleSm'>React & Node</span>
        <span className='headerTitleLg'>Blog</span>
      </div>
      <img className='headerImage' src='https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29ya3NwYWNlfGVufDB8fDB8fHww&w=1000&q=80' alt='' />
    </div>
  )
}
