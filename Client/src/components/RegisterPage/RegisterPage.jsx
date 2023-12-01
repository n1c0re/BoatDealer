import React, { useState } from 'react'
import './RegisterPage.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function RegisterPage() {
	const [users, setUsers] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const navigate = useNavigate();

	async function checkExistingLogin(login) {
		try {
			const response = await axios.get(
				`http://localhost:4000/api/users/${login}`
			)
			return response.data.exists
		} catch (error) {
			console.error('Error:', error)
			return false
		}
	}

	async function handleRegistration(event) {
		event.preventDefault()
		try {
			const isExistingLogin = await checkExistingLogin(users.login)

			if (isExistingLogin) {
				setErrorMessage('Логин уже существует')
				return
			}
			setErrorMessage('')
			await axios.post('http://localhost:4000/api/users', users)
			navigate('/');
		} catch (error) {
			console.error('Error:', error)
		}
	}

	function handleInputChange(event) {
		const { name, value } = event.target
		setUsers(prevState => ({
			...prevState,
			[name]: value,
		}))
		console.log(users)
	}

	return (
		<div className='container'>
			<div className='form-box'>
				<h2>Регистрация</h2>
				<form>
					<div className='form-group'>
						{errorMessage && <p>{errorMessage}</p>}
						<label htmlFor='username'>Имя пользователя</label>
						<input
							type='text'
							id='username'
							name='username'
							onChange={handleInputChange}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='login'>Логин</label>
						<input
							type='text'
							id='login'
							name='login'
							onChange={handleInputChange}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='password'>Пароль</label>
						<input
							type='password'
							id='password'
							name='password'
							onChange={handleInputChange}
						/>
					</div>
					<div className='form-group'>
						<label>Являетесь юридическим лицом?</label>
						<div>
							<input
								type='radio'
								id='legalEntity'
								value={true}
								name='entity'
								onChange={handleInputChange}
							/>
							<label htmlFor='legalEntity'>Да</label>
						</div>
						<div>
							<input
								type='radio'
								id='notLegalEntity'
								value={false}
								name='entity'
								onChange={handleInputChange}
							/>
							<label htmlFor='notLegalEntity'>Нет</label>
						</div>
					</div>
					<div className='buttons'>
						<button onClick={handleRegistration} className='btn-register'>
							Зарегистрироваться
						</button>
						<Link to='/'>
							<div className='account'>Уже есть аккаунт</div>
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default RegisterPage
