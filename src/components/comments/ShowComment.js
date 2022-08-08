import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import EditCommentModal from './EditCommentModal'
import { deleteComment } from '../../api/comments'

const ShowComment = (props) => {
    const { comment, blog, user, msgAlert, triggerRefresh } = props
    const [editModalShow, setEditModalShow] = useState(false)
    console.log("comment info", comment)

    const destroyComment = () => {
        deleteComment(user, blog._id, comment._id)
            .then(() =>
                msgAlert({
                    heading: 'Comment Deleted',
                    message: 'Bye bye comment!',
                    variant: 'success'
                }))
            .then(() => triggerRefresh())
            .catch(() =>
                msgAlert({
                    heading: 'Oh no!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                }))
    }
    return (
        <>
            {/* <Card className="m-2"> */}
                {/* This allows comments to show owner OR anon depending */}
                {/* <Card.Header>
                    {comment.owner
                    ?
                    <h5>{comment.owner.username}</h5>
                    :
                    <h5>Anonymous</h5>}
                </Card.Header> */}
            <Card className="m-2" style={{ fontFamily: 'Marcellus, serif' }}>
                <Card.Body>
                    <small>{comment.text}</small><br />
                </Card.Body>
                <Card.Footer>
                    {
                        user && user._id === blog.owner._id
                            ?
                            <>
                                <Button
                                    variant="warning"
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit Comment
                                </Button>
                                <Button
                                    onClick={() => destroyComment()}
                                    variant="danger"
                                >
                                    Delete Comment
                                </Button>
                            </>
                            :
                            null
                    }
                </Card.Footer>
            </Card>
            <EditCommentModal
                user={user}
                blog={blog}
                comment={comment}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowComment