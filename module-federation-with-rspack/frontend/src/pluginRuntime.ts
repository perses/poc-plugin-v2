import { init, loadRemote } from "@module-federation/enhanced/runtime";
import React from "react";
import ReactDOM from "react-dom";
import { PersesPluginModule } from "./PersesPlugin.types";

init({
  name: "@perses/perses-ui-host",
  remotes: [
    {
      name: "perses_plugins_timeseries_panel",
      entry: "http://localhost:8080/plugins/timeseries-panel/mf-manifest.json",
      alias: "perses_plugins_timeseries_panel",
    },
    {
      name: "perses_plugins_gauge_panel",
      entry: "http://localhost:8080/plugins/gauge-panel/mf-manifest.json",
      alias: "perses_plugins_gauge_panel",
    },
  ],
  shared: {
    react: {
      version: "18.0.0",
      scope: "default",
      lib: () => React,
      shareConfig: {
        singleton: true,
        requiredVersion: "^18.0.0",
      },
    },
    "react-dom": {
      version: "18.0.0",
      scope: "default",
      lib: () => ReactDOM,
      shareConfig: {
        singleton: true,
        requiredVersion: "^18.0.0",
      },
    },
  },
});

export async function loadPlugin(name: string) {
  return loadRemote<PersesPluginModule>(`${name}/PanelDisplay`);
}
