const form = document.getElementById('calorie-form');
const foodNameInput = document.getElementById('food-name');
const caloriesInput = document.getElementById('calories');
const foodList = document.getElementById('food-list');
const totalCaloriesDisplay = document.getElementById('total-calories');
const resetBtn = document.getElementById('reset-btn');

let foodItems = JSON.parse(localStorage.getItem('foodItems')) || [];

function renderFoodItems() {
    foodList.innerHTML = '';
    let total = 0;
    foodItems.forEach((item, index) => {
        total += item.calories;
        const li = document.createElement('li');
        li.className = "flex justify-between items-center px-4 py-2 rounded bg-gray-100";
        const div = document.createElement('div');
        div.innerHTML = `<strong>${item.name}</strong>- ${item.calories} calories`;

        const btn = document.createElement('button');
        btn.textContent = 'Delete';
        btn.className = 'bg-red-500 text-white px-2 py-1 rounded';
        btn.addEventListener('click', () => deleteItem(index));

        li.appendChild(div);
        li.appendChild(btn);
        foodList.appendChild(li);
    });
    totalCaloriesDisplay.textContent = total;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const foodName = foodNameInput.value.trim();
    const calories = parseInt(caloriesInput.value.trim());
    if (!foodName || isNaN(calories) || calories <= 0) {
        alert('Please enter a valid food name and positive calorie amount.');
        return;
    }
    foodItems.push({ name: foodName, calories });
    localStorage.setItem('foodItems', JSON.stringify(foodItems));
    form.reset();
    renderFoodItems();
});
function deleteItem(index) {
    foodItems.splice(index, 1);
    localStorage.setItem('foodItems', JSON.stringify(foodItems));
    renderFoodItems();
resetBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all entries?')) {
        foodItems = [];
        localStorage.removeItem('foodItems');
        renderFoodItems();
    }
});
    }

renderFoodItems();

// Uncomment and define setCookie/getCookie if you want to use cookies for persistence
// setCookie('foodItems', JSON.stringify(foodItems), 2);
// getCookie('foodItems');
// JSON.parse(getCookie('foodItems'));