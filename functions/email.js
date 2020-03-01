const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async event => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  console.warn(event);

  // sgMail
  //   .send({
  //     to: "awreyjustin@gmail.com",
  //     from: "no.reply@justinawrey.com",
  //     subject,
  //     text
  //   })
  //   .then(() => ({
  //     statusCode: 200,
  //     body: "success"
  //   }))
  //   .catch(() => ({
  //     statusCode: 500,
  //     body: "failure"
  //   }));
};
