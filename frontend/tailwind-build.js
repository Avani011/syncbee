const tailwindcss = require('@tailwindcss/postcss');
const postcss = require('postcss');
const fs = require('fs');

// Your CSS with Tailwind directives
const css = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`;

// Process the CSS
postcss([tailwindcss('./tailwind.config.js')])
  .process(css, { from: undefined })
  .then(result => {
    fs.writeFileSync('./output.css', result.css);
    console.log('Tailwind CSS generated successfully!');
  })
  .catch(error => {
    console.error('Error generating Tailwind CSS:', error);
  });