const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const matter = require('gray-matter');

const contentDir = path.join(__dirname, 'content', 'blog'); // Path to your blog content directory

// Function to get the date of the first commit for a file
function getGitDate(filePath, type = 'creation') {
  try {
    const command = type === 'creation'
      ? `git log --diff-filter=A --format=%aI -- ${filePath}`  // Get creation date
      : `git log -1 --format=%aI -- ${filePath}`;              // Get last modified date

    const date = execSync(command).toString().trim();
    return date || null;
  } catch (error) {
    console.error(`Error getting Git date for ${filePath}:`, error);
    return null;
  }
}

function addDateToFrontmatter(filePath) {
  const creationDate = getGitDate(filePath, 'creation');
  const modifiedDate = getGitDate(filePath, 'modified');
  const dateToUse = creationDate || modifiedDate; // Fallback to modified date if creation date is missing

  if (!dateToUse) {
    console.warn(`No Git date found for ${filePath}, skipping.`);
    return;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  // If date already exists, skip
  if (data.date) {
    console.log(`Date already exists in ${filePath}, skipping.`);
    return;
  }

  data.date = dateToUse.split('T')[0]; // Add the date to frontmatter, format as YYYY-MM-DD
  const newContent = matter.stringify(content, data);
  fs.writeFileSync(filePath, newContent, 'utf8');

  console.log(`Added date ${dateToUse} to ${filePath}`);
}

function processDirectory(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath); // Recurse into subdirectories
    } else if (path.extname(fullPath) === '.md') {
      addDateToFrontmatter(fullPath);
    }
  });
}

// Run the script
processDirectory(contentDir);
