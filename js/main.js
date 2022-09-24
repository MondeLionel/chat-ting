(function(window){

	const body = document.querySelector("body")
	let chatIndex = 0;
	const defaultThumbnail = '../img/icons/icon_headphones.png';

// date vibes




	let chats = [
	{
		message: "Sho Babe",
		image:null,
		link:null,
		audio:null,
		video:null,
		thumbnail:null,
		messageID: "chat-1"
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
		message: "Good beans, send nudes",
		image:null,
		link:null,
		audio:null,
		video:null,
		thumbnail:null,
		messageID: "chat-1"

	},
	{
		message: "Day??",
		image:"../img/nude.jpg",
		link:null,
		audio:null,
		video:null,
		thumbnail:null,
		messageID: "chat-2"

	},
	{
		message: "All good. Nice body. Shit is getting hectic",
		image:null,
		link:"https://www.maketecheasier.com/trello-self-hosted-alternative-wekan/",
		audio:null,
		video:null,
		thumbnail:null,
		messageID: "chat-1"

	},
	{
		message: "",
		image:null,
		link:null,
		audio:"../media/audio/1.aac",
		video:null,
		thumbnail:null,
		messageID: "chat-2"

	}
]

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
	chatContainer.appendChild(chatEl1)
}


let head1 = document.querySelector(".heading1")
let head2 = document.querySelector(".heading2")
let head3 = document.querySelector(".heading3")

var tl = anime.timeline({
  easing:'linear',
  duration:3000
});

tl
.add({
  targets: prequel,
  opacity:[0,1]
})
.add({
  targets:head1,
  opacity:[0,1]
})
.add({
  targets:head1,
  opacity:[1,0]
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
	dramatl.play();

})


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
		messageSound.play()
	}
})

dramatl.finished.then(()=>{
	console.log("intro finished")
})

dramatl.pause();


})(window)