import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';
import CreatePost from './CreatePost';

const PostContainer = () => {
    const [posts, setPosts ] = useState({
        status: 'loading',
        data: {},
    });

    useEffect(() => {
        async function getPosts () {
            const {data: response} = await axios.get('https://posts-pw2021.herokuapp.com/api/v1/post/all?limit=10&page=0', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            setPosts({status: 'done', data: response.data});
        }
        getPosts();
    
    }, []);

    if (posts.status === 'loading') {
        return <div>Cargando...</div>
    }

    return (
        <div className = "flex flex-wrap px-8 py-10 justify-center items-center bg-indigo ">
            <nav className="w-screen flex flex-col items-start relative">
                <h1 className="pl-4 text-white font-medium text-2xl"> Bienvenido </h1>
                <CreatePost />
            </nav>
            <div className = "py-10 justify-center items center bg-indigo">
                {
                    posts.data && posts.data.map((post) => {
                        return <Post key = {post.id} struct = {post} />
                    })
                }
            </div>
        </div>
    );
};

export default PostContainer;