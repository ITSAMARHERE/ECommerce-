const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');


//create a databse connection
mongoose
.connect(
    "mongodb+srv://amarpal2024:zlWUpfXmxtPSMJh2024@cluster0.5xnxh.mongodb.net/"
)
.then(()=>console.log('MongoDB connected'))
.catch((error)=>console.log(error));


const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
        ],
        credentials : true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));