import React, { useState } from "react"
import PostCreateForm from "./components/PostCreateForm";
import PostUpdateForm from "./components/PostUpdateForm";


function App() {
  const [posts, setPosts] = useState([]);
  const [showingCreateNewPostForm, setShowingCreateNewPostForm] = useState(false);
  const [postCurrentlyBeingUpdated, setPostCurrentlyBeingUpdated] = useState(false);

  function getAllPosts() {
    const url = "https://localhost:7222/api/posts";
    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(postsFromServer => {
        console.log(postsFromServer);
        setPosts(postsFromServer)
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function deletePost(postId){
    const url = "https://localhost:7222/api/posts/" + postId;
    fetch(url, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
        onPostDeleted(postId);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
}

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-item-center">
          {(showingCreateNewPostForm === false &&  postCurrentlyBeingUpdated === null ) && (
          <div>
            <h1>React CRUD </h1>
            <div className="mt-5">
              <button onClick={getAllPosts} className="btn btn-dark btn-lg w-100">Get data from api</button>
              <button onClick={() => setShowingCreateNewPostForm(true)} className="btn btn-dark btn-lg w-100">Create new post</button>
            </div>
          </div>
          )}
          {(posts.length > 0 && showingCreateNewPostForm === false && postCurrentlyBeingUpdated === null ) && renderTablePosts()}

          {showingCreateNewPostForm && <PostCreateForm onPostCreated={onPostCreated} />}

          {postCurrentlyBeingUpdated !== null && <PostUpdateForm post={postCurrentlyBeingUpdated} onPostUpdated={onPostUpdated} />}
        </div>
      </div>
    </div>
  );

  function renderTablePosts() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">Post ID (PK)</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">CURD</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.postId}>
              <th scope="row">{post.postId}</th>
              <td> {post.title}</td>
              <td> {post.content}</td>
              <td>
                <button onClick={() => setPostCurrentlyBeingUpdated(post)} className='btn btn-dark btn-lg'>Update</button>
                <button onClick={() => { if(window.confirm('Are you sure you want to delete ' + post.title + '? ')) deletePost(post.postId) }} className='btn btn-dark btn-lg'>Delate</button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>

        <button onClick={() => setPosts([])}></button>
      </div>
    )
  }

  function onPostCreated(createdPost) {
    setShowingCreateNewPostForm(false);
    if(createdPost === null){
      return;
    }
    alert('Post ${createdPost.postId} succesfully created.');

    getAllPosts();
  }

  function onPostUpdated(updatedPost){
    setPostCurrentlyBeingUpdated(null);

    if (updatedPost === null) {
      return;
    }


    let postsCopy = [...posts];

    const index = postsCopy.findIndex((postsCopyPost, currentIndex) => {
      if(postsCopyPost.postId === updatedPost.postId) {
        return true;
      }
    });
      if (index !== -1) {
        postsCopy[index] = updatedPost;
      }
      setPosts(postsCopy);

      alert('updated post "${updatedPost.title"');
    
  }

  function onPostDeleted(deletedPostPostId){
    let postsCopy = [...posts];

    const index = postsCopy.findIndex((postsCopyPost, currentIndex) => {
      if(postsCopyPost.postId === deletedPostPostId) {
        return true;
      }
    });
      if (index !== -1) {
        postsCopy.splice(index, 1);
      }
      setPosts(postsCopy);

      alert('Deleted post "${updatedPost.title"');
    
  }
}

export default App;
