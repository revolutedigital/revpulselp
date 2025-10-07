#!/usr/bin/env python3
"""
Rev Pulse - Extrator de CSS
Extrai CSS inline do HTML para arquivo externo
"""

import re
from pathlib import Path

def extract_css_from_html(html_file):
    """Extrai todo o CSS inline de um arquivo HTML"""

    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Encontrar a tag <style> e extrair seu conteúdo
    match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)

    if not match:
        print("❌ Nenhum CSS inline encontrado!")
        return None, content

    css_content = match.group(1).strip()

    # Remover a tag <style> do HTML
    new_html = re.sub(r'<style>.*?</style>',
                     '<!-- CSS movido para styles.css -->\n    <link rel="stylesheet" href="styles.css">',
                     content, flags=re.DOTALL)

    return css_content, new_html

def main():
    print("🚀 Rev Pulse - Extrator de CSS")
    print("================================")
    print()

    html_file = Path("index.html")

    if not html_file.exists():
        print(f"❌ Arquivo {html_file} não encontrado!")
        return

    # Extrair CSS
    print("📤 Extraindo CSS do HTML...")
    css_content, new_html = extract_css_from_html(html_file)

    if css_content is None:
        return

    # Salvar CSS em arquivo separado
    css_file = Path("styles.css")
    with open(css_file, 'w', encoding='utf-8') as f:
        f.write(css_content)

    print(f"✅ CSS extraído para: {css_file}")
    print(f"📊 Tamanho do CSS: {len(css_content) / 1024:.2f}KB")
    print()

    # Salvar HTML atualizado
    html_backup = Path("index.html.backup")
    print(f"📦 Criando backup: {html_backup}")

    with open(html_backup, 'w', encoding='utf-8') as f:
        with open(html_file, 'r', encoding='utf-8') as original:
            f.write(original.read())

    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_html)

    print(f"✅ HTML atualizado para usar CSS externo")
    print()
    print("================================")
    print("✨ Extração concluída!")
    print()
    print("📝 Próximos passos:")
    print("1. Verificar o arquivo styles.css")
    print("2. O HTML agora usa <link rel=\"stylesheet\" href=\"styles.css\">")
    print("3. Backup do HTML original em: index.html.backup")
    print()

if __name__ == "__main__":
    main()
