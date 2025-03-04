# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Ensure TypeScript is installed globally
RUN npm install -g typescript

# Copy the rest of the application source code
COPY . .

# Expose the port specified by the environment variable or default to 9900
EXPOSE ${PORT:-9900}

# Define environment variables (optional; overridden by docker-compose or runtime configuration)
ENV NODE_ENV=production

# Build the application using TypeScript
RUN npx tsc --project tsconfig.json

# Start the application
CMD ["npm", "start"]
