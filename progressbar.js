// Add the following JavaScript code for the progress bar functionality
window.addEventListener("scroll", function() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var progress = (scrollTop / scrollHeight) * 100;
    var progressBar = document.querySelector(".progress-bar");
    var progressBarPercentage = document.querySelector(".progress-bar-percentage");
    progressBar.style.width = progress + "%";
    progressBarPercentage.textContent = Math.round(progress) + "%";
  });
  