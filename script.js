const hiddenPanel = document.querySelector(".progress");
const hideToggle = document.querySelector("#hideToggle");
const valueInput = document.getElementById("valueInput");
const animateToggle = document.getElementById("animateToggle");

const svgElement = document.querySelector("svg");
const progressBar = document.querySelector(".progress-bar");

const circumference = 440;
const startValue = 0;

updateProgressBar(startValue);

valueInput.addEventListener("input", () => {
  const value = parseInt(valueInput.value);
  if (value >= 0 && value <= 100) {
    updateProgressBar(value);
  }
});
animateToggle.addEventListener("change", () => {
  if (animateToggle.checked) {
    svgElement.style.animation = "rotateAnimation 2s linear infinite";
  } else {
    svgElement.style.animation = "none";
  }
});
hideToggle.addEventListener("click", () => {
  hiddenPanel.classList.toggle("hidden");
});

function updateProgressBar(value) {
  const offset = circumference - (value / 100) * circumference;
  progressBar.style.strokeDashoffset = offset;

  valueInput.value = value;
}
//API

window.ProgressAPI = {
  setValue: function (value) {
    if (value >= 0 && value <= 100) {
      updateProgressBar(value);
    }
  },
  setAnimation: function (enabled) {
    if (enabled) {
      svgElement.style.animation = "rotateAnimation 2s linear infinite";
    } else {
      svgElement.style.animation = "none";
    }
  },
  setHidden: function (hidden) {
    if (hidden) {
      hiddenPanel.classList.add(".hidden");
    } else {
      hiddenPanel.classList.remove(".hidden");
    }
  },
  getState: function () {
    return {
      value: parseInt(valueInput.value),
      animated: animateToggle.checked,
      hidden: hiddenPanel.classlist.contains("hidden"),
    };
  },
};
