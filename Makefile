IMAGE_NAME=ferimer/beetalik

docker_dev:
	docker build -t $(IMAGE_NAME):development .

publish_dev: docker_dev
	docker push $(IMAGE_NAME):development

docker_prod:
	docker build -t $(IMAGE_NAME):latest .

publish_prod: docker_prod
	docker push $(IMAGE_NAME):latest

run_dev: docker_dev
	docker run --rm --name beetalik-dev -it -p 3000:3000 $(IMAGE_NAME):development