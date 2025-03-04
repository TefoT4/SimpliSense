# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (to leverage Docker caching)
COPY package.json package-lock.json ./

# Install all dependencies, including devDependencies to ensure TypeScript is installed
RUN npm install

# Copy the rest of the application source code
COPY . .

# ✅ No need to manually run `npm run build` here since `npm start` does it
EXPOSE ${PORT:-9900}

# Start the application (this will compile TypeScript first)
CMD ["npm", "start"]
