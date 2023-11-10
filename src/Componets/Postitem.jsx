import React from 'react';
import MyButton from './UI/button/MyButton';
import {Link, useNavigate} from 'react-router-dom';

const Postitem = (props) => {
    
  const router = useNavigate();
  
  return (
    <div className="post">
        <div className="post__content">
          <strong>{props.post.id}. {props.post.title}</strong>
          <div>
            {props.post.body}
          </div>
        </div>
        <div className="post__btns">
          <MyButton><Link className='open-btn' to={(`/posts/${props.post.id}`)} >Открыть</Link></MyButton>
          <MyButton onClick={() => props.remove(props.post)} >Удалить</MyButton>
        </div>
    </div>
  )
}

export default Postitem