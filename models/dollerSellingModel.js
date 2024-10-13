const mongoose = require('mongoose')

const DollarSelling = new mongoose.Schema({
    service:{
        type:String,
        require:true,
        enum:['Dollar Selling/FC Transfer/ Travel Agent/ CBC']
    },
    Name : {
        type:String,
        require:true,
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
    dsDate:{
        type: Date,
        require:true

    },
    dsTime: {
        type:String,
        require:true

    },
    token: { 
        type: String, 
        unique: true 
    }, 
}, 
{ timestamps: true});

const DS = mongoose.model('DollarSelling',DollarSelling)
module.exports = DS;