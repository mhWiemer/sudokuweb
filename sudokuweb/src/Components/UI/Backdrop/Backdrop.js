import React from 'react';

import './Backdrop.css';

// Is om de achtergrond minder zichtbaar te maken.
const backdrop = (props) => (
    props.show ? <div className="Backdrop" onClick={props.clicked}></div> : null
);

export default backdrop;