import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import BlogForm from '../shared/BlogForm'
import { updateBlogSuccess, updateBlogFailure } from '../shared/AutoDismissAlert/messages'

const EditBlogModal = (props) => {
    const {
        user, show, handleClose,
        updateBlog, msgAlert, triggerRefresh
    } = props

    const [blog, setBlog] = useState(props.blog)

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

        updateBlog(user, blog)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success: Blog updated',
                    message: updateBlogSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() =>
                msgAlert({
                    heading: 'Failure: Blog failed to update!',
                    message: updateBlogFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Edit this Blog!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <BlogForm
                    blog={blog}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update this Post"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditBlogModal