const form = document.getElementById("calorie-form");
const foodNameInput = document.getElementById("food-name");
const caloriesInput = document.getElementById("calories");
const foodList = document.getElementById("food-list");
const totalCaloriesDisplay = document.getElementById("total-calories");
const resetBtn = document.getElementById("reset-btn");

// Store food items in an array
let foodItems = [];

// Function to render the food list and update total
function renderFoodItems() {
  // Clear the existing list
  foodList.innerHTML = "";

  let total = 0;

  foodItems.forEach((item, index) => {
    total += item.calories;

    // Create list item
    const li = document.createElement("li");
    li.className =
      "flex justify-between items-center bg-gray-100 px-4 py-2 rounded";

    li.innerHTML = `
      <div>
        <strong>item.name</strong> -{item.calories} calories
      </div>
<button onclick="deleteItem(${index})"
        class="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
        Delete
      </button>
    `;

    foodList.appendChild(li);
  });

  // Update total calories display
  totalCaloriesDisplay.textContent = total;
}

// Add food to the list
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = foodNameInput.value.trim();
  const calories = parseInt(caloriesInput.value);

  if (!name || isNaN(calories) || calories <= 0) {
    alert("Please enter a valid food name and calories.");
    return;
  }

  foodItems.push({ name, calories });

  form.reset();
  renderFoodItems();
});

// Delete a food item
function deleteItem(index) {
  foodItems.splice(index, 1); // remove 1 item at the given index
  renderFoodItems();
}

// Reset the whole list
resetBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to reset for the day?")) {
    foodItems = [];
    renderFoodItems();
  }
});
