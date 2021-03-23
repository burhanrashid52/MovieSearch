FROM node:14.16.0-alpine3.10

ENV TMDB_API_KEY no_api_key_found
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
COPY start.sh ./
RUN chmod +x start.sh

RUN npm install --silent

COPY . ./

ENTRYPOINT ["start.sh"]
