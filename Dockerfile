FROM ghcr.io/puppeteer/puppeteer:22.6.4

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ic
COPY . .
CMD [ "node", "index.js" ]