import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Componets/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostSetvice';

const Post = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching( async (id) => {
        const response = await PostService.getById(params.id);
        setPost(response.data);
    });
    const [fetchComments, isComLoading, comError] = useFetching( async (id) => {
        const response = await PostService.getCommentsByPostId(params.id);
        setComments(response.data);
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

  return (
    <div>
        <h1>Вы открыли пост с ID = {params.id}</h1>
        {isLoading
        ? <Loader/>
        : <div style={{marginBottom: 10}}>{post.id}. {post.title}</div>
        }
        <h2 style={{marginBottom: 5}}>
            Комментарии
        </h2>
         {isComLoading
            ? <Loader/>
            : <div>
                {comments.map(comm =>
                    <div key={comm.id} >
                        <h5>{comm.email}</h5>
                        <div style={{marginBottom: 10}}>{comm.body}</div>
                    </div>
                )}
            </div>
         }
    </div>
  )
}

export default Post