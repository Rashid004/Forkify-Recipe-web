import * as model from './model.js'

import recipeView from './Views/recipeView.js';
import searchView from './Views/searchView.js';
import resultView from './Views/resultView.js';
import paginationView from './Views/paginationView.js'

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// if(module.hot) {
//   module.hot.accept();
// }
const controlRecipe = async function () {
   try {
     const id = window.location.hash.slice(1);
     
     if (!id) return;

     recipeView.renderSpinner();

    resultView.update(model.getSearchResultsPage());   
      //Loading recipe
      await model.loadRecipe(id);
     // Render Recipe
     recipeView.render(model.state.recipe);
   } catch (err) {
     console.error(err);
     recipeView.renderError();
   }
};

const controlSearchResult = async function() {
  try{
    resultView.renderSpinner();
    // Search query 
  const query = searchView.getQuery();
  if(!query) return;

 // Load Query 
  await model.loadSearchResults(query); 

  // Render Recipe 
  resultView.render(model.getSearchResultsPage());

  // 4) render pagination 
  paginationView.render(model.state.search)

  } catch(err){
  console.log(err);
  }
};

const controlPagination = function(goToPage) {
  // Render NEW Recipe
  resultView.render(model.getSearchResultsPage(goToPage));

  // 4) render NEW pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update Serving
   model.updateServings(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmarks = function() {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const init = function() {
recipeView.addHandlerRender(controlRecipe);
recipeView.addHandlerUpdateServings(controlServings);
recipeView.addHandlerBookMarks(controlAddBookmarks);
searchView.addHandlerSearch(controlSearchResult);
paginationView.addHandlerClick(controlPagination);
}
init();