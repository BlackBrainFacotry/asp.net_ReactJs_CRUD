import React, { useState } from "react";


export default function PostFindByIdForm(props) {
    const initialFormData = Object.freeze({
        postId: 0,
        title: "Title",
        content: "content"        
    });
    const [post, setpost] = useState(initialFormData);

    const handleChange = (e) => {
        setpost({
            ...post,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const postFoundById = {
            postId: 0,
            title: post.title,
            content: post.content
        };

        const url = "https://localhost:7222/api/posts/" + post.postId;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
                setpost(responseFromServer)

            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
        props.onFoundPostById(postFoundById);
    };

    return (
        <div>
            <form className='w-100 px-5'>
                <h1 className="mt-5">Find post by ID </h1>
                <div className="mt-5">
                    <label className="h3 form-label">Post ID</label>
                    <input value={post.postId} name="postId" types="text" className="form-control" onChange={handleChange}></input>
                </div>
                <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5"> Submit</button>
                <button onClick={() => props.onFoundPostById(null)} className="btn btn-dark btn-lg w-100 mt-3"> Cancel</button>
            </form>
        </div>
    )
    
}