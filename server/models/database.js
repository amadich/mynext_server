const mongoose = require("mongoose");
const database_url = `mongodb+srv://amadich:7001295@shop.asc9xzs.mongodb.net/kora`;
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