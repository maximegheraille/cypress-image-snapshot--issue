ARG CHROME_VERSION='120.0.6099.109-1'
ARG EDGE_VERSION='120.0.2210.91-1'
ARG FIREFOX_VERSION='127.0.2'

FROM cypress/factory:latest

WORKDIR /opt/app

# Install corepack
RUN npm install -g corepack

# Enable corepack
RUN corepack enable

# Copy only the package.json and pnpm-lock files first
COPY package.json package-lock.json ./

# Install dependencies without copying the entire context
RUN npm ci

COPY . /opt/app
