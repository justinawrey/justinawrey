const sgMail = require("@sendgrid/mail");

exports.handler = async event => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // log some shit to Netlify console
  const { name, email, subject, message } = JSON.parse(event.body);
  console.log(`Email from ${email}`);
  console.log(`[${name}] ${subject}`);
  console.log(message);

  // goes to me
  const first = sgMail.send({
    to: "awreyjustin@gmail.com",
    from: email,
    subject: `[${name}] ${subject}`,
    text: message
  });

  // goes to sender
  const second = sgMail.send({
    to: email,
    from: "donotreply@justinawrey.com",
    subject: "Thank you",
    text:
      "I've received your message and will get back to you as soon as possible."
  });

  return Promise.all([first, second]).then({
    statusCode: 200,
    body: "success"
  });
};
