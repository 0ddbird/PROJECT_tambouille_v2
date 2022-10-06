import * as React from 'react'
import { NavLink } from 'react-router-dom'
import './home.scss'
const Home = (): JSX.Element => {
  return (
    <section id='home' className='page'>
      <h1 className='section-heading'>Welcome to Tambouille!</h1>
      <p className='section-description'>With tambouille, cook recipes only based on the ingredients you have !
        <br />
        <br />
        Start with filling in ingredients you have, then happy cooking!
      </p>
      <NavLink to='/my-pantry' className='cta'>Go to my pantry</NavLink>
    </section>
  )
}

export default Home
