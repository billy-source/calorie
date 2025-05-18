const form = document.getElementById("calorie-form");
const foodNameInput = document.getElementById("food-name");
const caloriesInput = document.getElementById("calories");
const foodList = document.getElementById("food-list");
const totalCaloriesDisplay = document.getElementById("total-calories");
const resetBtn = document.getElementById("reset-btn");

// === COOKIE FUNCTIONS === //
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith(name + "="))
    ?.split("=")[1];
}

// === LOAD SAVED DATA === //
let foodItems = [];

const saved = getCookie("calorieData");
if (saved) {
  try {
    foodItems = JSON.parse(decodeURIComponent(saved));
  } catch (err) {
    foodItems = [];
  }
}

// === RENDER FUNCTION === //
function renderFoodItems() {
  foodList.innerHTML = "";
  let total = 0;

  foodItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-gray-100 px-4 py-2 rounded";

    li.innerHTML = `
      <div><strong>${item.name}</strong> - ${item.calories} calories</div>
      <button onclick="deleteItem(${index})" 
        class="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
        Delete
      </button>
    `;

    foodList.appendChild(li);
    total += item.calories;
  });

  totalCaloriesDisplay.textContent = total;

  // Save to cookie
  setCookie("calorieData", JSON.stringify(foodItems), 2);
}

// === FORM SUBMIT === //
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = foodNameInput.value.trim();
  const calories = parseInt(caloriesInput.value);

  if (!name || isNaN(calories) || calories <= 0) {
    alert("Please enter a valid food name and calorie number.");
    return;
  }

  foodItems.push({ name, calories });
  form.reset();
  renderFoodItems();
});

// === DELETE FUNCTION === //
function deleteItem(index) {
  foodItems.splice(index, 1);
  renderFoodItems();
}

// === RESET FUNCTION === //
resetBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to reset for the day?")) {
    foodItems = [];
    renderFoodItems();
  }
});

renderFoodItems();

