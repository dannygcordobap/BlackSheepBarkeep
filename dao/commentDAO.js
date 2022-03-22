import { ObjectID } from "bson"
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let comment

export default class CommentDAO {
    static async injectDB(conn) {
        if (comment) {
            return
        } try {
            comment = await conn.db(process.env.NOTABARTENDER_NS).collection("Comment")
        } catch {
            console.error(
                `Unable to estblish connection to "Comment" collection: ${e}`
            )
        }
    }

    static async addComment(drinkID, user, text, date) {
        try {
            const commentDoc = {
                name: user.name,
                userID: user._id,
                date: date,
                text: text,
                replies: [],
                drinkID: drinkID ? ObjectId(drinkID) : null,
                edited: false
            }
            return await comment.insertOne(commentDoc)
        } catch (e) {
            console.error(`Unable to post comment: ${e}`)
            return {error: e}
        }
    }

    static async updateComment(commentID, userID, text, date) {
        try {
            const response = await comment.updateOne(
                {_id: ObjectId(commentID), user_id: userID},
                {$set: {text: text, date: date, edited: true}}
            )
            return response
        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return {error: e}
        }
    }

    static async deleteComment(commentID, userID) {
        try {
            const response = await comment.updateOne(
                {_id: ObjectId(commentID), user_id: userID},
                {$set: {text: "[deleted]", date: date, edited: true}}
            )
            return response
        } catch (e) {
            console.error(`Unable to "delete" comment: ${e}`)
            return {error: e}
        }
    }

    static async addReply(commentID, user, text, date) {
        let objectID
        try {
            const response = await this.addComment(null, user, text, date)
            objectID = response.insertedId
        } catch (e) {
            console.error(`Unable to create reply: ${e}`)
            return {error: e}
        }
        try {
            const response = await comment.updateOne(
                {_id: ObjectId(commentID)},
                {$push: {replies: {replyID: objectID}}}
            )
            return response
        } catch (e) {
            console.error(`Unable to update parent: ${e}`)
        }
    }
}