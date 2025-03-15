import express from "express"
import dotenv from "dotenv"
import authRouter from "./src/routers/auth.route.js"
import messageRouter from "./src/routers/message.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectDb } from "./src/config/db.js"
import { app, server } from "./src/config/socket.js"
import path from "path"

dotenv.config()

const __dirname = path.resolve()
app.use(cors({
    origin:process.env.ORIGIN,
    credentials:true
}))

app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser())

app.use("/api/auth", authRouter )
app.use("/api/messages", messageRouter )

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req,res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}


console.log("Cloudinary Config:", process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_SECRET_KEY);

server.listen(process.env.PORT , ()=>{
    console.log("server started on port "+ process.env.PORT);
    connectDb();
})