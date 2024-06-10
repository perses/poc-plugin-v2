import { registerRemotes } from "@module-federation/enhanced/runtime";
import React, { useEffect, useState } from "react";

interface PluginSelectorProps {
  onSelect: (pluginName: string | undefined) => void;
}

export const PluginSelector: React.FC<PluginSelectorProps> = ({ onSelect }) => {
  const [pluginsList, setPluginsList] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/pluginsList")
      .then((response) => response.json())
      .then((data) => {
        setPluginsList(data);
      })
      .catch((error) => console.error("Error fetching plugins list:", error));
  }, []);

  return (
    <div>
      <h3>List of installed plugins</h3>
      <ul>
        {Object.keys(pluginsList).map((name) => (
          <li key={name}>
            <label>
              <input
                type="radio"
                name="pluginName"
                value={name}
                onChange={() => onSelect(name)}
              />
              {name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
