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
  return sgMail
    .send({
      to: "awreyjustin@gmail.com",
      from: "donotreply@justinawrey.com",
      cc: email,
      templateId: "d-e6cd8943e1bf4d509427c7a102cb1240",
      dynamic_template_data: {
        subject,
        message
      }
    })
    .then(
      () => ({
        statusCode: 200,
        body: "success"
      }),
      reason => {
        console.log(reason);
        return {
          statusCode: 500,
          body: "something went wrong"
        };
      }
    );
};
