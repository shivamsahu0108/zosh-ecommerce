# Zosh Ecommerce Multi-Vendor Project

This project is a full-stack e-commerce application consisting of a React-based frontend and a Java Spring Boot backend.

## Project Structure

- **frontend**: React application with Vite, Tailwind CSS, Redux Toolkit, and Material UI.
- **ecommerce-multivendor**: Spring Boot application (Maven) handling the backend logic and APIs.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Java Development Kit (JDK) 17 or higher
- Maven
- MySQL (or configured database)

### Backend Setup

1. Navigate to the `ecommerce-multivendor` directory.
2. Configure your database settings in `src/main/resources/application.properties` (or `application.yml`).
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup

1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, Material UI, Redux Toolkit, Formik, Yup
- **Backend**: Java, Spring Boot, Spring Data JPA, Hibernate
- **Database**: MySQL (assumed)

## Features

- Multi-vendor support
- User authentication and authorization
- Product management
- Shopping cart and checkout
- Admin dashboard
