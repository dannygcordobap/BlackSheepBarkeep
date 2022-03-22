import express from "express"
import cors from "cors"
import drink from "./api/drink.route.js"
import path from "path"

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/v1/drink", drink)

if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.resolve("./frontend/build")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve("./frontend/build/index.html"))
    })
}

export default app