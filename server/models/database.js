const mongoose = require("mongoose");
const database_url = process.env.DBMONGO;
const database = () => {
   mongoose.connect(database_url)
   .then(() => {
      console.log(`MongoDB Connected Sucssefull !`);
   })
   .catch((e) => {
      console.log(e);
   })
}
module.exports = database;
