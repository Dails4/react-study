import React, { useContext } from 'react'
import MyButton from '../Componets/UI/button/MyButton'
import MyInput from '../Componets/UI/input/MyInput'
import { AuthContext } from '../context'

const Login = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);
  const login = event => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', 'true');
  }

  return (
    <div>
        <h1>Страница авторизации</h1>
        <form onSubmit={login}>
          <MyInput type='text' placeholder='Введите логин'/>
          <MyInput type='password' placeholder='Введите пароль'/>
          <MyButton>Войти</MyButton> 
        </form>
    </div>
  )
}

export default Login