# Fix untuk Path dengan Spasi

## Masalah
Error `/bin/sh: /Users/arief_r/Downloads/Automation: No such file or directory` terjadi karena path folder mengandung spasi ("Automation 1") yang tidak di-handle dengan benar oleh shell.

## Solusi

### 1. Script Aman (Recommended)
Gunakan script `run-tests-safe.sh` yang sudah di-fix untuk menangani path dengan spasi:

```bash
# Jalankan semua test
./run-tests-safe.sh

# Jalankan test suite tertentu
./run-tests-safe.sh --suite critical
./run-tests-safe.sh --suite smoke
./run-tests-safe.sh --suite regression

# Jalankan dengan headless mode
./run-tests-safe.sh --headless

# Generate dan buka report
./run-tests-safe.sh --report

# Clean previous results
./run-tests-safe.sh --clean

# Install dependencies
./run-tests-safe.sh --install
```

### 2. NPM Scripts (Alternative)
Gunakan npm scripts yang sudah di-update:

```bash
# Test dengan script aman
npm run test:safe
npm run test:safe:critical
npm run test:safe:smoke
npm run test:safe:regression
npm run test:safe:headless
npm run test:safe:report
```

### 3. Manual Fix untuk Script Asli
Jika ingin tetap menggunakan script asli, pastikan untuk quote path dengan benar:

```bash
# Ganti dari:
eval $CMD

# Menjadi:
eval "$CMD"
```

## Perubahan yang Dilakukan

1. **Fixed testConfig.js**: Path `allureReport` diubah dari absolute path ke relative path
2. **Created run-tests-safe.sh**: Script baru yang aman untuk path dengan spasi
3. **Updated package.json**: Menambahkan npm scripts yang aman
4. **Updated run-tests.sh**: Memperbaiki quoting untuk eval command

## Testing

Untuk memastikan fix bekerja:

```bash
# Test script aman
./run-tests-safe.sh --help

# Test npm script
npm run test:safe -- --help
```

## Catatan Penting

- Selalu gunakan script `run-tests-safe.sh` untuk path dengan spasi
- Script asli `run-tests.sh` masih bisa digunakan tapi kurang aman
- NPM scripts dengan prefix `test:safe` menggunakan script aman
- Pastikan script executable dengan `chmod +x run-tests-safe.sh`
