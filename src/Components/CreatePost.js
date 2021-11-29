import axios from 'axios';
import React from 'react';

const CreatePost = () => {
    
    async function onSubmit(event){
        event.preventDefault();

        const formData = new FormData(event.target);
        const objBody = Object.fromEntries(formData.entries());

        if (objBody.title === '' || objBody.description === '') return alert('Llene los campos');

        const body = Array.from(formData)
            .map(entry => encodeUriComponent(entry[0]) + "=" + encodeUriComponent(entry[1]))
            .join("&");

        const response = await axios.post('https://posts-pw2021.herokuapp.com/api/v1/post/create', body, {//{...body, active: body.active === 'on'}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        });

        console.log(response);
    }

    return (
        <form onSubmit= {onSubmit} className = "bg-white rounded-2xl mt-4 p-4 max-w-3xl w-full self-center">
            <div className="flex flex-col text-sm">
                <label htmlFor="title">Titulo</label>
                <input type="text" name ="title" id="title" />
            </div>
            <div className= "flex flex-col text-sm">
                <label htmlFor="">Descripcion</label>
                <input type="text" name ="description" id="description" />
            </div>
            <div className = "flex flex-col text-sm">
                <label htmlFor="">Imagen</label>
                <input type="text" name ="image" id="image" />
            </div>
            <button type="submit" className="bg-blue-500 rounded-2xl mt-4 p-2">Publicar</button>
        </form>
    );
}

export default CreatePost;