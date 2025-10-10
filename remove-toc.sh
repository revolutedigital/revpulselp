#!/bin/bash

# Remove table of contents from all blog articles

count=0
for file in blog/artigos_backup/*.html; do
    filename=$(basename "$file")
    
    # Use sed to remove the TOC navigation block
    sed '/<nav style="background:#f8f9fa;border-left:4px solid #25d366/,/<\/nav>/d' "$file" > "blog/artigos/$filename"
    
    ((count++))
done

echo "✅ Removed table of contents from $count articles"
