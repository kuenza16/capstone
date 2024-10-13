// models/Deposit.js
const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
    service: {
        type: String,
        required: true,
        enum: ['Cash Deposit'],  // Assuming this service will have only one type
    },
    Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']  // Basic email validation
    },
    accountNumber: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: [1, 'Amount must be greater than zero']
    },
    depositorName: {
        type: String,
        required: true
    },
    TPN: {
        type: String,
        
    },
    contact: {
        type: String,
        required: true,
        // match: [/^\d{10}$/, 'is invalid']  // Assuming it's a 10-digit number
    },
    depositDate: {
        type: Date,
        required: true
    },
    depositTime: {
        type: String,
        required: true
    },
    token: { 
        type: String, 
        unique: true 
    }, 
}, { timestamps: true });

// Export the model
const Deposit = mongoose.model('Deposit', depositSchema);
module.exports = Deposit;
