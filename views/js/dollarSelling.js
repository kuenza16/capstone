const DS = async (service, Name , email,accountNumber,contact,dsDate,dsTime)=>{
    try {
        await axios.post('https://bankofbhutan.onrender.com/api/v1/ds/send-otp', { email });
        
        // Prompt the user to enter the OTP
        const otp = prompt('Please enter the OTP sent to your email:');
        if (!otp) {
            alert('OTP is required to submit the form.');
            return;
        }

        const res = await axios({
            method:'POST',
            url: 'https://bankofbhutan.onrender.com/api/v1/ds/dollarSelling',
            data:{
                service,
                Name,
                email,
                accountNumber,
                contact,
                dsDate,
                dsTime,
                otp
            },
            

        })
        console.log(res);
        if (res.data.message === 'Dollar Selling/FC Transfer/ Travel Agent/ CBC Token successfully booked!'){
            alert('success', 'You will receive an Email shortly.')
            window.setTimeout(()=>{
                location.assign('/onlinetoken')
            },1500)
        }

    } catch (error) {
        console.log(error);
        
    }
}

document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault()
    const service = 'Dollar Selling/FC Transfer/ Travel Agent/ CBC'
    const Name = document.getElementById('name').value
    const email = document.getElementById('email').value 
    const accountNumber = document.getElementById('Acccountnumber').value 
    const contact = document.getElementById('contact').value
    const dsDate = document.getElementById('Date').value 
    const dsTime = document.getElementById('time-input').value

    const today = new Date().toISOString().split('T')[0];

    const timeParts = dsTime.split(':');
    const hour = parseInt(timeParts[0], 10);  
    const minute = parseInt(timeParts[1], 10);  

 
    const isValidTime = (hour >= 9 && hour < 13) || (hour >= 14 && hour < 17); 

    if (!isValidTime) {
        alert('Dollar Selling/FC Transfer/ Travel Agent/ CBC are not allowed during lunch hours (1:00 PM - 2:00 PM) and off-hours (5:00 PM - 8:59 AM).');
        return;
    }

    if(dsDate === today || dsDate<today ){
        alert('Dollar Selling/FC Transfer/ Travel Agent/ CBC appointments cannot be created for today and Past.');
        return;
    }
    const dsDay = new Date(dsDate).getDay();

    if (dsDay === 0 || dsDay === 6) {
        alert('Dollar Selling/FC Transfer/ Travel Agent/ CBCs are not allowed on weekends (Saturday and Sunday).');
        return;
    }


   
    if (!Name || !email || !accountNumber || !contact || !dsDate || !dsTime) {
        alert('Please fill out all fields');
        return;
    }
    DS(service,Name,email,accountNumber,contact,dsDate,dsTime)

})