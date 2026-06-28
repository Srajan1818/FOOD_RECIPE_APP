let searchBox=document.querySelector('.searchBox');
let searchBtn=document.querySelector('.searchBtn');
let recipecontainer=document.querySelector('.recipe-container');
let recipeDetailsContent=document.querySelector('.recipe-details-content');
let recipeCloseBtn=document.querySelector('.recipe-closeBtn')

//function to get recipies
let fetchRecipes= async (query) => {
    recipecontainer.innerHTML="<h2>Fetching recipies</h2>";
    try{
let data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
let response= await data.json();

recipecontainer.innerHTML="";
response.meals.forEach(meal => {
let recipeDiv=document.createElement('div');
recipeDiv.classList.add('recipe');
recipeDiv.innerHTML= `
<img src="${meal.strMealThumb}">
 <h3>${meal.strMeal}</h3>
<p><span>${meal.strArea}</span>Dish</p>
<p>Belongs to <span>${meal.strCategory}</span>Category</p>
`
let button=document.createElement('button')
button.textContent="View Recipe";
recipeDiv.appendChild(button);

//Adding eventlistner to recipe button
button.addEventListener('click', () => {
  openRecipePopup(meal);
})

recipecontainer.appendChild(recipeDiv);
})
}
catch(error){
recipecontainer.innerHTML="<h2>Error in Fetching recipe...</h2>"
}
}

//Function to fetch ingriedents and measurments
let fetchIngredients = (meal) => {
let ingriedenstList="";
for(let i=1;i<=20;i++){
let ingriedent=meal[`strIngredient${i}`]
if(ingriedent){
  let measure=meal[`strMeasure${i}`]
 ingriedenstList+= `<li>${measure} ${ingriedent}<li>`
} 
else{
  break;
}
}
return ingriedenstList;
}

let openRecipePopup = (meal) => {
recipeDetailsContent.innerHTML=`
<h2 class="recipeName">${meal.strMeal}</h2>
<h3>Ingriedents:</h3>
<ul class="ingridentList">${fetchIngredients(meal)}</ul>
<div class="recipeInstructions">
<h3>Instructions:</h3>
<p>${meal.strInstructions}</p>
</div>
`
recipeDetailsContent.parentElement.style.display="block";
}

recipeCloseBtn.addEventListener('click', () =>{
  recipeDetailsContent.parentElement.style.display="none"
})

searchBtn.addEventListener('click', (e)=> {
  e.preventDefault();
    let searchInput=searchBox.value.trim();
    if(!searchInput){
      recipecontainer.innerHTML=`<h2>Type the meal in the search Box</h2>`;
      return;
    }
   fetchRecipes(searchInput)
})
