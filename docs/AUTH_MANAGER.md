# AuthManager Documentation

## Introduction

The `AuthManager` class is a versatile utility for managing authentication in your web application. It handles JSON Web Token (JWT) operations such as token creation, decoding, storage, and verification. This class can be used for both generating tokens locally and managing authentication using tokens from a remote API.

## Installation

First, ensure you have the necessary dependencies installed. You will need `jsonwebtoken` and `jwt-decode`.

```bash
npm install jsonwebtoken jwt-decode
```

## Configuration

Update a `target.config.js` file to store your configuration settings. The secret is should store in the `.env` file.

```javascript
export default {
  auth: {
    jwt: {
      refreshToken: {
        enabled: true,
        endpoint: 'https://example.com/api/refresh-token'
      }
    }
  }
};
```

## Usage

### Creating a Token

```javascript
const payload = { userId: 1, name: 'John Doe' };
const token = AuthManager.createToken(payload);
console.log(token);
```

### Decoding a Token

```javascript
const decodedPayload = AuthManager.decodeToken(token);
console.log(decodedPayload);
```

### Logging in Using Remote API

```javascript
fetch('https://example.com/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ username: 'user', password: 'pass' }),
})
  .then(response => response.json())
  .then(data => {
    AuthManager.login(data.token, data.refreshToken, data.user);
  })
  .catch(error => console.error('Login failed:', error));
```

### Checking Authentication

```javascript
if (AuthManager.isAuthenticated()) {
  console.log('User is authenticated');
} else {
  console.log('User is not authenticated');
}
```

### Refreshing Token

```javascript
AuthManager.refreshToken()
  .then(newToken => {
    console.log('New token:', newToken);
  })
  .catch(error => {
    console.error('Failed to refresh token:', error);
  });
```

## API Integration

### Login Endpoint

- **URL**: `/api/login`
- **Method**: `POST`
- **Request Body**: `{ "username": "user", "password": "pass" }`
- **Response**:
  ```json
  {
    "token": "jwt-token-here",
    "refreshToken": "refresh-token-here",
    "user": {
      "id": 1,
      "name": "John Doe"
    }
  }
  ```

### Refresh Token Endpoint

- **URL**: `/api/refresh-token`
- **Method**: `POST`
- **Request Body**: `{ "refreshToken": "refresh-token-here" }`
- **Response**:
  ```json
  {
    "token": "new-jwt-token-here",
    "user": {
      "id": 1,
      "name": "John Doe"
    }
  }
  ```

## Conclusion

The `AuthManager` class provides a comprehensive solution for managing JWT authentication in your application. It handles token creation, decoding, storage, and validation, making it easier to implement secure authentication in your frontend.
