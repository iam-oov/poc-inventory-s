<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# S-Inventory

## Development pasos

1. Clonar el proyecto
2. Crear un archivo `.env` basado en el archivo `.env.example`
3. Levantar los contenedores con `docker compose up --build -d`

## Configuración de Migraciones

En entornos de desarrollo y producción, la opción `synchronize` se ha configurado en `false`. Esto requiere que los desarrolladores gestionen las migraciones manualmente.

A continuación, se proporcionan tres comandos para facilitar la gestión de migraciones. Ten presente que necesitaras modificar el archivo `data-source.ts` con las credenciales de la base de datos que deseas aplicar las migraciones.

```bash
npm run m:generate   # Genera una nueva migración basada en los cambios realizados en las entidades
npm run m:run        # Ejecuta las migraciones pendientes
npm run m:revert     # Revierte la última migración aplicada
```

> [!IMPORTANT]
> Debe crearse una migración al iniciar el proyecto y cada vez que se modifique cualquier archivo `*.entity.ts` para persistir los cambios en la base de datos.

Asegúrate de ejecutar estos comandos según sea necesario para mantener la base de datos en sincronía con las entidades del proyecto.
