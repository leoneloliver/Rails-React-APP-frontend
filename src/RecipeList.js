import React, { useState, useEffect } from "react";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetch(
      "https://api.allorigins.win/raw?url=https://recipesapp.leoneloliver.repl.co/recipes.json"
    )
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [expandedRecipeId, setExpandedRecipeId] = useState(null);

  const togglePostVisibility = (recipeId) => {
    if (recipeId === expandedRecipeId) {
      setExpandedRecipeId(null);
    } else {
      setExpandedRecipeId(recipeId);
    }
  };

  return (
    <div className="container mx-auto max-w-screen-xl p-12">
      <h1 className="text-3xl font-bold underline text-clifford mt-4 mb-12">
        Recipes APP
      </h1>
      <div className="container mx-auto max-w-screen-xl flex flex-wrap grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow p-4"
          >
            <h2 className="h1-style text-2xl mb-4">{recipe.title}</h2>
            <img src={recipe.photo} className="img mb-4 mt-4" />

            {expandedRecipeId === recipe.id ? (
              <div>
                <p className="mb-3 p-2 bg-gray-100 text-sm">
                  <b>Ingredientes:</b>
                  <br />
                  {recipe.ingredientes}
                </p>
                <p className="mb-3 p-2 bg-gray-100 text-sm">
                  <b>Preparation:</b>
                  <br />
                  {recipe.preparation}
                </p>
                {/* <a href={`/recipe/${post.id}`}>Read Article</a> */}
              </div>
            ) : (
              <div>
                <p>{recipe.ingredientes.substring(0, 100)}...</p>
                <button
                  onClick={() => togglePostVisibility(recipe.id)}
                  className="mt-4 text-black bg-gray-200 hover:bg-gray-500 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                >
                  See More
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default RecipeList;
