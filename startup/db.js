var mongoose = require("mongoose");


module.exports = () => {

/** this project needs a db !! **/

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("Mongo db connection successful"))
  .catch(err => console.log(err));

}