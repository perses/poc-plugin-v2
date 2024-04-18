package config

import (
	"github.com/perses/common/config"
)

const defaultPath = "plugins"

type Config struct {
	PluginsPath string `yaml:"plugins_path,omitempty"`
}

func (c *Config) Verify() error {
	if len(c.PluginsPath) == 0 {
		c.PluginsPath = defaultPath
	}
	return nil
}

// Resolve retrieves the configuration data, either from a config file or from env
func Resolve(configFile string) (*Config, error) {
	c := &Config{}

	return c, config.NewResolver[Config]().
		SetEnvPrefix("PERSES_POC_PLUGIN_V2").
		SetConfigFile(configFile).
		Resolve(c).Verify()
}
