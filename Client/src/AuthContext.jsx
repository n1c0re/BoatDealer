import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

const checkTokenValidity = async token => {
	try {
		const response = await axios.post(
			'http://localhost:4000/api/validateToken',
			{ token }
		)
		return response.data.user
	} catch (error) {
		console.error('Ошибка при проверке токена:', error)
		return null
	}
}

const AuthProvider = ({ children }) => {
	const [loggedInUser, setLoggedInUser] = useState()

	const logout = () => {
		setLoggedInUser(null)
	}
	const fetchUser = async () => {
		const token = sessionStorage.getItem('token')
		if (token) {
			const user = await checkTokenValidity(token)
			if (user) {
				await setLoggedInUser(user)
			} else {
				localStorage.removeItem('token')
				sessionStorage.removeItem('token')
			}
		}
	}
	
	useEffect(() => {
		fetchUser()
	}, [])

	return (
		<AuthContext.Provider value={{ loggedInUser, setLoggedInUser, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthProvider }
