
const cash_deposit = async (service, Name,email, accountNumber, amount, depositorName, contact,TPN , depositDate ,depositTime)=>{
    try {
        await axios.post('https://bankofbhutan.onrender.com/api/v1/deposits/send-otp', { email });
        
        // Prompt the user to enter the OTP
        const otp = prompt('Please enter the OTP sent to your email:');
        if (!otp) {
            alert('OTP is required to submit the form.');
            return;
        }
        const res = await axios({
            method:'POST',
            url : 'https://bankofbhutan.onrender.com/api/v1/deposits/deposit',
            data:{
                service,
                Name,
                email, 
                accountNumber, 
                amount, 
                depositorName,
                contact, 
                TPN , 
                depositDate ,
                depositTime,
                otp

            },
        })
        console.log(res)

        if (res.data.message === 'Deposit successfully submitted!'){
            alert('success', 'You will an Email')

            const ratingModal = new bootstrap.Modal(document.getElementById('ratingModal'));
            ratingModal.show();
            // window.setTimeout(()=>{
            //     location.assign('/onlinetoken')
            // },1500)
        }
    } catch (error) {
        console.log("error")
        
    }
}

document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault()
    const service = 'Cash Deposit'
    const Name = document.getElementById('name').value
    const email = document.getElementById('email').value 
    const accountNumber = document.getElementById('Acccountnumber').value 
    const amount = document.getElementById('amount').value
    const depositorName = document.getElementById('Depositorname').value
    const contact = document.getElementById('Contact').value
    const TPN = document.getElementById('TPN').value 
    const depositDate = document.getElementById('Date').value 
    const depositTime = document.getElementById('time-input').value

    const today = new Date().toISOString().split('T')[0];

    const timeParts = depositTime.split(':');
    const hour = parseInt(timeParts[0], 10);  
    const minute = parseInt(timeParts[1], 10);  

 
    const isValidTime = (hour >= 9 && hour < 13) || (hour >= 14 && hour < 17); 

    if (!isValidTime) {
        alert('Deposits appointments are not allowed during lunch hours (1:00 PM - 2:00 PM) and off-hours (5:00 PM - 8:59 AM).');
        return;
    }

    if(depositDate === today || depositDate<today ){
        alert('Deposits appointments cannot be created for today and Past.');
        return;
    }
    const depositDay = new Date(depositDate).getDay();

    if (depositDay === 0 || depositDay === 6) {
        alert('Deposits appointments are not allowed on weekends (Saturday and Sunday).');
        return;
    }


   
    if (!Name || !email || !accountNumber || !amount || !depositorName || !contact  || !depositDate || !depositTime) {
        alert('Please fill out all fields');
        return;
    }

    cash_deposit( service,
        Name,
        email, 
        accountNumber, 
        amount, 
        depositorName,
        contact, 
        TPN , 
        depositDate ,
        depositTime)

})
