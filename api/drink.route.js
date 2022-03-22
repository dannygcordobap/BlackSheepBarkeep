import { Router } from "express";
import DrinkController from "./drink.controller.js";
import CommentController from "./comment.controller.js";

const router = Router()
router.route("/").get(DrinkController.apiGetDrinks)
router.route("/id/:id").get(DrinkController.apiGetDrinkByID)
router.route("/ingredients").get(DrinkController.apiGetIngredients)
router.route("/categories").get(DrinkController.apiGetCategories)
router.route("/comment")
    .post(CommentController.apiPostComment)
    .put(CommentController.apiUpdateComment)
    .delete(CommentController.apiDeleteComment)
router.route("/comment/:id/reply").post(CommentController.apiAddReply)
export default router
/*
Get recipe by ID
Get all recipes
Get recipes by ingredient(s)
Get recipes by category
*/