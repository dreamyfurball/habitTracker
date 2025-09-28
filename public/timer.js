document.addEventListener("DOMContentLoaded", () => {
    const studyInput = document.getElementById("study-time");
    const breakInput = document.getElementById("break-time");
    const repsInput = document.getElementById("reps");
  
    const display = document.getElementById("timer-display");
    const startBtn = document.getElementById("start-timer");
    const pauseBtn = document.getElementById("pause-timer");
    const resetBtn = document.getElementById("reset-timer");
  
    let timer;
    let isStudy = true;
    let timeLeft;
    let currentRep = 0;
    let totalReps;
    let running = false;
  
    function startTimer() {
      if (running) return;
      running = true;
  
      if (!timeLeft) {
        totalReps = parseInt(repsInput.value, 10);
        timeLeft = parseInt(studyInput.value, 10) * 60;
        isStudy = true;
        currentRep = 1;
      }
  
      timer = setInterval(() => {
        timeLeft--;
        updateDisplay();
  
        if (timeLeft <= 0) {
          clearInterval(timer);
          running = false;
  
          if (isStudy) {
            if (currentRep >= totalReps) {
              alert("Pomodoro complete! 🎉");
              resetTimer();
              return;
            }
            alert("Study session done. Break time!");
            timeLeft = parseInt(breakInput.value, 10) * 60;
            isStudy = false;
            startTimer();
          } else {
            alert("Break over! Back to studying!");
            currentRep++;
            timeLeft = parseInt(studyInput.value, 10) * 60;
            isStudy = true;
            startTimer();
          }
        }
      }, 1000);
    }
  
    function pauseTimer() {
      clearInterval(timer);
      running = false;
    }
  
    function resetTimer() {
      clearInterval(timer);
      running = false;
      timeLeft = parseInt(studyInput.value, 10) * 60;
      updateDisplay();
    }
  
    function updateDisplay() {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      display.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
  
    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resetBtn.addEventListener("click", resetTimer);
  
    // initialize display
    resetTimer();
  });
  