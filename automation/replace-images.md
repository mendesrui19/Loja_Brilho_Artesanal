# Como substituir as imagens cortadas

As imagens actuais em `public/produtos/` são thumbnails de 640x640 descarregadas automaticamente do Instagram. Muitas ficaram cortadas porque o Instagram faz crop automático nas thumbnails.

## Passos para substituir:

1. **Abre o Instagram** no telemóvel ou computador
2. **Guarda cada foto** que queiras melhorar (tira screenshot ou usa "Guardar imagem")
3. **Coloca a foto na pasta** `public/produtos/` com o **mesmo nome** do ficheiro actual

### Lista de ficheiros a substituir:

Abre o site em `http://localhost:3000/catalogo` e vê quais imagens estão mal cortadas.
Os nomes dos ficheiros correspondem ao ID do post no Instagram.

**Exemplo:** Se a imagem `DY4zwhYCO10.jpg` está cortada, vai ao post 
`https://www.instagram.com/p/DY4zwhYCO10/`, guarda a foto, e substitui o ficheiro em:

```
public/produtos/DY4zwhYCO10.jpg
```

### Dicas:
- Usa fotos quadradas (1:1) para melhor resultado
- Resolução mínima recomendada: 800x800 pixels
- Formato: `.jpg` ou `.png`
- O site recarrega automaticamente, não precisas de reiniciar nada
