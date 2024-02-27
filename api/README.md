## Endpoints

### POST /register

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

### POST /login

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

### POST /logout

This endpoint logs an member out by deleting the token stored on the client's end.

**Example Response:**

Status Code: 204 No Content

### GET /member/auth

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
