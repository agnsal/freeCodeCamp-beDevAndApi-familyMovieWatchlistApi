import { Router } from "express";

import { authorizeModification } from "../middleware/authorize.js";
import { getWatchlist, addMovie, updateMovie, deleteMovie } from "../utils/db.js";

const router = Router();

router.get("/:userId", (req, res) => res.json({watchlist: getWatchlist(Number(req.params.userId))}));

router.post("/:userId/movies", authorizeModification, (req, res) => {
    addMovie(Number(req.params.userId), req.body);
    res.status(201).json();
});

router.route("/:userId/movies/:movieId")
.put(authorizeModification, (req, res) => {
    updateMovie(Number(req.params.userId), Number(req.params.movieId), req.body);
    res.status(200).json({message: "Updated"});
})
.delete(authorizeModification, (req, res) => {
    deleteMovie(Number(req.params.userId), Number(req.params.movieId));
    res.status(200).json({message: "Deleted"});
});

export default router;
