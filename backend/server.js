const app = require('./src/app')
const connectDB = require('./src/db/db')
require('dotenv').config()


connectDB()
app.listen(3000,(req,res)=>{
    console.log("Server running on port 3000");
    
})