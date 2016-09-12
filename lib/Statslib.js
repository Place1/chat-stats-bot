const fs = require('fs');
const _ = require('lodash');

// reads the chat_log file and returns an array
// of JSON objects representing the serialized messages
function _getMessages(chatLogFile) {
	return new Promise(function(resolve, reject) {
		fs.readFile(chatLogFile, 'utf8', function(err, data) {
			if (err) return reject(err);
			const lines = data.split(/\r?\n/);
			_.remove(lines, x => x === "");
			const messages = lines.map(function(line) {
				return JSON.parse(line);
			});
			return resolve(messages);
		});
	});
}

// generates the chat stats
function generateStats(chatLogFile) {
	return _getMessages(chatLogFile)
		.then(messages => {
			return {
				total: messages.length
			};
		});
}

module.exports = {
	generateStats, generateStats
};
