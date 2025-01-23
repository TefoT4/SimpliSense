# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose the port specified by the environment variable or default to 3000
EXPOSE ${PORT:-9900}

# Define environment variables (optional; overridden by docker-compose or runtime configuration)
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
