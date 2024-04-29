import React, { useEffect, useState } from "react";

export const PluginSelector = () => {
  const [pluginsList, setPluginsList] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/pluginsList")
      .then((response) => response.json())
      .then((data) => setPluginsList(data))
      .catch((error) => console.error("Error fetching plugins list:", error));
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
