document.addEventListener("DOMContentLoaded", function () {
  console.log("heatmap.js loaded");

  const cal = new CalHeatmap();
  const habitData = {}; // store counts keyed by unix seconds

  cal.paint({
    range: 12,
    domain: {
      type: "month",
      gutter: 4,
      label: { text: "MMM", position: "top" },
    },
    subDomain: {
      type: "day",
      width: 12,
      height: 12,
      radius: 2,
      gutter: 2,
    },
    date: {
      start: new Date(new Date().getFullYear(), 0, 1),
      locale: {
        weekStart: 1,
        weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        monthsShort: [
          "Jan","Feb","Mar","Apr","May","Jun",
          "Jul","Aug","Sep","Oct","Nov","Dec"
        ],
      },
    },
    scale: {
      color: {
        type: "linear",
        domain: [0, 1, 2, 3], // 0 = gray, 1 = light green, 3+ = dark
        range: ["#ebedf0", "#9be9a8", "#40c463", "#216e39"],
      },
    },
    data: {
      source: [],
      x: d => d.date,   // expects Date object
      y: d => d.value,
    },
  });

  // ✅ Called from adding-habit.js when a checkmark is clicked
  window.updateHeatmapForToday = function () {
    const today = new Date();
    const ts = Math.floor(today.setHours(0, 0, 0, 0) / 1000);

    habitData[ts] = (habitData[ts] || 0) + 1;

    // Convert object → array with real Date objects
    const formatted = Object.entries(habitData).map(([unix, value]) => ({
      date: new Date(Number(unix) * 1000), // <-- important fix
      value,
    }));

    cal.fill(formatted);

    console.log("Updated heatmap data:", formatted);
  };
});
