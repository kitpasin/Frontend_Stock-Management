import axios from "axios";

export const getCategory = () => {
    return axios.get(`maincates`).then( 
      (res) => { return { status: true, data: res.data.mainCates }} , 
      (error) => { return { status: false, description: (!error.response.data)?"Something went wrong.": error.response.data.description } }
    )
}

export const svCreateCategory = (formData) => {
  return axios.post(`category/create`, formData).then( 
    (res) =>  { return { status: true, description: res.data.description }},
    (error) => { return { status: false, description: (!error.response.data)?"Something went wrong.": error.response.data.description } }
  )
}

export const svUpdateCategory = (id, formData) => {
  return axios.post(`category/update/${id}`, formData).then( 
    (res) =>  { return { status: true, description: res.data.description }},
    (error) => { return { status: false, description: (!error.response.data)?"Something went wrong.": error.response.data.description } }
  )
}

export const svDeleteCategoryByToken = (token,language) => {
  return axios.delete(`category/${language}/${token}`).then( 
    (res) =>  { return { status: true, description: res.data.description }},
    (error) => { 
      return { status: false, description: (!error.response.data)?"Something went wrong.": error.response.data.description } }
  )
}

 
