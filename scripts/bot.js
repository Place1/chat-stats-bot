'use strict';
const fs = require('fs');
const path = require('path');
const Statslib = require('../lib/Statslib');
const winston = require('winston');
winston.add(winston.transports.File, {
	filename: 'debug.log'
});

const chatLogFile = path.join(__dirname, '..', 'chat_log.txt');

module.exports = function(robot) {

	robot.catchAll((res) => {
		fs.appendFile(
			chatLogFile,
			JSON.stringify({
				message: res.message,
				date: new Date()
			}) + '\n',
			function(err) {
				if (err) {
					winston.error(`failed to write message ${JSON.stringify(err)}`);
				}
			}
		);
	});

	robot.respond(/(latest|banter|stats)+/i, res => {
		Statslib.generateStats(chatLogFile)
			.then(data => {
				res.send(
					"```\n" + 
					JSON.stringify(data, null, 2) +
					"```"
				);
			})
			.catch(winston.error)
	});

	robot.respond(/help/i, res => {
		return res.send(
			'type ```stats-bot latest banter stats``` or some variation\n' +
			'github ```https://github.com/Place1/chat-stats-bot```'
		)
	})

	return robot;
}
