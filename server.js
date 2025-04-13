const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");
const businessRouter =  require("./routes/businessRoutes");
const userRouter = require("./routes/userRoutes")
const errorHandler = require("./middleware/errorHandler")
const sendMail = require("./utils/emailHandler") // fornow

//Establish database connection
connectDB();

app = express();
app.use(express.json())
app.use("/api/business" ,businessRouter)
app.use("/api/users",userRouter)
app.use(errorHandler)


const port = process.env.PORT || 5000
app.listen( port || 5000, () => { console.log(`Server is running on ${port}`)})

