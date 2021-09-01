const searchFood = () => {
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;
     if(searchText == 0){
        const foundMessage = document.getElementById('not-found');
        foundMessage.style.display = 'block';
    }
    else{
        const foundMessage = document.getElementById('not-found');
        foundMessage.style.display = 'none';
        searchField.value = '';
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.meals))
    }
};
const displaySearchResult = meals => {
    const searchItems = document.getElementById('search-item');
    searchItems.textContent = '';
    const mealDetails = document.getElementById("meal-details");
    mealDetails.textContent = '';
    if(meals == null){
        const wrongInput = document.getElementById('wrong-input');
        wrongInput.style.display = 'block';
    }
   else{
    meals.forEach(meal => {
        const wrongInput = document.getElementById('wrong-input');
        wrongInput.style.display = 'none';
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick="loadMealDetails(${meal.idMeal})" class="card">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                </div>
            </div>
        `;
        searchItems.appendChild(div);
    })
   } 
};
const loadMealDetails = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetaislMeal(data.meals[0]))
};
const displayDetaislMeal = (meal) => {
    const mealDetails = document.getElementById("meal-details");
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
            <a href="${meal.strYoutube}" class="btn btn-danger">Go somewhere</a>
        </div>
    `;
    mealDetails.appendChild(div);
}