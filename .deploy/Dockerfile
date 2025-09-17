FROM node:24-alpine AS compilador

WORKDIR /app
COPY . .
RUN npm install \
 && npm run build;

FROM nginx

LABEL empresa="flaviabanchieri.com"
LABEL projeto="maquiagem.flaviabanchieri.com"
LABEL imagem="front"

COPY .deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=compilador /app/dist/maquiagem-desafio/browser /usr/share/nginx/html
