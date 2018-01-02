module.exports = (configFile, content) => {
  return `# ${configFile}

\`\`\`
${content.trim()}
\`\`\`
`
}
