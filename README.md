# DevOps Example MicroServices

Wymagany jest zainstalowany docker (np. v19.0.6) docker-compose (np. v1.17.1)


! Należy być w katalogu projektu !

ms - nazwa projektu w projekcie (XD)


Uruchomienie managera klastra: 
> docker swarm init


<h2>Workflow Circle</h2>

Budowanie obrazów mikroserwisów:
> docker-compose build

Uruchomienie projektu
> docker stack deploy --compose-file docker-stack.yml ms

Zakończenie projektu
> docker stack rm ms


<h2>Przydatne komendy</h2>

> docker service ls

> docker service logs -f ms_SERVICE_NAME

> docker stack ps ms


<h2>Linki</h2>

Rabbitmq:
http://localhost:4000/

Nginx:
http://localhost:3000/
