# Deploying an Application on AWS Using Node.js
Dockerized Express Web Server with MongoDB Integration for an internship project.

This repository contains a simple web server created using Express and Node.js, deployed within a Docker container. The web server is connected to a MongoDB database hosted in another Docker container, utilizing the Mongoose library for database operations.

This project revolves around creating a secure and robust REST API platform using Node.js. The focus is on deploying these applications within the AWS ecosystem while prioritizing security measures. Tasks include developing a student and instructor platform, conducting tests using Postman, Dockerizing the API service, and deploying it in AWS while using industry best practices. 

# Features

- Express Web Server: Built using the Express framework for Node.js, providing a foundation for creating web applications.
- Docker Containers: The application is containerized using Docker, ensuring consistent deployment across different environments.
- MongoDB Integration: Utilizes the Mongoose library to connect and interact with a MongoDB database hosted within a separate container.
- API Features: Implements API endpoints for accessing and modifying the database.
- AWS Deployment: Successfully deployed on an AWS EC2 machine using SSH connection.
- Simple Interface: Offers a straightforward interface for inserting and viewing data.
- Public Access: Both the website and API are accessible from the internet.

# Test Usage on Local Computer
1. Clone the repository to your local machine.
2. Install Docker and Docker Compose if not already installed.
3. Navigate to the project directory.
4. Run docker-compose up to start the containers.
5. Access the web interface and API endpoints via IPs and Ports.
6. Explore the API features for data access and modification.
   
# Note
While this project covers basic functionalities, certain planned features like a login page and enhanced security were not included due to time constraints. This repository serves as a starting point for developing web applications with Dockerized environments and MongoDB integration. It is not ready for production.
