#!/usr/bin/env node

/**
 * Allure Report Generator - Fixed Version
 * Node.js script untuk generate Allure report dengan proper path handling
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colors for console output
const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
};

function log(message, color = 'blue') {
    console.log(`${colors[color]}[INFO]${colors.reset} ${message}`);
}

function logSuccess(message) {
    console.log(`${colors.green}[SUCCESS]${colors.reset} ${message}`);
}

function logError(message) {
    console.log(`${colors.red}[ERROR]${colors.reset} ${message}`);
}

function runCommand(command, args, options = {}) {
    return new Promise((resolve, reject) => {
        log(`Executing: ${command} ${args.join(' ')}`);
        
        const child = spawn(command, args, {
            stdio: 'inherit',
            shell: true,
            ...options
        });
        
        child.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Command failed with exit code ${code}`));
            }
        });
        
        child.on('error', (error) => {
            reject(error);
        });
    });
}

async function main() {
    try {
        log('Starting Allure Report Generation...');
        
        // Get current directory
        const currentDir = process.cwd();
        log(`Current directory: ${currentDir}`);
        
        // Check if allure-results exists
        const resultsDir = path.join(currentDir, 'allure-results');
        if (!fs.existsSync(resultsDir)) {
            logError('allure-results directory not found!');
            log('Please run tests first to generate results.');
            process.exit(1);
        }
        
        // Check if allure-results has content
        const files = fs.readdirSync(resultsDir);
        if (files.length === 0) {
            logError('allure-results directory is empty!');
            log('Please run tests first to generate results.');
            process.exit(1);
        }
        
        log(`Found ${files.length} result files in allure-results/`);
        
        // Clean previous report if exists
        const reportDir = path.join(currentDir, 'allure-report');
        if (fs.existsSync(reportDir)) {
            log('Cleaning previous report...');
            fs.rmSync(reportDir, { recursive: true, force: true });
        }
        
        // Generate report using npx allure with proper path handling
        log('Generating Allure report...');
        
        // Use relative paths to avoid space issues
        await runCommand('npx', ['allure', 'generate', 'allure-results', '--clean', '-o', 'allure-report'], {
            cwd: currentDir
        });
        
        logSuccess('Report generated successfully!');
        log(`Report location: ${reportDir}`);
        
        // Open report in browser
        log('Opening report in browser...');
        await runCommand('npx', ['allure', 'open', 'allure-report'], {
            cwd: currentDir
        });
        
    } catch (error) {
        logError(`Failed to generate report: ${error.message}`);
        process.exit(1);
    }
}

// Run main function
main();
