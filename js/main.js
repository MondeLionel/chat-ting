import { chats } from './chats.js'



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
	const prequel = document.getElementById("prequel");
	const intro = document.getElementById("intro");
	const notification = document.querySelector(".notification");
	const loadEl = document.querySelector(".loaders");


	let sound = new Howl({
		src:'media/audio/message-pop.mp3',
		volume:0.05,
		sprite:{
			pop:[0,1000]
		}
	})

	let bg_track = new Howl({
		src:'https://link.storjshare.io/jvwfmqkufvcnd4obbu45gqk3xb4a/sounds%2FMansur%20Brown%20-%20Heiwa%20(Official%20Audio).mp3?wrap=0',
		volume:0.09
	})


window.addEventListener("load", function(e){
		// remove loader
		anime({
			targets:loadEl,
			opacity:[1,0],
			duration:1000,
			complete:function(){
				loadEl.remove();
			}
		})
	})

loadedBtn.addEventListener("click", function(){
	// psuedo-state management
	body.classList.remove("loading");
	body.classList.add("animating")
	// start music
	bg_track.play();
	// fade out
	anime({
		targets: disclaimerEl,
		duration:2000,
		opacity: [1,0],

	})

	setTimeout(()=>{
		disclaimerEl.remove()
		
		body.classList.add("intro")
		tl.play()
	},3000)
	// fade in intro screen
})


pauseBtn.addEventListener("click", function(){
	bg_track.pause()
	body.classList.add("no-audio")
	
})


button1.addEventListener('click', function(){
	let index1 = chatIndex++
	chat(index1)
	setTimeout(()=>{
		sound.play('pop')
	},190)
	
})

notification.addEventListener("click", function(){
	sound.play('pop')
	anime({
		targets:notification,
		translateY:'-100%',
		opacity:[1,0],
		duration:100,
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
		chatEl1.classList.add("image");
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

	if(chats[index1].messageID === "spacer"){
		body.classList.add("dayTransition")
		// animate my nigga
		anime({
			targets:document.querySelector(".days"),
			opacity:[0,1],
			duration:4000
		})

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
	},200)
	
}


let head1 = document.querySelector(".heading1")
let head2 = document.querySelector(".heading2")
let head3 = document.querySelector(".heading3")

var tl = anime.timeline({
  easing:'linear',
  duration:2000
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

