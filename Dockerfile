FROM node:18-alpine AS build-env

WORKDIR /app

COPY . ./

RUN npm install

RUN npm run build


FROM nginx:1.17.1-alpine

COPY --from=build-env /app/dist/app-futbol/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]