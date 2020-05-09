FROM node:12.16

WORKDIR /var/wwww/app

COPY . .

RUN yarn

ENTRYPOINT [ "yarn server" ]
