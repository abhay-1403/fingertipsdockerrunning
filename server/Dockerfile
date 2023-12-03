# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app/server
WORKDIR /app/server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the server application code to the container
COPY . .

# Expose the port that your Node.js app will run on
EXPOSE 5000


# Define the command to run your app
CMD ["node", "server.js"]
