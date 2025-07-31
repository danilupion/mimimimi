ARG NODE_IMAGE=node:22.12.0-alpine
ARG YARN_VERSION=1.22.22
ARG NGINX_IMAGE=nginxinc/nginx-unprivileged:1.29-alpine3.22-slim

# Build stage
FROM ${NODE_IMAGE} AS builder

ARG ENV=development

ENV CI=true
ENV NODE_ENV=${ENV}
ENV ENV=${ENV}

# install pnpm
RUN corepack enable
RUN corepack prepare yarn@${YARN_VERSION} --activate

# install python
RUN apk add --no-cache python3 py3-pip
# install build-essential
RUN apk add --update alpine-sdk

# workdir
WORKDIR /workspace/repo

# copy repo
COPY ./ ./

RUN yarn install
RUN yarn build

# Runtime stage
FROM ${NGINX_IMAGE} AS runtime

ARG PORT=8080
ARG ENV=production

COPY --from=builder /workspace/repo/dist /usr/share/nginx/html
EXPOSE ${PORT}

# Overrides the default daemon on setting so NGINX doesn’t background itself. In a container you want the web server to stay in the foreground; when PID 1 exits the container stops.
CMD ["nginx", "-g", "daemon off;"]
