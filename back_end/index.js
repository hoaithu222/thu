import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
import userRouter from './router/user.router.js'
import categoryRouter from './router/category.route.js'
import uploadRouter from './router/upload.route.js'
import subCategoryRouter from './router/subCategory.route.js'
import productRouter from './router/product.route.js'


const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}))
app.use(express.json());
app.use(cookieParser())
app.use(morgan("combined"))
app.use(helmet({
    crossOriginOpenerPolicy: false
}))
const PORT = 8080 || process.env.PORT;
app.get("/", (request, response) => {
    // server to client

    response.json({
        message: "Server is running" + PORT,
    })

})
app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/subCategory', subCategoryRouter)
app.use('/api/file', uploadRouter)
app.use('/api/product', productRouter)
connectDB().then(app.listen(PORT, () => {
    console.log("Server is running", PORT);
}))
