FROM node:20 as build
MAINTAINER "Ferimer Dev Team"

WORKDIR /opt

COPY package.json /opt/package.json
COPY yarn.lock /opt/yarn.lock

RUN yarn install

COPY . /opt

RUN yarn test \
    && rm -rf /opt/test \
    && rm -rf /opt/node_modules \
    && yarn install --production

FROM node:20 as release

WORKDIR /opt

COPY --from=build /opt /opt
RUN chown -R node:node /opt
USER node

ENV NODE_ENV=production
EXPOSE 3000
ENTRYPOINT ["yarn", "start"]
