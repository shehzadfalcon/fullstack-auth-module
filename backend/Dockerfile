FROM node:18-alpine


# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . ./

# Build the application (if needed)
RUN npm run build

# Expose the port if needed
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
