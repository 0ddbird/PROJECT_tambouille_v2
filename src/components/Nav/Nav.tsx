import * as React from 'react'
import { NavLink } from 'react-router-dom'
import './nav.scss'
const Nav = (): JSX.Element => {
  return (
    <header>
      <nav>
        <NavLink className='navlink' to='/'>Home</NavLink>
        <NavLink className='navlink' to='/my-pantry'>Pantry</NavLink>
        <NavLink className='navlink' to='/cook'>Cook</NavLink>
        <NavLink className='navlink' to='/shopping-list'>Shopping List</NavLink>
      </nav>

    </header>
  )
}

export default Nav
