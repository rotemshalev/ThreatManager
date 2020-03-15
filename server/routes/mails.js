const Router = require("express").Router();

module.exports = (db) => {
  let maxJumps, jumps, stoppedOnIndex;

  let initJumps = () => {
    maxJumps = -1, jumps = 5, stoppedOnIndex = 12;
  }

  Router.get('/', async (req, res) => {
    initJumps();
    try {
      let docs = await db.collection("mails").find().project({'_id': false}).limit(12).toArray();
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
        maxJumps = await db.collection("mails").find().project({'_id': false}).toArray();
        maxJumps = maxJumps.length;
      }
      if (stoppedOnIndex + jumps <= maxJumps) {
        stoppedOnIndex += jumps;
      }
      else if (stoppedOnIndex < maxJumps) {
        jumps = maxJumps - stoppedOnIndex;
        stoppedOnIndex = maxJumps;
      }
      else {
        return res.send([])
      }
      let docs = await db.collection("mails").find().project({'_id': false}).limit(jumps).skip(stoppedOnIndex).toArray();
      res.send(docs);
    }
    catch (e) {
      console.log(e);
      res.send([]);
    }
  })

  Router.delete('/', async (req, res) => {
    try {
      let { mails } = req.query;
      await db.collection("releaseRequests").deleteMany({"Mail ID" : {"$in" : JSON.parse(mails)}});
      await db.collection("mails").deleteMany({"Mail ID" : {"$in" : JSON.parse(mails)}});
      res.status(200).send();
    }
    catch (e) {
      res.status(400).send(e);
      console.log(e);
    }
  })

  return Router;
}