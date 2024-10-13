const ats = async(service,Name,email,accountNumber,contact,atsDate,atsTime)=>{
    try {
        await axios.post('https://bankofbhutan.onrender.com/api/v1/ats/send-otp', { email });
        
        // Prompt the user to enter the OTP
        const otp = prompt('Please enter the OTP sent to your email:');
        if (!otp) {
            alert('OTP is required to submit the form.');
            return;
        }
        const res = await axios({
            method:'POST',
            url : 'https://bankofbhutan.onrender.com/api/v1/ats/ATS',
            data:{
                service,
                Name,
                email, 
                accountNumber, 
                contact, 
                atsDate ,
                atsTime,
                otp
            },
        })
        console.log(res)
        if (res.data.message === 'ATS/DSA Token successfully booked!'){
            alert('success', 'You will receive an Email shortly.')
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
    const service = 'ATS/DSA'
    const Name = document.getElementById('name').value
    const email = document.getElementById('email').value 
    const accountNumber = document.getElementById('Acccountnumber').value 
    const contact = document.getElementById('contact').value
    const atsDate = document.getElementById('Date').value 
    const atsTime = document.getElementById('time-input').value

    const today = new Date().toISOString().split('T')[0];

    const timeParts = atsTime.split(':');
    const hour = parseInt(timeParts[0], 10);  
    const minute = parseInt(timeParts[1], 10);  

 
    const isValidTime = (hour >= 9 && hour < 13) || (hour >= 14 && hour < 17); 

    if (!isValidTime) {
        alert('ATS/DSA appointments are not allowed during lunch hours (1:00 PM - 2:00 PM) and off-hours (5:00 PM - 8:59 AM).');
        return;
    }

    if(atsDate === today || atsDate<today ){
        alert('ATS/DSA appointments cannot be created for today and Past.');
        return;
    }
    const atsDay = new Date(atsDate).getDay();

    if (atsDay === 0 || atsDay === 6) {
        alert('ATS/DSA appointments are not allowed on weekends (Saturday and Sunday).');
        return;
    }


   
    if (!Name || !email || !accountNumber || !contact || !atsDate || !atsTime) {
        alert('Please fill out all fields');
        return;
    }
    ats(service,Name,email,accountNumber,contact,atsDate,atsTime)

});