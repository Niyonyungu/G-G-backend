export const welcomeEmailTemplate = (user, plainPassword, websiteUrl) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to Our Wedding Website</title>
      <style>
        body {
          font-family: 'Georgia', serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f7f7;
        }
        .container {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .header {
          background-color: #A65D57;
          color: white;
          text-align: center;
          padding: 30px 20px;
        }
        .header h1 {
          margin: 0;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 32px;
        }
        .content {
          padding: 30px;
        }
        .button {
          display: inline-block;
          background-color: #A65D57;
          color: white;
          text-decoration: none;
          padding: 12px 25px;
          border-radius: 5px;
          margin: 20px 0;
          font-family: 'Georgia', serif;
          font-size: 16px;
          text-align: center;
        }
        .details {
          background-color: #f9f7f7;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          padding: 20px;
          background-color: #f9f7f7;
          font-size: 12px;
          color: #777;
        }
        .divider {
          height: 1px;
          background-color: #eee;
          margin: 20px 0;
        }
        .role {
          color: #A65D57;
          font-weight: bold;
          text-transform: capitalize;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        tr:nth-child(even) {
          background-color: #f9f7f7;
        }
        td {
          padding: 12px 15px;
          border-bottom: 1px solid #eee;
        }
        tr:last-child td {
          border-bottom: none;
        }
        td:first-child {
          font-weight: bold;
          color: #666;
          width: 30%;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Gad & Gomez's Wedding</h1>
        </div>
        <div class="content">
          <p>Dear ${user.name || user.email.split('@')[0]},</p>
          <p>Welcome to our website! We're very excited to have you join us in celebrating our special day.</p>
          <p>Your account has been created as <span class="role">${user.role}</span> successfully.</p>
          
          <div class="details">
            <table>
              <tr>
                <td>Email:</td>
                <td>${user.email}</td>
              </tr>
              <tr>
                <td>Password:</td>
                <td>${plainPassword || 'Your chosen password'}</td>
              </tr>
            </table>
          </div>
          
          <p>To access your account, please click the button below:</p>
          <div style="text-align: center;">
            <a href="${websiteUrl}/login" class="button">Login to Your Account</a>
          </div>
          
          <div class="divider"></div>
          
          <p>You can now RSVP to our events, view wedding details, and share your memories with us.</p>
          <p>If you need any help, please don't hesitate to contact us.</p>
          <p>+250784998214 / vainqueurmg@gmail.com</p>
          <p>We look forward to celebrating with you!</p>
        </div>
        <div class="footer">
          <p>This email was sent to ${user.email}.</p>
          <p>If you didn't register on our wedding website, please ignore this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};