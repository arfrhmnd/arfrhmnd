#!/bin/bash

# PHTN.ai Automation Framework - Safe Report Generator
# Script untuk generate Allure report dengan path yang aman

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$SCRIPT_DIR"

print_status "Project root: $PROJECT_ROOT"

# Change to project directory
cd "$PROJECT_ROOT"

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -h, --help              Show this help message"
    echo "  -o, --open              Open report in browser after generation"
    echo "  -c, --clean             Clean previous report before generation"
    echo "  --results-dir DIR       Custom results directory (default: allure-results)"
    echo "  --output-dir DIR        Custom output directory (default: allure-report)"
    echo ""
    echo "Examples:"
    echo "  $0                      # Generate report"
    echo "  $0 --open              # Generate and open report"
    echo "  $0 --clean --open      # Clean, generate and open report"
}

# Default values
OPEN_REPORT=false
CLEAN_REPORT=false
RESULTS_DIR="allure-results"
OUTPUT_DIR="allure-report"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_usage
            exit 0
            ;;
        -o|--open)
            OPEN_REPORT=true
            shift
            ;;
        -c|--clean)
            CLEAN_REPORT=true
            shift
            ;;
        --results-dir)
            RESULTS_DIR="$2"
            shift 2
            ;;
        --output-dir)
            OUTPUT_DIR="$2"
            shift 2
            ;;
        *)
            print_error "Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
done

# Function to check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    NODE_VERSION=$(node --version)
    print_success "Node.js version: $NODE_VERSION"
}

# Function to check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    NPM_VERSION=$(npm --version)
    print_success "npm version: $NPM_VERSION"
}

# Function to check if allure is installed
check_allure() {
    if ! command -v allure &> /dev/null && ! npx allure --version &> /dev/null; then
        print_error "Allure is not installed. Please install allure-commandline first."
        print_status "Installing allure-commandline locally..."
        npm install allure-commandline --save-dev
    fi
    
    print_success "Allure is available"
}

# Function to clean previous report
clean_report() {
    if [ "$CLEAN_REPORT" = true ]; then
        print_status "Cleaning previous report..."
        
        if [ -d "$OUTPUT_DIR" ]; then
            rm -rf "$OUTPUT_DIR"
            print_success "Previous report cleaned"
        else
            print_status "No previous report to clean"
        fi
    fi
}

# Function to generate report
generate_report() {
    print_status "Generating Allure report..."
    
    # Check if results directory exists
    if [ ! -d "$RESULTS_DIR" ]; then
        print_error "Results directory '$RESULTS_DIR' not found."
        print_status "Please run tests first to generate results."
        exit 1
    fi
    
    # Check if results directory has content
    if [ ! "$(ls -A "$RESULTS_DIR")" ]; then
        print_error "Results directory '$RESULTS_DIR' is empty."
        print_status "Please run tests first to generate results."
        exit 1
    fi
    
    # Use absolute paths to avoid space issues
    ABS_RESULTS_DIR="$(pwd)/$RESULTS_DIR"
    ABS_OUTPUT_DIR="$(pwd)/$OUTPUT_DIR"
    
    print_status "Results directory: $ABS_RESULTS_DIR"
    print_status "Output directory: $ABS_OUTPUT_DIR"
    
    # Generate report
    if command -v allure &> /dev/null; then
        # Use global allure command
        allure generate "$ABS_RESULTS_DIR" --clean -o "$ABS_OUTPUT_DIR"
    else
        # Use npx allure with proper path handling
        print_status "Using npx allure..."
        cd "$PROJECT_ROOT"
        npx allure generate "$RESULTS_DIR" --clean -o "$OUTPUT_DIR"
    fi
    
    if [ $? -eq 0 ]; then
        print_success "Allure report generated successfully at: $ABS_OUTPUT_DIR"
        
        if [ "$OPEN_REPORT" = true ]; then
            print_status "Opening report in browser..."
            if command -v allure &> /dev/null; then
                allure open "$ABS_OUTPUT_DIR"
            else
                cd "$PROJECT_ROOT"
                npx allure open "$OUTPUT_DIR"
            fi
        fi
    else
        print_error "Failed to generate Allure report"
        exit 1
    fi
}

# Main execution
main() {
    print_status "PHTN.ai Automation Framework - Report Generator"
    print_status "=============================================="
    
    # Check prerequisites
    check_node
    check_npm
    check_allure
    
    # Clean previous report if requested
    clean_report
    
    # Generate report
    generate_report
    
    print_success "Report generation completed!"
}

# Run main function
main
