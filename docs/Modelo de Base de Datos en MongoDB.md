#### Colecciones Principales

1. **Users**

    ```json
    {
  "_id": ObjectId,
  "name": String,
  "email": String,
  "password": String,
  "user_type": "buyer" | "seller" | "administrator",
  "creation_date": Date,
  "image_url": String
}

```
  

2. **Products**
    
    ```json
    {
  "_id": ObjectId,
  "name": String,
  "description": String,
  "price": Number,
  "stock": Number,
  "seller_id": ObjectId,
  "creation_date": Date,   
  "category_id": ObjectId,
  "color": String,
  "material": String,
  "size": String,
  "media_urls": [ 
    {
      "type": "image" | "video",
      "url": String
    }
  ]
}


    ```
    
    
3. **Store**
    
    ```json
    {
  "_id": ObjectId,
  "name": String,
  "description": String,
  "phone": String,
  "address": String,
  "seller_id": ObjectId,
  "creation_date": Date,
  "logo_url": String,
  "cover_url": String
}

    ```

    
4. **Orders**
    
    ```json
    {
  "_id": ObjectId,
  "buyer_id": ObjectId,
  "order_date": Date,
  "total": Number,
  "status": "pending" | "shipped" | "delivered" | "cancelled",
  "details": [
    {
      "product_id": ObjectId,
      "quantity": Number,
      "price": Number
    }
  ]
}

    ```
    
5. **Reviews**
    
    ```json
    {
  "_id": ObjectId,
  "product_id": ObjectId,
  "buyer_id": ObjectId,
  "rating": Number,
  "comment": String,
  "creation_date": Date
}
    ```
    