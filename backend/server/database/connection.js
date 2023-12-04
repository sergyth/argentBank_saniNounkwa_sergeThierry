const mongoose = require('mongoose')
const databaseUrl =
  process.env.DATABASE_URL || "mongodb+srv://sergyth:12Snelees@cluster0.rq7ufe8.mongodb.net/?retryWrites=true&w=majority"
  console.log(databaseUrl)

module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl, { useNewUrlParser: true })
    console.log('Database successfully connected')
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`)
    throw new Error(error)
  }
}





