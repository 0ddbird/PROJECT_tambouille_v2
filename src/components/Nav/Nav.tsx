import * as React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = (): JSX.Element => {
  return (
    <nav>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/my-pantry'>Pantry</NavLink>
      <NavLink to='/cook'>Cook</NavLink>
      <NavLink to='/shopping-list'>Shopping List</NavLink>
    </nav>
  )
}

export default Nav
