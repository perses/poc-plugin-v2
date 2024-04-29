package api

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	utilsEcho "github.com/perses/common/echo"
)

type ServerAPI struct {
	utilsEcho.Register
	pluginsList map[string]bool
}

func NewServerAPI(pluginsList map[string]bool) *ServerAPI {
	return &ServerAPI{
		pluginsList: pluginsList,
	}
}

func (s *ServerAPI) RegisterRoute(e *echo.Echo) {
	e.Use(middleware.CORS())

	e.OPTIONS("*", func(c echo.Context) error {
		return c.NoContent(http.StatusOK)
	})
	e.GET("/pluginsList", func(c echo.Context) error {
		return c.JSON(http.StatusOK, s.pluginsList)
	})
	e.Static("/plugins", "plugins")
}

func (s *ServerAPI) Close() error {
	return nil
}
