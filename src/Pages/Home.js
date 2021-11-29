//imports que para poder ocupar las rutas y es effect 
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/solid';
import PostContainer from '../Components/PostContainer';
import CreatePost from '../Components/CreatePost';


const Home = () => {
    //para poder usar el navigate de pagina en pagina 
    const navigate = useNavigate();
    const [whoami, setWhoami] = useState();
    //supuestamente esto es para que no te deje meterte desde la url pero no me funciono 
    const user = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    useEffect(() => {
        async function getWhoami () {
            const {data} = await axios.get('https://posts-pw2021.herokuapp.com/api/v1/auth/whoami', {
                headers: {
                    'Authorization': `Bearer ${user}`,
                },
            });
            setWhoami(data.username);
        }


        if (user == null){
            navigate('/login');
            return;
        } 

        getWhoami();
    });


    return (
        //esto supuestamente deberia de salir en la pagina pero no sale 
        <div>
            {
                role === 'admin' && (<CreatePost />)
            }
            <PostContainer username={whoami}/>   
        </div>
        
    );
};

export default Home;
