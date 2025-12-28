import express from 'express';

const app = express(); //create express app

app.use(express.json()); //middleware to parse json

//iporting routes
import userRouter from './routes/user.routes.js';

//declaration of routes
app.use("/api/v1/users" , userRouter);

//example route : http://localhost:5000/api/v1/users/register


export default app;