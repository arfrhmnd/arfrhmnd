#!/bin/bash

echo "🔧 Fixing npm cache permissions..."

# Fix npm cache ownership
sudo chown -R $(whoami) ~/.npm

# Clean npm cache
npm cache clean --force

echo "✅ npm cache fixed. Now installing HTML reporter..."

# Install HTML reporter
npm install wdio-html-nice-reporter@^7.0.0 --save-dev

echo "🎉 HTML reporter installation completed!"
echo "📋 Next steps:"
echo "1. Run: npm test"
echo "2. Open HTML report: npm run report:html"
echo "3. Open master report: npm run report:html:master"
