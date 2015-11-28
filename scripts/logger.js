// This script logs all Fred requests on the Heroku logs,
module.exports = function(robot){

	robot.listenerMiddleware(function(context, next, done){

		robot.logger.info(context.response.message.user.name + ": " + context.response.message.text);
		next();
	});

}

