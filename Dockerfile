# pull official base image
FROM node:alpine

# work directory
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

# copy everything from current dir to Docker environment
COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]