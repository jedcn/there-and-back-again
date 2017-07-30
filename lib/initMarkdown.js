'use es6'

function initMarkdown (configFile, content) {
  return `# ${configFile}

\`\`\`
${content.trim()}
\`\`\`
`
}

exports.initMarkdown = initMarkdown
