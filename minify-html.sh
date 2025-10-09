#!/bin/bash

# Script para minificar todos os HTMLs do projeto RevPulse
# Cria backup e minifica artigos + páginas principais

echo "🚀 Iniciando minificação de HTMLs..."
echo ""

# Criar diretório de backup se não existir
if [ ! -d "blog/artigos_backup" ]; then
    echo "📦 Criando backup dos artigos originais..."
    mkdir -p blog/artigos_backup
    cp blog/artigos/*.html blog/artigos_backup/
    echo "✅ Backup criado em blog/artigos_backup/"
    echo ""
fi

# Contador
total=0
economia_total=0

echo "🔄 Minificando artigos do blog..."
for file in blog/artigos/*.html; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        tamanho_antes=$(wc -c < "$file")

        # Minificar
        html-minifier \
            --collapse-whitespace \
            --remove-comments \
            --remove-optional-tags \
            --remove-redundant-attributes \
            --remove-script-type-attributes \
            --remove-tag-whitespace \
            --use-short-doctype \
            --minify-css true \
            --minify-js true \
            "$file" -o "$file"

        tamanho_depois=$(wc -c < "$file")
        economia=$((tamanho_antes - tamanho_depois))
        economia_total=$((economia_total + economia))
        percentual=$((100 * economia / tamanho_antes))

        total=$((total + 1))

        if [ $((total % 10)) -eq 0 ]; then
            echo "   ✓ $total artigos processados..."
        fi
    fi
done

echo ""
echo "✅ $total artigos minificados!"
echo ""

# Minificar index do blog
if [ -f "blog/index.html" ]; then
    echo "🔄 Minificando blog/index.html..."
    tamanho_antes=$(wc -c < "blog/index.html")

    html-minifier \
        --collapse-whitespace \
        --remove-comments \
        --remove-optional-tags \
        --remove-redundant-attributes \
        --minify-css true \
        --minify-js true \
        "blog/index.html" -o "blog/index.html"

    tamanho_depois=$(wc -c < "blog/index.html")
    economia=$((tamanho_antes - tamanho_depois))
    economia_total=$((economia_total + economia))
    percentual=$((100 * economia / tamanho_antes))

    echo "   ✓ Antes: $(numfmt --to=iec-i --suffix=B $tamanho_antes)"
    echo "   ✓ Depois: $(numfmt --to=iec-i --suffix=B $tamanho_depois)"
    echo "   ✓ Economia: $percentual%"
    echo ""
fi

# Minificar index principal
if [ -f "index.html" ]; then
    echo "🔄 Minificando index.html principal..."
    tamanho_antes=$(wc -c < "index.html")

    html-minifier \
        --collapse-whitespace \
        --remove-comments \
        --remove-optional-tags \
        --remove-redundant-attributes \
        --minify-css true \
        --minify-js true \
        "index.html" -o "index.html"

    tamanho_depois=$(wc -c < "index.html")
    economia=$((tamanho_antes - tamanho_depois))
    economia_total=$((economia_total + economia))
    percentual=$((100 * economia / tamanho_antes))

    echo "   ✓ Antes: $(numfmt --to=iec-i --suffix=B $tamanho_antes)"
    echo "   ✓ Depois: $(numfmt --to=iec-i --suffix=B $tamanho_depois)"
    echo "   ✓ Economia: $percentual%"
    echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 MINIFICAÇÃO CONCLUÍDA!"
echo ""
echo "📊 Estatísticas:"
echo "   • Arquivos processados: $((total + 2))"
echo "   • Economia total: $(numfmt --to=iec-i --suffix=B $economia_total)"
echo ""
echo "💾 Backup dos originais em: blog/artigos_backup/"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
