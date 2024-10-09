```
/feria-artesana
|-- /frontend
|   |-- /public
|   |-- /src
|       |-- /components
|       |-- /pages
|       |-- /context
|       |-- App.js
|       |-- index.js
|   |-- README.md
|   |-- package.json
|-- /backend
|   |-- /controllers
|   |-- /models
|   |-- /routes
|   |-- /config
|   |-- server.js
|   |-- README.md
|   |-- package.json
|-- /docs
|   |-- frontend.md
|   |-- backend.md
|   |-- api-documentation.md
|-- .gitignore
|-- README.md
```

### Descripción de las carpetas y archivos:

- **/frontend**: Contiene todo el código del proyecto React.
    
    - **/public**: Archivos públicos como `index.html`.
    - **/src**: Código fuente de React.
        - **/components**: Componentes reutilizables de React.
        - **/pages**: Páginas de la aplicación.
        - **/hooks**: 
        - **/contexts**:
        - **App.js**: Componente principal de la aplicación.
        - **index.js**: Punto de entrada de la aplicación React.
    - **package.json**: Dependencias y scripts del proyecto React.
    - **/README.md**: Información específica sobre cómo configurar y ejecutar el proyecto frontend.
    
- **/backend**: Contiene todo el código del proyecto Node.js.
    
    - **/controllers**: Lógica de negocio y controladores.
    - **/models**: Modelos de datos para MongoDB.
    - **/routes**: Definición de rutas de la API.
    - **/config**: Configuraciones del proyecto, como la conexión a la base de datos.
    - **server.js**: Punto de entrada del servidor Node.js.
    - **package.json**: Dependencias y scripts del proyecto Node.js.
    - **README.md**: Información específica sobre cómo configurar y ejecutar el proyecto backend.
    
- **.gitignore**: Archivos y carpetas que Git debe ignorar.
- **README.md**: Documentación del proyecto.