export const baseURL = import.meta.env.VITE_SERVER_API;


const SummaryApi = {
    register: {
        url: `/api/user/register`,
        method: "post",
    },
    verifyEmail: {
        url: `/api/user/verify-email`,
        method: "post",
    },
    login: {
        url: `/api/user/login`,
        method: "post",
    },
    logout: {
        url: `/api/user/logout`,
        method: "get",
    },
    uploadAvatar: {
        url: `/api/user/upload-avatar`,
        method: "put",
    },
    updateUserDetails: {
        url: `/api/user/update-details`,
        method: "put",
    },
    forgotPassword: {
        url: `/api/user/forgot-password`,
        method: "put"
    },
    verifyPasswordOtp: {
        url: `/api/user/verify-forgot-password-otp`,
        method: "put"
    },
    resetPassword: {
        url: `/api/user/reset-password`,
        method: "put"
    },
    refreshToken: {
        url: `/api/user/refresh-token`,
        method: "post"
    },
    getProfile: {
        url: `api/user/user-details`,
        method: "get"
    },
    addCategory: {
        url: `/api/category/add-category`,
        method: "post",
    },
    updateCategory: {
        url: `/api/category/update-category`,
        method: "put",
    },
    uploadImage: {
        url: `/api/file/upload`,
        method: 'post'
    },
    getCategory: {
        url: `/api/category/get-category`,
        method: "get",
    },
    deleteCategory: {
        url: `/api/category/delete`,
        method: "delete",
    },
    addSubCategory: {
        url: `/api/subCategory/add-subCategory`,
        method: "post",
    },
    getSubCategory: {
        url: `/api/subCategory/get`,
        method: "get",
    },
    updateSubCategory: {
        url: `/api/subCategory/update`,
        method: "put",
    },
    deleteSubCategory: {
        url: `/api/subCategory/delete`,
        method: "delete",
    },
    createProduct: {
        url: `/api/product/create`,
        method: "post"
    },
    getProduct: {
        url: `/api/product/get`,
        method: "post"
    }

}
export default SummaryApi; 