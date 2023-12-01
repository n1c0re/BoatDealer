import React, { useState } from 'react'
import './LoginPage.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
	const [login, setlogin] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const navigate = useNavigate()

	const handleLogin = async event => {
		event.preventDefault()
		try {
			const response = await axios.post('http://localhost:4000/api/login', {
				login,
				password,
			})

			console.log('Login successful:', response.data)
			setErrorMessage('')
			sessionStorage.setItem('token', response.data.token)
			navigate('/dashboard')
		} catch (error) {
			console.error('Login error:', error.response.data)
			setErrorMessage('Проверьте логин или пароль')
		}
		location.reload();
	}

	return (
		<div className='container'>
			<div className='form-box'>
				<h2>Вход</h2>
				<form className='form'>
					<div className='form-group'>
						<label htmlFor='login'>Логин</label>
						<input
							type='text'
							id='login'
							value={login}
							name='login'
							onChange={e => setlogin(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='password'>Пароль</label>
						<input
							type='password'
							id='password'
							value={password}
							name='password'
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					{errorMessage && <p>{errorMessage}</p>}

					<div className='buttons'>
						<button onClick={handleLogin} className='btn-login'>
							Войти
						</button>
						<Link to='/register'>
							<div className='account'>
								Нет аккаунта? <br></br>Зарегистрироваться
							</div>
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login
