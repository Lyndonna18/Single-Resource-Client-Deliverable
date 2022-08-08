import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
// import { Link } from 'react-router-dom'

import { Container, Card, Button } from "react-bootstrap"

import LoadingScreen from "../shared/LoadingScreen"
// import this down here vv updateBlog,
import { getOneBlog, removeBlog, updateBlog } from "../../api/blogs"
import messages from '../shared/AutoDismissAlert/messages'
import EditBlogModal from "./EditBlogModal"
import ShowComment from '../comments/ShowComment'
import NewCommentModal from "../comments/NewCommentModal"

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowBlog = (props) => {
    const [blog, setBlog] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [commentModalShow, setCommentModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)
    let [likeCount, setLikeCount] = useState(0)
    let [dislikeCount, setDislikeCount] = useState(0)
    

    const { id } = useParams()
    const navigate = useNavigate()


    const { user, msgAlert } = props
    // console.log('user in props', user)

    useEffect(() => {
        getOneBlog(id)
            .then(res => setBlog(res.data.blog))
            .catch(err => {
                msgAlert({
                    heading: 'Error: request failed.',
                    message: messages.getBlogsFailure,
                    variant: 'danger',
                })
                navigate('/')
            })
    }, [updated])

    const removeTheBlog = () => {
        removeBlog(user, blog.id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeBlogSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => { navigate('/') })
            // on failure send a failure message
            .catch(err => {
                msgAlert({
                    heading: 'Error removing blog',
                    message: messages.removeBlogFailure,
                    variant: 'danger'
                })
            })
    }

    let commentCards
    if (blog) {
        if (blog.comments.length > 0) {
            commentCards = blog.comments.map(comment => (
                <ShowComment
                    key={comment._id}
                    comment={comment}
                    blog={blog}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    if (!blog) {
        return <LoadingScreen />
    }
    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header><h2
                        style={{ textAlign: 'center', fontFamily: 'Marcellus, serif' }}>{blog.title}</h2></Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small style={{ fontFamily: 'Marcellus, serif' }}>{blog.body}</small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setCommentModalShow(true)}
                            className="m-2" variant="info" style={{ fontFamily: 'Cinzel, serif', fontWeight: '500' }}
                        >
                           Add A Comment
                        </Button>
                        {
                            blog.owner && user && blog.owner._id === user._id
                            ?
                            <>
                                <Button onClick={() => setEditModalShow(true)}
                                    className="m-2"
                                    variant="outline-secondary"
                                >
                                    Update this post
                                </Button>
                                <Button onClick={() => removeTheBlog()}
                                    className="m-2"
                                    variant="outline-danger"
                                >
                                    Delete this post
                                </Button>
                            </>
                            :
                            null
                        }          
                        <button style={{ float: 'right' }} onClick={()=>setLikeCount(likeCount++)}>
                            <small>👍🏾 {likeCount}</small>
                        </button>
                        <button style={{ float: 'right' }} onClick={() => setDislikeCount(dislikeCount++)}>
                            <small>👎🏾 {dislikeCount}</small>
                        </button>
                        {/* tested styling here */}
                        {/* <div style={containerStyle}> */}
                        {/* <p style={{ textAlign: 'right', fontFamily: 'Cinzel, serif', fontWeight: '500' }}>{blog.commentsAvail}</p> */}
                        <Button
                            onClick={() => navigate('/')}
                            className="m-2 col-1"
                            variant="outline-secondary"
                            style={{
                                float: 'left',
                                fontFamily: 'Cinzel, serif', 
                                fontWeight: '500'
                            }}
                        >
                            Go back
                        </Button>
                        {/* </div> */}
                    </Card.Footer>
                </Card>
            </Container>
            <Container style={cardContainerLayout}>{commentCards}</Container>
            <EditBlogModal
                user={user}
                blog={blog}
                show={editModalShow}
                updateBlog={updateBlog}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
            <NewCommentModal
                blog={blog}
                show={commentModalShow}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setCommentModalShow(false)}
            />
        </>
    )
}
export default ShowBlog