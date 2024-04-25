import React from 'react'

const page = ({ params }) => {
    const { slug } = params;

    return (
        <div>
            <h1>Blog Post: {slug}</h1>
        </div>
    )
}

export default page