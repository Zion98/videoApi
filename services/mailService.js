var nodemailer = require("nodemailer");

const sendMail = (to, emailSubject, message) => {
  var transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: `${process.env.SENDER_MAIL}`, // Add your gmail
      pass: `${process.env.SENDER_PASS}`, // Add your gmail password
    },
  });

  var mailOptions = {
    from: `TyVideos <${process.env.SENDER_MAIL}>`,
    to: `${to}`,
    subject: emailSubject,
    text: "TyVideos",
    html: `<!DOCTYPE html> <html>
      <head>
        <title></title>
        <link href="http://fonts.cdnfonts.com/css/rubik" rel="stylesheet" />
        <style>
          * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
          }
          div[style*="margin: 16px 0"] {
            margin: 0 !important;
          }
          table,
          td {
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
          }
          table {
            border-spacing: 0 !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            margin: 0 auto !important;
          }
          img {
            -ms-interpolation-mode: bicubic;
          }
          a {
            text-decoration: none;
            color: #14b8a6;
          }
          *[x-apple-data-detectors],
          .unstyle-auto-detected-links *,
          .aBn {
            border-bottom: 0 !important;
            cursor: default !important;
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
          }
          .a6S {
            display: none !important;
            opacity: 0.01 !important;
          }
          .im {
            color: inherit !important;
          }
          img.g-img + div {
            display: none !important;
          }
          @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
            u ~ div .email-container {
              min-width: 320px !important;
            }
          }
          @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
            u ~ div .email-container {
              min-width: 375px !important;
            }
          }
          @media only screen and (min-device-width: 414px) {
            u ~ div .email-container {
              min-width: 414px !important;
            }
          }
          table {
            margin: 20px 0 0;
          }
          tr td {
            padding: 15px 10px;
            text-align: right;
          }
          tr td:first-of-type {
            font-weight: 600;
            width: 40%;
            text-align: left;
          }
          th {
            background: #14b8a6;
            color: #ffffff;
            padding: 10px;
            font-size: 18px;
            font-weight: normal;
            border-radius: 10px 10px 0 0;
          }
          tr:nth-child(odd) {
            background-color: #eeeeee;
          }
        </style>
      </head>
      <body
        style="
          background: #e8e9e993;
          color: #2d303a;
          padding: 30px 0;
          font-family: 'Rubik', sans-serif;
        "
      >
        <div
          style="
            max-width: 600px;
            padding: 30px;
            margin: 0 auto;
            font-size: 14px;
            line-height: 1.5;
            background: #ffffff;
          "
        >
          <div style="text-align: center">
            <img
              src=""
              alt=""
              height="40px"
            />
          </div> 
          <div style="padding: 30px 0; border-bottom: 1px solid #797979">
            ${message}
            
            <p style="margin: 35px 0 0; font-size: 15px">
            Thanks for using TyVideos! <br />
            <strong>The Tyers</strong>
          </p>
        </div>
            </div>
       
          <p>
            If you have any questions, please call us at
            <a href="tel:"> (234) XXXX XXX XXXX</a> or email us at
            <a href="mailto:support@tyvideos.com">support@tyvideos.com.</a>
          </p>
          <p style="color: #ed0000">
            This is an auto-generated mail. Please do not reply.
          </p>
        </div>
        <p style="font-size: 14px; text-align: center; color: #797979">
          Copyright &copy;
          <script>
            document.write(new Date().getFullYear());
          </script>
          TyVideos. All rights reserved.
        </p>
      </body>
    </html>`,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
};

const sendOTP = (to, subject, message) => {
  var transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: `${process.env.SENDER_MAIL}`,
      pass: `${process.env.SENDER_PASS}`,
    },
  });

  var mailOptions = {
    from: `TyVideos <${process.env.SENDER_MAIL}>`,
    to: `${to}`,
    subject: subject,
    html: message,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
};

module.exports = { sendMail, sendOTP };
