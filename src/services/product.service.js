import axios from "axios";

export const svCreateProduct = async (form) => {
    try {
        const res = await axios.post('product/create', form);
        return { status: true, data: res.data.data, message: "Product has been created successfully." };
    } catch (err) {
        return { status: false, description: "Something went wrong.", errorMessage: err.response.data };
    }
}

export const svProductAll = async () => {
    try {
        const res = await axios.get('productAll');
        return { status: true, data: res.data.data, message: "Get all products success." };
    } catch (err) {
        return { status: false, description: "Something went wrong.", errorMessage: err.response.data };
    }
}

export const svProductOne = async (_id) => {
    try {
        const res = await axios.get(`productOne?id=${_id}`);
        return { status: true, data: res.data.data, message: "Get product success." };
    } catch (err) {
        return { status: false, description: "Something went wrong.", errorMessage: err.response.data };
    }
}

export const svProductUpdate = async (_id, _form) => {
    try {
        const res = await axios.post(`product/update/${_id}`, _form);
        return { status: true, data: res.data.data, message: "Update product success." };
    } catch (err) {
        return { status: false, description: "Something went wrong.", errorMessage: err };
    }
}

export const svDeleteProduct = async (product_id) => {
    try {
        const res = await axios.delete(`product/delete/${product_id}`);
        return { status: true, data: res.data.data, message: "Delete product success." };
    } catch (err) {
        return { status: false, description: "Something went wrong.", errorMessage: err };
    }
}