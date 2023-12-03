# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app/client
WORKDIR /app/client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the client application code to the container
COPY . .

# Expose the port that your React app will run on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]
