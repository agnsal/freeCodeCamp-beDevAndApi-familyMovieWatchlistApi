import jwt from "jsonwebtoken";

const makeToken = payload => jwt.sign(payload, process.env.JWT_SECRET);

const checkToken = token => {
    try{
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
        return null;
    }
};

export { makeToken, checkToken };
