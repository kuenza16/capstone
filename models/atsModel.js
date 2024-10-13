const mongoose = require('mongoose');

const atsSchema = new mongoose.Schema({
    service: {
        type: String,
        required: true,
        enum: ['ATS/DSA'],  // Assuming this service will have only one type
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
    contact: {
        type: Number,
        required: true,
        
    },
    atsDate:{
        type: Date,
        require:true

    },
    atsTime: {
        type:String,
        require:true

    },
    token: { 
        type: String, 
        unique: true 
    }, 
}, { timestamps: true });

// Export the model
const ATS = mongoose.model('ats', atsSchema);
module.exports = ATS;
