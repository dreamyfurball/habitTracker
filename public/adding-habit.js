/* 
here we want the button to open an input box to add a habit.
once we do that, the grid body 'add a habit' should append 
the habits to an array and then we should then list the habits 
in bullet points. For now, we'll style and add editing and 
delete options later
*/ 

const habits = [];
const button = document.getElementById("add-a-habit");
const habitInput = document.getElementById("habit-name");
const habitList = document.getElementById("habit-list");
const Finishedbutton = document.getElementById("finish");

button.addEventListener("click", () => {
  // Reveal the input box + finish button
  habitInput.style.visibility = "visible";
  Finishedbutton.style.visibility = "visible";

  // If user typed something
  if (habitInput.value.trim() !== "") {
    const habitContent = habitInput.value.trim();

    // Save in array
    habits.push(habitContent);

    // Create <li> wrapper
    const li = document.createElement("li");
    li.textContent = habitContent;

    // ✅ Add checkmark button
    const checkBtn = document.createElement("button");
    checkBtn.textContent = "✔️";
    checkBtn.style.marginLeft = "10px";
    checkBtn.style.cursor = "pointer";

    // On click: mark complete + update heatmap
    checkBtn.addEventListener("click", () => {
      li.style.textDecoration = "line-through"; // UI feedback
      if (typeof window.updateHeatmapForToday === "function") {
        window.updateHeatmapForToday();
      }
    });

    // Add check button into <li>
    li.appendChild(checkBtn);

    // Add to <ul>
    habitList.appendChild(li);

    // Clear input
    habitInput.value = "";

    console.log("Habits:", habits);
  }
});

Finishedbutton.addEventListener("click", () => {
  habitInput.style.visibility = "hidden";
  Finishedbutton.style.visibility = "hidden";
});
