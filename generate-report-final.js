#!/usr/bin/env node

/**
 * Allure Report Generator - Final Version
 * Node.js script untuk generate Allure report dengan proper environment
 */

const { exec } = require('child_process');
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

function runCommand(command) {
    return new Promise((resolve, reject) => {
        log(`Executing: ${command}`);
        
        exec(command, { 
            cwd: process.cwd(),
            env: { ...process.env, PATH: process.env.PATH }
        }, (error, stdout, stderr) => {
            if (error) {
                logError(`Command failed: ${error.message}`);
                reject(error);
            } else {
                if (stdout) console.log(stdout);
                if (stderr) console.log(stderr);
                resolve();
            }
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
        
        // Generate report using npx allure
        log('Generating Allure report...');
        
        // Use bash to properly handle paths
        const generateCommand = 'bash -c "npx allure generate allure-results --clean -o allure-report"';
        await runCommand(generateCommand);
        
        logSuccess('Report generated successfully!');
        log(`Report location: ${reportDir}`);
        
        // Open report in browser
        log('Opening report in browser...');
        const openCommand = 'bash -c "npx allure open allure-report"';
        await runCommand(openCommand);
        
    } catch (error) {
        logError(`Failed to generate report: ${error.message}`);
        process.exit(1);
    }
}

// Run main function
main();
