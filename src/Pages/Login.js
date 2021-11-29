//axios es algo extra que te permite hacer consultas a la api mas EZ de lo que es 
import axios from 'axios';
import { useNavigate } from 'react-router'; 
import { ToastContainer, toast } from 'react-toastify'; //el toastify es una madre bien bonita para tirar alertas ahi lo probas
import 'react-toastify/dist/ReactToastify.css';
import React, { useRef } from 'react';
import { UsersIcon, KeyIcon } from '@heroicons/react/outline';

const Login = () => {
    //variables para poder almacenar y lo de navigate siempre para poder cambiar de paginas 
    const navigate = useNavigate();
    const username = useRef(null);
    const password = useRef(null);
    //esta funcion lo que hace es que checkee que tenga todo de los usuarios y tira errors o warnings 
    async function onSubmit(e) {
        e.preventDefault();
        const usernameValue = username.current.value;
        const passwordValue = password.current.value;
        if (!usernameValue || !passwordValue) {
            toast('Alguno de los campos esta vacio', { type: 'warning' }); //una warning de que cuando meten usuario o contra y alguno quedo vacio les avisa 
            return;
        }
        try {
            const response = await axios.post('https://posts-pw2021.herokuapp.com/api/v1/auth/signin', { username: usernameValue, password: passwordValue }); // esto es lo que te digo de axio que es para consultas 
            //if para que checke que todo esta bien y si lo esta te manda a "home" lo podes cambiar el nombre pero aja hay que cambiarlo en todo lo de "home"
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                navigate('/');
            }
        } catch (error) { //aqui como dice te busca si hay un error y te manda una alerta de las bonitas de toasty 
            const { response } = error;
            let mssg = 'unknown error';
            if (response.status === 401) mssg = 'Credenciales erroneas';
            else if (response.status === 500) mssg = 'Error de servidor';
            else if (response.status === 404) mssg = 'Usuario no encontrado';
            toast(mssg, { type: 'error' });
        }
    }
    return (
        //aqui esta el inicio ya de lo de la pantalla de login que tiene lo del toast para las notificaciones y pues de ahi es html para poner todo 
        <form className="items-center w-80 max-w-screen-sm mx-auto h-screen text-black flex flex-col justify-center md:w-auto" onSubmit={onSubmit}>
            <ToastContainer /> 
            <div className="rounded-lg rounded-3x1 px-20 py-20 space-y-6 bg-gray-100 "> 
                <div className="flex flex-col space-y-2">
                    <label className="text-lg front-medium inline-flex " htmlFor="1-username">
                        <UsersIcon className="h-5 w-5 mr-2" /> 
                        username
                    </label>
                    <input className="rounded-lg px-2 py-1 text-gray-800 bg-gray-200 " id="1-username" type="text" placeholder="Username" ref={username} />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-lg front-medium inline-flex" htmlFor="1-password">
                        <KeyIcon className="h-5 w-5 mr-2" />
                        password
                    </label>
                    <input className="bg-gray-200 rounded-lg px-2 py-1 text-gray-800" id="1-password" type="password" placeholder="****" ref={password} />
                </div>
                <button className="w-full bg-indigo-500 rounded-lg py-2" type="submit">login</button>
            </div>
        </form>
    );
};

export default Login;
