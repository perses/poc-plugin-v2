package watcher

import (
	"path/filepath"

	"github.com/perses/poc-plugin-v2/internal/config"
	"github.com/sirupsen/logrus"
	"gopkg.in/fsnotify.v1"
)

/*
 * Start watching for changes in the plugins folder.
 * Whenever a change is detected (write & delete), we
 * update the map keeping track of the list of plugins
 * installed accordingly.
 */
func Start(c *config.Config, pluginsList map[string]bool) {
	logrus.Debugf("Start watching file: %s", c.PluginsPath)

	go func() {
		watcher, err := fsnotify.NewWatcher()
		if err != nil {
			logrus.Fatal(err)
		}
		defer watcher.Close()

		done := make(chan bool)
		go func() {
			for {
				select {
				case event, ok := <-watcher.Events:
					if !ok {
						return
					}
					if event.Op&fsnotify.Write == fsnotify.Write {
						logrus.Tracef("%s event on %s -> new plugin to register", event.Op, event.Name)
						pluginsList[filepath.Base(event.Name)] = true
					}
					if event.Op&fsnotify.Remove == fsnotify.Remove {
						logrus.Tracef("%s event on %s -> known plugin to remove", event.Op, event.Name)
						delete(pluginsList, filepath.Base(event.Name))
					}
				case err, ok := <-watcher.Errors:
					if !ok {
						return
					}
					logrus.WithError(err).Trace("watcher error")
				}
			}
		}()

		err = watcher.Add(c.PluginsPath)
		if err != nil {
			logrus.Fatal(err)
		}
		<-done
	}()
}
