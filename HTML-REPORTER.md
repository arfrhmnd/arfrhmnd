# HTML Reporter untuk PHTN.ai Automation Framework

## Overview
Framework ini sekarang dilengkapi dengan HTML reporter yang memberikan laporan visual yang menarik dan informatif untuk hasil testing.

## Fitur HTML Reporter

### 1. Individual Test Reports
- **Lokasi**: `./reports/html-reports/report.html`
- **Fitur**:
  - Screenshot otomatis untuk test yang gagal
  - Timeline eksekusi test
  - Detail step-by-step untuk setiap test
  - Summary statistik (passed, failed, skipped)

### 2. Master Report
- **Lokasi**: `./reports/html-reports/master-report.html`
- **Fitur**:
  - Aggregasi semua test suite dalam satu laporan
  - Overview komprehensif dari semua test
  - Browser information
  - Test execution timeline

## Konfigurasi

### Reporter Configuration
```javascript
['html-nice', {
    outputDir: './reports/html-reports/',
    filename: 'report.html',
    reportTitle: 'PHTN.ai Test Report',
    linkScreenshots: true,
    showInBrowser: true,
    collapseTests: false,
    useOnAfterCommandForScreenshot: false
}]
```

### Master Report Configuration
```javascript
reportAggregator = new ReportGenerator({
    outputDir: './reports/html-reports/',
    filename: 'master-report.html',
    reportTitle: 'PHTN.ai Master Test Report',
    browserName: capabilities[0].browserName || 'chrome',
    collapseTests: true
})
```

## Scripts yang Tersedia

### Menjalankan Test dengan HTML Report
```bash
# Test biasa dengan HTML report
npm test

# Test suite tertentu
npm run test:critical
npm run test:smoke
npm run test:regression
```

### Membuka HTML Reports
```bash
# Membuka individual report
npm run report:html

# Membuka master report
npm run report:html:master
```

## Struktur Direktori Reports

```
reports/
└── html-reports/
    ├── report.html          # Individual test report
    ├── master-report.html   # Master aggregated report
    └── screenshots/         # Screenshots dari failed tests
```

## Keunggulan HTML Reporter

1. **Visual Appeal**: Interface yang menarik dan mudah dibaca
2. **Screenshot Integration**: Screenshot otomatis untuk failed tests
3. **Timeline View**: Timeline eksekusi test yang detail
4. **Master Aggregation**: Semua test suite dalam satu laporan
5. **Browser Compatibility**: Bekerja di semua browser modern
6. **Mobile Responsive**: Dapat dibuka di mobile devices

## Troubleshooting

### Report tidak terbuka otomatis
Jika report tidak terbuka otomatis di browser, jalankan:
```bash
npm run report:html
```

### Screenshot tidak muncul
Pastikan direktori `screenshots/` ada dan memiliki permission yang tepat:
```bash
mkdir -p screenshots
chmod 755 screenshots
```

### Master report kosong
Pastikan test berjalan dengan sukses dan tidak ada error dalam konfigurasi.

## Best Practices

1. **Regular Cleanup**: Bersihkan reports lama secara berkala
2. **Screenshot Management**: Monitor ukuran direktori screenshots
3. **Report Sharing**: Master report cocok untuk sharing dengan tim
4. **CI/CD Integration**: HTML reports dapat diintegrasikan dengan CI/CD pipeline

## Integrasi dengan Allure

HTML reporter bekerja berdampingan dengan Allure reporter:
- **Allure**: Untuk detailed analysis dan trending
- **HTML**: Untuk quick overview dan sharing

Kedua reporter akan menghasilkan output yang berbeda dan saling melengkapi.
