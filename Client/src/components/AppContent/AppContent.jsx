﻿import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from '../../AuthContext'
import LoginPage from '../LoginPage/LoginPage'
import RegisterPage from '../RegisterPage/RegisterPage'
import Header from '../Header/Header'
import BoatDetails from '../CarDetails/BoatDetails'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import AdminPanel from '../AdminPanel/AdminPanel'
import BoatsCatalog from '../BoatsCatalog/BoatsCatalog'
import Cabinet from '../Cabinet/Cabinet'

function AppContent() {
	const { loggedInUser } = useContext(AuthContext)
	console.log(loggedInUser)

	if (loggedInUser) {
		if (loggedInUser.user_type_id === 2) {
			return (
				<BrowserRouter>
					<div className='App'>
						<Routes>
							<Route path='/boat/:boatId' element={<Header />} />
							<Route path='/dashboard' element={<Header />} />
							<Route path='/cabinet' element={<Header />} />
						</Routes>
						<div className='content'>
							<Routes>
								<Route
									path='/register'
									element={<Navigate to='/dashboard' />}
								/>
								<Route path='/' element={<Navigate to='/dashboard' />} />
								<Route path='/boat/:boatId' element={<BoatDetails />} />
								<Route path='/dashboard' element={<BoatsCatalog />} />
								<Route path='*' element={<NotFoundPage />} />
								<Route path='/cabinet' element={<Cabinet />} />
							</Routes>
						</div>
					</div>
				</BrowserRouter>
			)
		} else if (loggedInUser.user_type_id === 1) {
			return (
				<BrowserRouter>
					<div className='App'>
						<Routes>
							<Route path='/boat/:boatId' element={<Header />} />
							<Route path='/dashboard' element={<Header />} />
							<Route path='/admin' element={<Header />} />
						</Routes>
						<div className='content'>
							<Routes>
								<Route
									path='/register'
									element={<Navigate to='/dashboard' />}
								/>
								<Route path='/' element={<Navigate to='/dashboard' />} />
								<Route path='/boat/:boatId' element={<BoatDetails />} />
								<Route path='/dashboard' element={<BoatsCatalog />} />
								<Route path='/admin' element={<AdminPanel />} />
								<Route path='*' element={<NotFoundPage />} />
							</Routes>
						</div>
					</div>
				</BrowserRouter>
			)
		} else {
			return (
				<BrowserRouter>
					<div className='App'>
						<Routes>
							<Route path='/cabinet' element={<Header />} />
							<Route path='/dashboard' element={<Header />} />
						</Routes>
						<div className='content'>
							<Routes>
								<Route path='*' element={<Navigate to='/cabinet' />} />
								<Route path='/cabinet' element={<Cabinet />} />
								<Route path='/dashboard' element={<Cabinet />} />
							</Routes>
						</div>
					</div>
				</BrowserRouter>
			)
		}
	} else
		return (
			<BrowserRouter>
				<div className='App'>
					<Routes>
						<Route path='/register' element={<RegisterPage />} />
						<Route path='/' element={<LoginPage />} />
						<Route path='*' element={<NotFoundPage />} />
					</Routes>
				</div>
			</BrowserRouter>
		)
}

export default AppContent
