const MongoClient = require("mongodb").MongoClient;
const Config = require("../../config.json");

module.exports = async () => {
  try {
    let client = await MongoClient.connect(Config.urls.db, { useUnifiedTopology: true });
    console.log("Connected successfully to MongoDB");
    return client.db("threatMails");
  }
  catch (e) {
    console.log("An error occurred while connecting to MongoDB");
    throw(e);
  }
}