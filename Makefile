PORT ?= 8080
MONGODB_URI ?= mongodb://127.0.0.1:27017

docker-build:
	docker build . -t shared_dependencies_svc
docker-run: docker-build
	docker run --rm -it -e PORT=$(PORT) -e MONGODB_URI=$(MONGODB_URI) -p $(PORT):$(PORT) shared_dependencies_svc