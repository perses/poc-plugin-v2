import { ReactElement, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PersesPlugin } from "./PersesPlugin.types";
import { usePluginRuntime } from "./PluginRuntime";

interface PluginLoaderProps {
  plugin: PersesPlugin;
}

export function PluginLoader({ plugin }: PluginLoaderProps) {
  const { loadPanel, pluginRuntime } = usePluginRuntime();
  const [pluginContent, setPluginContent] = useState<ReactElement | undefined>(
    undefined
  );

  useEffect(() => {
    loadPanel(plugin.name)
      .then((module) => {
        setPluginContent(module?.default);
      })
      .catch((error) => {
        console.error("Error loading plugin:", error);
        setPluginContent(undefined);
      });
  }, [plugin.name]);

  return pluginContent;
}
