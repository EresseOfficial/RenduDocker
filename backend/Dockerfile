# Using base image for Node.js
FROM node:14

# Working directory inside the container
WORKDIR /usr/src/app

# Copying package.json and package-lock.json
COPY package*.json ./

# Installing dependencies
RUN npm install

# Copying the rest of the files
COPY . .

# Exposing port 8080 where the app is running
EXPOSE 8080

# Executing the command to run the app
CMD ["node", "server.js"]