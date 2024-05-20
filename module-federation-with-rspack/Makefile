# Backend targets
.PHONY: build-be
build-be:
	cd backend && go build -o backend ./main.go

.PHONY: run-be
run-be: build-be
	cd backend && ./backend

.PHONY: run-be-trace
run-be-trace: build-be
	cd backend && ./backend -log.level trace

# Frontend targets
.PHONY: build-fe
build-fe:
	cd frontend && npm install && npm run build

.PHONY: run-fe
run-fe: build-fe
	cd frontend && npm run dev

.PHONY: dev-fe
dev-fe: build-fe
	cd frontend && npm run dev

# Frontend targets
.PHONY: build-plugins
build-plugins:
	cd plugins/timeseries-panel && npm install && npm run build
	cd plugins/gauge-panel && npm install && npm run build
	cd plugins/gantt-panel && npm install && npm run build

.PHONY: install-plugins
install-plugins: build-plugins # to make the plugin be served by the backend
	mkdir -p backend/plugins/perses_plugins_timeseries_panel
	cp -r plugins/timeseries-panel/dist/* backend/plugins/perses_plugins_timeseries_panel
	mkdir -p backend/plugins/perses_plugins_gauge_panel
	cp -r plugins/gauge-panel/dist/* backend/plugins/perses_plugins_gauge_panel
	mkdir -p backend/plugins/perses_plugins_gantt_panel
	cp -r plugins/gantt-panel/dist/* backend/plugins/perses_plugins_gantt_panel
