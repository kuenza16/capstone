
const cash_withdrawal = async (service, Name,email, accountNumber, amount,contact, withdrawalDate ,WithdrawalTime)=>{
    try {
        await axios.post('https://bankofbhutan.onrender.com/api/v1/withdrawals/send-otp', { email });
        
        // Prompt the user to enter the OTP
        const otp = prompt('Please enter the OTP sent to your email:');
        if (!otp) {
            alert('OTP is required to submit the form.');
            return;
        }
        const res = await axios({
            method:'POST',
            url : 'https://bankofbhutan.onrender.com/api/v1/withdrawals/withdrawal',
            data:{
                service,
                Name,
                email, 
                accountNumber, 
                amount, 
                contact, 
                withdrawalDate ,
                WithdrawalTime,
                otp

            },
        })
        console.log(res)

        if (res.data.message === 'Withdrawal successfully submitted!'){
            alert('success', 'You will an Email')
            
            window.setTimeout(()=>{
                location.assign('/onlinetoken')
            },1500)
        }
    } catch (error) {
        console.log("error")
        
    }
}

document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault()
    const service = 'Cash Withdrawal'
    const Name = document.getElementById('name').value
    const email = document.getElementById('email').value 
    const accountNumber = document.getElementById('Acccountnumber').value 
    const amount = document.getElementById('amount').value
    const contact = document.getElementById('Contact').value
    const withdrawalDate = document.getElementById('Date').value 
    const withdrawalTime = document.getElementById('time-input').value
    
    const today = new Date().toISOString().split('T')[0];

    const timeParts = withdrawalTime.split(':');
    const hour = parseInt(timeParts[0], 10);  
    const minute = parseInt(timeParts[1], 10);  

 
    const isValidTime = (hour >= 9 && hour < 13) || (hour >= 14 && hour < 17); 

    if (!isValidTime) {
        alert('withdrawal appointments are not allowed during lunch hours (1:00 PM - 2:00 PM) and off-hours (5:00 PM - 8:59 AM).');
        return;
    }

    if(withdrawalDate === today || withdrawalDate<today ){
        alert('Withdrawal appointments cannot be created for today and Past.');
        return;
    }
    const withdrawalDay = new Date(withdrawalDate).getDay();

    if (withdrawalDay === 0 || withdrawalDay === 6) {
        alert('withdrawal appointments are not allowed on weekends (Saturday and Sunday).');
        return;
    }

    cash_withdrawal( service,
        Name,
        email, 
        accountNumber, 
        amount, 
        contact,  
        withdrawalDate ,
        withdrawalTime)

})