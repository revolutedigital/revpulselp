#!/bin/bash

# Replace broken Unsplash Source URLs with working Unsplash URLs

count=0
for file in blog/artigos/*.html; do
    # Replace all source.unsplash.com URLs with working Unsplash URLs
    sed -i '' \
        -e 's|https://source.unsplash.com/800x450/?communication,mobile|https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800\&h=450\&fit=crop|g' \
        -e 's|https://source.unsplash.com/800x450/?customer-service|https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800\&h=450\&fit=crop|g' \
        -e 's|https://source.unsplash.com/800x450/?digital-marketing|https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800\&h=450\&fit=crop|g' \
        "$file"
    
    ((count++))
done

echo "✅ Fixed images in $count articles"
