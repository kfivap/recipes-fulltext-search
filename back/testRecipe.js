
let initIngredients = [
    'first', 'second', 'third'
]

initIngredients = initIngredients.map(ing => {
    return new RegExp(ing, '')
})

function checkRecipe(recipe) {
    for (const ing of recipe.ingredients) {
        let result = false
        for (const regex of initIngredients) {
            let res = regex.test(ing)
            // console.log(/first/gi.test('first'))
            console.log({ regex, ing, res })

            if (res) result = true
        }
        if (!result) return false
    }
    return true
}

console.log(checkRecipe({ ingredients: ['third', 'first one'] }))
console.log(checkRecipe({ ingredients: ['first', 'third'] }))