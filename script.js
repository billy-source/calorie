const foodNameInput = document.getElementById("food-name");
const foodList = document.getElementById("food-list");
const totalCaloriesDisplay = document.getElementById("total-calories");
const resetBtn = document.getElementById("reset-btn");
const foodForm = document.getElementById("calorie-form");
const resetMessage = document.getElementById("reset-message");

async function fetchCalories(foodName) {
  let url = 'https://api.calorieninjas.com/v1/nutrition?query=' + encodeURIComponent(foodName);
  try{
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Api-Key': 'O9psxgqP7VhXHZSr+RLB5A==Q3h7mCgeZ9rBM0a7',
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error('Network response was not ok ');
  }
  const result = await response.json();
  return result.items.map(item => ({
    name: item.name,
    calories: item.calories
  }));
}
  catch (error) {
  console.error(error);
  return [];
  }
}

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
    total += Number(item.calories);
  });

  totalCaloriesDisplay.textContent = total;

  // Save to cookie
  setCookie("calorieData", JSON.stringify(foodItems), 2);
}

// === FORM SUBMIT === //
foodForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const foodName = document.getElementById("food-name").value.trim();
    if (foodName) {
        resetMessage.textContent = "Item added successfully!";
        resetMessage.style.color = "green";
        setTimeout(() => {
            resetMessage.textContent = "";
        }, 2000);
        const data = await fetchCalories(foodName);
        data.forEach(item => foodItems.push(item));
        renderFoodItems();
    } else {
        resetMessage.textContent = "Invalid input";
        resetMessage.style.color = "red";
        setTimeout(() => {
            resetMessage.textContent = "";
        }, 2000);
    }
});

// === DELETE FUNCTION === //
function deleteItem(index) {
  foodItems.splice(index, 1);
  renderFoodItems();
}

// Attach deleteItem to the global scope so inline onclick works
window.deleteItem = deleteItem;


resetBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to reset for the day?")) {
    foodItems = [];
    renderFoodItems();
  }
});

renderFoodItems();




 
