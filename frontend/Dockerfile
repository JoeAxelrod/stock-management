# Use nginx to serve the built React app
FROM nginx:alpine

# Copy the built application
COPY dist/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]