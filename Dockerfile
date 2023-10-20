## Building part ##

# Using a base image
FROM ubuntu:latest

# Updating system
RUN apt-get update

# Installing git
RUN apt-get install -y git

# Installing node & npm
RUN apt-get install -y nodejs npm

# Copy the app to the container
COPY . /app

# Set the working directory
WORKDIR /app

# Install dependencies
RUN npm install

# List of commands to run when container starts
CMD ["npm", "run", "build"]


