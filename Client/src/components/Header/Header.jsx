import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import { AuthContext } from '../../AuthContext'

function Header() {
	const navigate = useNavigate()
	const { logout, loggedInUser } = useContext(AuthContext)

	const handleLogout = () => {
		sessionStorage.removeItem('token')
		logout()
		navigate('/')
	}

	const handleAdmin = () => {
		navigate('/admin')
	}

	const handleCabinet = () => {
		navigate('/cabinet')
	}

	return (
		<header>
			<Link to='/dashboard'>
				<div className='home-icon'>🏠</div>
			</Link>
			<h1>Дилер по продаже автомобилей</h1>
			<div className='auth-buttons'>
				{loggedInUser.user_type == 'Админ' ? (
					<button onClick={handleAdmin}>Админ панель</button>
				) : (
					<button onClick={handleCabinet}>Личный кабинет</button>
				)}
				<button onClick={handleLogout}>Выйти</button>
			</div>
		</header>
	)
}

export default Header
