import { Router } from "express";

import { findByUsername } from "../utils/db.js";
import { compareWithHashed } from "../utils/hash.js";
import { makeToken } from "../utils/token.js";

const router = Router();

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) return res.status(400).json({error: "Invalid username or password"}); 
    const u = findByUsername(username);
    if(!u) return res.status(401).json({error: "Invalid username or password"});
    const check = await compareWithHashed(password, u.passwordHash);
    if(!check) return res.status(401).json({error: "Invalid username or password"});
    const { passwordHash, ...p } = u;
    res.json({token: makeToken(p)});
});

export default router;