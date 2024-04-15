FROM node:latest

WORKDIR /app

COPY customerService/package*.json ./customerService/
COPY productService/package*.json ./productService/
COPY orderService/package*.json ./orderService/

RUN cd customerService && npm install
RUN cd productService && npm install
RUN cd orderService && npm install

COPY . .

EXPOSE 8002 8000 8001

CMD ["npm", "run", "start:customer"] && ["npm", "run", "start:product"] && ["npm", "run", "start:order"]

