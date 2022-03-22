import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import DrinkDAO from "./dao/drinkDAO.js"
import CommentDAO from "./dao/commentDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient
const PORT = process.env.PORT || 5000

MongoClient.connect(
    process.env.NOTABARTENDER_DB_URI
).catch(err => {
    console.error(err.stack)
    process.exit(1)
}).then(async client => {
    await DrinkDAO.injectDB(client)
    await CommentDAO.injectDB(client)
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
})