const knex = require('knex')(require('./knexfile'));
const INGREDIENTS = 'ingredients'
const RECIPES = 'recipes'

async function findRecipe(ingredients) {
    ingredients = ingredients.join('|')
    const result =await knex.raw(`
    SELECT ingredients.id as ingredient_id, ingredients.name as ingredient_name, to_tsvector('french', ingredients.name), recipes_ingredients.*, recipes.* 
    FROM ingredients 
    LEFT JOIN recipes_ingredients ON ingredients.id = recipes_ingredients.ingredient_id
    LEFT JOIN recipes ON recipes_ingredients.recipe_id = recipes.id
    WHERE to_tsvector('french', ingredients.name) @@ to_tsquery('french', '${ingredients}') 
    `);
    console.log(ingredients)
    return result.rows
}

async function main() {
    const result = await findRecipe(['tomates', 'oignons'])
    console.log(result)
}

main()