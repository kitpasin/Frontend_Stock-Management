import axios from "axios";

export const svCreateProduct = async (form) => {
    try {
        const res = await axios.post('product/create', form);
        return { status: true, data: res.data.data, message: "Product has been created successfully." };
    } catch (err) {
        return { status: false, description: "Something went wrong.", errorMessage: err.response.data };
    }
}