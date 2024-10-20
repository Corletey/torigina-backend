import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verify SMTP connection
transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP connection error:", error);
  } else {
    console.log("SMTP connection is ready to take our messages");
  }
});

export const contactForm = async (req, res) => {
  const { name, phone, email, message } = req.body;

  const mailOptions = {
    from: `${name} <${process.env.SMTP_USER}>`,
    to: "info@torigina.com",
    replyTo: email,
    subject: "New Contact Form Submission",
    text: `
Name: ${name}
Phone: ${phone}
Email: ${email}

Message:
${message}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    console.log("Attempting to send email...");
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Detailed error:", error);
    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
};
