#!/bin/bash

# Fix TOC removal - use perl for multi-line matching

count=0
for file in blog/artigos_backup/*.html; do
    filename=$(basename "$file")
    
    # Use perl to remove the TOC navigation block (multi-line)
    perl -0777 -pe 's/<nav style="background:#f8f9fa;border-left:4px solid #25d366.*?<\/nav>//gs' "$file" > "blog/artigos/$filename"
    
    # Check if file is not empty
    if [ -s "blog/artigos/$filename" ]; then
        ((count++))
    else
        echo "❌ Error processing $filename - restoring original"
        cp "$file" "blog/artigos/$filename"
    fi
done

echo "✅ Fixed $count articles"
