import apiUrl from '../apiConfig'
import axios from 'axios'


// GET - INDEX
export const getAllBlogs = () => {
    return axios(`${apiUrl}/blogs`)
}

// GET - SHOW
export const getOneBlog = (id) => {
    return axios(`${apiUrl}/blogs/${id}`)
}

// POST - CREATE
// need an api call that accepts a token
export const createBlog = (user, newBlog) => {
    console.log('createBlog user', user)
    // in our createPet form, we're building an object
    // when we pass that object into the api createPet function, 
    // it's going to look like the pets in our database
    // we're going to refer to this as newBlog
    // console.log('this is user', user)
    // console.log('this is the new Blog', newBlog)
    return axios({
        url: apiUrl + '/blogs',
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { blog: newBlog },
    })
}

// PATCH - UPDATE

// please put update function here lyndonna
export const updateBlog = (user, updatedBlog) => {
    console.log('update blog function ran')
        return axios({
            url: `${apiUrl}/blogs/${updatedBlog.id}`,
            method: 'PATCH',
            headers: {
                Authorization: `Token token=${user.token}`,
            },
            data: { blog: updatedBlog },
        })
    }

// DELETE - DESTROY - hey I'll work on this -kyle
export const removeBlog = (user, blogId) => {
    return axios({
        url: `${apiUrl}/blogs/${blogId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}