"use strict";

const API_TOKEN = ""
const AWS_ACCOUNT = ""
const CHANNEL = "#general"
const INTERESTING_INSTANCE_TYPES = [
	"m4.10xlarge",
	"m4.16xlarge",
	"c4.8xlarge",
	"c3.8xlarge",
	"x1.16xlarge",
	"x1.32xlarge",
	"r3.8xlarge",
	"p2.xlarge",
	"p2.8xlarge",
	"p2.16xlarge",
	"g2.2xlarge",
	"g2.8xlarge",
	"i2.xlarge",
	"i2.2xlarge",
	"i2.4xlarge",
	"i2.8xlarge",
	"d2.xlarge",
	"d2.2xlarge",
	"d2.4xlarge",
	"d2.8xlarge",
]

const https = require("https")
const querystring = require("querystring")
const AWS = require("aws-sdk")
const EC2 = new AWS.EC2()

const HTTPS_OPTIONS = {
	method: 'POST',
	hostname: 'slack.com',
	path: '/api/chat.postMessage',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}

function postMessage(message, callback) {
	var request = https.request(HTTPS_OPTIONS, (response) => {
		var data = ""

		response.on('data', (chunk) => {
			data += chunk
		});

		response.on('end', () => {
			callback(null, data)
		})
		
		response.on('error', (err) => {
			callback(err)
		})
	})

	request.on('error', (err) => {
		callback(err)
	})

	request.write(querystring.stringify({
		token: API_TOKEN,
		channel: CHANNEL,
		as_user: true,
		text: message
	}))

	request.end()
}

exports.handler = function(event, context, callback) {
	var id = event.detail["instance-id"]
	var state = event.detail.state
	
	EC2.describeInstances({InstanceIds: [id]}, (err, data) => {
		if (err) {
			console.log(`Error describing instance ${id}: ` + JSON.stringify(err))
			callback(err)
		} else {
			var type = data.Reservations[0].Instances[0].InstanceType
			
			if (INTERESTING_INSTANCE_TYPES.indexOf(type) >= 0) {
				var article = /^(a|e|f|h|i|l|m|n|o|r|s|x)/.test(type) ? "an" : "a"
				var message
	
				switch (state) {
					case "pending":
						message = `Holy Toledo! ${AWS_ACCOUNT} has launched ${article} ${type} instance! :astonished:`
						break
					case "terminated":
						message = `Awww... ${AWS_ACCOUNT} just shut down the ${type} instance. :disappointed:`
						break
				}
				
				postMessage(message, (err, data) => {
					if (err) {
						console.log("Error from Slack: " + JSON.stringify(err))
						callback(err)
					} else {
						console.log("Response from Slack: " + JSON.stringify(data))
						callback()
					}
				})
			} else {
				console.log(`Not interested in type ${type} for instance ${id}`)
				callback()
			}
		}
	})
}
