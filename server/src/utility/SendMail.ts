import nodemailer from "nodemailer";

async function SendMail(userMail: string, mailSubject: string, mailText: string): Promise<void> {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const message = {
      from: process.env.GMAIL_ADDRESS,
      to: userMail,
      subject: mailSubject,
      //   text: mailText,
      html: mailText,
    };

    const info = await transporter.sendMail(message);

    console.log(`Email sent ${userMail} successfully!`);
    console.log("INFO:", info);
  } catch (error) {
    console.error("Error while sending mail", error);
  }
}

export default SendMail;
