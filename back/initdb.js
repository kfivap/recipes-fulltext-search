const knex = require('knex')(require('./knexfile'));
const recipesRaw = require('./raw-data/recipes.json')

async function main() {

    for (const recipe of recipesRaw) {
        const newRecipe = await knex('recipes').insert({
            rate: recipe.rate,
            author_tip: recipe.author_tip,
            budget: recipe.budget,
            prep_time: recipe.prep_time,
            name: recipe.name,
            author: recipe.author,
            difficulty: recipe.difficulty,
            people_quantity: recipe.people_quantity,
            cook_time: recipe.cook_time,
            total_time: recipe.total_time,
            image: recipe.image,
            nb_comments: recipe.nb_comments,
            tags: recipe.tags,
        }).returning('id')
        console.log(newRecipe)
        const recipeId = newRecipe[0].id
        //    return
        for (const ingredient of recipe.ingredients) {
            const newIng = await knex.raw(`
            INSERT INTO ingredients (name) values (?)
                ON CONFLICT (name) DO UPDATE 
                SET name = excluded.name RETURNING id`, [ingredient]);

            const ingredientId = newIng.rows[0].id

            // SELECT name, to_tsvector('french', name) FROM ingredients ;
// SELECT name, to_tsvector('french', name) FROM ingredients WHERE to_tsvector('french', name) @@ to_tsquery('french', 'tomates | oignons');
            await knex('recipes_ingredients').insert({ recipe_id: recipeId, ingredient_id: ingredientId })
            // await
        }
        console.log({ recipeId })
        // return
    }
}

main()