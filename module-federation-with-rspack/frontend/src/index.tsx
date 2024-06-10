import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PluginRuntimeContext, initialPluginRuntime } from "./PluginRuntime";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <PluginRuntimeContext.Provider value={initialPluginRuntime}>
      <App />
    </PluginRuntimeContext.Provider>
  </React.StrictMode>
);
