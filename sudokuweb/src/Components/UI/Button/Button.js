import React from 'react';

import classes from './Button.css';
// Is vaker dan 1 keer te grbuiken
const button = (props) => (
    <button
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

export default button;

/*
standaard stijlbutton en de button.Dabger of Button.Succes wordt gezet.
class die gebruikt wordt is gewoon een string. Dus daar wordt gebruik van gemaakt.
     className={[classes.Button, classes[props.btnType]].join(' ')}
   
*/