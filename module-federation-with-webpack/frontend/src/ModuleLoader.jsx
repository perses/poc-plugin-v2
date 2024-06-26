/*
 * Initially copied from https://github.com/OmerHerera/dynamic_remote/blob/main/src/ModuleLoader.jsx
 */

import React, { Suspense } from "react";
import useDynamicScript from './hooks/useDynamicScript';

// See https://webpack.js.org/concepts/module-federation/#dynamic-remote-containers
function loadComponent(scope, module) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default");
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}

export function DisplayModuleLoader(props) {
  const { ready, failed } = useDynamicScript({
    url: props.module && props.url
  });

  if (!props.module) {
    return <h2>No Remote Module specified</h2>;
  }

  if (!ready) {
    return <h2>Loading dynamic script: {props.url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {props.url}</h2>;
  }

  const Component = React.lazy(
    loadComponent(props.scope, props.module)
  );

  return (
    <Suspense fallback="Loading display module..">
      <Component value={props.value} setState={props.setState}/>
    </Suspense>
  );
}

export function EditorModuleLoader(props) {
  const { ready, failed } = useDynamicScript({
    url: props.module && props.url
  });

  if (!props.module) {
    return <h2>No Remote Module specified</h2>;
  }

  if (!ready) {
    return <h2>Loading dynamic script: {props.url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {props.url}</h2>;
  }

  const Component = React.lazy(
    loadComponent(props.scope, props.module)
  );

  return (
    <Suspense fallback="Loading editor module..">
      <Component value={props.value}/>
    </Suspense>
  );
}