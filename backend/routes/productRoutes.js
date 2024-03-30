import express from "express";
import {
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    productPhotoController,
    updateProductController,
} from "../controllers/productController.js";
import { requireSignIn, isAdmin, isUser, IsAdmin } from "../Middleware/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
    "/create-product",

    formidable(),
    createProductController
);
//routes
router.put(
    "/update-product/:pid",
    
    formidable(),
    updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

export default router;