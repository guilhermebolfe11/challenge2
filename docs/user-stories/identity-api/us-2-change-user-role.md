# Waner-On Life Insurance Pricing

## US-2 - As an Admin, I can change a user's role to `user` or `admin`

The Admin must be able to change a user's role. The allowed roles are `user` or `admin`.

**PATCH** `/users/:userId`

Request Payload
```json
{
    "role": <string>
}
```

Response Payload - HTTP STATUS `200`
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