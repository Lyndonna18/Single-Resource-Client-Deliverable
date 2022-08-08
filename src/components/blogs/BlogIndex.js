import { useState, useEffect } from "react";
import messages from '../shared/AutoDismissAlert/messages'
import { Card, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { getAllBlogs } from "../../api/blogs";

const cardContainerStyle = {
    background: '#050d17ff',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    fontFamily: 'Marcellus, serif'
}

// BlogIndex should show all blogs and display them

const BlogIndex = (props) => {
    console.log("watermelon sugar", props)
    const [blogs, setBlogs] = useState(null)
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const { msgAlert } = props
    useEffect(() => {
        getAllBlogs()
            .then(res => setBlogs(res.data.blogs))
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.getBlogsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])
    if (error) {
        return <p>Error!</p>
    }

    // If blogs haven't been loaded yet, show a loading message
    if (!blogs) {
        return <LoadingScreen />
    } else if (blogs.length === 0) {
        return <p>No blogs yet. Better add some.</p>
    }
    console.log("blog being indexed", blogs)

    console.log("blogs in index page", blogs)
    const blogCards = blogs.map(blog => (
        <Card style={{ width: '30%', margin: 5 }} key={blog.id}>
            <Card.Header style={{backgroundColor: '#3d0c02ff', color: '#fef4ecff'}}>{blog.title}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <p>{blog.body}</p>
                    {/* <p>{blog.owner}</p> */}
                </Card.Text>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right", backgroundColor: '#0a2733ff', color: '#fef4ecff' }}>

                {/* this allows display of post author OR anon depending */}
                {blog.owner
                ?
                <h5>{blog.owner.username}</h5>
                :
                <h5>Anonymous</h5>}

                <p style={{ textAlign: 'left', fontFamily: 'Cinzel, serif', fontWeight: '500' }}>{blog.commentsAvail}</p>
                {/* <Link to={`/blogs/${blog.id}`}>View this ok</Link> */}
                <Button
                    style={{backgroundColor: '#f4a460ff', color: '#050d17ff', border: '#fef4ecff'}}
                    onClick={() => navigate(`/blogs/${blog.id}`)}
                >
                    View this post
                </Button>
            </Card.Footer>
        </Card>
    ))

    return (
        <div style={cardContainerStyle}>
            {blogCards}
        </div>
    )
}
export default BlogIndex