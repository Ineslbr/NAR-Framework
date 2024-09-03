import React, { useState } from 'react';
import Select from 'react-select';
import './feedback.css' 
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function CriteriaSelector() {


    const options = [
        { value:"0", label: 'C1 - Learnability'},
        { value:"1", label: 'C2 - Navigation'},
        { value:"2", label: 'C3 - Simplicity'},
        { value:"3", label: 'C4 - Customisability'},
        { value:"4", label: 'C5 - Aesthetic and Minimalist Design'},
      ]

      const [selected, setSelected] = React.useState(options[0]);

      const onSelectorChange = (input, callback) => {
          console.log(selected)
          console.log(input)
          setSelected(input)         
      };

      const navigate = useNavigate();

  return (
    <>
                <b>
                        <a href="/">Back to home</a>
                </b>
            <div style={{ width: '100vw', height: '100vh' ,backgroundColor: '#FFFFFF', textAlign:'center'}} >
                    
                    <h2>
                        Please select the Neurodivergent condition you wish to see:
                    </h2>
                    <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
                    <Select
                        defaultValue={options[0]}
                        name="colors"
                        options={options}
                        className="basic-single"
                        classNamePrefix="select"
                        onChange={onSelectorChange}
                    />
              
                    <Button 
                        variant="contained"
                        onClick={() => {
                            console.log("clicked");
                            navigate('/selector2/criteria',{
                              state: { 
                                type: selected.value,
                              }
                            })
                            
                          }}>Submit</Button>
                    </div>
                    
            </div>
         
        </>
  );
}