import React, { useState } from "react"

function App() {
  const [posts, setPosts] = useState([])

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

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-item-center">
          <div>
            <h1>React CRUD </h1>
            <div className="mt-5">
              <button onClick={getAllPosts} className="btn btn-dark btn-lg w-100">Get data from api</button>
              <button onClick={getAllPosts} className="btn btn-dark btn-lg w-100">Create new post</button>
            </div>
          </div>

          {posts.length > 0 && renderTablePosts()}
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
                <button className='btn btn-dark btn-lg'>Update</button>
                <button className='btn btn-dark btn-lg'>Delate</button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>

        <button onClick={() => setPosts([])}></button>
      </div>
    )
  }
}

export default App;
