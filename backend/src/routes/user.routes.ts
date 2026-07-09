import { Router } from "express";
import { isAdmin } from "../middlewares/role.middleware";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { getAdminUsers, getUser, getUsers, handleBookmarks, handleFollowUnfollow, handleUpdateAvatar, handleUpdateUser } from "../controllers/user.controller";
import { validateGetAdminUsers, validatePagination, validateSortOption, validateUser, validateUserAvatar } from "../middlewares/validation.middleware";
import { validateObjectId } from "../middlewares/validateObjectId.middleware";
import { uploadAvatar } from "../middlewares/upload.middleware";

const router = Router();
router.get("/", validatePagination, validateSortOption, getUsers)
router.get("/admin", isAuthenticated, isAdmin, validateGetAdminUsers, validatePagination, validateSortOption, getAdminUsers)

// routes
router.get("/:id", validateObjectId(["id"], "params"), getUser)
router.use(isAuthenticated)

// authenticated routes
router.patch("/:id", validateObjectId(["id"], "params"), validateUser, handleUpdateUser)
router.patch("/:id/avatar", validateObjectId(["id"], "params"), uploadAvatar.single("avatar"), validateUserAvatar, handleUpdateAvatar)
router.patch("/:id/follow", validateObjectId(["id"], "params"), handleFollowUnfollow)
router.patch("/:postId/bookmark", validateObjectId(["postId"], "params"), handleBookmarks)
// admin routes

export default router