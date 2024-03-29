# poc-plugin-v2

The aim of this repo is to provide a proof of concept for a revamped plugin architecture for Perses.

## Problem statement

While we already have a plugin system, it has a couple of limitations:
- First, we are not able to externalize the plugins. So that means any plugin needs to be built in the upstream application which is super limited as we won't be able to accept and maintain any kind of plugin the community / end user would like.
- Then today, it's really hard to understand how we can implement a plugin, and that shouldn't be the case at all.
