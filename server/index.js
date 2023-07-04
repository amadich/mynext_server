const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./models/database");
database();
app.use(express.json());

const corsOptions = {
  origin: ['https://mynextclientmaster.vercel.app', 'https://www.getpostman.com'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));



app.use("/createone", require("./routes/Register"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {console.log(`We Listening PORT - ${PORT}`);});
