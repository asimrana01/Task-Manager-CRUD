const transporter = require('./mailer');

async function sendOtpEmail(email, otp) {
  await transporter.sendMail({
    from: '"Task Manager" <no-reply@taskmanager.com>',
    to: email,
    subject: 'Your Password Reset OTP',
    text: `Your OTP is ${otp}. It expires in 10 minutes.`
  });
}

module.exports = sendOtpEmail;