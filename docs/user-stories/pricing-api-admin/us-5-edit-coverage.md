# Waner-On Life Insurance Pricing

## US-5 - As an Admin, I can update a coverage so that the pricing remains accurate.

A coverage must be editable in any field except for the generated `id`. All updates must comply with the same rules as those for registration.

Fields can be updated either entirely or partially. In this case, if the edit endpoint is called with only one field, only that specific field should be updated in the coverage.

When editing an item that was previously deleted [US-6](./us-6-remove-coverage.md), it should be "reactivated," overwriting the soft delete.

**PATCH** `/coverage/:coverageId`

Request Payload
```json
{
    "name": <string>,
    "description": <string>,
    "capital": <string>,
    "premium": <string>
}
```

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
