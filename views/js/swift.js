document.addEventListener('DOMContentLoaded', function() {
    const billDiv = document.getElementById('delcare_num');

    billDiv.style.display = 'none';

    document.querySelectorAll('input[name="payment"]').forEach((radio) => {
        radio.addEventListener('change', function() {
            if (this.value === 'Advance Payment/Final Payment' && this.checked) {
                billDiv.style.display = 'block'; // Show the div
            } else {
                billDiv.style.display = 'none';  // Hide the div
            }
        });
    });
});
function changeName() {
    const edu = document.querySelector('input[name="education"]:checked').value;
    
    // Get the reference to the button
    const button = document.querySelector('.subedu');

    // Check if edu is "YES" and change the button text accordingly
    if (edu === "Yes") {
        button.textContent = "Next";  // Change button text to "Next"
    }else{
        button.textContent = "Submit"; 
    }
}
document.querySelectorAll('input[name="education"]').forEach(radio => {
    radio.addEventListener('change', changeName);
});
document.addEventListener("DOMContentLoaded", function() {
    const info1 = document.querySelector(".info1");
    const info2 = document.querySelector(".info2");
    const info3 = document.querySelector(".info3");
    const info4 = document.querySelector(".info4");
    const info5 = document.querySelector(".info5");
    const info6 = document.querySelector(".info6");
    const info7 = document.querySelector(".info7");
    const info8 = document.querySelector(".info8");
  
    const btnNext1 = document.querySelector(".info1 .btn-next");
    const btnNext2 = document.querySelector(".info2 .btn-next");
    const btnPrev2 = document.querySelector(".info2 .btn-prev");
    const btnNext3 = document.querySelector(".info3 .btn-next");
    const btnPrev3 = document.querySelector(".info3 .btn-prev");
    const btnNext4 = document.querySelector(".info4 .btn-next");
    const btnPrev4 = document.querySelector(".info4 .btn-prev");
    const btnNext5 = document.querySelector(".info5 .btn-next");
    const btnPrev5 = document.querySelector(".info5 .btn-prev");
    const btnNext6 = document.querySelector(".info6 .btn-next");
    const btnPrev6 = document.querySelector(".info6 .btn-prev");
    const btnPrev7 = document.querySelector(".info7 .btn-prev");
    const btnNext7 = document.querySelector(".info7 .btn-next");
    const btnPrev8 = document.querySelector(".info8 .btn-prev");
  
    // Show info2 and hide info1 when Next is clicked in info1
    btnNext1.addEventListener("click", function() {
      info1.classList.add("hidden");
      info2.classList.remove("hidden");
    });
  
    // Show info3 and hide info2 when Next is clicked in info2
    btnNext2.addEventListener("click", function() {
      info2.classList.add("hidden");
      info3.classList.remove("hidden");
    });
  
    btnPrev2.addEventListener("click", function() {
      info2.classList.add("hidden");
      info1.classList.remove("hidden");
    });
    btnNext3.addEventListener("click", function() {
    const edu = document.querySelector('input[name="education"]:checked').value;
        console.log(edu)
        if (edu ==="Yes"){
            info3.classList.add("hidden");
            info4.classList.remove("hidden");
        }
        
      });
      btnPrev3.addEventListener("click", function() {

        info3.classList.add("hidden");
        info2.classList.remove("hidden");
      });
      btnNext4.addEventListener("click", function() {
        info4.classList.add("hidden");
        info5.classList.remove("hidden");
      });
      btnPrev4.addEventListener("click", function() {
        info4.classList.add("hidden");
        info3.classList.remove("hidden");
      });
      btnNext5.addEventListener("click", function() {
        info5.classList.add("hidden");
        info6.classList.remove("hidden");
      });
      btnPrev5.addEventListener("click", function() {
        info5.classList.add("hidden");
        info4.classList.remove("hidden");
      });
      btnNext6.addEventListener("click", function() {
        info6.classList.add("hidden");
        info7.classList.remove("hidden");
      });
      btnPrev6.addEventListener("click", function() {
        info6.classList.add("hidden");
        info5.classList.remove("hidden");
      });
      btnNext7.addEventListener("click", function() {
        info7.classList.add("hidden");
        info8.classList.remove("hidden");
      });
    btnPrev7.addEventListener("click", function() {
      info7.classList.add("hidden");
      info6.classList.remove("hidden");
    });
    btnPrev8.addEventListener("click", function() {
        info8.classList.add("hidden");
        info7.classList.remove("hidden");
      });
  });

  function checkOthers() {
    const radioButtons = document.querySelectorAll('input[name="purpose"]');
    const otherPurposeDiv = document.getElementById('otherPurpose');

    for (const radioButton of radioButtons) {
        if (radioButton.checked && radioButton.value === 'others') {
            otherPurposeDiv.style.display = 'block'; // Show the div
            return;
        }
    }
    otherPurposeDiv.style.display = 'none';
}



