import React, { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Posts from './pages/Posts'
import Navbar from './Componets/UI/Navbar/Navbar'
import { privateRoutes, publicRoutes } from './router/index'
import Login from './pages/Login'
import { AuthContext } from './context'

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if(localStorage.getItem('auth')) {
      setIsAuth(true);
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }} >
      <BrowserRouter>
      <Navbar />
      {isAuth 
        ?
        <Routes>
          {privateRoutes.map((route) => 
            <Route path={route.path} element={route.element} key={route.path} />
          )}
          <Route path='*' element={<Posts />} />
        </Routes>
        :
        <Routes>
          {publicRoutes.map((route) => 
            <Route path={route.path} element={route.element} key={route.path} />
          )}
          <Route path='*' element={<Login />} />
        </Routes>
        }
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App