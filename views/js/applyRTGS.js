const rtgs_submit = async (
    service,
    referralNumber,
    remitSum,
    charge,
    accountNumber,
    depositorName,
    depositorCID,
    depositorContact,
    depositorAddress,
    email,
    purpose,
    paymentTerms,
    declarationNumber,
    receiverName,
    receiverAccountNumber,
    receiverBankName,
    receiverBranchName,
    IFSCCode,
    
    receiverCID,
    rtgsDate,
    rtgsTime
) => {
    try {
        await axios.post('https://bankofbhutan.onrender.com/api/v1/rtgs/send-otp', { email });
        
        // Prompt the user to enter the OTP
        const otp = prompt('Please enter the OTP sent to your email:');
        if (!otp) {
            alert('OTP is required to submit the form.');
            return;
        }
        const res = await axios({
            method: 'POST',
            url: 'https://bankofbhutan.onrender.com/api/v1/rtgs/rtgs',
            data: {
                service,
                referralNumber,
                remitSum,
                charge,
                accountNumber,
                depositorName,
                depositorCID,
                depositorContact,
                depositorAddress,
                email,
                purpose,
                paymentTerms,
                declarationNumber,
                receiverName,
                receiverAccountNumber,
                receiverBankName,
                receiverBranchName,
                IFSCCode,
                receiverCID,
                rtgsDate,
                rtgsTime,
                otp
            },
        });
        console.log(res);

        if (res.data.message === 'RTGS successfully submitted!') {
            alert('Success', 'You will receive an Email shortly.');
            // const ratingModal = new bootstrap.Modal(document.getElementById('ratingModal'));
            // ratingModal.show();
            window.setTimeout(() => {
                location.assign('/onlinetoken');
            }, 1500);
        }
    } catch (error) {
        console.log("Error submitting RTGS: ", error);
        alert('Failed to submit RTGS, please try again later.');
    }
};

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Fetching the form values
    const service = 'RTGS';
    const referralNumber = document.getElementById('ReferralNumber').value;
    const remitSum = document.getElementById('RemitSum').value;
    const charge = document.getElementById('Charge').value;
    const accountNumber = document.getElementById('DebitToAccountNumber').value;
    const depositorName = document.getElementById('DepositorName').value;
    const depositorCID = document.getElementById('DepositorCID').value;
    const depositorContact = document.getElementById('DepositorContact').value;
    const depositorAddress = document.getElementById('DepositorAddress').value;
    const email = document.getElementById('EmailAddress').value;
    const purpose = document.querySelector('input[name="purpose"]:checked').value;
    let paymentTerms = null;
    if (purpose === 'Bill Payment') {
         paymentTerms = document.querySelector('input[name="flexRadioDefault"]:checked')?.value; // Optional chaining to prevent errors
    }
    const declarationNumber = document.getElementById('DeclarationNumber').value;
    const receiverName = document.getElementById('ReceiverName').value;
    const receiverAccountNumber = document.getElementById('ReceiverAccountNumber').value;
    const receiverBankName = document.getElementById('ReceiverBankName').value;
    const receiverBranchName = document.getElementById('ReceiverBranchName').value;
    const IFSCCode = document.getElementById('IFSCCode').value;
    const receiverCID = document.getElementById('ReceiverCID').value;
    const rtgsDate = document.getElementById('rtgsDate').value;
    const rtgsTime = document.getElementById('time-input').value;

    const today = new Date().toISOString().split('T')[0];
    const timeParts = rtgsTime.split(':');
    const hour = parseInt(timeParts[0], 10);
    const minute = parseInt(timeParts[1], 10);

    // Validating time of deposit
    const isValidTime = (hour >= 9 && hour < 13) || (hour >= 14 && hour < 17);
    if (!isValidTime) {
        alert('RTGS transactions are not allowed during lunch hours (1:00 PM - 2:00 PM) and outside working hours (9:00 AM - 5:00 PM).');
        return;
    }

    // Validating date of deposit
    if (rtgsDate === today || rtgsDate < today) {
        alert('RTGS appointments cannot be created for today or a past date.');
        return;
    }

    const depositDay = new Date(rtgsDate).getDay();
    if (depositDay === 0 || depositDay === 6) {
        alert('RTGS appointments are not allowed on weekends (Saturday and Sunday).');
        return;
    }

    // Ensuring all required fields are filled
    if (
        !referralNumber || !remitSum || !charge || !accountNumber || !depositorName ||
        !depositorCID || !depositorContact || !depositorAddress || !email || !purpose || (purpose === 'Bill Payment' && !paymentTerms)||
        !declarationNumber || !receiverName || !receiverAccountNumber || !receiverBankName ||
        !receiverBranchName || !IFSCCode || !receiverCID || !rtgsDate || !rtgsTime
    ) {
        alert('Please fill out all fields.');
        return;
    }

    // Call the async function to submit RTGS
    rtgs_submit(
        service,
        referralNumber,
        remitSum,
        charge,
        accountNumber,
        depositorName,
        depositorCID,
        depositorContact,
        depositorAddress,
        email,
        purpose,
        paymentTerms,
        declarationNumber,
        receiverName,
        receiverAccountNumber,
        receiverBankName,
        receiverBranchName,
        IFSCCode,
        receiverCID,
        rtgsDate,
        rtgsTime
    );
    console.log(service,
        referralNumber,
        remitSum,
        charge,
        accountNumber,
        depositorName,
        depositorCID,
        depositorContact,
        depositorAddress,
        email,
        purpose,
        paymentTerms,
        declarationNumber,
        receiverName,
        receiverAccountNumber,
        receiverBankName,
        receiverBranchName,
        IFSCCode,
        receiverCID,
        rtgsDate,
        rtgsTime);
});
