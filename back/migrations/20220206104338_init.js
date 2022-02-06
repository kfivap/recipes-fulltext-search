
exports.up = async function (knex) {
    await knex.schema.createTable('recipes', t => {
        t.increments('id').primary();
        t.text('name')
        t.string('rate')
        t.string('author_tip')
        t.string('budget')
        t.string('prep_time')
        t.string('author')
        t.string('difficulty')
        t.string('people_quantity')
        t.string('cook_time')
        t.specificType('tags', 'text ARRAY');
        t.string('total_time')
        t.text('image')
        t.string('nb_comments')
    });
    await knex.schema.createTable('ingredients', t => {
        t.increments('id').primary();
        t.text('name').unique()
    });
    await knex.schema.createTable('recipes_ingredients', t => {
        t.integer('recipe_id')
        t.integer('ingredient_id')
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTable('recipes')
    await knex.schema.dropTable('ingredients')
    await knex.schema.dropTable('recipes_ingredients')
};
