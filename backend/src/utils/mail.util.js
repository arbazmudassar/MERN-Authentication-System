export function generateOTP(){
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getOTPhtml(otp){
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                margin-top: 50px;
            }
        </style>
    </head>
    <body>
        <h1>OTP Verification</h1>
        <p>Your OTP is: ${otp}</p>
    </body>
    </html>`;
}