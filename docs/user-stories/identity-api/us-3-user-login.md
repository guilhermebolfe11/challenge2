# Waner-On Life Insurance Pricing

## US-3 - As a User, I can log in with the password provided by the Admin to generate a JWT token and consume the pricing API.

The user must be able to log in to the system by providing their username and password, and receive a signed JWT token in return, which will be used to consume the APIs.

The token must be generated in the JWT format, signed using an asymmetric key.

Ensure proper error handling, such as (but not limited to):
- Invalid payload
- Incorrect password

To maintain privacy and security, authentication failures (given a correct payload) should only indicate that the combination of `username` and `password` is incorrect.

**POST** `/login`

Request Payload
```json
{
    "username": <string>,
    "password": <string>
}
```

Response Payload - HTTP STATUS `200`
```json
{
    "data": {
        "user": {
            "userId": <string>,
            "username": <string>,
            "role": <string>
        },
        "token": <string>
    }
}
```

Error Response - HTTP STATUS `400`
```json
{
    "error": {
        "code": <string>,
        "message": <string>
    }
}
```

Error Response - HTTP STATUS `500`
```json
{
    "error": {
        "code": <string>,
        "message": <string>
    }
}
```
