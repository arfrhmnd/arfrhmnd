# Setup HTML Reporter untuk PHTN.ai Framework

## Instalasi Package

Karena ada masalah dengan npm cache, silakan jalankan perintah berikut untuk mengatasi:

### Opsi 1: Fix npm cache permission
```bash
sudo chown -R $(whoami) ~/.npm
npm cache clean --force
npm install
```

### Opsi 2: Install package secara manual
```bash
npm install wdio-html-nice-reporter@^7.0.0 --save-dev --force
```

### Opsi 3: Gunakan yarn (jika tersedia)
```bash
yarn add wdio-html-nice-reporter --dev
```

## Verifikasi Instalasi

Setelah instalasi berhasil, verifikasi dengan:

```bash
# Cek apakah package terinstall
npm list wdio-html-nice-reporter

# Test konfigurasi
npm test
```

## Konfigurasi yang Sudah Ditambahkan

### 1. Package.json
```json
{
  "devDependencies": {
    "wdio-html-nice-reporter": "^7.0.0"
  },
  "scripts": {
    "report:html": "open ./reports/html-reports/report.html",
    "report:html:master": "open ./reports/html-reports/master-report.html"
  }
}
```

### 2. wdio.conf.js
```javascript
const { ReportGenerator, HtmlReporter } = require('wdio-html-nice-reporter')

// Global variable for report aggregator
let reportAggregator

// Dalam reporters array:
['html-nice', {
    outputDir: './reports/html-reports/',
    filename: 'report.html',
    reportTitle: 'PHTN.ai Test Report',
    linkScreenshots: true,
    showInBrowser: true,
    collapseTests: false,
    useOnAfterCommandForScreenshot: false
}]

// Hooks untuk master report:
onPrepare: function (config, capabilities) {
    reportAggregator = new ReportGenerator({
        outputDir: './reports/html-reports/',
        filename: 'master-report.html',
        reportTitle: 'PHTN.ai Master Test Report',
        browserName: capabilities[0].browserName || 'chrome',
        collapseTests: true
    })
    reportAggregator.clean()
},

onComplete: function (exitCode, config, capabilities, results) {
    (async () => {
        try {
            await reportAggregator.createReport()
            console.log('📊 Master HTML report generated successfully')
        } catch (error) {
            console.error('❌ Error generating master HTML report:', error)
        }
    })()
}
```

## Testing HTML Reporter

Setelah instalasi berhasil, test dengan:

```bash
# Jalankan test dengan HTML reporter
npm test

# Buka HTML report
npm run report:html

# Buka master report
npm run report:html:master
```

## Troubleshooting

### Error: Cannot find module 'wdio-html-nice-reporter'
- Pastikan package sudah terinstall: `npm list wdio-html-nice-reporter`
- Jika belum, jalankan: `npm install wdio-html-nice-reporter --save-dev`

### Error: Permission denied
- Jalankan: `sudo chown -R $(whoami) ~/.npm`
- Atau gunakan: `npm install --force`

### Report tidak terbuka otomatis
- Jalankan manual: `npm run report:html`
- Atau buka file: `./reports/html-reports/report.html`

## Fitur HTML Reporter

1. **Individual Reports**: `./reports/html-reports/report.html`
2. **Master Reports**: `./reports/html-reports/master-report.html`
3. **Screenshot Integration**: Screenshot otomatis untuk failed tests
4. **Visual Timeline**: Timeline eksekusi test
5. **Browser Compatibility**: Bekerja di semua browser modern

## Next Steps

1. Install package dengan salah satu opsi di atas
2. Jalankan test untuk generate report
3. Buka HTML report untuk melihat hasil
4. Integrasikan dengan CI/CD pipeline jika diperlukan
