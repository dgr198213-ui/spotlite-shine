# Guía de Contribución - Spot&Shows

Para mantener un flujo de trabajo profesional y organizado, seguimos estas reglas:

## Flujo de Ramas
- `main`: Rama de producción. Solo contiene código estable y probado.
- `develop`: Rama de integración. Aquí se mezclan las nuevas funcionalidades antes de ir a main.
- `feature/nombre-mejora`: Ramas temporales para nuevas funcionalidades.
- `fix/nombre-error`: Ramas temporales para corrección de errores.

## Convención de Commits (Conventional Commits)
Usamos el estándar de Conventional Commits:
- `feat:` Nueva funcionalidad.
- `fix:` Corrección de un error.
- `docs:` Cambios en la documentación.
- `style:` Cambios que no afectan al significado del código (espacios, formato, etc).
- `refactor:` Cambio de código que no corrige un error ni añade una funcionalidad.
- `perf:` Cambio de código que mejora el rendimiento.
- `chore:` Tareas de mantenimiento (actualizar dependencias, configuración, etc).

## Pull Requests
1. Todo cambio debe pasar por un Pull Request (PR).
2. Los PRs deben dirigirse a la rama `develop`.
3. Una vez validado en `develop`, se hará un PR de `develop` a `main` para el despliegue.
