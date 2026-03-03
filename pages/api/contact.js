const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ message: "Name, email and message are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Paresh Novelty Website" <${process.env.SMTP_USER}>`,
      to: "akpadia09@gmail.com",
      subject:
        subject && subject.trim().length > 0
          ? `[Website Enquiry] ${subject}`
          : "[Website Enquiry] New contact message",
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "-"}

Message:
${message}
      `.trim(),
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Contact API error", error);
    return res
      .status(500)
      .json({ message: "Failed to send email. Please try again later." });
  }
}

