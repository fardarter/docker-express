docker stop $(docker ps -q --filter ancestor=764370704799.dkr.ecr.us-west-2.amazonaws.com/saul:latest)
docker build . -t 764370704799.dkr.ecr.us-west-2.amazonaws.com/saul:latest
docker run -p 5000:8080 764370704799.dkr.ecr.us-west-2.amazonaws.com/saul:latest