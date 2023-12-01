import React from 'react'
import './App.css'
import { AuthProvider } from '../../AuthContext'
import AppContent from '../AppContent/AppContent'

function App() {
	return (
		<AuthProvider>
			<AppContent />
		</AuthProvider>
	)
}

export default App
