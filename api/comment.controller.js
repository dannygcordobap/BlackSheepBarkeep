import { response } from "express"
import CommentDAO from "../dao/commentDAO.js"

export default class CommentController {
    static async apiPostComment(req, res, next) {
        try {
            const drinkID = req.body.drinkID
            const comment = req.body.text
            const user = {
                name: req.body.name,
                _id: req.body.userID
            }
            const date = new Date()
            const response = await CommentDAO.addComment(
                drinkID, user, comment, date
            )
            res.json({status: "Success"})
        } catch(e) {
            res.status(500).json({error: e.message})
        }
    }

    static async apiUpdateComment(req, res, next) {
        try {
            const commentID = req.body.commentID
            const comment = req.body.text
            const date = new Date()
            const response = await CommentDAO.updateComment(
                commentID, req.body.userID, comment, date
            )
            var {error} = response
            if (error) {
                res.status(400).json({error})
            }
            if (response.modifiedCount == 0) {
                throw new Error (`Unable to update comment: ${e}`)
            }
            res.json({status: "Success"})
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteComment(req, res, next) {
        try {
            const commentID = req.query._id
            const userID = req.body.userID
            console.log(commentID)
            const response = await CommentDAO.deleteComment(
                commentID, userID
            )
            res.json({status: "Success"})
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    static async apiAddReply(req, res, next) {
        try {
            const commentID = req.params.id
            const text = req.body.text
            const user = {
                name: req.body.name,
                _id: req.body.userID
            }
            const date = new Date()
            const response = await CommentDAO.addReply(
                commentID, user, text, date
            )
            res.json({status: "Success"})
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }
}