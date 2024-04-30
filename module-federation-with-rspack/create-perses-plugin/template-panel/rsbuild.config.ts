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
    assetPrefix: "http://localhost:8080/plugins/{{pluginName}}/",
  },
  plugins: [pluginReact()],
  tools: {
    rspack: (config, { appendPlugins }) => {
      config.output!.uniqueName = "{{pluginName}}";
      appendPlugins([
        new ModuleFederationPlugin({
          name: "{{pluginName}}",
          exposes: {
            "./PanelDisplay": "./src/PanelDisplay.tsx",
          },
          shared: ["react", "react-dom"],
        }),
      ]);
    },
  },
});
