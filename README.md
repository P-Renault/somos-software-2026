# Somos Software — V9 basada directamente en B8.0

Esta versión parte del paquete **Somos-Software-Web-v8.0-Carrusel-Principal-Corregido**.

## Cambio realizado

Se mantuvo el diseño, estructura, estilos, navegación, secciones, ofertas, producto y funcionamiento de B8.0.

El único cambio funcional es el **carrusel principal**:
- se reemplazaron las tres piezas visuales del carrusel por tres imágenes independientes;
- se eliminó del carrusel principal la presentación del Sistema de Control Financiero;
- se conservaron las flechas, indicadores, contador, autoplay y navegación táctil existentes.

## Nuevas imágenes

`assets/hero/hero-01.webp`
`assets/hero/hero-02.webp`
`assets/hero/hero-03.webp`

No se modificó el carrusel de ofertas ni el carrusel del producto financiero.


### B8.0 — corrección de assets del carrusel principal
Los archivos del sitio están en la raíz del paquete para GitHub Pages. Las tres imágenes del carrusel están en `assets/hero/` y cada slide incluye WebP + JPG de respaldo. No se modificó la estructura visual de las demás secciones.


## B8.0 Carrusel autocontenido
Las tres imágenes del carrusel principal están embebidas directamente en `index.html` como JPEG Base64. Esto evita que GitHub Pages deje el carrusel vacío cuando se sube solamente el HTML o cuando las rutas relativas de `assets/hero/` no quedan publicadas. El diseño B8.0 no fue modificado fuera del carrusel principal.


B8.0 v3: el carrusel principal usa tres visuales independientes y además los lleva inline como fallback para evitar reutilización de imágenes antiguas en GitHub Pages.


## Carrusel Premium — entrega actual

Los tres visuales del banner principal fueron reemplazados por los recursos entregados para esta versión. Los tres originales tienen proporción exacta **1536 × 576 px (8:3)** y se sirven como WebP para mantener nitidez y rendimiento. La misma relación 8:3 se mantiene en el área visual del carrusel tanto en escritorio como en móvil, mientras que el título y la descripción permanecen como HTML/CSS independiente.

Archivos: `assets/hero-01.webp`, `assets/hero-02.webp`, `assets/hero-03.webp`.
