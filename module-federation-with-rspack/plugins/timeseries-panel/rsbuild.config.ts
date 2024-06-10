import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

export default defineConfig({
  server: {
    port: 3005,
  },
  dev: {
    assetPrefix: "http://localhost:3005",
  },
  output: {
    // TODO: make this a relative path with the proper host
    assetPrefix:
      "http://localhost:8080/plugins/perses_plugins_timeseries_panel/",
  },
  plugins: [pluginReact()],
  tools: {
    rspack: (config, { appendPlugins }) => {
      config.output!.uniqueName = "perses_plugins_timeseries_panel";
      appendPlugins([
        new ModuleFederationPlugin({
          name: "perses_plugins_timeseries_panel",
          exposes: {
            "./PanelDisplay": "./src/PanelDisplay.tsx",
          },
          shared: ["react", "react-dom"],
        }),
      ]);
    },
  },
});
