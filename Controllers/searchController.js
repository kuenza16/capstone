const Withdrawal = require('../models/withdrawalModel');
const Deposit = require('../models/depositModel');
const ATS = require('../models/atsModel');
const DollarSelling = require('../models/dollerSellingModel');
const RTGS = require('../models/rtgsModel');
const SwiftModel = require('../models/swiftModel')
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const otpStore = new Map(); // In-memory storage for OTPs

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your SMTP service
  auth: {
      user: process.env.EMAIL_USER, // Replace with your email
      pass: process.env.EMAIL_PASS, // Replace with your email password
  },
});

const generateOTP = (email) => {
    const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
    const expires = Date.now() + 300000; // OTP expires in 5 minutes
    otpStore.set(email, { otp, expires });
    return otp; // Return the generated OTP
};

const verifyOTP = (email, otp) => {
    const record = otpStore.get(email);
    if (!record) return { success: false, message: 'OTP not found' };

    if (Date.now() > record.expires) {
        otpStore.delete(email); // Remove expired OTP
        return { success: false, message: 'OTP has expired' };
    }

    if (record.otp !== otp) {
        return { success: false, message: 'Invalid OTP' };
    }

    otpStore.delete(email); // Remove the OTP after successful verification
    return { success: true };
};

exports.getTransactionsByAccountNumber = async (req, res) => {
    const { accountNumber } = req.body;

    try {
        // Fetch all withdrawals for the account number
        const withdrawals = await Withdrawal.find({ accountNumber });

        // Fetch all deposits for the account number
        const deposits = await Deposit.find({ accountNumber });

        const ats = await ATS.find({ accountNumber });
        const dollarselling = await DollarSelling.find({ accountNumber });
        const rtgs = await RTGS.find({ accountNumber });

        const swift = await SwiftModel.find({accountNumber});

        if (!withdrawals.length && !deposits.length && !ats.length && !dollarselling.length && !rtgs.length && !swift.length) {
            return res.status(404).json({ message: 'No transactions found for this account number' });
        }

        // Return both withdrawals and deposits
        res.json({ withdrawals, deposits, ats, dollarselling, rtgs, swift });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getDetailTransactionsByAccountNumber = async (req, res) => {
    const { accountNumber } = req.body;

    try {
        // Fetch all withdrawals for the account number
        const withdrawals = await Withdrawal.find({ accountNumber });

        // Fetch all deposits for the account number
        const deposits = await Deposit.find({ accountNumber });

        if (!withdrawals.length && !deposits.length) {
            return res.status(404).json({ message: 'No transactions found for this account number' });
        }

        // Return both withdrawals and deposits
        res.json({ withdrawals, deposits });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteTransactionById = async (req, res) => {
  const { id } = req.params;
  const { email, otp } = req.body; // Extract email and OTP from request

  // Check if OTP is valid
  if (!otp || otp !== otpStore[email]) {
      return res.status(400).json({ message: 'Invalid or missing OTP' });
  }

  console.log(`Deleting transaction with ID: ${id}`);

  try {
      const deposit = await Deposit.findById(id.trim());
      const withdrawal = await Withdrawal.findById(id.trim());
      const ats = await ATS.findById(id.trim());
      const dollarselling = await DollarSelling.findById(id.trim());
      const rtgs = await RTGS.findById(id.trim());
      const swift = await SwiftModel.findById(id.trim());


      if (!withdrawals.length && !deposits.length && !ats.length && !dollarselling.length && !rtgs.length && !swift.length) {
          return res.status(404).json({ message: 'Transaction not found' });
      }

      
        const userEmail = deposit ? deposit.email: withdrawal ? withdrawal.email : ats ? ats.email: rtgs? rtgs.email : dollarselling ? dollarselling.email : swift.email;

        const Name = deposit  ? deposit.Name : withdrawal ? withdrawal.Name : ats ? ats.Name : rtgs ? rtgs.Name : dollarselling ? dollarselling.Name : swift.name;

        const amount = deposit ? deposit.amount : withdrawal ? withdrawal.amount : ats ? ats.amount : rtgs ? rtgs.amount : dollarselling ? dollarselling.amount : swift.amount;

        const accountNumber = deposit ? deposit.accountNumber : withdrawal ? withdrawal.accountNumber  : ats ? ats.accountNumber : rtgs ? rtgs.accountNumber : dollarselling ? dollarselling.accountNumber : swift.accountNumber;


      if (deposit) {
          await Deposit.findByIdAndDelete(id.trim());
      }
      if (withdrawal) {
          await Withdrawal.findByIdAndDelete(id.trim());
      }
      if (ats){
        await ATS.findById(id.trim());
      }
      if(dollarselling){
        await DollarSelling.findById(id.trim());
      }
      if(rtgs){
        await RTGS.findById(id.trim());
      }
      if (swift){
        await SwiftModel.findById(id.trim());
      }
      

      // Email confirmation after deletion
      const mailOptions = {
          from: process.env.EMAIL_USER,
          to: userEmail,
          subject: 'Transaction Canceled',
          html: `
          <h2>Transaction Canceled</h2>
          <p>Dear <strong>${Name}</strong>, your transaction has been successfully canceled.</p>
          <p>Details:</p>
          <ul>
              <li>Amount: ${amount}</li>
              <li>Account Number: ${accountNumber}</li>
          </ul>
          <p>Thank you for using our service!</p>
          `,
      };

      await transporter.sendMail(mailOptions);
      delete otpStore[email]; // Clear the OTP after successful deletion

      res.status(200).json({ message: 'Transaction canceled successfully' });
  } catch (error) {
      console.error('Error canceling transaction:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

// Function to send OTP via email
exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  // Generate OTP and store it temporarily
  const otp = generateOTP();
  otpStore[email] = otp; // Store OTP for verification

  // Send the OTP to the user's email
  const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Transaction Deletion',
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