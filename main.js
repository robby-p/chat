const express = require("express");

const app = express();

const bodyParser = require("body-parser");

let msgStore = MessageStore();

app.use("/", express.static("public"));

app.use(bodyParser.json());

app.get("/sync/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.json(msgStore.sync(id));
});
app.post("/msg", (req, res) => {
  const id = msgStore.newMsg(req.body);
  res.send({ id });
});
app.listen(8000,  '127.0.0.1', (err) => {
  if (err) throw err;
  console.log(`Listening http://localhost:8000`);
});

function MessageStore() {
  let count = 1;
  const MSGS = [];
  return {
    getAll() {
      return MSGS;
    },
    sync(id) {
      return MSGS.reduce((p, n) => (n.id > id ? [...p, n] : p), []);
    },
    newMsg({ name, msg }) {
      MSGS.push({ name, msg, id: ++count });
      return count;
    },
  };
}
