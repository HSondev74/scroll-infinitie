const express = require("express");
const customerRouter = express();

customerRouter.get("/", function (req, res) {
     res.send("CUSTOMER");
});

customerRouter.post("/customer", function (req, res) {
     res.send(JSON.stringify(req.body));
});

module.exports = customerRouter;
