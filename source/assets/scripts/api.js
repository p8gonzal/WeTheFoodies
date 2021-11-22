// Parameter:
// Name: the name of the recipe
// it will fetch the reicpe that contain the same word, If it can't find the recipe, then it will return undefiened
// it will include analyze instruction and ingredient data 
async function search_recipe_name(name){
  let response=await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=486eca841c6a49b896486723439f9977&addRecipeInformation=true&fillIngredients=true`);
  let data=await response.json();
  console.log(data);
  return data.results;
}

// Parameter:
// Name: the name of the recipe
// heal: the filter we set, pass a comma-seperate string of what kind of filter we applied
// it will fetch the reicpe that satify both parameters If it can't find the recipe, then it will return undefiened.
// it will include analyze instruction and ingredient data 
async function search_recipe_name_health(name,health)//health is an array
{
  let response=await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&intolerances=${health}&apiKey=486eca841c6a49b896486723439f9977&addRecipeInformation=true&fillIngredients=true`);
  let data=await response.json();
  return data.results;
}

// Parameter:
// recipe_name: the recipe name 
// it will automaticlt get and parse the recipe in local storage if it can't find it it will just print a sentence to console,.
function get_info_localstore(recipe_name){
  if(localStorage.getItem(recipe_name)) {
    return JSON.parse(localStorage.getItem(recipe_name));
  } else {
    console.log('Can not find recipe info in local,can not get');
  }
}

// Parameter:
// recipe_name: the recipe name 
// recipe_info: the recipe object
// it will automaticlt change the info to string and store it in the local storage, 
// if locale storage already have it it will just print a sentence to console.
function set_localstore(recipe_name,recipe_info){
  if(!localStorage.getItem(recipe_name)) {
    localStorage.setItem(recipe_name,JSON.stringify(recipe_info));
  } else {
    console.log('Already Saved this recipe before,can not save it again');
  }
}

// Parameter:
// recipe_name: the recipe name 
// it will automaticlt remove the recipe in local storage if it can't find it it will just print a sentence to console,.
function remove_localstore(recipe_name){
  if(localStorage.getItem(recipe_name)) {
    localStorage.removeItem(recipe_name);
  } else {
    console.log('Do not have recipe info in local, can not remove');
  }
}
  
//if recipe can't be founded, the value will be undefined
// a few sample to show how to use it
search_recipe_name('chicken').then(value=>{
  let a = value;
  set_localstore(a[0].recipe.label,a[0]);
  let b=get_info_localstore(a[0].recipe.label);
  console.log('test1');
  console.log(a[0].recipe.label);
  console.log(b);
  remove_localstore(a[0].recipe.label);
});
  
search_recipe_name_health('chicken',['dairy-free']).then(value=>{
  let a = value;
  console.log('test3');
  console.log(a);
});
