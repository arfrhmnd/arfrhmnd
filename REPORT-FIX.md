# Fix untuk Report Generation dengan Path Spasi

## Masalah
Path dengan spasi di folder "Automation 1" menyebabkan error saat generate report Allure.

## Solusi yang Diimplementasikan

### 1. Updated wdio.conf.js
- Menggunakan `process.cwd()` untuk mendapatkan absolute path
- Path report sekarang aman untuk folder dengan spasi

### 2. Created generate-report.sh
Script khusus untuk generate report yang aman:

```bash
# Generate report
./generate-report.sh

# Generate dan buka report
./generate-report.sh --open

# Clean dan generate report
./generate-report.sh --clean --open

# Custom directories
./generate-report.sh --results-dir custom-results --output-dir custom-report
```

### 3. Updated run-tests-safe.sh
- Function `generate_report()` menggunakan absolute paths
- Proper quoting untuk handle spasi di path

### 4. Updated package.json
Menambahkan npm scripts yang aman:

```bash
# Generate dan buka report
npm run report

# Generate report saja
npm run report:generate

# Clean dan generate report
npm run report:clean
```

## Cara Menggunakan

### Opsi 1: Script Langsung (Recommended)
```bash
# Generate report dengan auto-open
./generate-report.sh --open

# Generate report saja
./generate-report.sh

# Clean previous report dan generate baru
./generate-report.sh --clean --open
```

### Opsi 2: NPM Scripts
```bash
# Generate dan buka report
npm run report

# Generate report saja
npm run report:generate

# Clean dan generate report
npm run report:clean
```

### Opsi 3: Test Runner dengan Report
```bash
# Run tests dan generate report
./run-tests-safe.sh --report

# Run specific suite dengan report
./run-tests-safe.sh --suite critical --report
```

## Fitur Script generate-report.sh

- ✅ **Path Safety**: Menggunakan absolute paths untuk handle spasi
- ✅ **Error Handling**: Check prerequisites dan validasi directory
- ✅ **Flexible Options**: Custom input/output directories
- ✅ **Auto Open**: Option untuk buka report di browser
- ✅ **Clean Option**: Hapus report lama sebelum generate baru
- ✅ **Colored Output**: Status messages dengan warna
- ✅ **Help Documentation**: Built-in help dengan examples

## Struktur Path yang Aman

```
/Users/arief_r/Downloads/Automation 1/
├── allure-results/          # Test results (input)
├── allure-report/           # Generated report (output)
├── screenshots/             # Test screenshots
├── logs/                    # Test logs
└── generate-report.sh       # Safe report generator
```

## Testing

Untuk test apakah fix bekerja:

```bash
# Test script help
./generate-report.sh --help

# Test npm script
npm run report -- --help

# Test dengan results yang ada
./generate-report.sh --open
```

## Catatan Penting

- Script `generate-report.sh` adalah solusi terbaik untuk path dengan spasi
- Selalu gunakan absolute paths untuk avoid space issues
- Script otomatis detect apakah allure tersedia (global atau npx)
- Report akan di-generate di folder `allure-report/` di project root
