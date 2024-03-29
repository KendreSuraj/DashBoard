import React, { useEffect, useState } from 'react';
import { Paper, Button, FormControl, TextareaAutosize } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getToken } from '../userLocalStorageUtils';

const CommentBox = () => {
    const [commentData, setCommentData] = useState("")
    const [comment, setComment] = useState('')
    const params = useParams();
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const reqBody = {
            id: params.sessionScheduleId,
            // comment: comment
             comment: comment.replace(/'/g, "\\'")
        }
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/api/v1/admin/booking/add-comment`,
                reqBody,
                {
                    headers: {
                        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
                        token: getToken(),
                    },
                },
            )
            .then((response) => {
                alert("Comment Submitted")
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };

    const getComment = () => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/api/v1/admin/booking/comment/${params.sessionScheduleId}
                `,
                {
                    headers: {
                        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
                        token: getToken(),
                    },
                }
            )
            .then((response) => {
                setCommentData(response?.data?.comment)
                setComment(response?.data?.comment)
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getComment()
    }, [])

    return (
        <div>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <h3>Write Comment</h3>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={3}
                            placeholder="Write your comment here"
                            value={comment}
                            onChange={handleCommentChange}
                            required
                        />
                    </FormControl>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </form>
            </Paper>
        </div>
    );
};

export default CommentBox;
