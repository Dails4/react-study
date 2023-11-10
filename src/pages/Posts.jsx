import React, { useState, useEffect, useRef } from "react";
import "../styles/App.css";
import PostList from "../Componets/PostList";
import PostForm from "../Componets/PostForm";
import PostFilter from "../Componets/PostFilter";
import MyModal from "../Componets/UI/MyModal/MyModal";
import MyButton from "../Componets/UI/button/MyButton";
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PostSetvice";
import Loader from "../Componets/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../Componets/utils/pages";
import Pagination from "../Componets/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../Componets/UI/select/MySelect";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  })

  useEffect(() => {
    fetchPosts();
  }, [page, limit]);

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <MyButton style={{ marginTop: "15px" }} onClick={() => setModal(true)}>
        Создать новый пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm setVisible={setModal} create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter 
        filter={filter} 
        setFilter={setFilter} 
      />
      <MySelect 
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue={'Кол-во элементов на странице'}
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'Показать все'},
        ]}
      />
      {postError && <h1>Произошла ошибка ${postError}</h1>}
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS" />
      <div ref={lastElement} style={{height: 1}} />
      {isPostLoading && 
        <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}><Loader /></div> 
      }
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
