//Description:
//	Responds with some rad fingerguns.
//Commands:
//	fred fingerguns

module.exports = function(robot){
	
	let emoticons = ['(☞ ͡° ͜ʖ ͡°)☞','(σﾟﾛﾟ)σ','(╭☞• ⍛• )╭☞','(╭☞•̀o•́)╭☞','( ☞◔ ౪◔)☞','╭☞(-_-)╭☞']; 
	
	robot.respond(/fingerguns/i, function(msg){
	
		let randomEmoticon = emoticons[Math.floor((Math.random() * emoticons.length))];
		msg.send(randomEmoticon);
		
	});
}