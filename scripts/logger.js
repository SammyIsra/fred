//Description
//  This script logs all Fred requests on the Heroku logs. It has no use in chat
module.exports = function(robot){

	robot.listenerMiddleware(function(context, next, done){ // eslint-disable-line no-unused-vars

		robot.logger.info(context.response.message.user.name + ": " + context.response.message.text);
		next();
	});

};
