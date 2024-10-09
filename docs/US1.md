# Como comprador, quiero poder buscar y comprar productos artesanales unicos de una variedad de vendedores en un solo lugar

## Componentes que se podrían crear:

### 1. **Barra de Búsqueda** (<search-bar/>)

- **Descripción**: Un campo de entrada donde los usuarios pueden escribir palabras clave para buscar productos.
- **Componentes**:
    - Input de texto.
    - Botón de búsqueda.
    - (opcional) Sugerencias automáticas mientras se escribe.

### 2. **Filtros de Búsqueda**

- **Descripción**: Opciones para refinar los resultados de búsqueda.
- **Componentes**:
    - Filtros por categoría (ej. joyería, cerámica, textiles).
    - Filtros por precio.
    - Filtros por ubicación del vendedor.
    - Filtros por valoración del producto.

### 3. **Lista de Productos** (<product-list/>)

- **Descripción**: Una vista en cuadrícula o lista de los productos que coinciden con la búsqueda.
- **Componentes**:
    - Imagen del producto.
    - Nombre del producto.
    - Precio.
    - Valoración.

### 4. **Página de Detalle del Producto** (<product-detail/>)


- **Descripción**: Información detallada sobre un producto específico.
- **Componentes**:
    - Imágenes del producto (galería).
    - Descripción detallada.
    - Precio.
    - Opciones de cantidad.
    - Botón de “Añadir al carrito”.
    - (opcional) Valoraciones y comentarios de otros compradores.

### 5. **Carrito de Compras**(<cart/>)

- **Descripción**: Un lugar donde los usuarios pueden revisar los productos que desean comprar.
- **Componentes**:
    - Lista de productos añadidos.
    - Subtotal y total.
    - Botón para proceder al pago.
    - Opciones para modificar la cantidad o eliminar productos.

### 6. **Proceso de Pago**(<checkout/>)

- **Descripción**: Un flujo para que los usuarios completen su compra.
- **Componentes**:
    - Formulario de dirección de envío.
    - Opciones de método de pago.
    - Resumen del pedido.
    - Botón para confirmar la compra.

### 7. **Perfil del Usuario**(<profile/>)

- **Descripción**: Una sección donde los usuarios pueden gestionar su información y ver su historial de compras.
- **Componentes**:
    - Información personal.
    - Historial de pedidos.
    - Opciones de configuración de cuenta.
    - Botón para convertirse en vendedor

### 8. **Notificaciones** ()

- **Descripción**: Alertas para mantener a los usuarios informados sobre el estado de sus pedidos.
- **Componentes**:
    - (opcional) Notificaciones por correo electrónico.
    - (opcional) Notificaciones en la plataforma.

### 9. Que mas???