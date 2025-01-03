import { request } from "express";
import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import ProductModel from "../models/product.model.js";


export async function addCategoryController(request, response) {
    try {
        const { name, image } = request.body;
        if (!name || !image) {
            return response.status(400).json({
                message: "Enter required fileds",
                error: true,
                success: false
            })
        }
        const addCategory = new CategoryModel({
            name, image
        });
        const saveCategory = await addCategory.save();
        console.log(saveCategory);
        if (!saveCategory) {
            return response.status(500).json({
                message: "Not Created",
                error: true,
                success: false,

            })
        }
        return response.json({
            message: "Add category",
            data: saveCategory,
            success: true,
            error: false

        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        })
    }

}



export async function getCategoryController(request, response) {
    try {
        const category = await CategoryModel.find();
        return response.json({
            message: "Get category successfully",
            data: category,
            success: true,
            error: false,
        });


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        })
    }
}

export async function updateCategoryController(request, response) {
    try {
        const { categoryId, name, image } = request.body;
        const update = await CategoryModel.updateOne({ _id: categoryId }, {
            name,
            image
        });
        return response.json({
            message: "Update Category",
            success: true,
            error: false,
            data: update,
        })


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        })
    }
}

export async function deleteCategoryController(request, response) {
    try {
        const { _id } = request.body;
        const checkSubCategory = await SubCategoryModel.find({
            category: {
                "$in": [_id]
            }
        }).countDocuments()
        const checkProduct = await ProductModel.find({
            category: {
                "$in": [_id]
            }
        }).countDocuments()
        if (checkSubCategory > 0 || checkProduct > 0) {
            return response.status(400).json({
                message: "Category is already use can't delete",
                success: false,
                error: true,
            })
        }
        const deleteCategory = await CategoryModel.deleteOne({ _id: _id });
        return response.json({
            message: "Delete category successfully",
            success: true,
            error: false,
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        })
    }


}