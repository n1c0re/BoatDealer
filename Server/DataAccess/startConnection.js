import pool from '../index.js'

export default async function startConnection() {
	try {
		const client = await pool.connect()
		return client
	} catch (error) {
		console.error('Error connecting to the database:', error)
		throw error
	}
}
