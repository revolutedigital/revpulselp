#!/usr/bin/env python3
"""
Rev Pulse - Conversor de Imagens para WebP
Otimizado para SEO e Performance
"""

import os
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("❌ Pillow não está instalado.")
    print("\nPara instalar:")
    print("  pip3 install Pillow")
    print("\nOu:")
    print("  python3 -m pip install Pillow")
    sys.exit(1)

def convert_to_webp(input_path, output_path, quality=85):
    """Converte uma imagem para WebP"""
    try:
        with Image.open(input_path) as img:
            # Converter RGBA para RGB se necessário (exceto PNGs transparentes)
            if img.mode == 'RGBA':
                # Para logos/PNGs com transparência, manter RGBA
                img.save(output_path, 'WebP', quality=quality, method=6)
            else:
                # Para fotos, converter para RGB
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                img.save(output_path, 'WebP', quality=quality, method=6)

        return True
    except Exception as e:
        print(f"❌ Erro ao converter {input_path}: {e}")
        return False

def main():
    print("🚀 Rev Pulse - Conversor de Imagens para WebP")
    print("==============================================")
    print()

    # Diretório das imagens
    img_dir = Path("./images")

    if not img_dir.exists():
        print(f"❌ Diretório {img_dir} não encontrado!")
        sys.exit(1)

    # Criar backup
    backup_dir = Path("./images_backup")
    if not backup_dir.exists():
        print("📦 Criando backup das imagens originais...")
        backup_dir.mkdir(parents=True, exist_ok=True)

        for img_file in img_dir.glob('*'):
            if img_file.is_file() and img_file.suffix.lower() in ['.jpg', '.jpeg', '.png']:
                import shutil
                shutil.copy2(img_file, backup_dir / img_file.name)

        print(f"✅ Backup criado em: {backup_dir}")
        print()

    # Contadores
    converted = 0
    total = 0
    total_original_size = 0
    total_webp_size = 0

    print("🔄 Convertendo imagens para WebP...")
    print()

    # Processar JPGs
    for img_path in img_dir.glob('*.jpg'):
        total += 1
        webp_path = img_path.with_suffix('.webp')

        if convert_to_webp(img_path, webp_path, quality=85):
            original_size = img_path.stat().st_size
            webp_size = webp_path.stat().st_size
            reduction = (1 - webp_size / original_size) * 100

            total_original_size += original_size
            total_webp_size += webp_size

            print(f"✅ {img_path.name} → {webp_path.name} ({reduction:.1f}% menor)")
            converted += 1

    # Processar PNGs
    for img_path in img_dir.glob('*.png'):
        total += 1
        webp_path = img_path.with_suffix('.webp')

        # Para PNGs, usar qualidade 90 para manter detalhes (logos)
        if convert_to_webp(img_path, webp_path, quality=90):
            original_size = img_path.stat().st_size
            webp_size = webp_path.stat().st_size
            reduction = (1 - webp_size / original_size) * 100

            total_original_size += original_size
            total_webp_size += webp_size

            print(f"✅ {img_path.name} → {webp_path.name} ({reduction:.1f}% menor)")
            converted += 1

    # Resultados
    print()
    print("==============================================")
    print("✨ Conversão concluída!")
    print(f"📊 Total: {converted} de {total} imagens convertidas")

    if total_original_size > 0:
        total_reduction = (1 - total_webp_size / total_original_size) * 100
        print(f"💾 Economia total: {total_reduction:.1f}% ({total_original_size / 1024 / 1024:.2f}MB → {total_webp_size / 1024 / 1024:.2f}MB)")

    print()
    print("📝 Próximos passos:")
    print("1. Verifique as imagens WebP em: ./images")
    print("2. As imagens originais foram preservadas em: ./images_backup")
    print("3. O HTML será atualizado para usar WebP com fallback automático")
    print()

if __name__ == "__main__":
    main()
