const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async event => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  console.warn(JSON.parse(event.body));
  const { name, email, subject, message } = JSON.parse(event.body);
  console.warn("name", name);
  console.warn("email", email);
  console.warn("subject", subject);
  console.warn("message", message);

  // sgMail
  //   .send({
  //     to: "awreyjustin@gmail.com",
  //     from: "noreply@justinawrey.com",
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
