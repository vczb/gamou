# Use the official Node.js base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Remove node_modules from the application (in case it was accidentally copied)
RUN rm -rf node_modules

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Set permissions for the uploads directory
#RUN chmod -R 755 /app/public/uploads

# Expose the port where Next.js will run
EXPOSE 3000

# Command to start the Next.js application
CMD ["npm", "start"]
