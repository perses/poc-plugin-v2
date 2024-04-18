/*
 * Initially copied from https://github.com/OmerHerera/dynamic_remote/blob/main/src/hooks/useDynamicScript.js,
 * itself it seems inspired by https://github.com/module-federation/module-federation-examples/blob/master/advanced-api/dynamic-remotes-runtime-environment-variables/host/src/hooks/useDynamicScript.js
 */

import { useEffect, useState } from 'react';

const urlCache = new Set();

const useDynamicScript = ({ url }) => {
  const [ready, setReady] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    if (urlCache.has(url)) {
      setReady(true);
      setErrorLoading(false);
      return;
    }

    setReady(false);
    setErrorLoading(false);

    const element = document.createElement('script');

    element.src = url;
    element.type = 'text/javascript';
    element.async = true;

    element.onload = () => {
      urlCache.add(url);
      setReady(true);
    };

    element.onerror = () => {
      setReady(false);
      setErrorLoading(true);
    };

    document.head.appendChild(element);

    return () => {
      urlCache.delete(url);
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    errorLoading,
    ready,
  };
};

export default useDynamicScript;
