const { email, apppassword, DEPLOYED_SERVER, DEPLOYED_CLIENT } = process.env
module.exports = {
    sendMail : async (foundUser, routeName, tokenStatus) => {
        // sending verification via mail
        const nodemailer = require("nodemailer");
        let transporter = nodemailer.createTransport({
            service : 'gmail',
            port: 465,
            secure: true,
            auth: {
                user: email,
                pass: apppassword,
            },
        });
        await transporter.sendMail({
            from: `"Home Seek Team" <${email}>`,
            to: foundUser.email, 
            subject: "credentials verification", 
            html: tokenStatus === 'confirm' 
            ?  
             `<p>
                Hello mr/mrs <b>${foundUser.firstName +" "+ foundUser.lastName}</b>
                welcome to Home Seek. click 
                <b><a href="${DEPLOYED_SERVER}/${routeName}/${foundUser.accessToken}"> here</a></b>
              </p>`
            : ( tokenStatus === 'temp' ? 
                `<p>
                    Hello mr/mrs <b>${foundUser.firstName +" "+ foundUser.lastName}</b>
                    welcome to Home Seek. click
                    <form action='${DEPLOYED_CLIENT}/${routeName}/${foundUser.tempToken}' method='POST'>
                        <input type='submit' value='here'/> 
                    </form>
                </p>` : null
            )
            
        });
        console.log(`Message sent to ${foundUser.firstName}`);
    }
}