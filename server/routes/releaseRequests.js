const Router = require("express").Router();

module.exports = (db) => {
  let maxJumps, jumps, stoppedOnIndex;

  let initJumps = () => {
    maxJumps = -1, jumps = 5, stoppedOnIndex = 12;
  }

  Router.get('/', async (req, res) => {
    initJumps();
    try {
      let docs = await db.collection("releaseRequests").find().project({'_id': false}).limit(12).toArray();
      res.send(docs);
    }
    catch (e) {
      console.log(e);
      res.send([]);
    }
  })
  
  Router.get('/further', async (req, res) => {
    try {
      if (maxJumps === -1) {
        maxJumps = await db.collection("releaseRequests").find().project({'_id': false}).toArray();
        maxJumps = maxJumps.length;
      }
      if (stoppedOnIndex + jumps <= maxJumps) {
        let docs = await db.collection("releaseRequests").find().project({'_id': false}).limit(jumps).skip(stoppedOnIndex).toArray();
        stoppedOnIndex += jumps;
        return res.send(docs)
      }
      else if (stoppedOnIndex < maxJumps) {
        jumps = maxJumps - stoppedOnIndex;
        let docs = await db.collection("releaseRequests").find().project({'_id': false}).limit(jumps).skip(stoppedOnIndex).toArray();
        stoppedOnIndex = maxJumps;
        return res.send(docs)
      }
      else {
        return res.send([])
      }
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