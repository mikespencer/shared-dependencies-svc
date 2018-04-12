PORT ?= 8080
MONGO_URL ?= mongodb://127.0.0.1:27017

docker-build:
	docker build . -t shared_dependencies_svc
docker-run: docker-build
	docker run --rm -it -e PORT=$(PORT) -e MONGO_URL=$(MONGO_URL) -p $(PORT):$(PORT) shared_dependencies_svc