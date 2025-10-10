#!/bin/bash

# Script para transformar índice em dropdown colapsável

count=0
for file in blog/artigos/*.html; do
    # Adicionar CSS do dropdown após o <head>
    perl -i -0777 -pe 's/<style>/<style>\n        \/\* TOC Dropdown \*\/\n        .toc-container {\n            background: rgba(26, 31, 46, 0.8);\n            border: 2px solid #FF6B35;\n            border-radius: 12px;\n            margin: 30px 0;\n            overflow: hidden;\n        }\n        .toc-header {\n            background: linear-gradient(135deg, #FF6B35 0%, #ff8555 100%);\n            padding: 15px 20px;\n            cursor: pointer;\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            user-select: none;\n        }\n        .toc-header h3 {\n            margin: 0;\n            font-size: 18px;\n            font-weight: 700;\n            color: #fff;\n        }\n        .toc-arrow {\n            font-size: 20px;\n            transition: transform 0.3s;\n            color: #fff;\n        }\n        .toc-arrow.open {\n            transform: rotate(180deg);\n        }\n        .toc-content {\n            max-height: 0;\n            overflow: hidden;\n            transition: max-height 0.3s ease-out;\n            padding: 0 20px;\n        }\n        .toc-content.open {\n            max-height: 800px;\n            padding: 20px;\n        }\n        .toc-content ul {\n            list-style: none;\n            padding: 0;\n            margin: 0;\n        }\n        .toc-content li {\n            margin: 10px 0;\n        }\n        .toc-content a {\n            color: #e4e6eb;\n            text-decoration: none;\n            display: flex;\n            align-items: center;\n            transition: all 0.2s;\n        }\n        .toc-content a:hover {\n            color: #FF6B35;\n            transform: translateX(5px);\n        }\n        .toc-content .toc-number {\n            background: #FF6B35;\n            color: #fff;\n            width: 24px;\n            height: 24px;\n            border-radius: 50%;\n            display: inline-flex;\n            align-items: center;\n            justify-content: center;\n            font-size: 12px;\n            margin-right: 10px;\n            flex-shrink: 0;\n        }\n/' "$file"

    # Transformar o nav do índice em dropdown
    perl -i -0777 -pe 's/<nav style="background:#f8f9fa;border-left:4px solid #25d366;padding:20px;margin:30px 0;border-radius:8px">.*?<h3 style="margin-top:0;font-size:18px;font-weight:700">📑 Índice do Artigo<\/h3>/<div class="toc-container">\n        <div class="toc-header" onclick="toggleTOC()">\n            <h3>📑 Índice do Artigo<\/h3>\n            <span class="toc-arrow" id="toc-arrow">▼<\/span>\n        <\/div>\n        <div class="toc-content" id="toc-content">/gs' "$file"

    # Fechar o div do dropdown (substituir </nav> por </div></div>)
    perl -i -0777 -pe 's/<\/ul><\/nav>/<\/ul>\n        <\/div>\n    <\/div>/g' "$file"

    # Adicionar JavaScript do toggle antes do </body>
    perl -i -0777 -pe 's/<\/body>/<script>\nfunction toggleTOC() {\n    const content = document.getElementById("toc-content");\n    const arrow = document.getElementById("toc-arrow");\n    content.classList.toggle("open");\n    arrow.classList.toggle("open");\n}\n<\/script>\n<\/body>/g' "$file"

    ((count++))
done

echo "✅ Índice dropdown aplicado em $count artigos"
