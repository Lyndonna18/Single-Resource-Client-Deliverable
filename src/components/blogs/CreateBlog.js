import { useState } from "react"
import { createBlog } from "../../api/blogs"
import { useNavigate } from "react-router-dom"
import { createBlogSuccess, createBlogFailure } from "../shared/AutoDismissAlert/messages"
import BlogForm from "../shared/BlogForm"

const CreateBlog = (props) => {
    // console.log('these are the props in createBlog\n', props)
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [blog, setBlog] = useState({
        title: '',
        body: '',
    })

    console.log('this is blog in createBlog', blog)

    const handleChange = (e) => {
        setBlog(prevBlog => {
            let updatedValue = e.target.value
            const updatedName = e.target.name


            const updatedBlog = {
                [updatedName]: updatedValue
            }
            return {
                ...prevBlog,
                ...updatedBlog
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()
        createBlog(user, blog)
            // if we're successful, navigate to the show page for the new blog
            // .then(res => console.log('this is the response from API call', res))
            // .then(res => console.log('this is the id of the new blog', res.data.blog.id))
            .then(res => { navigate(`/blogs/${res.data.blog.id}`) })
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createBlogSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: createBlogFailure,
                    variant: 'danger'
                })
            )
    }


    return <BlogForm
        blog={blog}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
    />
}
export default CreateBlog