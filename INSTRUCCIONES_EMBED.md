# Cómo Embeber el Chat en Cualquier Web

Hay dos formas sencillas de embeber el chat en cualquier sitio web:

## 1. Usando un div con iframe

```html
<!-- Opción 1: Embeber directamente con iframe -->
<div style="width: 400px; height: 600px;">
    <iframe 
        src="RUTA_AL_CHAT/index.html" 
        frameborder="0" 
        style="width: 100%; height: 100%; border: none;"
        title="Chat Almas Libres"
    ></iframe>
</div>
```

## 2. Usando JavaScript

```html
<!-- Opción 2: Embeber usando JavaScript -->
<!-- Primero, crea un div contenedor -->
<div id="chat-container" style="width: 400px; height: 600px;"></div>

<!-- Luego añade el script -->
<script>
    const container = document.getElementById('chat-container');
    const iframe = document.createElement('iframe');
    iframe.src = 'RUTA_AL_CHAT/index.html';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.title = 'Chat Almas Libres';
    container.appendChild(iframe);
</script>
```

## Notas Importantes:

1. Reemplaza `RUTA_AL_CHAT` con la ruta donde estén alojados los archivos del chat.
2. Puedes ajustar el `width` y `height` del div contenedor según tus necesidades.
3. El chat es responsive, por lo que se adaptará al tamaño del contenedor.
4. Los archivos necesarios que deben estar en el servidor son:
   - index.html
   - style.css
   - script.js

## Ejemplo de Uso en una Página Web Existente:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Mi Sitio Web</title>
</head>
<body>
    <!-- Tu contenido existente -->
    <h1>Mi Página Web</h1>
    <p>Contenido de la página...</p>

    <!-- Insertar el chat donde lo necesites -->
    <div style="width: 400px; height: 600px; position: fixed; bottom: 20px; right: 20px;">
        <iframe 
            src="RUTA_AL_CHAT/index.html" 
            frameborder="0" 
            style="width: 100%; height: 100%; border: none;"
            title="Chat Almas Libres"
        ></iframe>
    </div>
</body>
</html>
