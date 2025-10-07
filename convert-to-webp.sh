#!/bin/bash

# Script para converter todas as imagens JPG e PNG para WebP
# Otimizado para SEO e performance

echo "🚀 Rev Pulse - Conversor de Imagens para WebP"
echo "=============================================="
echo ""

# Verificar se o cwebp está instalado
if ! command -v cwebp &> /dev/null; then
    echo "❌ cwebp não está instalado."
    echo ""
    echo "Para instalar no macOS:"
    echo "  brew install webp"
    echo ""
    echo "Para instalar no Ubuntu/Debian:"
    echo "  sudo apt-get install webp"
    echo ""
    exit 1
fi

# Diretório das imagens
IMG_DIR="./images"

# Criar backup antes de converter
BACKUP_DIR="./images_backup"
if [ ! -d "$BACKUP_DIR" ]; then
    echo "📦 Criando backup das imagens originais..."
    mkdir -p "$BACKUP_DIR"
    cp -r "$IMG_DIR"/* "$BACKUP_DIR"/
    echo "✅ Backup criado em: $BACKUP_DIR"
    echo ""
fi

# Contador
converted=0
total=0

echo "🔄 Convertendo imagens para WebP..."
echo ""

# Converter JPG para WebP
for img in "$IMG_DIR"/*.jpg; do
    if [ -f "$img" ]; then
        total=$((total + 1))
        filename=$(basename "$img" .jpg)

        # Converter com qualidade 85 (ótimo balanço qualidade/tamanho)
        cwebp -q 85 "$img" -o "$IMG_DIR/${filename}.webp"

        if [ $? -eq 0 ]; then
            original_size=$(stat -f%z "$img")
            new_size=$(stat -f%z "$IMG_DIR/${filename}.webp")
            reduction=$(echo "scale=1; (1 - $new_size/$original_size) * 100" | bc)

            echo "✅ $filename.jpg → $filename.webp (${reduction}% menor)"
            converted=$((converted + 1))
        else
            echo "❌ Erro ao converter: $filename.jpg"
        fi
    fi
done

# Converter PNG para WebP
for img in "$IMG_DIR"/*.png; do
    if [ -f "$img" ]; then
        total=$((total + 1))
        filename=$(basename "$img" .png)

        # Para PNGs (logos), usar qualidade 90 e preservar transparência
        cwebp -q 90 -lossless "$img" -o "$IMG_DIR/${filename}.webp"

        if [ $? -eq 0 ]; then
            original_size=$(stat -f%z "$img")
            new_size=$(stat -f%z "$IMG_DIR/${filename}.webp")
            reduction=$(echo "scale=1; (1 - $new_size/$original_size) * 100" | bc)

            echo "✅ $filename.png → $filename.webp (${reduction}% menor)"
            converted=$((converted + 1))
        else
            echo "❌ Erro ao converter: $filename.png"
        fi
    fi
done

echo ""
echo "=============================================="
echo "✨ Conversão concluída!"
echo "📊 Total: $converted de $total imagens convertidas"
echo ""
echo "📝 Próximos passos:"
echo "1. Verifique as imagens WebP em: $IMG_DIR"
echo "2. Atualize o HTML para usar as versões .webp"
echo "3. Use <picture> tag para fallback (suporte a navegadores antigos)"
echo ""
echo "💡 Exemplo de uso no HTML:"
echo '<picture>'
echo '  <source srcset="images/familia.webp" type="image/webp">'
echo '  <img src="images/familia.jpg" alt="Descrição">'
echo '</picture>'
echo ""
