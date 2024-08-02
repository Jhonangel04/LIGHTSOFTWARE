import 'dotenv/config'
import './db.js'
import app from './app.js'

const port = process.env.PORT || 3000

app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))