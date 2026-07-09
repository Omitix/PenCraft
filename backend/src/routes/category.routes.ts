import { Router } from "express";
import { isAdmin } from "../middlewares/role.middleware";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { addCategory, getCategories, getCategory, getCategoryByTitle, handleDeleteCategory, handleUpdateCategory } from "../controllers/category.controller";
import { validateCategory, validateGetCategoryByTitle, validatePagination } from "../middlewares/validation.middleware";
import { validateObjectId } from "../middlewares/validateObjectId.middleware";

const router = Router();

router.get("/", validatePagination, getCategories)
router.get("/title/:title", validateGetCategoryByTitle, getCategoryByTitle)
router.get("/:id", validateObjectId(["id"], "params"), getCategory)
router.use(isAuthenticated, isAdmin)
router.delete("/:id", validateObjectId(["id"], "params"), handleDeleteCategory)
router.patch("/:id", validateObjectId(["id"], "params"), validateCategory, handleUpdateCategory)
router.post("/", validateCategory, addCategory)
export default router