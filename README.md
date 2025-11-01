# Todo Application

This is a full-stack Todo application featuring a React frontend and a Node.js Express backend. It demonstrates a basic setup for a monorepo-style project with a shared development workflow.

## Project Structure

-   `backend/`: Contains the Node.js Express server that provides the API for todos.
-   `frontend/`: Contains the React application that consumes the backend API.

## Getting Started

Follow these instructions to set up and run the application locally.

### Prerequisites

Ensure you have the following installed on your system:
-   Node.js (LTS version recommended)
-   npm (comes with Node.js)
-   Git

### Installation

1.  **Navigate to the project root:**
    ```bash
    # Assuming you are in the directory containing 'todo-app'
    cd todo-app
    ```
2.  **Install root dependencies:**
    This step installs `concurrently`, which is used to run both the frontend and backend simultaneously.
    ```bash
    npm install
    ```
3.  **Install backend dependencies:**
    Navigate into the `backend` directory and install its specific dependencies (e.g., Express, CORS).
    ```bash
    cd backend
    npm install
    cd ..
    ```
4.  **Install frontend dependencies:**
    Navigate into the `frontend` directory and install its specific dependencies (e.g., React, ReactDOM).
    ```bash
    cd frontend
    npm install
    cd ..
    ```

### Running the Application

To start both the frontend and backend servers concurrently:

```bash
npm run dev
```

-   The backend API server will be available at: `http://localhost:3001`
-   The React frontend application will typically run at: `http://localhost:3000` (or another available port if 3000 is occupied).

## API Endpoints (Backend)

The backend provides a RESTful API for managing todo items at the `/todos` endpoint.

-   **`GET /todos`**:
    -   **Description**: Retrieve all todo items.
    -   **Response**: `Array<Todo>`
-   **`POST /todos`**:
    -   **Description**: Create a new todo item.
    -   **Request Body**: `{ "title": "New Todo Item" }`
    -   **Response**: The newly created `Todo` object (with `id` and `completed` fields).
-   **`PUT /todos/:id`**:
    -   **Description**: Update an existing todo item by its ID.
    -   **Request Body**: `{ "title": "Updated Title", "completed": true }` (fields are optional; only provided fields will be updated).
    -   **Response**: The updated `Todo` object.
-   **`DELETE /todos/:id`**:
    -   **Description**: Delete a todo item by its ID.
    -   **Response**: `204 No Content` on successful deletion, `404 Not Found` if the todo item does not exist.

## Contributing

Please adhere to the project's code style and commit message guidelines.

## License

This project is licensed under the ISC License.