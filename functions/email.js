const sgMail = require("@sendgrid/mail");

exports.handler = async event => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  console.warn(process.env.SENDGRID_API_KEY);

  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { name, email, subject, message } = JSON.parse(event.body);

  // goes to me
  sgMail
    .send({
      to: "awreyjustin@gmail.com",
      from: "noreply@justinawrey.com",
      subject: `[${name} | ${email}] ${subject}`,
      text: message
    })
    .then(() => ({
      statusCode: 200,
      body: "success"
    }))
    .catch(() => ({
      statusCode: 500,
      body: "failure"
    }));

  // goes to sender
  sgMail
    .send({
      to: email,
      from: "noreply@justinawrey.com",
      subject: "Thanks for the inquiry!",
      text:
        "I've received your message and will get back to you as soon as possible.  Please do not respond to this email."
    })
    .then(() => ({
      statusCode: 200,
      body: "success"
    }))
    .catch(() => ({
      statusCode: 500,
      body: "failure"
    }));
};
