#!/bin/bash

# PHTN.ai Automation Framework Test Runner
# Script untuk menjalankan automation tests dengan berbagai opsi

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

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -h, --help              Show this help message"
    echo "  -s, --suite SUITE       Run specific test suite (critical|smoke|regression|performance)"
    echo "  -t, --test TEST         Run specific test file"
    echo "  -g, --group GROUP       Run tests with specific group"
    echo "  --headless              Run tests in headless mode"
    echo "  --report                Generate and open Allure report after tests"
    echo "  --clean                 Clean previous test results before running"
    echo "  --install               Install dependencies before running tests"
    echo ""
    echo "Examples:"
    echo "  $0 --suite critical                    # Run critical tests"
    echo "  $0 --test HomePageTests.js            # Run specific test file"
    echo "  $0 --group critical --headless        # Run critical tests in headless mode"
    echo "  $0 --report                           # Run all tests and generate report"
}

# Default values
SUITE=""
TEST=""
GROUP=""
HEADLESS=false
REPORT=false
CLEAN=false
INSTALL=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_usage
            exit 0
            ;;
        -s|--suite)
            SUITE="$2"
            shift 2
            ;;
        -t|--test)
            TEST="$2"
            shift 2
            ;;
        -g|--group)
            GROUP="$2"
            shift 2
            ;;
        --headless)
            HEADLESS=true
            shift
            ;;
        --report)
            REPORT=true
            shift
            ;;
        --clean)
            CLEAN=true
            shift
            ;;
        --install)
            INSTALL=true
            shift
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

# Function to install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    if [ ! -f "package.json" ]; then
        print_error "package.json not found. Please run this script from the project root directory."
        exit 1
    fi
    
    npm install
    
    if [ $? -eq 0 ]; then
        print_success "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
}

# Function to clean previous results
clean_results() {
    print_status "Cleaning previous test results..."
    
    # Remove previous results
    rm -rf allure-results/
    rm -rf allure-report/
    rm -rf screenshots/
    rm -rf logs/
    
    print_success "Previous results cleaned"
}

# Function to run tests
run_tests() {
    print_status "Starting test execution..."
    
    # Build command
    CMD="npx wdio run wdio.conf.js"
    
    # Add suite if specified
    if [ ! -z "$SUITE" ]; then
        CMD="$CMD --suite $SUITE"
        print_status "Running $SUITE test suite"
    fi
    
    # Add specific test if specified
    if [ ! -z "$TEST" ]; then
        CMD="$CMD --spec ./test/specs/$TEST"
        print_status "Running specific test: $TEST"
    fi
    
    # Add group if specified
    if [ ! -z "$GROUP" ]; then
        CMD="$CMD --grep $GROUP"
        print_status "Running tests with group: $GROUP"
    fi
    
    # Add headless mode if specified
    if [ "$HEADLESS" = true ]; then
        CMD="$CMD --headless"
        print_status "Running in headless mode"
    fi
    
    # Execute command
    print_status "Executing: $CMD"
    # Use proper quoting to handle paths with spaces
    eval "$CMD"
    
    if [ $? -eq 0 ]; then
        print_success "Tests completed successfully"
    else
        print_error "Tests failed"
        exit 1
    fi
}

# Function to generate report
generate_report() {
    if [ "$REPORT" = true ]; then
        print_status "Generating Allure report..."
        
        # Check if allure-results exists
        if [ ! -d "allure-results" ]; then
            print_warning "No test results found. Run tests first."
            return
        fi
        
        # Generate report
        npx allure generate allure-results --clean -o allure-report
        
        if [ $? -eq 0 ]; then
            print_success "Allure report generated successfully"
            print_status "Opening report in browser..."
            npx allure open allure-report
        else
            print_error "Failed to generate Allure report"
        fi
    fi
}

# Main execution
main() {
    print_status "PHTN.ai Automation Framework Test Runner"
    print_status "========================================"
    
    # Check prerequisites
    check_node
    check_npm
    
    # Install dependencies if requested
    if [ "$INSTALL" = true ]; then
        install_dependencies
    fi
    
    # Clean previous results if requested
    if [ "$CLEAN" = true ]; then
        clean_results
    fi
    
    # Run tests
    run_tests
    
    # Generate report if requested
    generate_report
    
    print_success "Test execution completed!"
}

# Run main function
main
