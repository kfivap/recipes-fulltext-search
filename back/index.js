const knex = require('knex')(require('./knexfile'));

const maxNotStatedIngredients = 5

async function findRecipe(ingredients) {
    const sqlIngredients = ingredients.join('|')
    // const result = await knex.raw(`
    // SELECT ingredients.id as ingredient_id, ingredients.name as ingredient_name, to_tsvector('french', ingredients.name), recipes_ingredients.*
    // FROM ingredients 
    // LEFT JOIN recipes_ingredients ON ingredients.id = recipes_ingredients.ingredient_id
    // WHERE to_tsvector('french', ingredients.name) @@ to_tsquery('french', '${ingredients}') 
    // `);
    const recipesIdsResult = await knex.raw(`
    SELECT ARRAY(
        SELECT DISTINCT(recipes_ingredients.recipe_id)
    FROM ingredients 
    LEFT JOIN recipes_ingredients ON ingredients.id = recipes_ingredients.ingredient_id
    WHERE to_tsvector('french', ingredients.name) @@ to_tsquery('french', '${sqlIngredients}') 
    )
    `); //returns array of recipes_ids matching query
    const result = await knex.raw(`
    SELECT id, r.name as rec_name, t.ing_array, array_length(t.ing_array, 1)
    FROM recipes r
    JOIN (
        SELECT rec_ing.recipe_id as id, array_agg(i.name) as ing_array
        FROM recipes_ingredients rec_ing
        JOIN ingredients i on i.id = rec_ing.ingredient_id
        GROUP BY rec_ing.recipe_id
    ) t USING(id)
    WHERE array_length(t.ing_array, 1) <= ${ingredients.length + maxNotStatedIngredients} AND r.id in (${recipesIdsResult.rows[0].array.slice(0, 10)}) 
    ORDER BY array_length(t.ing_array, 1) ASC
    `)
    //returns array of recipes where id in recipesIds and ingredients length less than ingredients + maxNotStatedIngredients
    // order by less ingredients

    return result.rows
}

async function main() {
    const result = await findRecipe(['Oeuf', 'fromage', 'sel', 'oignons'])
    console.log(result)
}

main()