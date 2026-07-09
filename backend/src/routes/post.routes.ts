import { Router } from "express";
import { addPost, getPost, getPosts, getPostsByAuthor, handleDeletePost, getPostsByCategory, handleUpdatePost, likePost, getAdminPosts } from "../controllers/post.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { validateSortOption, validatePagination, validatePost, validateUpdatePost, validateGetAdminPosts } from "../middlewares/validation.middleware";
import { validateObjectId } from "../middlewares/validateObjectId.middleware";
import { isAdmin } from "../middlewares/role.middleware";

const router = Router();
router.get("/admin", isAuthenticated, isAdmin, validateGetAdminPosts, validatePagination, validateSortOption, getAdminPosts)
router.get("/", validatePagination, validateSortOption, getPosts)
router.get("/author/:authorId", validateObjectId(["authorId"], "params"), validatePagination, getPostsByAuthor)
router.get("/category/:categoryId", validateObjectId(["categoryId"], "params"), validatePagination, getPostsByCategory)
router.get("/:id", validateObjectId(["id"], "params"), getPost)
// athenticated routes
router.use(isAuthenticated)
router.patch("/like/:id", validateObjectId(["id"], "params"), likePost)

router.post("/", validatePost, addPost)
router.patch("/:id", validateObjectId(["id"], "params"), validateUpdatePost, handleUpdatePost)
router.delete("/:id", validateObjectId(["id"], "params"), handleDeletePost)

export default router