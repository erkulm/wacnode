const pa11y = require('pa11y');
const produce = require('./producer.js');

module.exports = async function(url) {
    const urlString = url.toString();
    const results = await pa11y(urlString)
    const issues = results.issues;

    const messagesToSend = [];

    issues.forEach(issue => {
        const content = {
            ...issue,
            url: results.pageUrl
        };
        const message = {key: "1", value: JSON.stringify(content)};
        messagesToSend.push(message);
    });
    
    produce(messagesToSend);
};

