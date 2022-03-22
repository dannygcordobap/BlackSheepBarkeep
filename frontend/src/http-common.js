import axios from "axios";

let baseURL = (process.env.NODE_ENV === "production") ? "https://blacksheepbarkeep.herokuapp.com" : `http://localhost:5000`;

export default axios.create({    
    baseURL: `${baseURL}/api/v1/`,
    headers: {
        "Content-type": "application/json"
    }
});