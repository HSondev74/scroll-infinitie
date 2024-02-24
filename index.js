const express = require("express");
const customerRouter = require("./router/customer.js");
const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
     console.log("Day la get");
     res.send("Hello");
});
app.use("/user", customerRouter);
app.post(
     "/post",
     (req, res, next) => {
          console.log("middleware cua post");
          next();
     },
     (req, res) => {
          res.send(req.body);
     }
);

app.listen(8080, () => {
     console.log("running 8080");
});
