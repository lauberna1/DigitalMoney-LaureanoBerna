> ⚠️ **Alerta de instalación**
>
> Si tenés problemas al correr `npm install` por conflictos de dependencias (`react-credit-cards-2` y `React 19`), usá el siguiente comando:
>
> ```bash
> npm install --force
> ```
>
> Esto forzará la instalación ignorando los errores de compatibilidad de versiones.

# 💰 Digital Money

**Digital Money** es una aplicación web desarrollada como proyecto final del curso de desarrollo frontend. Su objetivo es simular una plataforma de gestión financiera personal, permitiendo realizar operaciones como pago de servicios, carga de dinero, y gestión de tarjetas, todo con una experiencia fluida y adaptada a dispositivos desktop, tablet y mobile.

---

## 🚀 Tecnologías utilizadas

- **Next.js 15.3.3**
- **React 19**
- **TypeScript 5**
- **React Hook Form** + **Yup** (validaciones)
- **React Icons**
- **React Toastify** (notificaciones)
- **React Spinners** (loaders)
- **JS-Cookie** y **jwt-decode** (manejo de sesiones)

> Usamos **npm** como gestor de paquetes.

---

## 🛠️ Instalación

1. Cloná el repositorio:

```bash
git clone https://github.com/tuusuario/digital-money.git
cd digital-money
```

2. Instalá las dependencias:

```bash
npm install
```

3. Ejecutá el entorno de desarrollo:

```bash
npm run dev
```

---

## 📦 Scripts disponibles

| Comando         | Descripción                     |
| --------------- | ------------------------------- |
| `npm run dev`   | Corre el servidor de desarrollo |
| `npm run build` | Compila la app para producción  |
| `npm start`     | Corre la versión compilada      |
| `npm run lint`  | Ejecuta análisis de ESLint      |

---

## 📐 Funcionalidades por Sprint

### 🟡 Sprint I: Inicio, registro y acceso

- Autenticación con validaciones.
- Registro con redirección a login.
- Gestión de sesión (token + cierre correcto).
- Mensajes de error claros.

### 🟡 Sprint II: Dashboard, Mi Perfil y Tarjetas

#### Dashboard

- Visualización de resumen en ARS.
- Sidebar visible en todo momento.
- Lista de últimas 10 transacciones.
- Acceso directo a "Mi actividad".

#### Mi Perfil

- Edición de datos personales y alias.
- Alias formateado (X.X.X).
- Copia de CVU y alias.
- Contraseña oculta.

#### Gestión de Medios de Pago

- Alta de tarjeta (máximo 10).
- Detección por primeros dígitos.
- Últimos 4 dígitos visibles.
- Mensaje al no tener tarjetas.

### 🟡 Sprint III: Ingreso de Dinero y Mi Actividad

#### Ingreso de dinero

- Selección de medio adherido.
- Comprobante post-carga.
- Copia rápida de CVU y alias.

#### Mi Actividad

- Filtros por periodo y tipo (ingreso/egreso).
- Buscador por palabras claves.
- Paginado y orden cronológico.
- Visualización del detalle y resumen de cada transacción.

### 🟡 Sprint IV: Pago de Servicios

- Listado de servicios sin pagar.
- Validación del número de cuenta.
- Redirección a selección de medio si hay facturas.
- Mensajes claros de error y éxito.
- Resumen final del pago.

---

## 📁 Estructura general

```
src/
├── app/
├── components/
│   ├── Button/
│   ├── Footer/
│   ├── Input/
│   ├── MobilePath/
│   ├── Nav/
│   ├── Text/
├── features/
│   ├── dashboard/
│   ├── login/
│   ├── register/
├── context/
│   ├── AuthContext/
│   ├── DashboardContext/
├── layouts/
│   ├── DashboardLayout/
│   ├── MainLayout/
├── hooks/
├── schema/
├── types/
├── utils/
```

---

## 👨‍💻 Autor

Proyecto desarrollado por **Laureano**, como parte del curso de desarrollador frontend.
