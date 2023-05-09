var user = { likes: 0 };
var chatHead;

setTimeout(()=> {
  chatHead = document.querySelector("#chat-head");
}, 1000);

document.addEventListener("click", (e) => {
  if (e.target.matches("#registration") || e.target.matches("#back-to-registration")) {
    const parentEl = document.querySelector(".do-registration");
    const registrationFormEl = document.querySelector(
      ".registration-form.container"
    );
    parentEl.classList.add("offscreen");
    registrationFormEl.classList.remove("offscreen");

    document.forms["registration"].addEventListener("change", (e) => {
      removeClass(e.target, "hide-hints");
      if (document.forms["registration"].checkValidity()) {
        let registrationSubmit = document.querySelector("#registration-submit");
        registrationSubmit.removeAttribute("disabled");
      }
      if (document.forms["registration"]["hero-image"].value) {
        let saveBtn = document.querySelector("#hero-image-save");
        saveBtn.removeAttribute("disabled");
      }
    });

    document.forms["registration"].addEventListener("click", (e) => {
      if (e.target.matches("#registration-submit[type='submit']")) {
        e.preventDefault();
        e.stopPropagation();
        let elements =
          document.forms["registration"].querySelectorAll(".hide-hints");
        elements.forEach((el) => {
          removeClass(el, "hide-hints");
        });
        let containerEl = document.querySelector(".container.registration-form");
        containerEl.classList.add("offscreen");
        let registrationSuccess = document.querySelector("#registration-success");
        registrationSuccess.classList.remove("offscreen");
        let userName = document.querySelector("#user .user-name");
        userName.innerHTML = document.forms["registration"]["name"].value;
        let userAge = document.querySelector("#user .user-age");
        userAge.innerHTML = " ("+document.forms["registration"]["age"].value + ")";
        let school = document.querySelector("#school");
        school.innerHTML = document.forms["registration"]["school"].value;
        let profile = document.querySelector("#profile");
        profile.setAttribute("src", document.forms["registration"]["hero-image"].value);
      }
    });
  }

  if (e.target.matches("#hero-image-select")) {
    let formFields =
      document.forms["registration"].querySelector(".form-fields");
    let heroImageSeleccontainer = document.forms["registration"].querySelector(
      "#hero-image-seleccontainer"
    );
    formFields.classList.add("offscreen");
    heroImageSeleccontainer.classList.remove("offscreen");
  }

  if (e.target.matches("#hero-image-save")) {
    let formFields =
      document.forms["registration"].querySelector(".form-fields");
    let heroImageSeleccontainer = document.forms["registration"].querySelector(
      "#hero-image-seleccontainer"
    );
    let heroImageSelect =
      document.forms["registration"].querySelector("#hero-image-select");
    let heroImage =
      document.forms["registration"].querySelector("img.hero-image");
    formFields.classList.remove("offscreen");
    heroImageSeleccontainer.classList.add("offscreen");
    heroImageSelect.classList.add("selected");
    heroImageSelect.innerHTML = "Képtörlése és új választása";
    heroImage.setAttribute(
      "src",
        document.forms["registration"]["hero-image"].value
    );
    heroImage.classList.remove("offscreen");
    let images = document.querySelectorAll("img[src='images/profile.jpg']")
    images.forEach(image => {
      image.setAttribute(
        "src",
          document.forms["registration"]["hero-image"].value
      )
    });
  }

  if(e.target.matches("#registration-done")) {
    let registrationSuccess = document.querySelector("#registration-success");
    registrationSuccess.classList.add("offscreen");
        let findFriends = document.querySelector("#find-friend");
        findFriends.classList.remove("offscreen");
    let friends = findFriends.querySelectorAll(".friend:not(.fake)");
    friends.forEach(friend => {
      let school = friend.querySelector(".school");
      school.innerHTML = document.forms["registration"]["school"].value; 
    });

    document.forms["friends"].addEventListener("change", (e) => {
      let selectedFriends = document.forms["friends"].querySelectorAll("input[type=checkbox]:checked:not([fake])")
      removeClass(e.target, "hide-hints");
      if (document.forms["registration"].checkValidity()) {
        let registrationSubmit = document.querySelector("#registration-submit");
        registrationSubmit.removeAttribute("disabled");
      }
      let btn = document.querySelector("#friends-done");
      if (selectedFriends.length > 3 && !document.forms["friends"].querySelectorAll("input[type=checkbox][fake]:checked").length) {
        btn.removeAttribute("disabled");
      } else {
        btn.setAttribute("disabled", "disabled");
      }
    });
  }

  if(e.target.matches("#friends-done")) {
    e.preventDefault();
    e.stopPropagation();
    let selectedFriends = document.forms["friends"].querySelectorAll("input[type=checkbox]:checked:not([fake])");
    updateLikes(5 * selectedFriends.length);
    let registrationDone =  document.querySelector("#registration-done-popup");
    registrationDone.classList.remove("offscreen");
  }
  
  if(e.target.matches("#go-to-feed")) {
    let oldScreen = document.querySelector("#find-friend");
    oldScreen.classList.add("offscreen");
    let newScreen = document.querySelector("#feed");
    newScreen.classList.remove("offscreen");
    let username = document.querySelector("#feed .user .name");
    username.innerHTML = document.forms["registration"]["name"].value;
    let img = document.querySelector("#feed .user img");
    img.setAttribute(
      "src",
        document.forms["registration"]["hero-image"].value
    );
    setTimeout(openChatHead, 10000)
  }

  if(e.target.matches("button.like .like-svg, button.like .like-svg *")) {
    let section = e.target.closest(".like-section");
    section.querySelector("button.like .liked-svg").classList.remove("offscreen");
    let like = section.querySelector("button.like .like-svg");
    like.classList.add("offscreen");
    let likes = section.querySelector(".likes-container .likes");
    likes.innerHTML = Number(likes.innerHTML) + 1;
  }

  if(e.target.matches("button.like .liked-svg, button.like .liked-svg *")) {
    let section = e.target.closest(".like-section");
    section.querySelector("button.like .like-svg").classList.remove("offscreen");
    let like = section.querySelector("button.like .liked-svg");
    like.classList.add("offscreen");
    let likes = section.querySelector(".likes-container .likes");
    likes.innerHTML = Number(likes.innerHTML) - 1;
  }

  if(e.target.matches(".menu svg, .menu svg *, button.like *")) {
    setTimeout(() => {
      openChatHead();
    }, 800);
  }

  if(e.target.matches(".menu svg.chat-menu, .menu svg.chat-menu *, #chat-head, #chat-head *")) {
    let messageIcons = document.querySelectorAll(".menu .svg:last-child");
    messageIcons.forEach(icon => {
      icon.classList.remove("after");
    });
    chatHead.classList.add("offscreen");
    chatHead.classList.remove("first-init");
    let oldScreen = document.querySelector("#feed");
    oldScreen.classList.add("offscreen");
    let newScreen = document.querySelector("#chat");
    newScreen.classList.remove("offscreen");
    let csillag = document.querySelector("#csillag");
    csillag.classList.add("offscreen");
    let messages = document.querySelector("#chat .content .messages");
    let messagesContainer = document.querySelector("#chat .content .messages .messages-container");
    setTimeout(() =>messages.scroll({
      top: messagesContainer.scrollHeight*10 ,
      left:0,
      behavior: 'smooth'
    }), 100);
  }

  if(e.target.matches(".menu:not([disabled]) svg.feed-menu, .menu:not([disabled]) svg.feed-menu *")) {
    let oldScreen = document.querySelector("#chat");
    oldScreen.classList.add("offscreen");
    let newScreen = document.querySelector("#feed");
    newScreen.classList.remove("offscreen");
    chatHead.classList.remove("offscreen");
    let csillag = document.querySelector("#csillag");
    csillag.classList.add("offscreen");
  }

  if(e.target.matches("#csillag-profile-link-chat, #csillag-profile-link-chat *")) {
    let chat = document.querySelector("#chat");
    let feed = document.querySelector("#feed");
    let csillag = document.querySelector("#csillag");
    chat.classList.add("offscreen");
    feed.classList.add("offscreen");
    csillag.classList.remove("offscreen");
    // chatHead.classList.remove("offscreen");
  }

  if(e.target.matches("#freiand-req-csillag")) {
    let overlay = document.querySelector("#csillag-disabled");
    overlay.classList.remove("offscreen");
  }

  if(e.target.matches("#understand-btn-csillag")) {
    let overlay = document.querySelector("#csillag-disabled");
    overlay.classList.add("offscreen");
    let messages = document.querySelector("#chat .content .messages");
    let chat2 = document.querySelector("#hektor-chat2");
    let chat2Message = chat2.querySelector(".messages-container .message");
    let messagesContainer = document.querySelector("#chat .content .messages .messages-container");
    let answers = document.querySelectorAll("#chat .answer.delay")
    setTimeout(()=> {
      answers.forEach(el => {
        el.classList.remove("delay");
      });
      messagesContainer.appendChild(chat2Message);
      chat2.remove();
      chatHead.classList.remove("offscreen");
      let messageIcons = document.querySelectorAll(".menu .svg:last-child");
      messageIcons.forEach(icon => {
        icon.classList.add("after");
      });
      if(window && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate([100,30,100,30,100]);
      }
    }, 850)
  }

  if(e.target.matches("#chat .answer .option, #chat .answer .option *")) {
    let answer = e.target.closest(".answer");
    let option = e.target.closest(".option");
      let messages = document.querySelector("#chat .content .messages");
      let messagesContainer = document.querySelector("#chat .content .messages .messages-container");
      let message = option.querySelector(".message.sent");
      let replays = option.querySelectorAll(".message:not(.sent)");
      let typing = document.querySelector("#chat .typing");

      if (option.getAttribute('removeId')) {
        let removeEl = document.querySelector("#chat .answer[removeId=" + option.getAttribute('removeId') + "]");
        removeEl.remove();
      }
    
      updateLikes(Number(option.getAttribute('like')));
      answer.classList.add("offscreen")
      if (!message.hasAttribute("install-randi-maker")) {
        messagesContainer.appendChild(message);
      }
      if(messages.scrollHeight <=messagesContainer.scrollHeight) {
        messages.classList.add("remove-flex-end")
      }
      setTimeout(() =>messages.scroll({
        top: messagesContainer.scrollHeight*10 ,
        left:0,
        behavior: 'smooth'
      }), 100);
      let random = Math.random() + 1;
      if(replays.length > 0) {

        setTimeout(() => {
          typing.classList.remove("offscreen");
        }, 550 * random);
        replays.forEach(replay => {
          setTimeout(() => {
            typing.classList.add("offscreen");
            messagesContainer.appendChild(replay);
            answer.remove();
            setTimeout(() =>messages.scroll({
              top: messagesContainer.scrollHeight*10 ,
              left:0,
              behavior: 'smooth'
            }), 100);
          },1300 * random);
          if (replay.hasAttribute("go-to-feed")){
            activateRandiMakerTimeout();
          }
        });
      } else {
        answer.remove();
      }
  }

  if(e.target.matches("[install-randi-maker], [install-randi-maker] * ")) {
    user.postponeRandiMaker = false;
    let screens = document.querySelectorAll("[id].container");
    let randiOverlay = document.querySelector("#randimaker-overlay");
    randiOverlay.classList.add("offscreen");
    screens.forEach(screen => {
      screen.classList.add("offscreen");
      if(screen.getAttribute("id") === "randi-chat"){
        screen.classList.remove("offscreen");
      }
    });
  }

  // if(user.randiMakerLimit) {
  //   if(user.randiMakerLimit === 0) {
  //     openRandiMakerOverlay();
  //   } else {
  //     user.randiMakerLimit--
  //   }
  // }

  if(user.postponeRandiMaker) {
    let overlay = document.querySelector("#randimaker-overlay.offscreen");
    setTimeout(()=>{
      overlay.classList.remove("offscreen");
    }, 450);
  }

  if(e.target.matches("button[exit-randi-maker-overlay], button[exit-randi-maker-overlay] * ")) {
    let overlay = document.querySelector("#randimaker-overlay");
    overlay.classList.add("offscreen");
    user.postponeRandiMaker = true;
  }

  if(e.target.matches("[go-to-meme-maker], [go-to-meme-maker] * ")) {
    let screens = document.querySelectorAll("[id].container");
    screens.forEach(screen => {
      screen.classList.add("offscreen");
      if(screen.getAttribute("id") === "meme-maker"){
        screen.classList.remove("offscreen");
      }
    });
  }

  if(e.target.matches("input[name='meme-image'] + label, input[name='meme-image'] + label *")) {
    let btn = document.querySelector("#meme-image-save");
    let label = e.target.closest("label");
    btn.removeAttribute("disabled");
    user.selectedmemelikes = label.getAttribute("like");
  }

  if(e.target.matches("#meme-image-save")) {
    e.preventDefault();
    e.stopPropagation();
    let imagesForm = document.querySelector("#meme-maker form[name='meme-image']");
    let selectText = document.querySelector("#meme-maker .image-selected");
    let needToSHows = document.querySelectorAll("#meme-maker .image-selected .offscreen[" + document.forms["meme-image"]["meme-image"].value + "]");
    // let btn = document.querySelector("#meme-save");
    imagesForm.classList.add("offscreen");
    selectText.classList.remove("offscreen");
    // btn.removeAttribute("disabled");
    needToSHows.forEach(el => {
      el.classList.remove("offscreen");
    });
  }

  if(e.target.matches("input[name='meme-text'] + label .meme-text")) {
    let btn = document.querySelector("#meme-save");
    let text = document.querySelector("#meme-maker .selected-text");
    let label = e.target.closest("label");
    btn.removeAttribute("disabled");
    text.innerHTML = e.target.innerHTML;
    text.classList.remove("offscreen")
    user.selectedmemetextlikes = label.getAttribute("like");
  }

  if(e.target.matches("#meme-save")) {
    e.preventDefault();
    e.stopPropagation();
    let title = document.querySelector("#meme-maker .image-selected .title");
    let memeText = document.querySelector("#meme-maker form[name='meme-text']");
    let memeShareBtn = document.querySelector("#meme-share");
    let memeLikes = document.querySelector("#meme-maker .meme-final-likes");
    title.innerHTML = "MEME";
    memeText.classList.add("offscreen");
    memeShareBtn.classList.remove("offscreen");
    memeLikes.classList.remove("offscreen");
    memeLikes.innerHTML = Number(user.selectedmemetextlikes)+Number(user.selectedmemelikes) + " Like";
  }

  if(e.target.matches("#meme-share")) {
    let screens = document.querySelectorAll("[id].container");
    screens.forEach(screen => {
      screen.classList.add("offscreen");
      if(screen.getAttribute("id") === "feed"){
        screen.classList.remove("offscreen");
        let header = screen.querySelector(".feed-header");
        header.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      }
    });
    let memeMakerImgWrapper = document.querySelector("#meme-maker .content .img-wrapper")
    let memeFeed = document.querySelector("#feed .feed-content .feed.container.andris.offscreen");
    let userImg = memeFeed.querySelector(".user-data img");
    let userName = memeFeed.querySelector(".user-data .name b");
    let feedImgWrapper = memeFeed.querySelector(".img-wrapper");
    let feedLikes = memeFeed.querySelector(".likes-container .likes");
    userImg.setAttribute("src", document.forms["registration"]["hero-image"].value);
    userName.innerHTML = document.forms["registration"]["name"].value;
    memeFeed.classList.remove("offscreen");
    feedImgWrapper.innerHTML = memeMakerImgWrapper.innerHTML;
    let likesPopup = document.querySelector(".likesPopup");
    setTimeout(()=> {
      likesPopup.classList.remove("offscreen");
      likesPopup.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      updateLikes(1000);
      feedLikes.innerHTML = 1000;
    if(window && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([100,30,100,30,100]);
    }
    }, 3500);
    
  }
  if(e.target.matches("#yeah")) {
    let likesPopup = document.querySelector(".likesPopup");
    let overlay = document.querySelector("#like-limit");
    likesPopup.classList.add("offscreen");
    overlay.classList.remove("offscreen");
  }

  if(e.target.matches("#csillag-request")) {
    let overlay = document.querySelector("#like-limit");
    let end = document.querySelector("#end");
    let screens = document.querySelectorAll("[id].container");
    screens.forEach(screen => {
      screen.classList.add("offscreen");
    });
    overlay.classList.add("offscreen");
    end.classList.remove("offscreen");
    if(window && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([100,30,100,30,100,30,200,30,200,30,200]);
    }
  }
  //window?.navigator?.vibrate?.([100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100]);
});


function removeClass(el, className) {
  el.classList.remove(className);
}

function openChatHead() {
  if (chatHead.classList.contains("offscreen") && chatHead.classList.contains("first-init")) {
    chatHead.classList.remove("offscreen");
    chatHead.classList.remove("first-init");
    if(window && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([100,30,100,30,100]);
    }
    let messageIcons = document.querySelectorAll(".menu .svg:last-child");
    messageIcons.forEach(icon => {
      icon.classList.add("after");
    });
  }
}

function updateLikes(add) {
  user.likes += Number(add);
  let likes = document.querySelectorAll(".likes-container.need-to-update .likes");
    likes.forEach(el => {
      el.innerHTML = user.likes;
    })
}

function activateRandiMakerTimeout() {
  let screens = document.querySelectorAll("[id].container");
  screens.forEach(screen => {
    screen.classList.add("offscreen");
    if(screen.getAttribute("id") === "feed"){
      screen.classList.remove("offscreen");
    }
  });
  user.randiMakerLimit = 3;
  setTimeout(()=>{
    openRandiMakerOverlay();
  }, 10000);
}

function openRandiMakerOverlay() {
  let overlay = document.querySelector("#randimaker-overlay.offscreen");
  overlay.classList.remove("offscreen");
}
