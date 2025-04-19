# VendePorWhats

Sistema de ventas y gestión de WhatsApp para negocios.

## Descripción

VendePorWhats es una aplicación web mobile-first desarrollada con Nuxt.js que permite a los negocios crear y compartir catálogos de productos a través de WhatsApp. Los clientes pueden realizar pedidos en línea de manera sencilla y rápida, mejorando la experiencia de compra y facilitando la gestión de ventas para los negocios.

## Estado del Desarrollo

### Características Implementadas ✅
- Diseño mobile-first optimizado para dispositivos móviles
- Catálogo de productos con imágenes y descripciones
- Generación de links personalizados para compartir en WhatsApp
- Sistema de pedidos en línea
- Panel de administración para gestionar productos y pedidos
- Seguimiento de pedidos en tiempo real
- Gestión de inventario
- Estadísticas de ventas

### En Desarrollo 🚧
- Notificaciones automáticas de nuevos pedidos
- Mejoras en la interfaz de usuario
- Optimización de rendimiento
- Sistema de pagos en línea
- Gestión de múltiples tiendas

## Requisitos Previos

- Node.js (versión 16 o superior)
- npm, yarn, pnpm o bun
- Cuenta de WhatsApp Business API

## Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd vendeporwhats
```

2. Instala las dependencias:
```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

3. Configura las variables de entorno:
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```
WHATSAPP_API_KEY=tu_api_key
DATABASE_URL=tu_url_de_base_de_datos
```

## Desarrollo

Para iniciar el servidor de desarrollo en `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Producción

Para construir la aplicación para producción:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Para previsualizar la versión de producción localmente:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## Estructura del Proyecto

```
vendeporwhats/
├── components/     # Componentes Vue reutilizables
├── composables/    # Composables de Vue
├── config/        # Archivos de configuración
├── layouts/       # Layouts de la aplicación
├── middleware/    # Middleware de Nuxt
├── pages/         # Páginas de la aplicación
├── plugins/       # Plugins de Nuxt
├── public/        # Archivos estáticos
├── server/        # Código del servidor
├── types/         # Definiciones de tipos TypeScript
└── utils/         # Utilidades y helpers
```

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Contacto

[Tu Nombre] - [tu@email.com]

Link del proyecto: [https://github.com/tu-usuario/vendeporwhats](https://github.com/tu-usuario/vendeporwhats)
