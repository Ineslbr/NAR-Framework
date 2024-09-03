import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';

import './home.css'

export default function Home() {

    return (
        <>
            <body >
                    
                    <div className='title' >
                        NAR Framework
                    </div>


                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                      
                        <Grid xs={6}>
                            <div className='card'>
                            <a href="/about"><h3>About &rarr;</h3>
                            <p>Information about the application purpose and future plans.</p></a>
                            </div>
                        </Grid>

                        <Grid xs={6}>
                            <div className='card'>
                            <a href="/selector"><h3>Conceptual Model &rarr;</h3>
                            <p>Interactive Conceptual Model with in depth explanations. </p></a>
                            </div>
                        </Grid>

                        <Grid xs={6}>
                            <div
                            className='card'
                            >
                            <a href="/first-post"><h3>Help &rarr;</h3>
                            <p>A video demonstration on how to use the tool.</p></a>
                            </div>
                        </Grid>
                        
                        <Grid xs={6}>
                            <div
                            className='card'
                            >
                            <a href="/selector2"><h3>Guidelines &rarr;</h3>
                            <p>
                                View guidelines based on the criteria selected.
                            </p></a>
                            </div>
                        </Grid>
                    </Grid>
                    
            </body>
        </>
    );
}

