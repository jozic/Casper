const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// --- 1. Get Version ---
const packageJson = require('./package.json');
const version = packageJson.version;
if (!version) {
    console.error("Error: Could not read version from package.json");
    process.exit(1);
}
console.log(`Building version: ${version}`);
const zipFileName = `../chocolate-casper-${version}.zip`;
const realZipPath = path.resolve(__dirname, zipFileName);

// --- 2. Run the build script to inject the key ---
try {
    console.log("Injecting API key...");
    execSync('node build.js', { stdio: 'inherit' });
} catch (error) {
    console.error("\nError running build.js. Aborting.");
    process.exit(1);
}

// --- 3. Temporarily swap the hbs files ---
const hbsPath = path.join(__dirname, 'default.hbs');
const tempHbsPath = path.join(__dirname, 'default.tmp.hbs');
const originalHbsPath = path.join(__dirname, 'default.original.hbs');

fs.renameSync(hbsPath, originalHbsPath);
fs.renameSync(tempHbsPath, hbsPath);

// --- 4. Create the zip file ---
const excludePatterns = [
    ".git/*",
    "node_modules/*",
    ".DS_Store",
    "build.js",
    "zip.js",
    ".env.example",
    ".env",
    "default.original.hbs"
];
const exclude = excludePatterns.map(pattern => `-x "${pattern}"`).join(" ");

const zipCommand = `zip -r ${zipFileName} . ${exclude}`;

try {
    console.log("Zipping theme...");
    execSync(zipCommand);
} catch (error) {
    console.error("\nError creating zip file. Aborting.");
    // Restore original file before exiting
    fs.renameSync(hbsPath, tempHbsPath);
    fs.renameSync(originalHbsPath, hbsPath);
    process.exit(1);
}

// --- 5. Clean up and restore files ---
fs.renameSync(hbsPath, tempHbsPath);
fs.renameSync(originalHbsPath, hbsPath);
fs.unlinkSync(tempHbsPath);

// --- 6. Print the final path ---
console.log("\nTheme zipped successfully!");
console.log(`Path: ${realZipPath}`);