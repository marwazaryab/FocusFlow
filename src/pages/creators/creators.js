import React from 'react';
import './creators.css';

function Creators(){
    const contributors = [
        {
            id: 1,
            name: "Marwa Zaryab",
            photo: "/public/marwa.jpg",
        },
        {
            id: 2,
            name: "Salma El Gohary",
            photo: "/public/salma.jpg",
        },
        {
            id: 3,
            name: "Tisiane Wembou",
            photo: "/public/tisiane.jpg",
        },
        {
            id: 4,
            name: "Arwa Gawish",
            photo: "/public/arwa.jpg",
        },
    ];

    return(
        <div className = "about-us-container">
            <div className = "content">
                <h1>About Us</h1>
                <h2>Innovating Study, Simplifying Success.</h2>
            </div>


        

        </div>
    );
}

export default Creators;
