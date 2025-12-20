const fs = require('fs');
const path = require('path');

// Load .env file
require('dotenv').config();

const apiKey = process.env.GHOST_CONTENT_API_KEY;
if (!apiKey) {
    console.error("Error: GHOST_CONTENT_API_KEY not found in .env file.");
    process.exit(1);
}

const hbsFilePath = path.join(__dirname, 'default.hbs');
const tempHbsFilePath = path.join(__dirname, 'default.tmp.hbs');

try {
    // Read the original default.hbs file
    let content = fs.readFileSync(hbsFilePath, 'utf8');

    // Replace the placeholder with the actual API key
    content = content.replace(/['"]GHOST_API_KEY_PLACEHOLDER['"]/, `'${apiKey}'`);

    // Write the modified content to a temporary file
    fs.writeFileSync(tempHbsFilePath, content, 'utf8');

    console.log("Successfully created temporary file with API key.");

} catch (error) {
    console.error("An error occurred during the build process:", error);
    process.exit(1);
}
