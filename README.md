## Server API

### Get restaurant info
  * GET `/api/similarListings/:id`

**Path Parameters:**
  * `id` listing id

**Success Status Code:** `200`

**Returns:** JSON

```json
    { "_id": ObjectId(), 
    "Image_url" : "String url", 
    "Price" : "Number", 
    "Address" : "String address", 
    "Region" : String", 
    "Bedroom_num" : "Number", 
    "Bathroom_num" : "Number", 
    "Square_footage" : " Number", 
    "Description" : "String", 
    "Mortgage" : "Number", 
    "New" : "boolean", 
    "Price_change" : "Number"}
```

### Add restaurant
  * POST `/api/similarListings`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    { "_id": ObjectId(), 
    "Image_url" : "String url", 
    "Price" : "Number", 
    "Address" : "String address", 
    "Region" : String", 
    "Bedroom_num" : "Number", 
    "Bathroom_num" : "Number", 
    "Square_footage" : " Number", 
    "Description" : "String", 
    "Mortgage" : "Number", 
    "New" : "boolean", 
    "Price_change" : "Number"}
```


### Update similar listing info
  * PATCH `/api/similarListings/:id`

**Path Parameters:**
  * `id` listing id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    { "_id": ObjectId(), 
    "Image_url" : "String url", 
    "Price" : "Number", 
    "Address" : "String address", 
    "Region" : String", 
    "Bedroom_num" : "Number", 
    "Bathroom_num" : "Number", 
    "Square_footage" : " Number", 
    "Description" : "String", 
    "Mortgage" : "Number", 
    "New" : "boolean", 
    "Price_change" : "Number"}
```

### Delete similar listing
  * DELETE `/api/similarListings/:id`

**Path Parameters:**
  * `id` restaurant id

**Success Status Code:** `204`
