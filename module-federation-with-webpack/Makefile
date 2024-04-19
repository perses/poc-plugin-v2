

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
	cd frontend && npm run start

.PHONY: run-fe-webpack
run-fe-webpack: build-fe
	cd frontend && npm run dev
	
# Plugin targets

.PHONY: build-plugin-ts
build-plugin-ts:
	cd plugins/timeseries-panel/module && npm install && npm run build

.PHONY: run-plugin-ts
run-plugin-ts: build-plugin-ts # run plugin as a standalone process
	cd plugins/timeseries-panel/module && npm run dev

.PHONY: install-plugin-ts
install-plugin-ts: build-plugin-ts # to make the plugin be served by the backend
	mkdir -p backend/plugins/timeseries-panel/module
	cp -r plugins/timeseries-panel/module/dist backend/plugins/timeseries-panel/module
	cp plugins/timeseries-panel/schema.cue backend/plugins/timeseries-panel/.

.PHONY: build-plugin-gg
build-plugin-gg:
	cd plugins/gauge-panel/module && npm install && npm run build

.PHONY: run-plugin-gg
run-plugin-gg: build-plugin-gg # run plugin as a standalone process
	cd plugins/gauge-panel/module && npm run dev

.PHONY: install-plugin-gg
install-plugin-gg: build-plugin-gg # to make the plugin be served by the backend
	mkdir -p backend/plugins/gauge-panel/module
	cp -r plugins/gauge-panel/module/dist backend/plugins/gauge-panel/module
	cp plugins/gauge-panel/schema.cue backend/plugins/gauge-panel/.

.PHONY: build-plugins
build-plugins: build-plugin-ts build-plugin-gg

.PHONY: run-plugins
run-plugins: run-plugin-ts run-plugin-gg # run plugins as a standalone processes

.PHONY: install-plugins
install-plugins: install-plugin-ts install-plugin-gg # to make the plugins be served by the backend