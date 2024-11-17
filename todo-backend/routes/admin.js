const express = require("express");
const router = express.Router();
const bodyParser =require('body-parser');

router.use(bodyParser.urlencoded());

router.get("/add-product", (req, res, next) => {
 
  res.send(
    '<form action="http://localhost:3000/admin/store-product" method="POST"><h1>Add Product</h1><input type="text" name="title" /><input type="submit" value="submit" /> </form>'
  );
});
router.post("/store-product", (req, res, next) => {
  console.log("form data", req.body);
  res.send("<b>product submited!</b>");
});

module.exports = router;