import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CommentForm from '../shared/CommentForm'
import { createComment } from '../../api/comments'


const NewCommentModal = (props) => {
    const {
        user, blog, show, handleClose, msgAlert, triggerRefresh
    } = props

    const [comment, setComment] = useState({})

    console.log('blog in edit modal', blog)

    const handleChange = (e) => {
        setComment(prevComment => {
            let value = e.target.value
            const updatedbody = e.target.name

            // console.log('this is the input type', e.target.type)
            // console.log(updatedbody)
            // console.log("value", value)

            const updatedComment = {
                [updatedbody]: value
            }
            console.log("prev comment, updated comment", prevComment, updatedComment)
            return {
                ...prevComment,
                ...updatedComment
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        createComment(user, blog._id, comment)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'Comment added',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
                .catch((err) =>
                console.log(err)
                // msgAlert({
                //     heading: 'Oh No!',
                //     message: 'Something went wrong, please try again',
                //     variant: 'danger'
                // })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <CommentForm
                    comment={comment}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Comment on this post!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewCommentModal