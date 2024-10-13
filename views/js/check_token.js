document.querySelector('.submit_button').addEventListener('click', async (e) => {
    e.preventDefault(); // Prevent default form submission

    const accountNumber = document.querySelector('#accountNumber').value;

    // Ensure account number is exactly 9 digits long
    if (accountNumber.length !== 9) {
        alert('Account number must be 9 digits long and only contain numbers.');
        return;
    }

    try {
        // Make the POST request to the API
        const res = await axios({
            method: 'POST',
            url: 'https://bankofbhutan.onrender.com/api/v1/search/search',
            data: { accountNumber },
        });
        console.log(res);
        const tokenData = res.data;
        const resultContainer = document.querySelector('.result');
        resultContainer.innerHTML = ''; // Clear previous results before displaying new ones

        // Check and display deposits
        if (tokenData.deposits && tokenData.deposits.length > 0) {
            let depositMessage = `<h3>Your Deposits:</h3><ul>`;
            tokenData.deposits.forEach((deposit, index) => {
                depositMessage += `
                    <li id="deposit-${index}">
                        Date: ${new Date(deposit.depositDate).toLocaleDateString()}<br>
                        Amount: ${deposit.amount}<br>
                        Depositor Name: ${deposit.depositorName}<br>
                        <button class="viewDetails" data-index="${index}" data-type="deposit">View Details</button>
                        <button class="cancelDeposit" data-index="${index}" data-type="deposit">Cancel</button>
                    </li><hr>
                `;
            });
            depositMessage += '</ul>';
            resultContainer.innerHTML += depositMessage;
        }

        // Check and display withdrawals
        if (tokenData.withdrawals && tokenData.withdrawals.length > 0) {
            let withdrawalMessage = `<h3>Your Withdrawals:</h3><ul>`;
            tokenData.withdrawals.forEach((withdrawal, index) => {
                withdrawalMessage += `
                    <li id="withdrawal-${index}">
                        Date: ${new Date(withdrawal.withdrawalDate).toLocaleDateString()}<br>
                        Amount: ${withdrawal.amount}<br>
                        Account Number: ${withdrawal.accountNumber}<br>
                        <button class="viewDetails" data-index="${index}" data-type="withdrawal">View Details</button>
                        <button class="cancelWithdrawal" data-index="${index}" data-type="withdrawal">Cancel</button>
                    </li><hr>
                `;
            });
            withdrawalMessage += '</ul>';
            resultContainer.innerHTML += withdrawalMessage;
        }

        // Check and display ATS
        if (tokenData.ats && tokenData.ats.length > 0) {
            let atsMessage = `<h3>Your ATS:</h3><ul>`;
            tokenData.ats.forEach((ats, index) => {
                atsMessage += `
                    <li id="ats-${index}">
                        Date: ${new Date(ats.atsDate).toLocaleDateString()}<br>
                        Account Number: ${ats.accountNumber}<br>
                        <button class="viewDetails" data-index="${index}" data-type="ats">View Details</button>
                        <button class="cancelAts" data-index="${index}" data-type="ats">Cancel</button>
                    </li><hr>
                `;
            });
            atsMessage += '</ul>';
            resultContainer.innerHTML += atsMessage;
        }

        // Check and display dollar selling
        if (tokenData.dollarselling && tokenData.dollarselling.length > 0) {
            let dollarsellingMessage = `<h3>Your Dollar Selling:</h3><ul>`;
            tokenData.dollarselling.forEach((dollarselling, index) => {
                dollarsellingMessage += `
                    <li id="dollarselling-${index}">
                        Date: ${new Date(dollarselling.dsDate).toLocaleDateString()}<br>
                        Account Number: ${dollarselling.accountNumber}<br>
                        <button class="viewDetails" data-index="${index}" data-type="dollarselling">View Details</button>
                        <button class="cancelDollarSelling" data-index="${index}" data-type="dollarselling">Cancel</button>
                    </li><hr>
                `;
            });
            dollarsellingMessage += '</ul>';
            resultContainer.innerHTML += dollarsellingMessage;
        }

        // Check and display RTGS
        if (tokenData.rtgs && tokenData.rtgs.length > 0) {
            let rtgsMessage = `<h3>Your RTGS Transactions:</h3><ul>`;
            tokenData.rtgs.forEach((rtgs, index) => {
                rtgsMessage += `
                    <li id="rtgs-${index}">
                        Date: ${new Date(rtgs.rtgsDate).toLocaleDateString()}<br>
                        Amount: ${rtgs.remitSum}<br>
                        Account Number: ${rtgs.accountNumber}<br>
                        <button class="viewDetails" data-index="${index}" data-type="rtgs">View Details</button>
                        <button class="cancelRtgs" data-index="${index}" data-type="rtgs">Cancel</button>
                    </li><hr>
                `;
            });
            rtgsMessage += '</ul>';
            resultContainer.innerHTML += rtgsMessage;
        }
         // Check and display SWIFT transactions
         if (tokenData.swift && tokenData.swift.length > 0) {
            let swiftMessage = `<h3>Your SWIFT Transactions:</h3><ul>`;
            tokenData.swift.forEach((swift, index) => {
                swiftMessage += `
                    <li id="swift-${index}">
                        Date: ${new Date(swift.swiftDate).toLocaleDateString()}<br>
                        Amount: ${swift.amount}<br>
                        SWIFT Code: ${swift.swiftCode}<br>
                        <button class="viewDetails" data-index="${index}" data-type="swift">View Details</button>
                        <button class="cancelSwift" data-index="${index}" data-type="swift">Cancel</button>
                    </li><hr>
                `;
            });
            swiftMessage += '</ul>';
            resultContainer.innerHTML += swiftMessage;
        }


        // Handle cases where no data is found
        if (
            (!tokenData.deposits || tokenData.deposits.length === 0) &&
            (!tokenData.withdrawals || tokenData.withdrawals.length === 0) &&
            (!tokenData.ats || tokenData.ats.length === 0) &&
            (!tokenData.dollarselling || tokenData.dollarselling.length === 0) &&
            (!tokenData.rtgs || tokenData.rtgs.length === 0)&&
            (!tokenData.swift || tokenData.swift.length === 0)
        ) {
            alert('No appointment found for this account number.');
        }

        // Add event listeners for "View Details" and "Cancel" buttons
        document.querySelectorAll('.viewDetails').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.dataset.index;
                const type = this.dataset.type;

                if (type === 'deposit') {
                    const deposit = tokenData.deposits[index];
                    alert(`
                        Deposit Details:
                        Date: ${new Date(deposit.depositDate).toLocaleDateString()}
                        Amount: ${deposit.amount}
                        Depositor Name: ${deposit.depositorName}
                        TPN: ${deposit.TPN}
                        Contact: ${deposit.contact}
                    `);
                } else if (type === 'withdrawal') {
                    const withdrawal = tokenData.withdrawals[index];
                    alert(`
                        Withdrawal Details:
                        Name: ${withdrawal.Name}
                        Email: ${withdrawal.email}
                        Account Number: ${withdrawal.accountNumber}
                        Date: ${new Date(withdrawal.withdrawalDate).toLocaleDateString()}
                        Amount: ${withdrawal.amount}
                    `);
                } else if (type === 'ats') {
                    const ats = tokenData.ats[index];
                    alert(`
                        ATS Details:
                        Date: ${new Date(ats.atsDate).toLocaleDateString()}
                        Account Number: ${ats.accountNumber}
                    `);
                } else if (type === 'dollarselling') {
                    const dollarselling = tokenData.dollarselling[index];
                    alert(`
                        Dollar Selling Details:
                        Date: ${new Date(dollarselling.dsDate).toLocaleDateString()}
                        Account Number: ${dollarselling.accountNumber}
                    `);
                } else if (type === 'rtgs') {
                    const rtgs = tokenData.rtgs[index];
                    alert(`
                        RTGS Details:
                        Date: ${new Date(rtgs.rtgsDate).toLocaleDateString()}
                        Amount: ${rtgs.remitSum}
                        Account Number: ${rtgs.accountNumber}
                    `);
                }else if (type === 'swift') {
                    const swift = tokenData.swift[index];
                    alert(`
                        swift Details:
                        Date: ${new Date(swift.swiftDate).toLocaleDateString()}
                        Amount: ${swift.amount}
                        Account Number: ${swift.accountNumber}
                    `);
                }
            });
        });

        // Add event listeners for "Cancel" buttons
        document.querySelectorAll('.cancelDeposit').forEach(button => {
            button.addEventListener('click', async function () {
                const index = this.dataset.index;
                const depositId = tokenData.deposits[index]._id;
                const email = tokenData.deposits[index].email;
                console.log("deposits Email : ",email);

                await axios.post('https://bankofbhutan.onrender.com/api/v1/search/send-otp', { email });

                const otp = prompt('Please enter the OTP sent to your email:');
                if (!otp) return;
    
                try {
                    const response = await axios.delete(`https://bankofbhutan.onrender.com/api/v1/search/search/${depositId}`, {
                        data: { email, otp }
                    });

                    if (response.status === 200) {
                        alert("Deposit appointment canceled successfully.");
                        document.getElementById(`deposit-${index}`).remove();
                    }
                } catch (error) {
                    alert('Error canceling transaction. Please try again.');
                    console.error(error);
                }
            });
        });

        document.querySelectorAll('.cancelWithdrawal').forEach(button => {
            button.addEventListener('click', async function () {
                const index = this.dataset.index;
                const withdrawalsId = tokenData.withdrawals[index]._id;
                const email = tokenData.withdrawals[index].email;
                await axios.post('https://bankofbhutan.onrender.com/api/v1/search/send-otp', { email });

                const otp = prompt('Please enter the OTP sent to your email:');
                if (!otp) return;
                    try {
                        const res = await axios.delete(`https://bankofbhutan.onrender.com/api/v1/search/search/${withdrawalsId}`,{
                            data:{email,otp}
                        });
                        if (res.status === 200) {
                            alert('Withdrawal canceled successfully.');
                            document.getElementById(`withdrawal-${index}`).remove();
                        } else {
                            alert('Error canceling withdrawal.');
                        }
                    } catch (error) {
                        alert('Error canceling withdrawal. Please try again.');
                        console.error(error);
                    }
            });
        });

        document.querySelectorAll('.cancelRtgs').forEach(button => {
            button.addEventListener('click', async function () {
                const index = this.dataset.index;
                const rtgsId = tokenData.rtgs[index]._id;
                const email = tokenData.rtgs[index].email;
                await axios.post('https://bankofbhutan.onrender.com/api/v1/search/send-otp', { email });

                const otp = prompt('Please enter the OTP sent to your email:');
                if (!otp) return;
                
                try {
                    const res = await axios.delete(`https://bankofbhutan.onrender.com/api/v1/search/search/${rtgsId}`,{
                        data:{email,otp}
                    });
                    if (res.status === 200) {
                        alert('RTGS canceled successfully.');
                        document.getElementById(`rtgs-${index}`).remove();
                    } else {
                        alert('Error canceling RTGS.');
                    }
                } catch (error) {
                    alert('Error canceling RTGS. Please try again.');
                    console.error(error);
                }
                
            });
        });
        document.querySelectorAll('.cancelSwift').forEach(button => {
            button.addEventListener('click', async function () {
                const index = this.dataset.index;
                const swiftId = tokenData.swift[index]._id;
                const email = tokenData.swift[index].email; // Assuming email is available in the SWIFT data

                await axios.post('https://bankofbhutan.onrender.com/api/v1/search/send-otp', { email });

                const otp = prompt('Please enter the OTP sent to your email:');
                if (!otp) return;

                try {
                    const response = await axios.delete(`https://bankofbhutan.onrender.com/api/v1/search/search/${swiftId}`, {
                        data: { email, otp }
                    });

                    if (response.status === 200) {
                        alert("SWIFT transaction canceled successfully.");
                        document.getElementById(`swift-${index}`).remove();
                    }
                } catch (error) {
                    alert('Error canceling transaction. Please try again.');
                    console.error(error);
                }
            });
        });
                // Cancel ATS Transaction with OTP Verification
        document.querySelectorAll('.cancelAts').forEach(button => {
            button.addEventListener('click', async function () {
                const index = this.dataset.index;
                const atsId = tokenData.ats[index]._id;
                const email = tokenData.ats[index].email; // Assuming email is available in the ATS data

                await axios.post('https://bankofbhutan.onrender.com/api/v1/search/send-otp', { email });

                const otp = prompt('Please enter the OTP sent to your email:');
                if (!otp) return;

                try {
                    const response = await axios.delete(`https://bankofbhutan.onrender.com/api/v1/search/search/${atsId}`, {
                        data: { email, otp }
                    });

                    if (response.status === 200) {
                        alert("ATS transaction canceled successfully.");
                        document.getElementById(`ats-${index}`).remove();
                    }
                } catch (error) {
                    alert('Error canceling transaction. Please try again.');
                    console.error(error);
                }
            });
        });
        // Cancel Dollar Selling Transaction with OTP Verification
        document.querySelectorAll('.cancelDollarSelling').forEach(button => {
            button.addEventListener('click', async function () {
                const index = this.dataset.index;
                const dollarsellingId = tokenData.dollarselling[index]._id;
                const email = tokenData.dollarselling[index].email; // Assuming email is available in the Dollar Selling data

                await axios.post('https://bankofbhutan.onrender.com/api/v1/search/send-otp', { email });

                const otp = prompt('Please enter the OTP sent to your email:');
                if (!otp) return;

                try {
                    const response = await axios.delete(`https://bankofbhutan.onrender.com/api/v1/search/search/${dollarsellingId}`, {
                        data: { email, otp }
                    });

                    if (response.status === 200) {
                        alert("Dollar Selling transaction canceled successfully.");
                        document.getElementById(`dollarselling-${index}`).remove();
                    }
                } catch (error) {
                    alert('Error canceling transaction. Please try again.');
                    console.error(error);
                }
            });
        });



    } catch (error) {
        console.error('Error fetching token data:', error);
        if (error.response && error.response.status === 404) {
            alert('Account number not found.');
        } else {
            alert('Error fetching token data. Please try again.');
        }
    }
});
