const path = require('path')

exports.getToken = (req,res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'token_option.html'))
};

exports.getBookOnlineToken = (req,res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'online_token_options.html'))
};

exports.getTokenOptions = (req,res)=>{
    res.sendFile(path.join(__dirname, '../', 'views', 'book_token_options.html'))
};

exports.getCashToken = (req,res)=>{
    res.sendFile(path.join(__dirname,'../','views','token_selection.html'))
};

exports.getDepositToken = (req,res) =>{
    res.sendFile(path.join(__dirname, '../','views','cash_Deposit.html'))
}

exports.getWithdrawalToken = (req,res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'cash_withdrawal.html'))
}

exports.getRTGS = (req,res) => {
    res.sendFile(path.join(__dirname,'../','views','rtgs.html'))
}
exports.getswift_edu = (req,res) =>{
    res.sendFile(path.join(__dirname,'../','views','swift_edu.html'))
}

exports.getswift = (req,res) =>{
    res.sendFile(path.join(__dirname,'../','views', 'swift.html'))
}

exports.getats = (req,res) =>{
    res.sendFile(path.join(__dirname,'../','views', 'ATS.html'))
}
exports.getdollarSelling = (req,res) =>{
    res.sendFile(path.join(__dirname,'../','views', 'DollarSelling.html'))
}

exports.getcheck_token = (req,res) =>{
    res.sendFile(path.join(__dirname, '../','views','check_token.html'))
}