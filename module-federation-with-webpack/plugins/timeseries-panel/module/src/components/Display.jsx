import * as React from 'react';

const Display = (props) => {
  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Timeseries panel</h3>
      <div>
        <img src={props.value} style={{ maxHeight: '300px'}} ></img>
      </div>
      <button onClick={(e) => {
        props.setState('changed by Timeseries plugin!');
      }}>
        Set Host dummy text to "changed by Timeseries plugin!"
      </button>
    </div>
  );
};

export default Display;
