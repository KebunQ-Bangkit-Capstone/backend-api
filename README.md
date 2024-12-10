# API Endpoints

#### Users

<details>
 <summary><code>POST</code> <code><b>/users</b></code> <code>(create user)</code></summary>

##### Parameters
> None

##### Request Body
```json
{
    "user_id": "string",
    "email": "string",
    "name": "string"
}
```

##### Response Body
```json
{
    "message": "string"
}
```
</details>

<details>
 <summary><code>GET</code> <code><b>/users</b></code> <code>(get many users)</code></summary>

##### Parameters
> None

##### Request Body
> None

##### Response Body
```json
{
    "users": [
        {
            "user_id": "string",
            "email": "string",
            "name": "string",
            "created_at": "string"
        }
    ]
}
```
</details>

<details>
 <summary><code>GET</code> <code><b>/users/{id}</b></code> <code>(get one user)</code></summary>

##### Path Parameters
> | name | type | data type |
> |-----------|-----------|-------------------------|
> | id | required | string|

##### Request Body
> None

##### Response Body
```json
{
    "user_id": "string",
    "email": "string",
    "name": "string",
    "created_at": "string"
}
```
</details>

<details>
 <summary><code>PATCH</code> <code><b>/users/{id}</b></code> <code>(update user)</code></summary>

##### Path Parameters
> | name | type | data type |
> |-----------|-----------|-------------------------|
> | id | required | string|

##### Request Body
```json
{
    "name": "string"
}
```

##### Response Body
```json
{
    "message": "string"
}
```
</details>

<details>
 <summary><code>DELETE</code> <code><b>/users/{id}</b></code> <code>(delete user)</code></summary>

##### Path Parameters
> | name | type | data type |
> |-----------|-----------|-------------------------|
> | id | required | string|

##### Request Body
> None

##### Response Body
```json
{
    "message": "string"
}
```
</details>












#### Predictions

<details>
 <summary><code>POST</code> <code><b>/predictions/predict</b></code> <code>(create prediction)</code></summary>

##### Query Parameters
> | name | type | data type |
> |-----------|-----------|-------------------------|
> | user_id | required | string|
> | plant_index | required | string|

##### Request Body
```json
{
   "image": "File"
}
```

##### Response Body
```json
{
    "prediction_id": "string",
    "plant_index": 1,
    "disease_index": 1,
    "plant_name": "string",
    "disease_name": "string",
    "confidence_score": 1,
    "temporary_image_url": "string",
    "user_id": "string",
    "treatment": "string",
    "analysis": "string",
    "article": "string",
    "created_at": "string"
}
```
</details>

<details>
 <summary><code>GET</code> <code><b>/predictions</b></code> <code>(get many predictions by user id)</code></summary>

##### Query Parameters
> | name | type | data type |
> |-----------|-----------|-------------------------|
> | user_id | required | string|

##### Request Body
> None

##### Response Body
```json
{
    "predictions": [
        {
            "prediction_id": "string",
            "plant_index": 1,
            "disease_index": 1,
            "plant_name": "string",
            "disease_name": "string",
            "confidence_score": 1,
            "temporary_image_url": "string",
            "user_id": "string",
            "treatment": "string",
            "analysis": "string",
            "article": "string",
            "created_at": "string"
        }
    ]
}
```
</details>

<details>
 <summary><code>GET</code> <code><b>/predictions/{id}</b></code> <code>(get one prediction)</code></summary>

##### Path Parameter
> | name | type | data type |
> |-----------|-----------|-------------------------|
> | id | required | string|

##### Request Body
> None

##### Response Body
```json
{
    "prediction_id": "string",
    "plant_index": 1,
    "disease_index": 1,
    "plant_name": "string",
    "disease_name": "string",
    "confidence_score": 1,
    "temporary_image_url": "string",
    "user_id": "string",
    "treatment": "string",
    "analysis": "string",
    "article": "string",
    "created_at": "string"
}
```
</details>

<details>
 <summary><code>DELETE</code> <code><b>/predictions/{id}</b></code> <code>(delete prediction)</code></summary>

##### Path Parameter
> | name | type | data type |
> |-----------|-----------|-------------------------|
> | id | required | string|

##### Request Body
> None

##### Response Body
```json
{
    "message": "string"
}
```
</details>











#### Diseases

<details>
 <summary><code>POST</code> <code><b>/diseases</b></code> <code>(create disease)</code></summary>

##### Parameters
> None

##### Request Body
```json 
{
    "disease_id": "string",
    "plant_index": 1,
    "disease_index": 1,
    "plant_name": "string",
    "disease_name": "string",
    "description": "string",
    "treatment": "string",
    "analysis": "string",
    "article": "string",
    "image_id": "string"
}
```

##### Response Body
```json
{
    "message": "string"
}
```
</details>

<details>
 <summary><code>GET</code> <code><b>/diseases/all</b></code> <code>(get all diseases)</code></summary>

##### Parameters
> None

##### Request Body
> None

##### Response Body
```json
{
    "diseases": [
        {
            "disease_id": "string",
            "plant_index": 1,
            "disease_index": 1,
            "plant_name": "string",
            "disease_name": "string",
            "description": "string",
            "treatment": "string",
            "analysis": "string",
            "article": "string",
            "temporary_image_url": "string"
        }
    ]
}
```
</details>

<details>
 <summary><code>GET</code> <code><b>/diseases</b></code> <code>(get many diseases by plant index)</code></summary>

##### Query Parameters
> | name | type | data type |
> |-----------|-----------|-------------------------|
> | plant_index | required | string|

##### Request Body
> None

##### Response Body
```json
{
    "diseases": [
        {
            "disease_id": "string",
            "plant_index": 1,
            "disease_index": 1,
            "plant_name": "string",
            "disease_name": "string",
            "description": "string",
            "treatment": "string",
            "analysis": "string",
            "article": "string",
            "temporary_image_url": "string"
        }
    ]
}
```
</details>

<details>
 <summary><code>GET</code> <code><b>/diseases/{id}</b></code> <code>(get one disease)</code></summary>

##### Path Parameters
> | name | type | data type |
> |-----------|-----------|-------------------------|
> | id | required | string|

##### Request Body
> None

##### Response Body
```json 
{
    "disease_id": "string",
    "plant_index": 1,
    "disease_index": 1,
    "plant_name": "string",
    "disease_name": "string",
    "description": "string",
    "treatment": "string",
    "analysis": "string",
    "article": "string",
    "temporary_image_url": "string"
}
```
</details>

<details>
 <summary><code>PATCH</code> <code><b>/diseases/{id}</b></code> <code>(update disease)</code></summary>

##### Path Parameter
> | name | type | data type |
> |-----------|-----------|-------------------------|
> | id | required | string|

##### Request Body
```json
{
    "plant_index": 1,
    "disease_index": 1,
    "plant_name": "string",
    "disease_name": "string",
    "description": "string",
    "treatment": "string",
    "analysis": "string",
    "article": "string",
    "image_id": "string"
}
```

##### Response Body
```json
{
    "message": "string"
}
```
</details>

<details>
 <summary><code>DELETE</code> <code><b>/diseases/{id}</b></code> <code>(delete disease)</code></summary>

##### Path Parameter
> | name | type | data type |
> |-----------|-----------|-------------------------|
> | id | required | string|

##### Request Body
> None

##### Response Body
```json
{
    "message": "string"
}
```
</details>


# Entity Relational Diagram

<p align="center">
  <img src="images/erd.png" alt="erd" />
</p>