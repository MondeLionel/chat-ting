(function(window){

	const body = document.querySelector("body")
	let chatIndex = 0;
	const defaultThumbnail = '../img/icons/icon_headphones.png';
	const chatContainer = document.getElementById("chats");
	const button1 = document.querySelector("#answer");
	const loadedBtn = document.querySelector(".loadedBtn");
	const bgTrack = document.querySelector("#bgTrack");
	const pauseBtn = document.querySelector("#pause")
	const disclaimerEl = document.querySelector(".disclaimer");
	const messageSound = document.querySelector("#sound1");
	const prequel = document.getElementById("prequel")
	const intro = document.getElementById("intro")
	const notification = document.querySelector(".notification")
	


	let sound = new Howl({
		src:'media/audio/message-pop.mp3',
		sprite:{
			pop:[0,1000]
		}
	})




	let chats = [
	{
		message: "Sho Babe",
		image:null,
		link:null,
		audio:null,
		video:null,
		thumbnail:null,
		messageID: "chat-2"
	},
	{
		message: "whats up.",
		image:null,
		link:null,
		audio:null,
		video:null,
		thumbnail:null,
		messageID: "chat-2"

	},
	{
		message: "Good. I'm good. Can we talk?",
		image:null,
		link:null,
		audio:null,
		video:null,
		thumbnail:null,
		messageID: "chat-1"

	},
	{
		message: "",
		image:"../img/stop.gif",
		link:null,
		audio:null,
		video:null,
		thumbnail:null,
		messageID: "chat-2"

	},
	{
		message: "I'm serious. Been wanting to talk for a while now",
		image:null,
		link:null,
		audio:null,
		video:null,
		thumbnail:null,
		messageID: "chat-1"

	},
	{
		message: "You keep avoiding me",
		image:null,
		link:null,
		audio:null,
		video:null,
		thumbnail:null,
		messageID: "chat-1"

	},

]



loadedBtn.addEventListener("click", function(){
	// psuedo-state management
	body.classList.remove("loading");
	body.classList.add("animating")
	// start music
	bgTrack.volume = 0.05;
	// fade out
	anime({
		targets: disclaimerEl,
		duration:2000,
		opacity: [1,0]
	})

	setTimeout(()=>{
		disclaimerEl.remove()
		bgTrack.play();
		body.classList.add("intro")
		tl.play()
	},3000)
	// fade in intro screen
})


pauseBtn.addEventListener("click", function(){

	console.log(bgTrack)
	if(bgTrack.playing = false){
		bgTrack.play()
		return
	}

	bgTrack.pause();
	
})


button1.addEventListener('click', function(){
	let index1 = chatIndex++
	chat(index1)
	setTimeout(()=>{
		sound.play('pop')
	},490)
	
})

notification.addEventListener("click", function(){
	sound.play('pop')
	anime({
		targets:notification,
		translateY:'-100%',
		opacity:[1,0],
		duration:300,
		easing: 'cubicBezier(1.000, -0.380, 0.810, 0.275)',
		complete:function(){
			intro.style = "display:none;"
			body.classList.remove("screen");
			body.classList.add("chatState");

		}
	})


	
})

function chat(index1){
	let chatEl1 = document.createElement('div')
	chatEl1.classList.add(chats[index1].messageID,"chat")
	let message = document.createElement('div')
	message.classList.add("message")
	message.textContent = chats[index1].message;

	if(chats[index1].image != null){
		let image = document.createElement("img");
		image.classList.add("img-fluid","sentImg")
		image.src = chats[index1].image
		message.appendChild(image)
	}

	if(chats[index1].video != null){
		let video = document.createElement("video")
		video.classList.add("sentVid")
		video.src = chats[index1].video;
		message.appendChild(video)

	}

	if(chats[index1].link != null){
		chatEl1.classList.add("link");

		let link = document.createElement("a");
		link.classList.add("sentLink");
		link.href = chats[index1].link;
		link.target = "_blank"
		link.textContent = chats[index1].message;

		let thumbnail = defaultThumbnail;
		if(chats[index1].thumbnail != null){
			thumbnail = chats[index1].thumbnail
		}

		let linkMetaData = `<a href='${chats[index1].link}' class='d-flex linkMeta'>
		<img class='img-fluid' src='${thumbnail}'>
		<p>
		<span class='linkname'>${chats[index1].link}</span>
		<span class="host">${link.host}</span>
		</p>
		</div>`
	
		message.textContent = ""
		message.innerHTML = linkMetaData
		message.appendChild(link);
	}

	if(chats[index1].audio != null){
		chatEl1.classList.add("audio");
		let audioElementWrapper = document.createElement("div");
		let audioMetaPlayBtn = document.createElement("a")
		// let audioMetaIcon = document.createElement("img")
		let audio = document.createElement("audio");

		audioElementWrapper.classList.add("d-flex")
	
		audio.classList.add("sentAudio");

		audio.src = chats[index1].audio;
		audio.controls = true;
		// audioElementWrapper.appendChild(audioMetaIcon)
		audioElementWrapper.appendChild(audio);
		message.appendChild(audioElementWrapper);
		// message.appendChild(audio)
	}

	chatEl1.appendChild(message);
	setTimeout(()=>{
		chatContainer.appendChild(chatEl1)
	},500)
	
}


let head1 = document.querySelector(".heading1")
let head2 = document.querySelector(".heading2")
let head3 = document.querySelector(".heading3")

var tl = anime.timeline({
  easing:'linear',
  duration:1000
});

tl
.add({
  targets: prequel,
  opacity:[0,1]
})
.add({
  targets:head2,
  opacity:[0,1]
})
.add({
  targets:head2,
  opacity:[1,0]
})
.add({
  targets:head3,
  opacity:[0,1]
})
.add({
  targets:head3,
  opacity:[1,0]
});

tl.finished.then(function(){
	prequel.style = "display:none"
	body.classList.remove("intro")
	body.classList.remove("animating")
	// body.classList.add("chatState")
	body.classList.add("screen")
		body.style = `background-image:url(img/ezgif.com-gif-maker.jpg);
	background-size:cover;
	background-repeat:no-repeat;
	backdrop-filter: blur(2px);
background-blend-mode: multiply;`
	dramatl.play();

})

tl.pause();


const dramatl = anime.timeline({
	easing: "linear",
	duration:2000
})



dramatl.add({
	targets:intro,
	opacity:[0,1]
})
.add({
	targets:notification,
	translateY:[-100,0],
	opacity:[0,1],
	// scale:[0,1],,
	duration:100,
	begin:function(){
		console.log("began")
		sound.play('pop')
	}
})

dramatl.finished.then(()=>{


	console.log("intro finished")
})

dramatl.pause();


})(window)