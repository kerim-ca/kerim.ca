const fs = require('fs').promises;
const path = require('path');
const { marked } = require('marked');

const BLOG_POST_TEMPLATE = path.join(__dirname, 'blog-post-template.html');
const MARKDOWN_DIR = path.join(__dirname, 'blogposts-md');
const OUTPUT_DIR = __dirname; // Changed to output in the root directory

async function generateBlogPosts() {
    try {
        const template = await fs.readFile(BLOG_POST_TEMPLATE, 'utf8');
        const files = await fs.readdir(MARKDOWN_DIR);
        const markdownFiles = files.filter(file => path.extname(file).toLowerCase() === '.md');
        
        let blogListItems = [];
        
        for (const mdFile of markdownFiles) {
            const mdPath = path.join(MARKDOWN_DIR, mdFile);
            const mdContent = await fs.readFile(mdPath, 'utf8');
            
            // Extract title from the first line of the Markdown file
            const title = mdContent.split('\n')[0].replace('#', '').trim();
            
            const htmlContent = marked(mdContent);
            
            let postHtml = template.replace('{{TITLE}}', title);
            postHtml = postHtml.replace('{{CONTENT}}', htmlContent);
            
            const outputFile = path.join(OUTPUT_DIR, `${path.parse(mdFile).name}.html`);
            await fs.writeFile(outputFile, postHtml);
            
            // Add to blog list items (note the changed href)
            blogListItems.push(`<li><a class="blog-link" href="/${path.parse(mdFile).name}.html">${title}</a></li>`);
            
            console.log(`Generated: ${outputFile}`);
        }
        
        console.log('All blog posts have been generated.');
    } catch (error) {
        console.error('Error generating blog posts:', error);
    }
}

generateBlogPosts();