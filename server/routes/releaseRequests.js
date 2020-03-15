const Router = require("express").Router();

module.exports = (db) => {
  Router.get('/', async (req, res) => {
    try {
      let docs = await db.collection("releaseRequests").find().project({'_id': false}).toArray();
      res.send(docs);
    }
    catch (e) {
      console.log(e);
      res.send([]);
    }
  })

  Router.put('/', async (req, res) => {
    try {
      let { mails, status } = req.query;
      mails = JSON.parse(mails);
      await db.collection("releaseRequests").updateMany({"Mail ID" : {"$in" : mails}}, { $set: {"Mail Status": status}});
      res.status(200).send();
    }
    catch (e) {
      res.status(400).send(e);
      console.log(e);
    }
  })

  return Router;
}