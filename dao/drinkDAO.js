import mongoDB, { ObjectId } from "mongodb"

/*
Get recipe by ID
Get all recipes
Get recipes by ingredient(s)
Get recipes by category
*/

let drink

export default class DrinkDAO {
    static async injectDB(conn) {
        if (drink) {
            return
        } try {
            drink = await conn.db(process.env.NOTABARTENDER_NS).collection("Drink")
        } catch {
            console.error(
                `Unable to establish connection to "Drink" collection: ${e}`
            )
        }
    }

    static async getDrinks({
        filters = null,
        page = 0,
        drinksPerPage = 20,
    } = {}) {
        let query
        let pipeline
        if (filters) {
            if ("name" in filters) {
                pipeline = [
                    {
                        $search: {
                            index: 'textSearch',
                            text: {
                                query: filters["name"],
                                path: {
                                    wildcard: "*"
                                }
                            }
                        }
                    },
                    {
                        "$sort": {
                            "Name": 1
                        }
                    }
                ]
            } else if ("category" in filters) {
                query = {
                    "Category": {
                        "$eq": filters["category"]
                    }
                }
            } else if ("ingredients" in filters) {
                let ingredients = filters["ingredients"].split(",")
                console.log(ingredients)
                if ("exclusive" in filters) {
                    query = {
                        "Ingredients": {
                            "$not": {
                                "$elemMatch": {
                                    "Name": {
                                        "$nin": ingredients
                                    }
                                }
                            }
                        }
                    }
                } else {
                    query = {
                        "Ingredients.Name": {
                            "$in": ingredients
                        }
                    }
                }
            }
        }
        let cursor
        try {
            if (pipeline) {
                cursor = await drink.aggregate(pipeline)
            } else {
                cursor = await drink.find(query).sort({"Name": 1})
            }
        } catch (e) {
            console.error(`Unable to complete find command: ${e}`)
            return {drinkList: [], totalDrinks: 0}
        }
        const displayCursor = cursor.limit(drinksPerPage).skip(drinksPerPage * page)
        try {
            const drinkList = await displayCursor.toArray()
            let totalDrinks
            if (pipeline) {
                totalDrinks = drinkList.length
            } else {
                totalDrinks = await drink.countDocuments(query)
            }
            return {drinkList, totalDrinks}
        } catch (e) {
            console.error(
                `Unable to convert cursor: ${e}`
            )
            return {drinkList: [], totalDrinks: 0}
        }
    }

    static async getDrink(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: ObjectId(id),
                    },
                },
                {
                    $lookup: {
                        from: "Comment",
                        let: {
                            id: "$_id",
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$drinkID", "$$id"],
                                    },
                                },
                            },
                            {
                                $sort: {
                                    date: -1,
                                },
                            },
                        ],
                        as: "Comment",
                    },
                },
                {
                    $addFields: {
                        Comment: "$Comment",
                    },
                },
            ]
            return await drink.aggregate(pipeline).next()
        } catch (e) {
            console.error(
                `Unable to retrieve drink by ID: ${e}`
            )
            throw e
        }
    }

    static async getIngredients() {
        let ingredients = []
        try {
            ingredients = await drink.distinct("Ingredients.Name")
            return ingredients
        } catch (e) {
            console.error(`Unable to retrieve ingredients: ${e}`)
        }
    }

    static async getCategories() {
        let categories = []
        try {
            categories = await drink.distinct("Category")
            return categories
        } catch (e) {
            console.error(`Unable to retrieve ingredients: ${e}`)
        }
    }
}