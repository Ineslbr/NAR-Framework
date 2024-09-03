import React from 'react';
import Box from '@mui/material/Box';
import './feedback.css';

export default function Feedback() {
  return (
    <>
            
            <div style={{ width: '100vw', height: '100vh' ,backgroundColor: '#FFFFFF'}} >
                <b>
                    <a href="/">Back to home</a>
                </b>
                <h1> Contact Us </h1>
                <p></p>
                <div className='description'>
                        For any questions or feedback please don't hesitate to contact @ <a>il.rocha@campus.fct.unl.pt</a>
                </div>
            </div>
    </>
  );
}