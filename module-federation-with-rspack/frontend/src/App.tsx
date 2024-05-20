import { useState } from "react";
import { PluginLoader } from "./PluginLoader";
import { PluginSelector } from "./PluginSelector";
import { ErrorBoundary } from "react-error-boundary";

const App = () => {
  const [selectedPlugin, setSelectedPlugin] = useState<string | undefined>(
    undefined
  );
  return (
    <div>
      <h1>Perses UI Host</h1>
      <PluginSelector
        onSelect={(pluginName) => setSelectedPlugin(pluginName)}
      />
      <ErrorBoundary
        fallback={
          <p>
            ⚠️Something went wrong while loading the plugin, check the console
            for details
          </p>
        }
      >
        {selectedPlugin && <PluginLoader plugin={{ name: selectedPlugin }} />}
      </ErrorBoundary>
    </div>
  );
};

export default App;
