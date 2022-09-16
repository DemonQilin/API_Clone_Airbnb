# API Clone de Airbnb con Node
Este proyecto de backend fue realizado en el modulo de NodeJS de Academlo. Para su construcción se usaron tecnologias del entorno de Node como:
- Sequelize
- Express
- Passport
- JWT
- dotenv
- bcrypt
- uuid

# Deploy
Puedes probar el servicio en: [https://airbnb-clone-jevl.onrender.com](https://airbnb-clone-jevl.onrender.com)

## Usuarios de prueba
### Admin
```javascript
{
	"email": "juanes200012@gmail.com",
	"password": "JuanesV0618++"
}
```

### Host
```javascript
{
	"email": "sahidKick@gmail.com",
	"password": "contraseñaSecreta++"
}

{
	"email": "juniorPache@gmail.com",
	"password": "Junior12345++"
}
```

### Guest
```javascript
{
	"email": "pauliFlor123@gmail.com",
	"password": "Paulina12345++"
}
```

## Endpoints Principales
### **Users**
```
https://airbnb-clone-jevl.onrender.com/api/v1/users/
```
Recibe peticiones de tipo:
- **GET :** 
    - [x] Token JWT
    - [x] Role: admin, host

### **Users/:id**
```
https://airbnb-clone-jevl.onrender.com/api/v1/users/:id
```

Recibe peticiones de tipo:
- **GET :**
    - [x] Token JWT
    - [x] Role: admin, host
- **PUT :**
    - [x] Token JWT
    - [x] Role: admin
- **PATCH :**
    - [x] Token JWT
    - [x] Role: admin
- **DELETE :**
    - [x] Token JWT
    - [x] Role: admin

### **Users/me**
```
https://airbnb-clone-jevl.onrender.com/api/v1/users/me
```

Recibe peticiones de tipo:
- **GET :**
    - [x] Token JWT
- **PUT :**
    - [x] Token JWT
- **PATCH :**
    - [x] Token JWT
- **DELETE :**
    - [x] Token JWT

### **user/me/profile-img**
```
https://airbnb-clone-jevl.onrender.com/api/v1/users/me/profile-img
```

Recibe peticiones de tipo patch:
- **PATCH :**
    - [x] Token JWT

### **Auth/register**
```
https://airbnb-clone-jevl.onrender.com/api/v1/auth/register
```

Recibe peticiones de tipo:
- **POST**

### **Auth/login**
```
https://airbnb-clone-jevl.onrender.com/api/v1/auth/login
```

Recibe peticiones de tipo:
- **POST :**
    - [ ] Token JWT
    - [ ] Role: admin

### **Accommodations**
```
https://airbnb-clone-jevl.onrender.com/api/v1/accommodations
```

Recibe peticiones de tipo:
- **GET :**
    - [ ] Token JWT
    - [ ] Role: admin
- **POST :**
    - [x] Token JWT
    - [x] Role: host

### **Accommodations/:id**
```
https://airbnb-clone-jevl.onrender.com/api/v1/accommodations/:id
```

Recibe peticiones de tipo:
- **GET :**
    - [ ] Token JWT
    - [ ] Role
- **PUT :**
    - [x] Token JWT
    - [x] Role: admin, host
- **PATCH :**
    - [x] Token JWT
    - [x] Role: admin, host
- **DELETE :**
    - [x] Token JWT
    - [x] Role: admin, host

### **Accommodations/:id/make-reservation**
```
https://airbnb-clone-jevl.onrender.com/api/v1/accommodations/:id/make-reservation
```

Recibe peticiones de tipo:
- **POST :**
    - [x] Token JWT
    - [ ] Role

### **Reservations/:id**
```
https://airbnb-clone-jevl.onrender.com/api/v1/reservations/:id
```

Recibe peticiones de tipo:
- **PATCH :**
    - [x] Token JWT
    - [ ] Role
- **DELETE :**
    - [x] Token JWT
    - [ ] Role