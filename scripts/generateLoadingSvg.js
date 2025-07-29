// scripts/generateLoadingSvg.js
const fs = require('fs');

const frames = [
  '[ hacking in progress.  ]',
  '[ hacking in progress.. ]',
  '[ hacking in progress...]',
];

const width = 600;
const height = 40;
const fontSize = 20;

const svgHeader = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="#280E54" />
<style>
  text { 
    font-family: monospace; 
    fill: #FFFFFF; 
    font-weight: bold;
    shape-rendering: crispEdges; 
    text-rendering: geometricPrecision;
  }
</style>
`;


const svgFooter = `</svg>`;

// Each frame lasts 0.7s, looping infinitely
const duration = 4.5; // total duration

// Generate SVG <text> elements with animate tags
let animateText = frames
  .map((text, i) => `
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" opacity="${i === 0 ? 1 : 0}">
      ${text}
      <animate 
        attributeName="opacity" 
        begin="${(i * duration) / frames.length}s" 
        dur="${duration / frames.length}s" 
        values="1;0" 
        repeatCount="indefinite" />
      <animate 
        attributeName="opacity" 
        begin="${((i + 1) * duration) / frames.length}s" 
        dur="0.001s" 
        values="0;1" 
        repeatCount="indefinite" />
    </text>
  `)
  .join('\n');
const svgContent = svgHeader + animateText + svgFooter;

fs.writeFileSync('assets/loading.svg', svgContent);
console.log('loading.svg generated!');
