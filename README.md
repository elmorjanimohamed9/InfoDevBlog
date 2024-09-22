# InfoDev Blog Platform: Article Management

## Description
The InfoDev Blog Platform is a web application designed for managing articles, allowing users to create, view, edit, and delete articles. This platform provides an easy-to-use interface and utilizes Node.js, Express.js, Sequelize, and MySQL for the backend, along with EJS and TailwindCSS for the frontend.

![InfoDev Blog Platform Screenshot](public/images/screenshot.png)

## Features
- Create new articles with a title, description, content, and optional image.
- View a list of all articles with links to individual articles.
- Edit articles (restricted to the author).
- Delete articles.
- Responsive design using TailwindCSS.

## Technologies Used
- **Backend**:
  - Node.js
  - Express.js
  - Sequelize (ORM)
  - MySQL
- **Frontend**:
  - EJS (Embedded JavaScript templates)
  - TailwindCSS
- **Development Tools**:
  - Nodemon (for automatic server restarts during development)

## Getting Started

### Prerequisites
- Node.js (v12 or later)
- MySQL (or a compatible database)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd InfoDevBlog
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up your database:
   - Create a new MySQL database.
   - Update the `.env` file with your database connection details.

4. Run migrations to set up the database tables:
   ```bash
   npx sequelize-cli db:migrate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Folder Structure
```
/InfoDevBlog
├── /config              # Configuration files for the application
├── /migrations          # Sequelize migrations for database schema
├── /controllers         # Contains controllers for handling business logic
├── /models              # Sequelize models for database tables
├── /routes              # Express routes
├── /seeders             # Seed data for the database
├── /views               # EJS views for rendering HTML
├── /public              # Static assets (CSS, images, etc.)
├── .env                 # Environment variables
├── .env.example         # Example environment variables file
├── tailwind.config.js    # Tailwind CSS configuration
├── .gitignore           # Ignored files for git
├── app.js               # Express app setup
├── server.js            # Server configuration and startup
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation
```

## Usage
- Access the home page to see a list of articles.
- Use the provided links to create, edit, and delete articles as needed.

## Contributing
Contributions are welcome! If you have suggestions or improvements, feel free to create a pull request or open an issue.
