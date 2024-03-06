## Endpoints

### POST /api/register

This endpoint registers a member. The token is stored in the client's cookies.

**Example Request Body:**

```json
{
    "username": "John Doe",
    "email": "johndoe@gmail.com",
    "password": "12345678"
}
```

**Example Response:**

Status Code: 200 Ok

```json
{
    "message": "User John Doe created successfully."
}
```

**Error Handling:**
- Returns 400 Bad Request if the request body is missing username, email or password

### POST /api/login

This endpoint login a member. The token is stored in the client's cookies.

**Example Request Body:**

```json
{
    "username": "John Doe",
    "password": "12345678"
}
```

**Example Response:**

Status Code: 200 Ok

```json
{}
```

**Error Handling:**
- Returns 400 Bad Request if the request body is missing username or password 
- Returns 401 Unauthorized if password is wrong

### POST /api/logout

This endpoint logs an member out by deleting the token stored on the client's end.

**Example Response:**

Status Code: 204 No Content

### GET /api/member/auth

This endpoint displays the logged in member's info

**Example Response:**

Status Code: 200 Ok

```json
{
    "member_id": 2,
    "username": "test",
    "email": "test@gmail.com",
    "active_programme_id": null
}
```

**Error Handling:**
- Returns 401 Unauthorized if token expired or not found
- Returns 404 Not Found if member not found

### GET /api/member/id/:id

This endpoint displays a member's info by member id

**Example Response:**

Status Code: 200 Ok

```json
{
    "member_id": 2,
    "username": "test",
    "email": "test@gmail.com",
    "active_programme_id": null
}
```

**Error Handling:**
- Returns 400 Bad Request if member id is not a number
- Returns 404 Not Found if member not found

### GET /api/member/username/:username

This endpoint displays a member's info by username

**Example Response:**

Status Code: 200 Ok

```json
{
    "member_id": 2,
    "username": "test",
    "email": "test@gmail.com",
    "active_programme_id": null
}
```

**Error Handling:**
- Returns 404 Not Found if member not found

### PUT /api/member/auth/username

This endpoint updates the logged in member's username

**Example Request Body:**

Status Code: 200 Ok

```json
{
    "username": "John Doe"
}
```

**Error Handling:**
- Returns 400 Bad Request if the request body is missing username
- Returns 401 Unauthorized if token expired or not found
- Returns 404 Not Found if member not found

### PUT /api/member/auth/active_programme/:id

This endpoint updates the logged in member's active programme

Status Code: 200 Ok

**Error Handling:**
- Returns 400 Bad Request if programme id is not a number
- Returns 401 Unauthorized if token expired or not found
- Returns 404 Not Found if member not found

### POST /api/programme/auth

This endpoint creates a programme for the logged in member

**Example Request Body:**

Status Code: 201 Created

```json
{
    "name": "test1"
}
```

**Example Response:**
```json
{
    "programme_id": 3,
    "name": "test1",
    "member_id": 1
}
```

**Error Handling:**
- Returns 409 Conflict if programme name already exists
- Returns 401 Unauthorized if token expired or not found
- Returns 400 Bad Request if the request body is missing name

### GET /api/programme/auth

This endpoint displays the logged in member's active programme

**Example Response:**

Status Code: 200 Ok

```json
[
    {
        "programme_id": 1,
        "name": "test",
        "member_id": 1
    },
    {
        "programme_id": 3,
        "name": "test1",
        "member_id": 1
    }
]
```

**Error Handling:**
- Returns 401 Unauthorized if token expired or not found

### PUT /api/programme/auth/:id

This endpoint updates the logged in member's programme by programme id

**Example Request Body:**

Status Code: 200 Ok

```json
{
    "name": "test2"
}
```

**Example Response:**
```json
{
    "programme_id": 3,
    "name": "test2",
    "member_id": 1
}
```

**Error Handling:**
- Returns 400 Bad Request if the request body is missing name
- Returns 401 Unauthorized if token expired or not found
- Returns 404 Not Found if programme not found

### DELETE /api/programme/auth/:id

This endpoint deletes the logged in member's programme by programme id

**Example Response:**

Status Code: 204 No Content