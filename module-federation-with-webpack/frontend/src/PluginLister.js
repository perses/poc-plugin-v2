import React, { useEffect, useState } from 'react';

const PluginLister = () => {
  const [pluginsList, setPluginsList] = useState({});

  useEffect(() => {
    fetch('/pluginsList')
      .then(response => response.json())
      .then(data => setPluginsList(data))
      .catch(error => console.error('Error fetching plugins list:', error));
  }, []);

  return (
    <div>
      <h3>List of installed plugins</h3>
      <ul>
      {Object.keys(pluginsList).map((name) => (
        <li key={name}>{name}</li>
      ))}
      </ul>
    </div>
  );
};

export default PluginLister;
