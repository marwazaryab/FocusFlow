import React from 'react';
import './creators.css';

function Creators() {
    const contributors = [
        {
            id: 1,
            name: "Marwa Zaryab",
            photo: "marwa.jpg",
        },
        {
            id: 2,
            name: "Salma El Gohary",
            photo: "salma.jpg",
        },
        {
            id: 3,
            name: "Tisiane Wembou",
            photo: "tisiane.jpg",
        },
        {
            id: 4,
            name: "Arwa Gawish",
            photo: "arwa.jpg",
        },
    ];

    return (
        <div className="about-us-container">
            <div className="content">
                <h1>About Us</h1>
                <h2>We are 4 Systems Design Engineering students at the University of Waterloo dedicated to transforming the way students approach studying. With a focus on innovation, we strive to make studying more productive and enjoyable for everyone.</h2>
                
            <div className="contributors-row">
                {contributors.map((contributor) => (
                    <div key={contributor.id} className="contributor-item">
                        <img
                            src={contributor.photo}
                            alt={contributor.name}
                            className="contributor-photo"
                        />
                        <h3>{contributor.name}</h3>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default Creators;
