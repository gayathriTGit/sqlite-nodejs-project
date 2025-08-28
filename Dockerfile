# Use a lightweight official Node.js image as the base
FROM node:20-bookworm-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if present) to leverage Docker's cache
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your Node.js application listens on
EXPOSE 9005

# Define the command to run the application when the container starts
CMD [ "node", "server.js" ]
