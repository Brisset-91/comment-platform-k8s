# 💬 Proyecto de Comentarios con CI/CD

Este proyecto es una aplicación web simple para gestionar comentarios, acompañada de un **pipeline CI/CD en GitHub Actions** que automatiza la construcción, pruebas, despliegue en un entorno de testing con Kubernetes y publicación de imágenes en Docker Hub.

---

## 🚀 Características

- **Frontend estático (HTML + JS)** que permite:
  - Enviar comentarios con nombre y mensaje.
  - Mostrar lista de comentarios almacenados en el backend.
  - Configuración automática de la `API_URL` según el entorno (local, testing, producción).
- **Backend con Node.js + MongoDB** para persistencia de datos.
- **Pipeline CI/CD** que:
  - Corre pruebas en el backend.
  - Construye imágenes Docker para backend y frontend.
  - Despliega en un cluster Kubernetes de prueba (Minikube).
  - Ejecuta pruebas de conectividad.
  - Publica imágenes en Docker Hub.
  - Prepara manifests de Kubernetes para despliegue real.

---

## 🛠️ Estructura del Proyecto

📂 proyecto-comentarios
┣ 📂 backend/ # Código backend (Node.js + MongoDB)
┣ 📂 frontend/ # Frontend estático con HTML/JS
┣ 📂 k8s/ # Manifests de Kubernetes (deployments y services)
┣ 📂 .github/workflows/ci-cd.yml # Pipeline CI/CD
┣ 📄 README.md # Documentación

---

## 📦 Requisitos

- **Node.js 22+**
- **MongoDB 7+**
- **Docker + Docker Compose**
- **Kubernetes (Minikube o Docker Desktop)**
- **GitHub Actions** para CI/CD

---

## ▶️ Ejecución Local

### 1. Backend
```bash
cd backend
npm install
npm start

2. Frontend

Abrir frontend/index.html en el navegador.
Por defecto, se conecta a http://localhost:3001.

⚙️ Pipeline CI/CD

El pipeline está definido en .github/workflows/ci-cd.yml y realiza:

1. Build & Tests

 - Instala dependencias de backend.

 - Corre tests del backend.

 - Valida que el frontend esté accesible.

2. Docker

 - Construye imágenes de backend y frontend.

 - Las carga en Minikube para pruebas.

 - Si todo pasa, las sube a Docker Hub.

3. Kubernetes Testing

 - Despliega MongoDB temporal.

 - Despliega backend y frontend en Minikube.

 - Corre pruebas de conectividad.

 - Muestra logs y resultados.

4. Deployment Files

 - Actualiza manifests (k8s/) con el IMAGE_TAG del commit.

 - Genera un script deploy-to-local.sh para despliegue manual.

☸️ Despliegue en Kubernetes

1. Crear secreto con MongoDB
kubectl create secret generic backend-secret \
  --from-literal=mongo_url="mongodb://mongo:27017/comentarios"

2. Aplicar manifests
kubectl apply -f k8s/

3. Verificar pods y servicios
kubectl get pods
kubectl get services

📤 Imágenes en Docker Hub

El pipeline publica imágenes bajo tu usuario de Docker Hub:

Backend:
dockerhub-username/backend:latest
dockerhub-username/backend:<commit-sha>

Frontend:
dockerhub-username/frontend:latest
dockerhub-username/frontend:<commit-sha>

📑 Notas

El frontend es estático, no requiere build.

El backend requiere MONGO_URL (usado desde secrets en GitHub).

Puedes usar el script generado automáticamente:

./deploy-to-local.sh
