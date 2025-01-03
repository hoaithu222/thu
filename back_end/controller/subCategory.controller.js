import SubCategoryModel from "../models/subCategory.model.js";


export async function addSubCategoryController(request, response) {
    try {
        const { name, image, category } = request.body;
        if (!name && !image && !category[0]) {
            return response.status(400).json({
                message: "Provider name,image,category",
                error: true,
                success: false
            })
        }
        const payload = {
            name,
            image,
            category,
        }

        const createSubCategory = new SubCategoryModel(payload);
        const save = await createSubCategory.save();


        return response.json({
            message: "Sub Category Create Successfully",
            success: true,
            error: false,
            data: save
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        })
    }

}

export async function getSubCategoryController(request, response) {
    try {
        const allSubCategory = await SubCategoryModel.find().sort({ createdAt: -1 }).populate('category')

        return response.json({
            message: "Sub category data",
            data: allSubCategory,
            error: false,
            success: true,
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        })
    }
}

export async function updateSubCategoryController(request, response) {
    try {
        const { _id, name, image, category } = request.body;
        const checkSub = await SubCategoryModel.findById(_id);
        if (!checkSub) {
            return response.status(400).json({
                message: "check your _id",
                success: false,
                error: true,
            })
        }
        const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id, {
            name,
            image,
            category
        })
        return response.json({
            message: "Update subcategory successfully",
            data: updateSubCategory,
            success: true,
            error: false,
        })

    }
    catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        })
    }
}


export async function deleteSubCategoryController(request, response) {
    try {
        const { _id } = request.body;
        const deleteSub = await SubCategoryModel.findByIdAndDelete(_id);
        return response.json({
            message: "Delete successfully",
            data: deleteSub,
            error: false,
            success: true
        })

    }
    catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        })
    }

}