//Description:
//	Lets fred be a wingburn
//Commands:
//	fred burn


module.exports = function(robot){

	robot.respond(/burn/i, function(msg){

		var burn = [
				"THEY SAID YOU HAD NO NIPPLES!!",
				"Ain't no chill, bruh",
				"Noooooo, she wasn't readyyyy",
				"Where's your chill button?? :joy::100::fire:",
				"http://tiny.cc/tva16x :ambulance::fire:",
				"http://assets.nydailynews.com/polopoly_fs/1.2169911!/img/httpImage/image.jpg_gen/derivatives/gallery_1200/drake.jpg",
				"https://s-media-cache-ak0.pinimg.com/originals/77/da/5f/77da5fee6ad0d1e6419159cf843656d7.gif",
				"https://media.giphy.com/media/AJwnLEsQyT9oA/giphy.gif",
				"http://static.comicvine.com/uploads/original/6/69852/3494642-bth_burn_zps519e93fb.gif",
				"get rekt, son",
				"https://media.giphy.com/media/3rgXBLrnjPRz3Q2Euc/giphy.gif",
				"OOOOOOH SHIIIIEEEEET SOOOOONNN"
			];
		
		msg.send(burn[Math.floor(Math.random()*burn.length)]);
	
	});


}	
