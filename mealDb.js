const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value='';


    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    // .then(data => console.log(data));            
    .then(data => displaySearchResul(data.meals));
};
//==============================>
const displaySearchResul = meals => {
    // console.log(meals);
    const searchResult = document.getElementById('search-result');
    // searchResult.innerHTML = '';                      // clear the data when new search    type 1
    searchResult.textContent = '';                      // clear the data when new search      type 2
    meals.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
        <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
            </div>
          </div>
        `;
        searchResult.appendChild(div);
    });
};


const loadMealDetail = mealId => {
    // console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
    .then(res => res.json())
    // .then(data => console.log(data));
    .then(data => displayMealDetail(data.meals[0]));              // call function displayMealDetail()
}
const displayMealDetail = meal => {
    console.log(meal);
    const mealDetail = document.getElementById('meal-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML=`
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
      <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
    </div>
    `;
    mealDetail.appendChild(div);
}
