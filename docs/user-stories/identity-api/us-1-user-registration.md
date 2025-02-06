# Waner-On Life Insurance Pricing

## US-1 - As an Admin, I can register new `admin` users by providing their email and password

The Admin must be able to register new users in the system, and these users will have the `user` role by default.

The system must generate a unique ID for the user.

It should not be allowed to register duplicate `username`s, and neither empty `username` nor `password` should be permitted, meaning strings that are empty or contain only spaces.

The system must enforce a strong password, which in this case must follow these rules:
- Contain at least 8 characters
- Contain no more than 64 characters
- Contain uppercase and lowercase letters
- Contain numbers
- Contain at least one of the following symbols: `@#!$%`, while other symbols should not be allowed

*Tip: use Regex to validate the password.*

**POST** `/users`

### Request Payload
```json
{
    "username": "<string>",
    "password": "<string>"
}

Response Payload - HTTP STATUS 201
```json
{
    "data": {
        "userId": <string>,
        "username": <string>,
        "role": <string>
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

Error Response - HTTP STATUS `401`
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
