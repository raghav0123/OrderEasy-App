import express from "express";

import { requireSignIn, isAdmin, isUser, IsAdmin } from "../Middleware/authMiddleware.js";
import { deleteCategoryController, createCategoryController, updateCategoryController, categoryController, singleCategoryController } from "../controllers/CategoryController.js";

//ROUTER OBJECT
const router = express.Router();

//CREATE CATEGORY
router.post("/create-category", requireSignIn, createCategoryController)
//UPDATE CATEGORY
router.put("/update-category", requireSignIn, updateCategoryController)
//GET ALL CATEGORY
router.get("/get-category", categoryController)
//GET SINGLE CATEGORY
router.get("/single-category/:slug", singleCategoryController)
//DELETE CATEGORY
router.delete("/delete-category/:id", deleteCategoryController)
export default router;