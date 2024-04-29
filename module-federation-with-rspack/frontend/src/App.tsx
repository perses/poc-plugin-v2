import { PluginLoader } from "./PluginLoader";
import { PluginSelector } from "./PluginSelector";

const App = () => {
  return (
    <div>
      <h1>Perses UI Host</h1>
      <PluginSelector />
      <div style={{ display: "flex", gap: "10px" }}>
        <PluginLoader plugin={{ name: "perses_plugins_timeseries_panel" }} />
        <PluginLoader plugin={{ name: "perses_plugins_gauge_panel" }} />
      </div>
    </div>
  );
};

export default App;
