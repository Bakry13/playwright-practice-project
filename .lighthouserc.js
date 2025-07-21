module.exports = {
  ci: {
    collect: {
      url: [
        'https://internal.business-service-portal.vfd2-testnet.de/usermanagement/'
      ],
      startServerCommand: 'echo "Skipping server..."', // fake server command to bypass static site mode
      startServerReadyPattern: 'Skipping', // match the fake output so LHCI doesn't wait
      numberOfRuns: 1, // Optional: how many times to run Lighthouse per URL
      settings: {
        extraHeaders: require('./lh-headers.json'),  // authentication headers
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', {minScore: 0.9}],
        'categories:accessibility': ['error', {minScore: 0.9}], //continue to ensure high accessibility standards
        'categories:best-practices': ['error', {minScore: 0.9}], //continue to ensure best practices are followed
        'categories:seo': ['error', {minScore: 0.9}], //continue to ensure SEO standards are met
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './lhci-reports',
      reportFilenamePattern: 'lh-report.%%EXTENSION%%', // specify the report file names
    },
  },
};