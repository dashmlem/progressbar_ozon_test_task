const hiddenPanel = document.querySelector(".progress");
const hideToggle = document.querySelector("#hideToggle");
const valueInput = document.getElementById("valueInput");
const animateToggle = document.getElementById("animateToggle");
const svgElement = document.querySelector("svg");
const progressBar = document.querySelector(".progress-bar");

const circumference = 352;
const startValue = 0;

updateProgressBar(startValue);

// Проверяем, входит ли в диапазон 0-100 введённое число и обновляем значение если да
valueInput.addEventListener("input", () => {
  const value = parseInt(valueInput.value);
  if (value >= 0 && value <= 100) {
    updateProgressBar(value);
  }
});
//Добавляем анимацию при нажатии
animateToggle.addEventListener("change", () => {
  if (animateToggle.checked) {
    svgElement.style.animation = "rotateAnimation 2s linear infinite";
  } else {
    svgElement.style.animation = "none";
  }
});
//При клике скрываем панель
hideToggle.addEventListener("click", () => {
  hiddenPanel.classList.toggle("hidden");
});

//Вычисляем по формуле значения для синего индикатора прогресса
function updateProgressBar(value) {
  const offset = circumference - (value / 100) * circumference;
  progressBar.style.strokeDashoffset = offset;
  valueInput.value = value;
}
//API для управления кнопочками
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
      hiddenPanel.classList.add("hidden");
    } else {
      hiddenPanel.classList.remove("hidden");
    }
  },
  getState: function () {
    return {
      value: parseInt(valueInput.value),
      animated: animateToggle.checked,
      hidden: hiddenPanel.classList.contains("hidden"),
    };
  },
};
//Примеры управления api
//ProgressAPI.setValue(75);
// или window.ProgressAPI.setAnimation(true);
//ProgressAPI.setHidden(true);;
