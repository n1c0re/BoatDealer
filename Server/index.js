import pkg from 'pg'

import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pkg

const pool = new Pool({
	connectionString: 'ссылка на бд',
})

export default pool
