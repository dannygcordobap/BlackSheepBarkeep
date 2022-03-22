import DrinkDAO from "../dao/drinkDAO.js";

export default class DrinkController {

    static async apiGetDrinks(req, res, next) {
        const drinksPerPage = req.query.drinksPerPage ? parseInt(req.query.drinksPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0
        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name
        } else if (req.query.category) {
            filters.category = req.query.category
        } else if (req.query.ingredients) {
            filters.ingredients = req.query.ingredients
        }
        if (req.query.exclusive) {
            filters.exclusive = req.query.exclusive
        }
        const {drinkList, totalDrinks} = await DrinkDAO.getDrinks({
            filters, page, drinksPerPage
        })
        let response = {
            recipes: drinkList,
            page: page,
            filters: filters,
            entriesPerPage: drinksPerPage,
            count: totalDrinks
        }
        res.json(response)
    }

    static async apiGetDrinkByID(req, res, next) {
        try {
            let id = req.params.id || {}
            let drink = await DrinkDAO.getDrink(id)
            if (!drink) {
                res.status(404).json({error: "Page not found"})
            }
            res.json(drink)
        } catch (e) {
            console.log(`API unable to retrieve drink: ${e}`)
            res.status(500).json({error: e})
        }
    }

    static async apiGetIngredients(req, res, next) {
        try {
            let ingredients = await DrinkDAO.getIngredients()
            res.json(ingredients)
        } catch (e) {
            console.log(`API unable to retrieve ingredients: ${e}`)
            res.status(500).json({error: e})
        }
    }

    static async apiGetCategories(req, res, next) {
        try {
            let ingredients = await DrinkDAO.getCategories()
            res.json(ingredients)
        } catch (e) {
            console.log(`API unable to retrieve categories: ${e}`)
            res.status(500).json({error: e})
        }
    }
}