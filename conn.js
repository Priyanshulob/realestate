const mongoose = require("mongoose");
const connectdb = async () => {
  try {
    //mongodb connection string
    const conn = await mongoose.connect(
      "mongodb+srv://priyanshugiri:Giri1234@cluster0.6glu9kv.mongodb.net/House",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`mongoDB connected:${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectdb;
