import { checkToken } from "../utils/token.js";

const authenticate = (req, res, next) => {
    const t = req.headers.authorization?.split("Bearer ")?.[1]?.trim();
    if(!t) return res.status(401).json({error: "No token provided."});
    const tp = checkToken(t);
    if(!tp) return res.status(401).json({error: "Invalid or expired token."});
    req.user = tp;
    next();
};

export { authenticate };
