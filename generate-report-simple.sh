#!/bin/bash

# Simple Allure Report Generator
# Script sederhana untuk generate report HTML

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Get current directory
CURRENT_DIR="$(pwd)"
print_status "Current directory: $CURRENT_DIR"

# Check if allure-results exists
if [ ! -d "allure-results" ]; then
    print_error "allure-results directory not found!"
    print_status "Please run tests first to generate results."
    exit 1
fi

# Check if allure-results has content
if [ ! "$(ls -A allure-results)" ]; then
    print_error "allure-results directory is empty!"
    print_status "Please run tests first to generate results."
    exit 1
fi

print_status "Found test results in allure-results/"

# Clean previous report if exists
if [ -d "allure-report" ]; then
    print_status "Cleaning previous report..."
    rm -rf allure-report
fi

# Generate report using npx
print_status "Generating Allure report..."
npx allure generate allure-results --clean -o allure-report

if [ $? -eq 0 ]; then
    print_success "Report generated successfully!"
    print_status "Report location: $CURRENT_DIR/allure-report"
    
    # Open report in browser
    print_status "Opening report in browser..."
    npx allure open allure-report
else
    print_error "Failed to generate report"
    exit 1
fi
