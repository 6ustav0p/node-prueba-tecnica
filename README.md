#  API de Usuarios - Prueba Técnica

Este proyecto es una API REST desarrollada con **Node.js**, **Express** y **MongoDB**. Permite la gestión de usuarios con operaciones CRUD y búsqueda avanzada por ciudad.

##  **Características**
- Creación, actualización y eliminación de usuarios.  
- Validación de datos con **express-validator**.  
- Prevención de duplicados en **email**.  
- Filtrado por ciudad en direcciones.  
- Paginación en la obtención de usuarios.  
- Conexión a base de datos MongoDB con **mongoose**.  

---

##  **Tecnologías Utilizadas**
- **Backend**: Node.js + Express.js  
- **Base de Datos**: MongoDB + Mongoose  
- **Validaciones**: Express Validator  
- **Entorno de ejecución**: Nodemon  
- **Manejo de variables de entorno**: Dotenv  
- **CORS habilitado**  

---

## ⚙ **Instalación y Configuración**

###  **1️ Clonar el repositorio**
```bash
git clone https://github.com/6ustav0p/node-prueba-tecnica.git
cd node-prueba-tecnica

```

###  **2️ Instalar dependencias**
```bash
npm install
```

###  **3️ Configurar variables de entorno**
Copia el archivo `.env.template` y renómbralo como `.env`:

Luego, edítalo con los valores correctos:

```env
PORT=3000
MONGODB_CNN=mongodb+srv://usuario:password@cluster.mongodb.net/tu_base_de_datos
```

> **IMPORTANTE:** Reemplaza `usuario`, `password` y `tu_base_de_datos` con tus credenciales de MongoDB.

###  **4️ Iniciar el servidor**
Ejecuta el siguiente comando para iniciar el proyecto:
```bash
npm run dev
```
Esto iniciará el servidor en:
 `http://localhost:3000/`

---

##  **Endpoints de la API**
> Todos los endpoints devuelven respuestas en formato **JSON**.

### **Usuarios**
| Método | Endpoint | Descripción |
|--------|---------|------------|
| **POST** | `api/usuarios` | Crea un usuario nuevo. |
| **GET** | `api/usuarios` | Obtiene la lista de usuarios (con paginación). |
| **GET** | `api/usuarios/:id` | Obtiene un usuario por su ID. |
| **PUT** | `api/usuarios/:id` | Actualiza un usuario por su ID. |
| **DELETE** | `api/usuarios/:id` | Elimina un usuario por su ID. |
| **GET** | `api/usuarios/buscar?ciudad=Lima` | Filtra usuarios por ciudad. |

---

## **Pruebas en Postman**
1 **Abrir Postman**  
2 **Crear una nueva solicitud** y utilizar los endpoints anteriores.  
3️ **Ejemplo de creación de usuario (`POST /usuarios`)**
```json
{
  "nombre": "Gustavo Padilla",
  "email": "gustavo.padilla@example.com",
  "edad": 30,
  "direcciones": [
    {
      "calle": "Av. Las Flores",
      "ciudad": "Montería",
      "pais": "Colombia",
      "codigo_postal": "230001"
    }
  ]
}
```
4️ **Para ver todos los usuarios:** `GET api/usuarios`  
5️ **Para probar la paginación:** `GET api/usuarios?page=1&limit=5`  
6️ **Filtrar por ciudad:** `GET api/usuarios/buscar?ciudad=Lima`

---

 **Consideraciones**
- Los correos electrónicos son únicos.  
- No se pueden crear usuarios sin `nombre` o `email`.  
- La edad es opcional.  
- Las direcciones deben tener `calle`, `ciudad`, `pais` y `codigo_postal`.

---
