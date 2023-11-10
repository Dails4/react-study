import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import MyButton from '../button/MyButton'
import { AuthContext } from '../../../context'

const Navbar = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);
  const logout = e => {
    e.preventDefault();
    setIsAuth(false);
    localStorage.removeItem('auth')
  }
  return (
    <header className='navbar'>
        <MyButton onClick={logout} >
          Exit
        </MyButton>
        <div className='navbar__links'>
          <NavLink className='nav-item' to='/about'>About</NavLink>
          <NavLink className='nav-item' to='/posts'>Posts</NavLink>
        </div>
      </header>
  )
}

export default Navbar