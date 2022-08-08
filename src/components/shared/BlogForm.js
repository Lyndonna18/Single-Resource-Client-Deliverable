import { Form, Button, Container, Row } from 'react-bootstrap'


const BlogForm = (props) => {
    const { blog, handleChange, handleSubmit } = props
    return (
        <Container className="justify-content-center mb-3">
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label 
                        htmlFor="title"
                        // style={{
                        //     fontSize: "30px",
                        //     textAlign: "center",
                        // }}
                    >
                        Please Title Your Post
                    </Form.Label>
                    <Form.Control
                        size="lg"
                        placeholder="Blog Title"
                        name="title"
                        id="title"
                        value={blog.title}
                        onChange={handleChange}
                    />
                    <Form.Label htmlFor="body">Blog</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={8}
                        style={{overflow: "auto"}}
                        // placeholder="Blog Body"
                        name="body"
                        id="body"
                        value={blog.body}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}
export default BlogForm