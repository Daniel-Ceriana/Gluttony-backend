# Gluttony-backend
E-commerce Gluttony. Este repositorio solo tiene el desarrollo del backend

Creado con NodeJs y ExpressJs.

Api para la aplicación web Gluttony.

Tiene como funcionalidades crud de productos, combos y de usuarios. 

Dentro de los usuarios se puede hacer Sign Up, Sign In, chequeos de validez de token de sesión y roles (admin, user, o editor) 


Deploy del front end:

Endpoints para testear:
Base: https://gluttony-backend.vercel.app/api

Productos:/productos
      Con Query: /:id
Combos:/combos
      Con Query: /:id

Tanto en productos como en combos, esta completo el CRUD pero gracias a que tiene limitados los permisos con autorizacion de JWT y Passport, solo estan publicos los get

Users: Si bien tiene endpoints para manejar los users, solo funcionaria con las credenciales correctas, por lo que no tiene sentido poner la ruta aca
