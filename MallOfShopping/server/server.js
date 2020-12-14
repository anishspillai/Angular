const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// create a new Express application instance
const app = express();

//configure the Express middleware to accept CORS requests and parse request body into JSON
app.use(bodyParser.json());
app.use(cors())

//start application server on port 3000
app.listen(8000, () => {
  console.log("The server started on port 8000");
});

// define a sendmail endpoint, which will send emails and response with the corresponding status
app.post("/api/sendEmail", (req, res) => {
  console.log("request came");
  let user = req.body;

  console.log(JSON.stringify(user))

  const mailOptions = {
  from: "Order Acknowledgment From Mall of Groceries",
  to: 'anish_sreeragom@yahoo.com',
  subject: "Order Acknowledgment - Mall of Groceries",
  html: "<h3 style='color: orangered; font-family: Trebuchet MS; font-style: italic'>We have received your order</h3> <br> " +
    "<p style='font-style: italic; font-family:Trebuchet MS'>" +
    "Thank you very much for placing the order. Kindly contact 0723980601, mallofgroceries@gmail.com for any enquiries" +
    "</p>"
}


  sendMail(user, mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.status(400);
      res.send({ error: "Failed to send email" });
    } else {
      console.log("Email has been sent f");
      res.send(info);
    }
  });
});

const sendMail = (user, mailOptions,  callback) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "mallofgroceries@gmail.com",
      pass: "Tullinge2#"
    }
  });

  transporter.sendMail(mailOptions, callback);
}
