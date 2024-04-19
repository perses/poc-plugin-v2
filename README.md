# poc-plugin-v2

The aim of this repo is to provide a proof of concept for a revamped plugin architecture for Perses. Please refer to [perses/perses issue #1543](https://github.com/perses/perses/issues/1543) for more detail.

## Problem statement

While we already have a plugin system, it has a couple of limitations:
- First, we are not able to externalize the plugins. So that means any plugin needs to be built in the upstream application which is super limited as we won't be able to accept and maintain any kind of plugin the community / end user would like.
- Then today, it's really hard to understand how we can implement a plugin, and that shouldn't be the case at all.

## Resources

- https://create-react-app.dev/docs/code-splitting/
- https://loadable-components.com/docs/loadable-vs-react-lazy/
- https://www.figma.com/blog/how-we-built-the-figma-plugin-system/
- https://medium.com/@CorneflexSteve/bootstrap-a-plugin-architecture-in-react-with-webpack-module-federation-and-nx-a6f3d9727f7e
- https://malcolmkee.com/blog/a-plugin-based-frontend-with-module-federation/
- https://stackoverflow.com/questions/43859231/babel-js-using-import-and-export-not-working
- https://stackoverflow.com/questions/50097327/using-a-full-url-in-a-dynamic-import
- https://grafana.com/developers/plugin-tools/introduction/data-frames
- https://www.youtube.com/watch?v=s_Fs4AXsTnA
- https://www.youtube.com/watch?v=1jlEEmiBSvI
- https://alibek.dev/micro-frontends-with-nextjs-and-module-federation
- https://module-federation.io/plugin/dev/index.html
- https://dev.to/omher/lets-dynamic-remote-modules-with-webpack-module-federation-2b9m
- https://oskari.io/blog/dynamic-remotes-module-federation
- https://www.linkedin.com/pulse/microfrontends-module-federation-pass-props-add-them-rany/
