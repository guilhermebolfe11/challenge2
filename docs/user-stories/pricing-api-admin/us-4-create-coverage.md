# Waner-On Life Insurance Pricing

## US-4 - As an Admin, I can register a new type of coverage so it can be selected during pricing.

Coverage is an item within the life insurance product. To ensure dynamic pricing, each pricing must include a set of coverages along with the insured's information (covered in [US-7](../pricing-api-user/us-7-dynamic-pricing.md)).

For this, it is necessary to develop functionality for registering and managing coverages.

Each coverage must have a unique system-generated ID, a name, a description, and the fields `capital` and `premium`.

For this case and the way the coverage will be used in pricing:
- The `capital` value must be a multiple of 10 and greater than or equal to 1000.
- The `premium` must be a value greater than 0 and less than 30% of the `capital` value.
- The `name` must be unique in the registry.

### Examples of coverages:

**1. Permanent Total Disability due to Illness**  
"This coverage guarantees the advance payment of the indemnity related to the basic Death guarantee, in case of permanent total functional disability due to illness."

**2. Special Indemnity for Accidental Death**  
"This coverage guarantees an additional payment, of the same value, as the insurance indemnity for Death. That is, the beneficiary(ies) of the indemnity will receive double the insured capital in case of specific death due to an accident."

---

**POST** `/coverage`

Request Payload
```json
{
    "name": <string>,
    "description": <string>,
    "capital": <string>,
    "premium": <string>
}
```

Response Payload - HTTP STATUS `201`
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
