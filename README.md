<p align="center">
  <img src="https://raw.githubusercontent.com/KolisCode/lotesRB/master/screenshots/readme-banner.png" alt="KolisCode Banner" width="100%"/>
</p>

# TiendaKit — Frontend

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5-orange)
![MercadoPago](https://img.shields.io/badge/MercadoPago-Checkout-009EE3)

> Frontend del e-commerce TiendaKit. **API:** [tiendakit-api](https://github.com/KolisCode/tiendakit-api)

Tienda online genérica adaptable a cualquier rubro. SSR para SEO, carrito persistente en localStorage y checkout real con MercadoPago.

## Stack

- **Next.js 15** App Router con SSR e ISR
- **Tailwind CSS 4** — estilos utilitarios
- **Zustand** — carrito persistente y estado admin
- **React Query** — fetching y cache del panel admin
- **Axios** — cliente HTTP con interceptor JWT

## Requisitos

- Node.js 20+
- [tiendakit-api](https://github.com/KolisCode/tiendakit-api) corriendo en `localhost:3002`

## Instalación

```bash
npm install
```

## Variables de entorno

Crear `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3002/api
```

## Desarrollo

```bash
npm run dev    # http://localhost:3000
```

---

## Páginas

| Ruta | Tipo | Descripción |
|------|------|-------------|
| `/` | SSR + ISR | Hero, categorías, productos destacados |
| `/productos` | SSR | Catálogo con filtros por categoría y precio |
| `/productos/[slug]` | SSR | Detalle de producto con galería |
| `/carrito` | Client | Carrito con resumen y formulario de checkout |
| `/orden/confirmacion` | Client | Resultado del pago (pagado/pendiente/cancelado) |
| `/admin/login` | Client | Login del panel admin |
| `/admin/productos` | Client | CRUD de productos |
| `/admin/ordenes` | Client | Vista de órdenes con stats y cambio de estado |

## Flujo de compra

1. Cliente agrega productos al carrito (Zustand, persiste en localStorage)
2. En `/carrito`, completa nombre, email y teléfono
3. Hace clic en "Pagar con MercadoPago" → redirige al checkout de MP
4. MP redirige de vuelta a `/orden/confirmacion` con el estado del pago
