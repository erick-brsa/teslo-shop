## Next.js Teslo Shop 

Para correr localmente, se necesita la base de datos.

```bash
docker-compose up -d
```

* El -d, significa __detached__

### Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__
```
MONGO_URL=mongo://localhost:27012/teslodb
```

* Reconstruir los módulos de node y levantar Next
```
npm install
npm run dev
```
### Llenar la base de datos con la información de pruebas
Llamara:
```
https://localhost:3000/api/seed
```
