# Feria Artesana - Marketplace
(TRABAJO EN PROCESO)

## Configuración inicial para el Frontend y el Backend

1. **Clonar el repositorio:**
```bash
   git clone https://github.com/No-Country-simulation/c21-05-ft-node-react.git
```

### Configuración del Backend

2. Navegar al directorio del backend:
```bash
cd c21-05-ft-node-react/backend
```

3. Instalar las dependencias:

```bash
npm install
```

4. Configurar las variables de entorno:

Crea un archivo .env dentro de la carpeta /backend y añade las siguientes variables de entorno:

```env
PORT=3000
DATABASE_URL=YOUR_MONGO_DB_URL
JWT_SECRET=YOUR_JWT_SECRET
```

Iniciar la aplicación:

```bash
npm run server
```

### Configuración del Frontend

2. Navegar al directorio del frontend:
```bash
cd ..
cd frontend
```

3. Instalar las dependencias:

```bash
npm install
```

4. Configurar las variables de entorno:

Crea un archivo .env dentro de la carpeta /frontend y añade las siguientes variables de entorno:

```env
VITE_API_BASE_URL=http://localhost:3000/api/
VITE_CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME
VITE_CLOUDINARY_UPLOAD_PRESET=YOUR_UPLOAD_PRESET
```

Iniciar la aplicación:

```bash
npm run dev
```
--- 

### Ejecución conjunta
Para ejecutar el frontend y el backend juntos, asegúrate de que ambos están configurados correctamente y que el servidor del backend está funcionando antes de iniciar el frontend.

#### Contribuciones
Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (git checkout -b feature-nueva-funcionalidad).
3. Haz commit de tus cambios (git commit -m 'Añadir nueva funcionalidad').
4. Sube tus cambios (git push origin feature-nueva-funcionalidad).
5. Abre un pull request.

Licencia
Este proyecto está bajo la licencia MIT con atribución.

El sitio -> [Feria Artesana]( https://c21-05-ft-node-react-mirror-frontend-64qbwssi2-muyvisual.vercel.app/)

## :::: Vista de HOME ::::

![alt text](docs/home.png)



---

## :::: Vista de SHOP ::::

![alt text](docs/shop.png)

