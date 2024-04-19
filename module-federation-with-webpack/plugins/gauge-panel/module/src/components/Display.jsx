import * as React from 'react';

const Display = (props) => {
  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Gauge panel</h3>
      <div>
        <img src={props.value} style={{ maxHeight: '300px'}} ></img>
      </div>
      <button onClick={(e) => {
        props.setState('changed by Gauge plugin!');
      }}>
        Set Host dummy text to "changed by Gauge plugin!"
      </button>
    </div>
  );
};

export default Display;
