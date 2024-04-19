import * as React from 'react';

const Editor = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <td><b>Timeserie option 1</b></td>
          <td>
            <input
            type="text"
            value={props.value}
            />
          </td>
        </tr>
        <tr>
          <td><b>Timeserie option 2</b></td>
          <td>
            <input
            type="text"
            />
          </td>
        </tr>
        <tr>
          <td><b>Timeserie option 3</b></td>
          <td>
            <input
            type="checkbox"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Editor;
