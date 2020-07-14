const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// create a new Express application instance
const app = express();

app.use(cors())

app.options('*', cors())

//configure the Express middleware to accept CORS requests and parse request body into JSON
app.use(bodyParser.json());

//start application server on port 3000
app.listen(3000, () => {
  console.log("The server started on port 8000");
});

// define a sendmail endpoint, which will send emails and response with the corresponding status
app.post("/api/sendEmail", (req, res) => {

  res.set('Access-Control-Allow-Origin', '*');

  let user = req.body;

  console.log("Will send the email now")

  const mailOptions = {
    from: "Order Acknowledgment From Mall of Groceries",
    to: user.email,
    subject: "Order Acknowledgment - Mall of Groceries",
    html: "<p font-family: Trebuchet MS; font-style: italic'>Dear Customer!</p>" +
      "<p style='font-style: italic; font-family:Trebuchet MS; color: darkorchid'>" +
      "Thank you very much for placing the order. Kindly contact 0761543749/ 0723980601, mallofgroceries@gmail.com for any enquiries" +
      "</p> </br>" +
      "Thanks and Best Regards, <br>" +
      "Mall Of Groceries Team"
}


  sendMail(user, mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.status(400);
      res.send({ error: "Failed to send email" });
    } else {
      console.log("Email has been sent");
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
      user: "mallofgroceriesorder@gmail.com",
      pass: "OrderPlaced1#"
    }
  });

  transporter.sendMail(mailOptions, callback);
}
