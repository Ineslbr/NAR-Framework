import React from 'react';
import './feedback.css' 

export default function About() {
  return (
    <>
            <div style={{ width: '100vw', height: '100vh' ,backgroundColor: '#FFFFFF'}} >
                    <b>
                        <a href="/">Back to home</a>
                    </b>
                    <h1>
                        About
                    </h1>
                    <p></p>
                    <div className='description'>
                    Hello, I'm a university student currently completing my dissertation in the master's in computer science and engineering from NOVA's School of Science and Technology. 
The goal of my thesis is to build a Conceptual Model on Neurodivergent Issues in Software Engineering. <p> </p>
This application is part of my thesis work and has two main objectives: serving as a supporting tool to display my conceptual model in a interactive way and aid software engineer during the requirements elicitation process . <p></p>
For any questions please contact: <a>il.rocha@campus.fct.unl.pt</a>
                    </div>
            </div>
        </>
  );
}