export const handleSendEmailToMember = async (payload) => {
  const { email, name, url, senderEmail } = payload;
  try {
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      body: JSON.stringify({
        from: senderEmail,
        to: [
          {
            email: email,
            name: name,
          },
        ],
        subject: "Invite to join the team",
        content: [
          {
            type: "text/html",
            value: `<p>Hi ${name},</p>
                    <p>You have been invited to join the team. Please click the link below to join the team.</p>
                    <p><a href="${url}">${url}</a></p>
                    <p>Thanks</p>                  
            `,
          },
        ],
      }),
      headers: {
        Authorization:
          "Bearer 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",
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    console.log(res.text());
  } catch (ex) {
    throw new Error(ex);
    console.log("Error sending email", ex.message);
  }
};
