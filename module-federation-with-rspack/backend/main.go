package main

import (
	"flag"
	"os"

	"github.com/perses/common/app"
	"github.com/sirupsen/logrus"

	"github.com/perses/poc-plugin-v2/api"
	"github.com/perses/poc-plugin-v2/internal/config"
	"github.com/perses/poc-plugin-v2/internal/watcher"
)

func main() {
	configFile := flag.String("config", "", "Path to the yaml configuration file. Configuration can be overridden with environment variables.")
	flag.Parse()

	conf, err := config.Resolve(*configFile)
	if err != nil {
		logrus.WithError(err).Fatalf("error reading configuration file %q", *configFile)
	}

	pluginsList, err := loadPluginsList(conf.PluginsPath)
	if err != nil {
		logrus.WithError(err).Fatalf("error retrieving installed plugins from dir %q", conf.PluginsPath)
	}

	watcher.Start(conf, pluginsList)

	serverAPI := api.NewServerAPI(pluginsList)
	runner := app.NewRunner().WithDefaultHTTPServer("poc_plugin_v2")
	runner.HTTPServerBuilder().APIRegistration(serverAPI)
	runner.Start()
}

func loadPluginsList(dir string) (map[string]bool, error) {
	pluginsList := make(map[string]bool)
	dirs, err := os.ReadDir(dir)
	if err != nil {
		return nil, err
	}

	for _, dir := range dirs {
		if dir.IsDir() {
			pluginsList[dir.Name()] = true
		}
	}
	return pluginsList, nil
}
