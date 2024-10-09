
#### Endpoints para Compradores

1. **Buscar Productos**
    - `GET /api/products?search=keyword`
    - Respuesta: Lista de productos que coinciden con el criterio de búsqueda.
    
2. **Ver Detalle de Producto**
    - `GET /api/products/{id}`
    - Respuesta: Detalles del producto específico.
    
3. **Crear Pedido**
    - `POST /api/order`
    - Cuerpo: `{ "buyer_id": "ObjectId", "products": [{ "product_id": "ObjectId", "quantity": 2 }] }`
    - Respuesta: Detalles del pedido creado.
    
4. **Ver Pedidos**
    - `GET /api/buyers/{id}/order`
    - Respuesta: Lista de pedidos del comprador.

5. **Traer Productos por Categoría**

	- `GET /api/products?category={category_id}`
	- Respuesta: Lista de productos que pertenecen a la categoría especificada


#### Endpoints para Vendedores

1. **Crear Tienda**
    - `POST /api/stores`
    - Cuerpo: `{ "name": "Mi Tienda", "description": "Descripción de la tienda", "seller_id": "ObjectId" }`
    - Respuesta: Detalles de la tienda creada.
    
2. **Agregar Producto**
    - `POST /api/products`
    - Cuerpo: `{ "name": "Producto", "description": "Descripción", "price": 100.00, "stock": 10, "seller_id": "ObjectId" }`
    - Respuesta: Detalles del producto creado.
    
3. **Ver Productos**
    - `GET /api/sellers/{id}/products`
    - Respuesta: Lista de productos del vendedor.
    
4. **Gestionar Pedidos**
    - `GET /api/sellers/{id}/orders`
    - Respuesta: Lista de pedidos recibidos por el vendedor.

#### Endpoints para Administradores

1. **Gestionar Usuarios**
    - `GET /api/users`
    - Respuesta: Lista de todos los usuarios.
    
1. **Gestionar Productos**
    - `GET /api/products`
    - Respuesta: Lista de todos los productos.

1. **Gestionar Pedidos**
    - `GET /api/orders`
    - Respuesta: Lista de todos los pedidos.
    
1. **Gestionar Reseñas**
    - `GET /api/reviews`
    - Respuesta: Lista de todas las reseñas.

### Consideraciones de Seguridad

- **Autenticación y Autorización**: Implementar JWT (JSON Web Tokens) para asegurar que solo usuarios autenticados puedan acceder a ciertos endpoints.
- **Validación de Datos**: Validar todas las entradas de datos para prevenir inyecciones y otros tipos de ataques.
- **Cifrado de Contraseñas**: Utilizar algoritmos de hashing seguros como bcrypt para almacenar contraseñas.