import React from 'react';
import { ThumbUpIcon } from '@heroicons/react/outline';
import { AnnotationIcon } from '@heroicons/react/outline';
import { UserIcon } from '@heroicons/react/solid';

const Post = ({struct}) => {

    const {
        title, description, image, user, createdAt, likes, comments, 
    } = struct;

    return (
    <div className = "bg-white rounded-2xl max-w-3xl p-4 my-4">
        <div className = "w-full flex space-x-8">

            <div className="flex flex-grow justify-self-center md:stroke-2">
                <UserIcon className = "w-4 mr-1"/>
                <h1 className = "w-24 "> 
                    {user?.username}

                </h1>
                <h5 className = "w-8/5 text-center text-xs text-gray-400  ">
                    {(new Date(createdAt)).toLocaleDateString()}
                </h5>
            </div>

            <div className="flex-none justify-self-right">
                    <ThumbUpIcon className = "w-4 mr-1 justify-end"/>
                    {likes.lenght}
                    
            </div>

        </div>
        <img className = "w-auto max-h-xs mx-auto my-2 rounded-2xl" src = {image} alt = "imagen"/>
        <div className = "w-full flex flex-col ">
            <h1 className = "w-1/2 font-bold text-xs">{title}</h1>
            <h2 className = "text-xs">{description}</h2>
        </div>
        <div className = "w-full mt-2">
            <h1 className = "flex justify-center items-center text-xs  ">
                {comments.lenght}
                <AnnotationIcon className = "w-4 ml-2"/>
            </h1>
        </div>
    </div>
    )
}
export default Post;