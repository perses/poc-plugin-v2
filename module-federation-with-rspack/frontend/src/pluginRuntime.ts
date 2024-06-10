import { init, loadRemote } from "@module-federation/enhanced/runtime";
import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { PersesPluginModule } from "./PersesPlugin.types";

export const initialPluginRuntime = init({
  name: "@perses/perses-ui-host",
  remotes: [], // all remotes are loaded dynamically
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

export const PluginRuntimeContext = React.createContext(initialPluginRuntime);

export function usePluginRuntime() {
  const pluginRuntime = useContext(PluginRuntimeContext);

  if (!pluginRuntime) {
    throw new Error(
      "usePluginRuntime must be used within a PluginRuntimeContext.Provider"
    );
  }

  const checkRemote = (name: string) => {
    const remote = pluginRuntime.moduleCache.has(name);
    if (!remote) {
      pluginRuntime.registerRemotes([
        {
          name,
          entry: `http://localhost:8080/plugins/${name}/mf-manifest.json`,
          alias: name,
        },
      ]);
    }
  };

  const loadPanel = async (name: string) => {
    checkRemote(name);

    return loadRemote<PersesPluginModule>(`${name}/PanelDisplay`);
  };

  return {
    pluginRuntime,
    loadPanel,
  };
}
