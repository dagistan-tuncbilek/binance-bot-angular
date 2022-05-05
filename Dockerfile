FROM nginx:1.21.6-alpine
COPY /dist/dt-raider-angular /usr/share/nginx/html
COPY /docker/nginx.conf /etc/nginx/conf.d/default.conf


# ng build
# docker build -t dtuncbilek/dt-raider-angular:0.1 .
# docker run -d -p 18750:80 --name dt-raider-angular --restart unless-stopped dtuncbilek/dt-raider-angular:0.1
# docker push dtuncbilek/dt-raider-angular:0.1.0

# docker pull dtuncbilek/dt-raider-angular:0.1.0
# docker run -d --network nginxproxymanager_default --name seacollect-angular --restart unless-stopped dtuncbilek/dt-raider-angular:0.1.0
