const Express = require("express");
const Cors = require("cors");

const InitDB = require("./db/initDb");
const Config = require("../config.json");
const MailsRouter = require("./routes/mails")
const ReleaseRequestsRouter = require("./routes/releaseRequests")

const app = Express();
const { port } = Config.server;

let Start = async () => {
  let db = await InitDB();

  app.use(Cors());
  
  app.use('/api/mails', MailsRouter(db));

  app.use('/api/releaseRequests', ReleaseRequestsRouter(db));

  app.use((req, res) => {
    res.status(404).send("Route is not available.");
  })

  app.listen(port, () => console.log("Server is running on port " + port));
};

module.exports.Start = Start;
