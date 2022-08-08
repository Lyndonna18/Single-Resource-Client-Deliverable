import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CommentForm from '../shared/CommentForm'
import { updateComment} from '../../api/comments'


const EditCommentModal = (props) => {
    const {
        user, blog, show, handleClose, msgAlert, triggerRefresh
    } = props
    const [comment, setComment] = useState(props.comment)
    const handleChange = (e) => {
        setComment(prevComment => {
            let value = e.target.value
            const body = e.target.name
            const updatedComment = {
                [body]: value
            }
            return {
                ...prevComment,
                ...updatedComment
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateComment(user, blog._id, comment)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'Great! Message set',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong, please try again',
                    variant: 'danger'
                })
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
                    heading="Update this comment"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditCommentModal