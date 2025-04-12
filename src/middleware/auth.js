import jwt from "jsonwebtoken"
import User from "../models/user.js";

const isAuthorized = async (req, res, next) => {

    // checking the token 
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ status: 401, message: "no token ! Login required" });
    }
    // decoding the token 
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // getting the user id from the token  
    const id = decodedUser.id;
    // finding if we have that user using the id 
    const loggedUser = await User.findById(id)
    if (!loggedUser) {
        return res.status(404).json({
            status: 404,
            message: "user not found!",
        })
    }
    // setting the user to the request to the logged in user (This is accesed grobally)
    req.user = loggedUser;
    next();

};

export default isAuthorized