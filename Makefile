docker-build:
	docker build . -t shared_dependencies_svc
docker-run: docker-build
	docker run --rm -it -e PORT=8080 -e MONGO_URL=$(MONGO_URL) -p 8080:8080 shared_dependencies_svc