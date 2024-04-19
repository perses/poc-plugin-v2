import React, { useState, Suspense } from 'react';
import { DisplayModuleLoader, EditorModuleLoader} from './ModuleLoader';

const PluginDisplayer = () => {
  const [dummyText1, setDummyText1] = useState('');
  const [dummyText2, setDummyText2] = useState('');

  return (
    <div>
      <h3>My dashboard</h3>
      <p>My first dummy text from host is: {dummyText1}</p>
      <p>My second dummy text from host is: {dummyText2}</p>
      <table style={{ border: '1px solid black' }}>
        <tbody>
          <tr style={{ verticalAlign: 'top' }}>
            <td style={{ borderRight: '1px solid black' }}>
              <DisplayModuleLoader
                url='/plugins/timeseries-panel/module/dist/RemoteEntry.js'
                scope='timeseries_panel_module'
                module='./Display'
                value='https://charts.livegap.com/2020/images/paper-en.png'
                setState={setDummyText1}
              />
            </td>
            <td>
              <DisplayModuleLoader
                url='/plugins/gauge-panel/module/dist/RemoteEntry.js'
                scope='gauge_panel_module'
                module='./Display'
                value='https://chartexpo.com/Content/Images/charts/Gauge-Chart-1.jpg'
                setState={setDummyText2}
              />
              </td>
          </tr>
          <tr style={{ verticalAlign: 'top' }}>
            <td style={{ borderRight: '1px solid black' }}>
              <EditorModuleLoader
                url='/plugins/timeseries-panel/module/dist/RemoteEntry.js'
                scope='timeseries_panel_module'
                module='./Editor'
                value='my first graph'
              />
              </td>
            <td>
              <EditorModuleLoader
                url='/plugins/gauge-panel/module/dist/RemoteEntry.js'
                scope='gauge_panel_module'
                module='./Editor'
                value='my second graph'
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PluginDisplayer;
