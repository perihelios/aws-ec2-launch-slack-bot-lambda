# aws-ec2-launch-slack-bot-lambda
Slack bot that posts a message when you launch an EC2 instance of a certain
type.

This AWS Lambda was created as a simple toy demonstrating the use of a
CloudWatch event to trigger a Lambda that posts a message to a Slack channel.
While it's intended for fun, it does show the basics of posting a message to
Slack via the HTTP API, processing EC2 instance lifecycle events from
CloudWatch, and using the AWS SDK to query information about an instance.

## Installation
You will need to create an integration in Slack (basically, a virtual user
representing your bot); create an AWS Lambda from the provided JavaScript,
tweaking couple of settings at the top of the JS; and create a CloudWatch rule
that fires an event whenever an EC2 instance in your account changes state.

### Create Slack integration
A Slack integration is a "user" that represents an application. The integration
has an API token that the application uses to authenticate itself with Slack
when posting a message or doing some other action.

To create a new integration in Slack:

1. Click the team/user header in the top left corner, and select *Apps &
   integrations* from the dropdown menu.

   ![Picking Apps & integrations from the dropdown menu](readme-resources/app-integration-menu.png "Apps & integrations menu")
1. Click the *Build* menu option in the top right corner.
   
   ![Clicking the Build menu option](readme-resources/build-integration-menu.png "Build menu option")
1. Click the *Make a Custom Integration* button under *Something just for my team*.
   
   ![Clicking the Make Custom Integration button](readme-resources/make-custom-integration-button.png "Make a Custom Integration button")
1. Click the *Bots* option.
   
   ![Clicking the Bots option](readme-resources/bots-option.png "Bots option")
1. Enter a *Username* for the bot (awsbot, or whatever you like), and click *Add
   bot integration*.

   ![Entering a bot Username](readme-resources/bot-username.png "Bot Username")
1. You will be taken to the *Integration Settings* page.

   1. Copy the *API Token* someplace (you'll need it later).
   1. Optional: Upload the [aws-cube.png] image provided in this GitHub
      repository as the bot's icon under *Customize Icon*.
   1. Optional: Enter *First & Last Name* for the bot.
   1. Optional: Enter a description of the bot under *What this bot does*.

## Usage

TODO: Write usage instructions

## License
**The MIT License (MIT)**
Copyright (c) 2016, Perihelios LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
