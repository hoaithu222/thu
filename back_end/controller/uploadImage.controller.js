import uploadImageClodinary from "../utils/uploadImageClodinary.js";

const uploadImageController = async (request, response) => {
    try {
        const file = request.file;
        const uploadImage = await uploadImageClodinary(file);
        return response.json({
            message: "Upload image success",
            success: true,
            error: false,
            data: uploadImage,
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}
export default uploadImageController;