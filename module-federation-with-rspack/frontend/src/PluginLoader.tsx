import { ReactElement, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PersesPlugin } from "./PersesPlugin.types";
import { loadPlugin } from "./pluginRuntime";

interface PluginLoaderProps {
  plugin: PersesPlugin;
}

export function PluginLoader({ plugin }: PluginLoaderProps) {
  const [pluginContent, setPluginContent] = useState<ReactElement | undefined>(
    undefined
  );

  useEffect(() => {
    loadPlugin(plugin.name).then((module) => {
      setPluginContent(module?.default);
    });
  }, [plugin]);

  return (
    <ErrorBoundary
      fallback={
        <p>
          ⚠️Something went wrong while loading the plugin, check the console for
          details
        </p>
      }
    >
      {pluginContent ? pluginContent : undefined}
    </ErrorBoundary>
  );
}
