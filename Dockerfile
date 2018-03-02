FROM node:8.9.1
ENV NPM_CONFIG_LOGLEVEL warn
RUN mkdir -p /frontend
WORKDIR /frontend
COPY ./server ./
RUN yarn
COPY ./dist ./build/
CMD [ "node", "server.js"]

