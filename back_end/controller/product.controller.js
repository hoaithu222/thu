import ProductModel from "../models/product.model.js";

export async function createProductController(request, response) {

    try {
        const { name, image, category, subCategory, unit, stock, price, discount, description, more_details } = request.body;
        if (!name || !image[0] || !category[0] || !subCategory[0] || !unit || !stock || !price || !discount || !description || !more_details) {
            return response.status(400).json({
                message: "Vui long nhập đủ thông tin",
                error: true,
                success: false,
            })
        }
        const product = new ProductModel({
            name, image, category, subCategory, unit, stock, price, discount, description, more_details
        });
        const saveProduct = await product.save();
        return response.json({
            message: "Đã tạo sản phẩm thành công",
            data: saveProduct,
            error: false,
            success: true
        })


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}



export async function getProductController(request, response) {
    try {
        let { page, limit, search } = request.body;

        if (!page) {
            page = 1;
        }
        if (!limit) {
            limit = 10;
        }

        // Build the search query
        let query = {};
        if (search && search.trim()) {
            // Using regex for case-insensitive search across multiple fields
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                    // Add other fields you want to search
                ]
            };
        }

        let skip = (page - 1) * limit;

        const [data, totalCount] = await Promise.all([
            ProductModel.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            ProductModel.countDocuments(query) // Apply same query for count
        ]);

        return response.json({
            message: "Product data",
            error: false,
            success: true,
            totalCount: totalCount,
            totalNoPage: Math.ceil(totalCount / limit),
            data: data
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}