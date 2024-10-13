document.addEventListener('DOMContentLoaded', function() {
    const billDiv = document.getElementById('billDiv');

    billDiv.style.display = 'none';

    document.querySelectorAll('input[name="purpose"]').forEach((radio) => {
        radio.addEventListener('change', function() {
            if (this.value === 'Bill Payment' && this.checked) {
                billDiv.style.display = 'block'; // Show the div
            } else {
                billDiv.style.display = 'none';  // Hide the div
            }
        });
    });
});




document.addEventListener("DOMContentLoaded", function() {
    const info1 = document.querySelector(".info1");
    const info2 = document.querySelector(".info2");
    const info3 = document.querySelector(".info3");
  
    const btnNext1 = document.querySelector(".info1 .btn-next");
    const btnNext2 = document.querySelector(".info2 .btn-next");
    const btnPrev2 = document.querySelector(".info2 .btn-prev");
    const btnPrev3 = document.querySelector(".info3 .btn-prev");
  
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
  
    // Show info1 and hide info2 when Previous is clicked in info2
    btnPrev2.addEventListener("click", function() {
      info2.classList.add("hidden");
      info1.classList.remove("hidden");
    });
  
    // Show info2 and hide info3 when Previous is clicked in info3
    btnPrev3.addEventListener("click", function() {
      info3.classList.add("hidden");
      info2.classList.remove("hidden");
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

