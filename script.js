var instructions = [
  "Step 1: Multiply your Birth Date by 4 \uD83D\uDE0D",
  "Step 2: Add 7 with the result \uD83D\uDC48",
  "Step 3: Multiply the result by 3 \uD83E\uDD1F",
  "Step 4: Add your Birth date to the result \u270A",
  "Step 5: Add your Birth month to the result \uD83D\uDC4C",
  "Final Step : Enter your result:\uD83D\uDC47", // User enters their result
];

var currentIndex = -1;

function nextStep() {
  var instructionElement = document.getElementById("instruction");
  var submitButton = document.getElementById("submitButton");
  var resultInput = document.getElementById("resultInput");
  var nextButton = document.getElementById("nextButton");

  currentIndex++;

  if (currentIndex < instructions.length) {
    instructionElement.textContent = instructions[currentIndex];

    if (currentIndex === instructions.length - 1) {
      resultInput.value = ""; // Clear the input field
      resultInput.style.display = "block";
      submitButton.style.display = "inline-block";
      nextButton.style.display = "none";
    } else {
      resultInput.style.display = "none";
      submitButton.style.display = "none";
      nextButton.style.display = "inline-block";
    }
  } else {
    checkResult();
  }
}

function calculateFinalResult() {
  var resultInput = document.getElementById("resultInput");
  var userInput = parseInt(resultInput.value);

  if (!isNaN(userInput)) {
    var finalResult = userInput - 21;
    var finalResult = finalResult / 13;
    var integerResult = Math.floor(finalResult);

    var fractionResult = finalResult - integerResult + 0.001;
    var multipliedFraction = Math.floor(fractionResult * 13);

    var monthName;

    if (multipliedFraction === 0 || multipliedFraction === 1) {
      monthName = "January";
    } else if (multipliedFraction >= 2 && multipliedFraction <= 12) {
      var monthNames = [
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      monthName = monthNames[multipliedFraction - 2];
    } else {
      monthName = "Try again";
    }

    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    var currentDay = currentDate.getDate();
    var currentHour = currentDate.getHours();
    var currentMinute = currentDate.getMinutes();
    var currentSecond = currentDate.getSeconds();

    var targetDate = new Date(currentYear, multipliedFraction - 1, integerResult);
    if (targetDate < currentDate) {
      targetDate.setFullYear(currentYear + 1); // Set the target date to the next year if it has already passed
    }

    var timeDiff = targetDate - currentDate;

    var popupContainer = document.getElementById("popupContainer");
    var popupMessage = document.getElementById("popupMessage");
    popupContainer.style.display = "block";
    popupContainer.classList.add("active"); // Add the "active" class

    // Disable scrolling on the body
    document.body.style.overflow = "hidden";

    // Update the countdown every second
    var countdownInterval = setInterval(updateCountdown, 1000);

    function updateCountdown() {
      var currentDate = new Date();
      var currentYear = currentDate.getFullYear();
      var currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
      var currentDay = currentDate.getDate();
      var currentHour = currentDate.getHours();
      var currentMinute = currentDate.getMinutes();
      var currentSecond = currentDate.getSeconds();
    
      if (currentMonth === multipliedFraction && currentDay === integerResult) {
        // Birthday reached, display "Happy Birthday!!!"
        popupMessage.innerHTML = "Happy Birthday!!!";
        return;
      }
    
      var targetDate = new Date(currentYear, multipliedFraction - 1, integerResult);
      if (targetDate < currentDate) {
        targetDate.setFullYear(currentYear + 1); // Set the target date to the next year if it has already passed
      }
    
      var timeDiff = targetDate - currentDate;
    
      var remainingDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      var remainingHours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var remainingMinutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      var remainingSeconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
      var message = "Your birthday is on " + monthName + " " + integerResult + ".";
      message += "<br>The remaining time until your next birthday: <br>" + remainingDays + " days, " + remainingHours + " hours, " + remainingMinutes + " minutes, " + remainingSeconds + " seconds.";
    
      popupMessage.innerHTML = message;
    }
    

    // Automatically close the popup after 50 seconds
    setTimeout(function () {
      closePopup();
    }, 5000000);
  } else {
    alert("Please enter a valid number.");
  }
}





// Function to close the popup
// Existing JavaScript code

// Function to show the popup message
function showPopupMessage(message) {
  var popupContainer = document.getElementById("popupContainer");
  var popupMessage = document.getElementById("popupMessage");

  popupMessage.textContent = message;
  popupContainer.classList.add("active");
}

// Function to close the popup message
function closePopup() {
  var popupContainer = document.getElementById("popupContainer");
  popupContainer.classList.remove("active");
}

// Function to submit the comment

function submitComment() {
  var name = document.getElementById("nameInput").value;
  var comment = document.getElementById("commentInput").value;

  $.ajax({
    url: 'PATH_TO_YOUR_PHP_SCRIPT', // replace this with the path to your PHP script
    type: 'post',
    data: {
      'name': name,
      'comment': comment
    },
    success: function(response) {
      alert(response); // This will alert the response from your PHP script
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    }
  });



  var formData = new FormData();
  formData.append("name", name);
  formData.append("comment", comment);

  fetch("http://localhost/send_email.php", {
    method: "POST",
    body: formData
  })
    .then(function (response) {
      if (response.ok) {
        // Comment submitted successfully
        alert("Your comment has been submitted. Thank you!");

        // Clear the input fields
        nameInput.value = "";
        commentInput.value = "";

        // Show the popup message after submitting the comment
        showPopupMessage("Your comment has been submitted. Thank you!");
      } else {
        // Error submitting the comment
        alert("There was an error submitting your comment. Please try again later.");
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
      alert("There was an error submitting your comment. Please try again later.");
    });
}

// Existing JavaScript code
      

// JavaScript code to simulate typewriter effect

// Your existing JavaScript code

function typeWriter(text, elementId, delay) {
  const textElement = document.getElementById(elementId);
  let index = 0;

  function type() {
    if (index < text.length) {
      textElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, delay);
    } else {
      // Typing completed, add class to enable animation
      textElement.classList.add('typing-animation');
    }
  }

  type();
}

// Call the typewriter function with desired text and parameters
const commentHeadingText = "Leave a comment";
const commentHeadingDelay = 100; // Delay between each character typing

typeWriter(commentHeadingText, "commentHeading", commentHeadingDelay);

// Updated JavaScript code for comment submission
function submitComment() {
  var nameInput = document.getElementById("nameInput");
  var commentInput = document.getElementById("commentInput");
  var commentSubmissionContainer = document.getElementById("commentSubmissionContainer");
  var commentSubmissionMessage = document.getElementById("commentSubmissionMessage");

  if (nameInput.value && commentInput.value) {
    var name = nameInput.value;
    var comment = commentInput.value;

    if (name.trim() === "" || comment.trim() === "") {
      alert("Please enter your name and comment.");
      return;
    }

    var formData = new FormData();
    formData.append("Name", name);
    formData.append("Comment", comment);

    fetch("https://formspree.io/f/mnqkqkpe", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then(function (response) {
        if (response.ok) {
          // Comment submitted successfully
          // Clear the input fields
          nameInput.value = "";
          commentInput.value = "";

          // Additional code from the new code
          commentSubmissionMessage.innerHTML = "Your comment has been submitted!";
          commentSubmissionContainer.classList.add("active");

          // Automatically close the comment submission pop-up after 3 seconds
          setTimeout(function () {
            commentSubmissionContainer.classList.remove("active");
          }, 3000);
        } else {
          // Error submitting the comment
          alert("There was an error submitting your comment. Please try again later.");
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
        alert("There was an error submitting your comment. Please try again later.");
      });
  }
}


function showPopupMessage(message) {
  var popupContainer = document.getElementById("popupContainer");
  var popupMessage = document.getElementById("popupMessage");

  popupMessage.textContent = message;
  popupContainer.classList.add("active");
  
}

function closePopup() {
  var popupContainer = document.getElementById("popupContainer");
  popupContainer.classList.remove("active");
  location.reload();
}
let currentInput = '';
let previousInput = '';
let operator = '';

// Function to handle button click
window.handleButtonClick = function (value) {
  if (value === '=') {
    calculate();
  } else if (['+', '-', '*', '/'].includes(value)) {
    operator = value;
    previousInput = currentInput;
    currentInput = '';
  } else {
    currentInput += value;
  }

  updateDisplay();
};

// Function to calculate the result
function calculate() {
  let result = 0;
  const previous = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(previous) || isNaN(current)) {
    return;
  }

  switch (operator) {
    case '+':
      result = previous + current;
      break;
    case '-':
      result = previous - current;
      break;
    case '*':
      result = previous * current;
      break;
    case '/':
      result = previous / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = '';
  previousInput = '';
}

// Function to update the calculator display
function updateDisplay() {
  const displayElement = document.getElementById('calculator-input');
  displayElement.value = currentInput;
}

// Function to handle clear click
window.handleClearClick = function () {
  currentInput = '';
  previousInput = '';
  operator = '';
  updateDisplay();
}
