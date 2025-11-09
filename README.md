[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/gJA-GD-V)
﻿# Tateti Random

API sencilla en Node.js que devuelve un movimiento aleatorio para un tablero de ta-te-ti.

## Requisitos previos
- Node.js 18 o superior.
- Cuenta en Vercel con un proyecto (puede ser creado desde el dashboard o con el comando vercel link).
- Acceso de administrador al repositorio en GitHub para crear *secrets*.

## Instalacion local
1. Clonar el repositorio y situarse en la raiz.
2. Instalar las dependencias con `npm install`.
3. Ejecutar la bateria de pruebas con `npm test`.
4. Levantar el servidor local con `npm start` y consumir el endpoint `GET /move?board=[...]`.

## Despliegue continuo en Vercel
Cada *push* a la rama `main` ejecuta el flujo definido en `.github/workflows/deploy-vercel.yml`. Este flujo instala dependencias, corre las pruebas y despliega en Vercel usando la CLI oficial. Para que funcione, sigue estos pasos una sola vez:

### 1. Autenticarse y vincular el proyecto en Vercel
```bash
npm install --global vercel    (este paso instala vecel en tu máquina)
vercel login  (este paso pide que hagas ENTER. Con eso te abre un browser y espera a que lo autorices)
vercel link
```
El comando `vercel link` crea la carpeta `.vercel/` (no la subas al repositorio) con el archivo `project.json` que contiene `orgId` y `projectId`.

### 2. Crear un token de acceso
Genera un token permanente con `vercel tokens create tateti-ci` o desde el dashboard (Account Settings > Tokens). 
Yo lo creé con scope completo, y sin expirar. Lo guardé en un archivo .private que no se sube al git
Guarda el valor; solo se muestra una vez.

### 3. Configurar *GitHub Secrets*
En GitHub entra a **Settings > Secrets and variables > Actions** y agrega los siguientes secretos:
- `VERCEL_TOKEN`: el token generado en el paso anterior.
- `VERCEL_ORG_ID`: valor `orgId` del archivo `.vercel/project.json`.
- `VERCEL_PROJECT_ID`: valor `projectId` del archivo `.vercel/project.json`.

Si tu aplicacion necesita variables de entorno, definalas en Vercel (`vercel env add` o desde el dashboard) o agrega pasos adicionales en el workflow.

### 4. Disparar el workflow a mano (no debería hacer falta con GitHub Actions)
Con los secretos configurados, haz *push* a `main`. GitHub Actions ejecuta:
1. `npm ci`
2. `npm test`
3. `npx vercel pull --yes --environment=production`
4. `npx vercel build --prod`
5. `npx vercel deploy --prebuilt --prod`

Al finalizar vas a ver la URL de despliegue en la pestana **Actions** del repositorio y en el dashboard de Vercel.

## Personalizacion
- Para desplegar desde otra rama, cambia la seccion `on.push.branches` del workflow.
- Si deseas saltar las pruebas antes de desplegar, elimina el paso "Run tests" en el YAML.

## Scripts utiles
- `npm start`: inicia el servidor.
- `npm test`: ejecuta Jest.
