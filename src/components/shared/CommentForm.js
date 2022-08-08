import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const CommentForm = (props) => {
    const { comment, handleChange, handleSubmit} = props
    return (
        <Container className="justify-content-center">
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="text">Comment</Form.Label>
                <Form.Control
                    placeholder="Comment Here"
                    name="text"
                    id="text"
                    value={comment.text}
                    onChange={handleChange}
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default CommentForm