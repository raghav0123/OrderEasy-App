import categoryModel from "../models/categoryModel.js";
import slugify from 'slugify'
export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: "Name is required" });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: false,
                message: "Category Already Exisits",
            });
        }
        const category = await new categoryModel({
            name,
            slug: slugify(name),
        }).save();
        res.status(201).send({
            success: true,
            message: "new category created",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            errro,
            message: "Errro in Category",
        });
    }
};
//UPDATE CATEGORY CONTROLLER
export const updateCategoryController = async (req, res) => {
    try {

        const category = await categoryModel.find({});
        //exisiting user


        res.status(201).send({
            success: true,
            message: "ALL Categories List",
            category,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while getting all categories",
            error,
        })
    }
}
//GET ALL CAT
export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});

        res.status(201).send({
            success: true,
            message: "get all category succesfully",
            category,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while getting all categories",
            error,
        })
    }
}
//SINGLE CATEGORY
export const singleCategoryController = async (req, res) => {
    try {


        const category = await categoryModel.findOne({ slug: req.params.slug });
        //exisiting user


        res.status(201).send({
            success: true,
            message: "get single category succesfully",
            category,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while getting single categories",
            error,
        })
    }
}
//DELETE CATEGORY
export const deleteCategoryController = async (req, res) => {
    try {

        const { id } = req.params
        const category = await categoryModel.findByIdAndDelete(id);
        //exisiting user


        res.status(201).send({
            success: true,
            message: " category deleted succesfully",
            category,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while deleting  category",
            error,
        })
    }
}