import http from "../http-common.js";

class DrinkDataService {
    
    getAll(page=0) {
        console.log(http)
        return http.get(`drink?page=${page}`);
    }

    get(id) {
        return http.get(`drink/id/${id}`);
    }

    find(query, by = "name", exclusive = false, page = 0) {
        if (exclusive) {
            return http.get(`drink?${by}=${query}&exclusive=true&page=${page}`);
        }
        return http.get(`drink?${by}=${query}&page=${page}`);
    }

    createComment(data) {
        return http.post("drink/comment", data);
    }

    createReply(data, parentID) {
        return http.post(`drink/comment/${parentID}/reply`, data);
    }

    updateComment(data) {
        return http.put("drink/comment", data);
    }

    deleteComment(data, id) {
        return http.delete(`drink/comment?id=${id}`, data);
    }

    getCategories() {
        return http.get("drink/categories");
    }

    getIngredients() {
        return http.get("drink/ingredients");
    }
}

export default new DrinkDataService();