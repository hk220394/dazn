# Brief API Documentation

## Getting Started with TypeScript

### Please avoid initial 3 steps and start with 4 to setup the project

1. **Initialize your project**:
    - mkdir dazn
    - cd dazn
    - npm init -y

2. **Install TypeScript**:
    npm install typescript --save-dev

3. **Initialize TypeScript configuration**:
    - npx tsc --init

4. **Install Dependecies**:
    - npm install

5. **Compile your TypeScript code**:
    - npx tsc

6. **Start your application**:
    - npm start

## Endpoints

### GET /movies/list
- **Description**: Lists all movies.

### GET /search?q={query}
- **Description**: Searches for movies by title or genre.

### POST /movies
- **Description**: Adds a new movie (requires admin role).

### PUT /movies/:id
- **Description**: Updates an existing movie's information (requires admin role).

### DELETE /movies/:id
- **Description**: Deletes a movie (requires admin role).

## Sample Requests and Responses

### List Movies
- **Request**:
    ```
    GET /movies/list
    ```
- **Response**:
    ```
    [
        { "title": "Inception", "genre": "Sci-Fi", "rating": 8.8, "streamingLink": "http://example.com/inception" },
        ...
    ]
    ```

### Search Movies
- **Request**:
    ```
    GET /search?q=sci-fi
    ```
- **Response**:
    ```
    [
        { "title": "Interstellar", "genre": "Sci-Fi", "rating": 8.6, "streamingLink": "http://example.com/interstellar" }
    ]
    ```

### Add Movie
- **Request**:
    ```
    POST /movies
    Content-Type: application/json

    {
        "title": "The Matrix",
        "genre": "Sci-Fi",
        "rating": 8.7,
        "streamingLink": "http://example.com/matrix"
    }
    ```
- **Response**:
    ```
    { "_id": "...", "title": "The Matrix", ... }
    ```

### Update Movie
- **Request**:
    ```
    PUT /movies/{id}
    Content-Type: application/json

    {
        "rating": 9
    }
    ```
- **Response**:
    ```
    { "_id": "...", "title": "...", "rating": 9 }
    ```

### Delete Movie
- **Request**:
    ```
    DELETE /movies/{id}
    ```
- **Response**:
    ```
    Status Code: 204 No Content
    ```
