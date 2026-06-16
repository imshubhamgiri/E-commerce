import {Pool} from 'pg';
import config from 'dotenv';

config.config();

const pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
})


pgPool.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('🚀 Postgres connected successfully');
  }
});


export default pgPool;