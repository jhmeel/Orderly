import Config from '../config.js';
const sys_name = Config.NAME;

export const welcomeMsg = {

    subject: 'Welcome Aboard!',
    body: (username) => {
        return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome aboard!</title>
  </head>
  <body style="background-color: #f7f7f7; font-family: sans-serif; padding: 30px;">
    <div style="background-color: white; border-radius: 5px; box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1); max-width: 500px; margin: 0 auto; padding: 30px;">
      <h1 style="color: #0078FF; margin-bottom: 20px;">Welcome to our app!</h1>
      <p style="font-size: 18px;">Hi ${username},</p>
      <p style="font-size: 18px;">Thank you for signing up for our app. We are excited to have you on board!</p>
      <p style="font-size: 18px;">To get started, you can:</p>
      <ul style="font-size: 18px; padding-left: 30px;">
        <li>Explore our app features</li>
        <li>Update your profile information</li>
        <li>Contact us if you have any questions</li>
      </ul>
      <p style="font-size: 18px;">If you have any questions or need any help, feel free to contact us at any time.</p>
      <p style="font-size: 18px;">Thank you,</p>
      <hr>
      <p style="font-size: 18px;">The ${sys_name} Team</p>
    </div>
  </body>
</html>

`

    },
}
