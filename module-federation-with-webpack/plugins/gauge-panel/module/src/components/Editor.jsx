import * as React from 'react';

const Editor = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <td><b>Gauge option A</b></td>
          <td>
            <input
            type="text"
            value={props.value}
            />
          </td>
        </tr>
        <tr>
          <td><b>Gauge option B</b></td>
          <td>
            <input
            type="text"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Editor;
