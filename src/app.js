import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.get('/' , (req , res)=>{
   res.send('hello from simple server :)')
})

app.use('/api', authRoutes)
app.use('/api', bookRoutes)
export default app