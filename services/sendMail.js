const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const sendMail = (email, uniqueString) => {
    const myOAuth2Client = new OAuth2(
        process.env.GOOGLE_CLIENTID,
        process.env.GOOGLE_SECRET,
        "https://developers.google.com/oauthplayground"
    );

    myOAuth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESHTOKEN,
    });

    const accessToken = myOAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "danielcerianatest@gmail.com",
            type: "OAuth2",
            clientId: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_SECRET,
            refreshToken: process.env.GOOGLE_REFRESHTOKEN,
            accessToken: accessToken,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const mailOptions = {
        // mejorar
        from: "danielcerianatest@gmail.com",
        to: email,
        subject: "Validacion de mail",
        html: `
        <div>
        <h1><a href=http://localhost:4000/api/users/auth/verifyEmail/${uniqueString}>CLICK </a> para validar tu cuenta</h1>
        </div>
        `,
    };

    transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log(error);
        } else {
            console.log("mensaje enviado");
        }
    });
};

module.exports = sendMail;