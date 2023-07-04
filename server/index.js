const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./models/database");
database();
app.use(express.json());

const corsOptions = {
  origin: 'https://mynextclientmaster.vercel.app',
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));


app.use("/createone", require("./routes/Register"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {console.log(`We Listening PORT - ${PORT}`);});
