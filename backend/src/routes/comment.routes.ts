import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/role.middleware";
import { addComment, getCommentsByPost, getLatestComments, handleDeleteComment, likeComment } from "../controllers/comment.controller";
import { validateComment, validatePagination, validateSortOption } from "../middlewares/validation.middleware";
import { validateObjectId } from "../middlewares/validateObjectId.middleware";

const router = Router();

router.get("/:postId", validateObjectId(["postId"], "params"), validatePagination, getCommentsByPost)
router.use(isAuthenticated)
router.patch("/like/:id", validateObjectId(["id"], "params"), likeComment)
router.delete("/:id", validateObjectId(["id"], "params"), handleDeleteComment)
router.post("/", validateObjectId(["postId"], "body"), validateComment, addComment)
router.get("/", isAdmin, validateSortOption, validatePagination, getLatestComments)

export default router