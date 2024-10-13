const swiftModel = require('../models/swiftModel');
const nodemailer =  require('nodemailer');
const crypto = require('crypto');
const otpStore = {};

const generateOTP = (email) => {
    const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
    const expires = Date.now() + 300000; // OTP expires in 5 minutes
    otpStore[email] = { otp, expires };

    return otp; // Return the generated OTP
};


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,      // Your email from environment variables
        pass: process.env.EMAIL_PASS       // App password from environment variables
    }
});

const generateCustomToken = async (swiftDate) =>{
    const formattedDate = new Date(swiftDate).toISOString().split('T')[0].replace(/-/g, '');

    const lastswift = await swiftModel.findOne({
        token: { $regex: `^OST${formattedDate}` } // Match tokens starting with ODT + formattedDate (YYYYMMDD)
    })
    .sort({ token: -1 }) // Sort by token in descending order
    .exec();

    let uniqueNumber = 1; // Default starting number

    if (lastswift) {
        // Extract the unique number from the last token (e.g., ODT2024100401 -> 01)
        const lastToken = lastswift.token;
        const lastUniqueNumber = parseInt(lastToken.slice(-2), 10); // Get the last 2 digits of the token

        // Increment the unique number
        uniqueNumber = lastUniqueNumber + 1;
    }
    const formattedUniqueNumber = uniqueNumber.toString().padStart(2, '0');

    // Construct the token: ODT + depositDate + formattedUniqueNumber
    const token = `OST${formattedDate}${formattedUniqueNumber}`;

    return token; // Return the unique token


}

exports.submitswift = async (req,res)=>{
    const {service,Reference,approval,cid,customerName,
        customerAddress,BIC,remit,product,issueDate,expiryDate,valueDate,
        currency,amount,bankName,bankAddress,swiftCode,name,accountNumber,
        address,purpose,declarationNo,charge,education,swiftDate,swiftTime,
        institutionName,institutionAddress,course,DateofCommencement,duration,
        DateofTravel,travelTime,TuitionFeesCurrency,TuitionFeesAmount,TuitionFees,
        StipendCurrency,StipendAmount,Stipendpayment,allowanceCurrency,
        allowanceAmount,allowance,TotalAmount,Accountno,Contact,Place,email,otp
    } = req.body;

    

    if (!otp || otp !== otpStore[email]?.otp) {
        return res.status(400).json({ message: 'Invalid or missing OTP' });
      }

    try {
        const token = await generateCustomToken(swiftDate);

        const swift = new swiftModel({
            service,Reference,approval,cid,customerName,
            customerAddress,BIC,remit,product,issueDate,expiryDate,valueDate,
            currency,amount,bankName,bankAddress,swiftCode,name,accountNumber,
            address,purpose,declarationNo,charge,education,swiftDate,swiftTime,
            institutionName,institutionAddress,course,DateofCommencement,duration,
            DateofTravel,travelTime,TuitionFeesCurrency,TuitionFeesAmount,TuitionFees,
            StipendCurrency,StipendAmount,Stipendpayment,allowanceCurrency,
            allowanceAmount,allowance,TotalAmount,Accountno,Contact,Place,email,token,otp
        });

        await swift.save();
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Swift Transaction Submitted',
            html: `
              <h2>Swift Transaction Submitted</h2>
              <p>Dear <strong>${customerName}</strong>, your Swift transaction has been successfully submitted.</p>
              <p>Details:</p>
              <ul>
                <li>Reference: ${token}</li>
                <li>Reference: ${Reference}</li>
                <li>Amount: ${amount} ${currency}</li>
                <li>Bank Name: ${bankName}</li>
                <li>Account Number: ${accountNumber}</li>
              </ul>
              <p>Thank you for using our service!</p>
            `,
          };
          await transporter.sendMail(mailOptions); // Send confirmation email

          delete otpStore[email]; // Clear the OTP after successful submission
      
          res.status(200).json({ message: 'Swift transaction submitted successfully' });
        
    } catch (error) {
        console.error('Error submitting Swift transaction:', error);
        res.status(500).json({ message: 'Server error' });
        
    }
}

exports.sendOTP = async (req, res) => {
    const { email } = req.body;
  
    // Generate OTP and store it temporarily
    const otp = generateOTP();
    otpStore[email] = { otp, expires: Date.now() + 600000 };
  
    // Send the OTP to the user's email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for Transaction',
        text: `Your OTP is ${otp}. It is valid for the next 10 minutes.`,
    };
  
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Error sending OTP' });
    }
  };

 