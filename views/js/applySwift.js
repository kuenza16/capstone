const swift_submit = async (
    service,
    Reference,
    approval,
    cid,
    customerName,
    customerAddress,
    BIC,
    remit,
    product,
    issueDate,
    expiryDate,
    valueDate,
    currency,
    amount,
    bankName,
    bankAddress,
    swiftCode,
    name,
    accountNumber,
    address,
    purpose,
    declarationNo,
    charge,
    education,
    swiftDate,
    swiftTime,
    institutionName,
    institutionAddress,
    course,
    DateofCommencement,
    duration,
    DateofTravel,
    travelTime,
    TuitionFeesCurrency,
    TuitionFeesAmount,
    TuitionFees,
    StipendCurrency,
    StipendAmount,
    Stipendpayment,
    allowanceCurrency,
    allowanceAmount,
    allowance,
    TotalAmount,
    Accountno,
    Contact,
    Place,
    email
) => {
    try {
        // Send OTP to the user's email
        await axios.post('https://bankofbhutan.onrender.com/api/v1/swift/send-otp', { email });
        
        // Prompt the user to enter the OTP
        const otp = prompt('Please enter the OTP sent to your email:');
        if (!otp) {
            alert('OTP is required to submit the form.');
            return;
        }

        // Attempt to submit the Swift data along with the OTP
        const res = await axios.post('https://bankofbhutan.onrender.com/api/v1/swift/swift', {
            service,
            Reference,
            approval,
            cid,
            customerName,
            customerAddress,
            BIC,
            remit,
            product,
            issueDate,
            expiryDate,
            valueDate,
            currency,
            amount,
            bankName,
            bankAddress,
            swiftCode,
            name,
            accountNumber,
            address,
            purpose,
            declarationNo,
            charge,
            education,
            swiftDate,
            swiftTime,
            institutionName,
            institutionAddress,
            course,
            DateofCommencement,
            duration,
            DateofTravel,
            travelTime,
            TuitionFeesCurrency,
            TuitionFeesAmount,
            TuitionFees,
            StipendCurrency,
            StipendAmount,
            Stipendpayment,
            allowanceCurrency,
            allowanceAmount,
            allowance,
            TotalAmount,
            Accountno,
            Contact,
            Place,
            email,
            otp
            
            
        });
        console.log(res);

        if (res.data.message === 'Swift transaction submitted successfully') {
            alert('Success! You will receive an email shortly.');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        } else {
            alert(response.data.message || 'Submission failed. Please try again.');
        }
    } catch (error) {
        console.error("Error submitting Swift data: ", error);
        alert('Failed to submit Swift data, please try again later.');
    }
};
document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault();

    const service = 'Swift';
    const Reference =document.getElementById('Reference').value;
    const approval = document.getElementById('approval').value;
    const cid = document.getElementById('cid').value;
    const customerName = document.getElementById('customerName').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const BIC = document.getElementById('BIC').value;
    const remit = document.getElementById('remit').value;
    const product = document.getElementById('product').value;
    const issueDate = document.getElementById('issueDate').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const valueDate = document.getElementById('valueDate').value;
    const currency = document.getElementById('currency').value;
    const amount = document.getElementById('amount').value;
    const bankName = document.getElementById('bankName').value;
    const bankAddress = document.getElementById('bankAddress').value;
    const swiftCode = document.getElementById('swiftCode').value;
    const name = document.getElementById('name').value;
    const accountNumber = document.getElementById('accountNumber').value;
    const address = document.getElementById('address').value;
    const purpose = document.querySelector('input[name="payment"]:checked').value;
   
    let declarationNo = null;
    if (purpose === 'Advance Payment/Final Payment'){
        declarationNo = document.getElementById('declarationNo').value;
    }
   
    const charge = document.querySelector('input[name="charges"]:checked').value;
    const education =  document.querySelector('input[name="education"]:checked').value;
    const swiftDate = document.getElementById('date-input').value;
    const swiftTime = document.getElementById('time-input').value;

    let institutionName = null;
    let institutionAddress = null;
    let course = null;
    let DateofCommencement = null;
    let duration = null;
    let DateofTravel = null;
    let travelTime = null;
    let TuitionFeesCurrency = null;
    let TuitionFeesAmount = null;
    let TuitionFees = null;
    let StipendCurrency = null;
    let StipendAmount = null;
    let Stipendpayment = null;
    let allowanceCurrency = null;
    let allowanceAmount = null;
    let allowance = null;
    let TotalAmount = null;
    let Accountno = null;
    let Contact = null;
    let Place = null;

    if(education === 'Yes'){
         institutionName = document.getElementById('institutionName').value;
         institutionAddress = document.getElementById('institutionAddress').value;
         course = document.getElementById('course').value;
         DateofCommencement = document.getElementById('DateofCommencement').value;
         duration = document.getElementById('duration').value;
         DateofTravel = document.getElementById('DateofTravel').value;
         travelTime = document.getElementById('travelTime').value;
         TuitionFeesCurrency = document.getElementById('TuitionFeesCurrency').value=currency;
         TuitionFeesAmount = document.getElementById('TuitionFeesAmount').value;
         TuitionFees = document.querySelector('input[name="TuitionFees"]:checked').value;
         StipendCurrency = document.getElementById('StipendCurrency').value=currency;
         StipendAmount = document.getElementById('StipendAmount');
         Stipendpayment =  document.querySelector('input[name="Stipendpayment"]:checked').value;
         allowanceCurrency = document.getElementById('allowanceCurrency').value=currency;
         allowanceAmount = document.getElementById('allowanceAmount').value;
         allowance = document.querySelector('input[name="allowance"]:checked').value;
         TotalAmount = document.getElementById('TotalAmount').value = TuitionFeesAmount + StipendAmount + allowanceAmount ;
         Accountno = document.getElementById('Accountno').value =accountNumber;
         Contact = document.getElementById('Contact').value;
         Place = data.address;

    }
    const email = document.getElementById('email').value;

    const today = new Date().toISOString().split('T')[0];
    const timeParts = swiftTime.split(':');
    const hour = parseInt(timeParts[0], 10);
    const minute = parseInt(timeParts[1], 10);

    // Validating time of deposit
    const isValidTime = (hour >= 9 && hour < 13) || (hour >= 14 && hour < 17);
    if (!isValidTime) {
        alert('SWIFT transactions are not allowed during lunch hours (1:00 PM - 2:00 PM) and outside working hours (9:00 AM - 5:00 PM).');
        return;
    }

    // Validating date of deposit
    if (swiftDate === today || swiftDate < today) {
        alert('swift appointments cannot be created for today or a past date.');
        return;
    }

    const swiftDay = new Date(swiftDate).getDay();
    if (swiftDay === 0 || swiftDay === 6) {
        alert('swift appointments are not allowed on weekends (Saturday and Sunday).');
        return;
    }

    swift_submit(
        service,
            Reference,
            approval,
            cid,
            customerName,
            customerAddress,
            BIC,
            remit,
            product,
            issueDate,
            expiryDate,
            valueDate,
            currency,
            amount,
            bankName,
            bankAddress,
            swiftCode,
            name,
            accountNumber,
            address,
            purpose,
            declarationNo,
            charge,
            education,
            swiftDate,
            swiftTime,
            institutionName,
            institutionAddress,
            course,
            DateofCommencement,
            duration,
            DateofTravel,
            travelTime,
            TuitionFeesCurrency,
            TuitionFeesAmount,
            TuitionFees,
            StipendCurrency,
            StipendAmount,
            Stipendpayment,
            allowanceCurrency,
            allowanceAmount,
            allowance,
            TotalAmount,
            Accountno,
            Contact,
            Place,
            email,
          
    );

})
