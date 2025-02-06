# Waner-On Life Insurance Pricing

## US-6 - As an Admin, I can remove a coverage so that it can no longer be used for pricing.

For this case, use a `soft delete` to remove the coverage from the database. Remember that deleted items must not be allowed for use in pricing.

**DELETE** `/coverage/:coverageId`

Response Payload - HTTP STATUS `200`
```json
{
    "data": {
        "coverageId": <string>,
        "name": <string>,
        "description": <string>,
        "capital": <string>,
        "premium": <string>
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
