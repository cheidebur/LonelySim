$(document).ready(function() {
    var linksData = []

    var notesData = [{
        notesTitle: "that note",
        notesText: "James told me about the Internet the other day. Supposedly, it's some free network where people just post whatever they want. he's going crazy, keeps telling me I live in a simulation"
    }, {
        notesTitle: "this note",
        notesText: "every day is exactly the same"
    }, {
        notesTitle: "favorite pizza",
        notesText: "green peppers!!"
    }, {
        notesTitle: "cold showers",
        notesText: "I've been eating too many sweets lately'"
    }, {
        notesTitle: "inspiration",
        notesText: "is it healthy to run only on inspiration and nothing else? sometimes it sure does feel like I need some guidance. or energy. i can only drink so much iced coffee before I explode."
    }]
    var jamesConvo = {
        messages: [{
            class: "my-bubble",
            contents: "yo"
        }, {
            class: "my-bubble",
            contents: "james you there?"
        }, {
            class: "my-bubble",
            contents: "helloooooooooooooo"
        }]
    }
    var claireConvo = {
        messages: [{
            class: "them-bubble",
            contents: "Hey, it's Claire. I barely just set this thing up; let me know if you can read this. I love you! Don't listen to James, he's sick in the head."
        }, {
            class: "them-bubble",
            contents: "are you getting these?"
        }, {
            class: "them-bubble",
            contents: "It's been so long since we've spoken about things we both remember. I know you can't control it, but it bothers me."
        }, {
            class: "them-bubble",
            contents: "you forget more and more every day, SUBJECT731990, But I will never forget you. You can always trust me."
        }, {
            class: "my-bubble",
            contents: "Hey!! Ummm...everything ok? U glitch out with my name? lol. Yep, getting your messages."
        }, {
            class: "them-bubble",
            contents: "Hey. what do you mean? I wrote your name just fine. Are you imagining things again?"
        }, {
            class: "my-bubble",
            contents: "no, you wrote some code thing. and what the hell? lately, I feel like everyone is gaslighting me. I'm not crazy. I just forget things, or something, I don't know. Reply when you get this."
        }]
    }
    var alessaConvo = {
        messages: [{
            class: "my-bubble",
            contents: "hi Alessa"
        }]
    }
    var mariaConvo = {
        messages: [{
            class: "them-bubble",
            contents: "HEY HEY HEY =)"
        }]
    }
    var unknownConvo = {
        messages: [{
            class: "them-bubble",
            contents: "the notes password is freeme7"
        }]
    }
    var convo = {convoObject: jamesConvo};
    var chatUnlocked = false;
    var notesUnlocked = false;

    function whichConvo(person) {
        if (person == "claire") {
            return convo = {convoObject: claireConvo};
        } else if (person == "alessa") {
            return convo = {convoObject: alessaConvo};
        } else if (person == "maria") {
            return convo = {convoObject: mariaConvo};
        } else if (person == "james") {
            return convo = {convoObject: jamesConvo};
        } else if (person == "unknown") {
            return convo = {convoObject: unknownConvo}
        }
    }
    

    console.log("Welcome to LonelySim");
    //close modal
    $("#close-modal").click( e => {
        $(".modal-grouper").fadeOut(200);
        startTimer();
    })
    //close forbidden
    $("#close-forbidden").click( e => {
        $("#forbidden").fadeOut(200);
    })
    function startTimer() {
        let seconds = 180;
        let timer = document.querySelector("#timer-sec");
        setInterval(function() {
            if (seconds <= -1) return clearInterval(); //turn off the interval at 0
        timer.innerText = seconds--;
        }, 1000);
    }

    //nav functionality
    $(".nav-icon").click( e => {
        //flash effect
        $("#content-flash").fadeIn(100, function(e) {
            $(this).fadeOut(200);
        })
        //reset classes on .nav-icon
        $(".nav-icon.active").attr("class", "nav-icon");
        const thisIcon = e.currentTarget.id;
        console.log("nav icon clicked ", thisIcon);
        $("#" + thisIcon).addClass("active");
        //change menu label
        const newLabel = e.currentTarget.getAttribute("name");
        console.log("changing label to ", newLabel);
        $("#app-label").text(newLabel);
        //remove elements and switch content
        $(".link-card.usr-added").remove();
        $(".container").hide();
        console.log("notes unlocked is ", notesUnlocked);
        if (!notesUnlocked && thisIcon == "notesicon") {
            //$(".container.notesicon").empty();
            $("#notes-lock-div").remove();
            composeNotesLock();
        }
        if (thisIcon == "linksicon") {
            composeLinks(linksData);
        }
        $("." + thisIcon).fadeIn();
    })
    function composeLinks(links) {
        links.forEach( link => {
            composeLink(link)
        })
    }
    function composeLink(link) {
        let linkCard = document.createElement("div");
            linkCard.setAttribute("class", "link-card clearnet usr-added");
            let linkTitle = document.createElement("h4");
            linkTitle.setAttribute("class", "link-title clearnet");
            linkTitle.innerText = link.linksTitle;
            let linkText = document.createElement("p");
            linkText.setAttribute("class", "link-text clearnet");
            linkText.innerText = link.linksText;
            let linkDel = document.createElement("button");
            linkDel.setAttribute("class", "link-del");
            linkDel.setAttribute("name", link.id);
            linkCard.setAttribute("id", link.id);
            let linkAnchor = document.createElement("a");
            /*
            if (link.linksTitle !== "Google") {
                linkAnchor.setAttribute("href", link.linksURI)
            }
            */
            linkAnchor.setAttribute("name", "clearnet");
            linkAnchor.setAttribute("class", "link-anchor")
            linkDel.textContent = "delete";
            let container = document.querySelector(".linksicon");
            linkAnchor.appendChild(linkTitle);
            linkAnchor.appendChild(linkText);
            linkCard.appendChild(linkAnchor);
            linkCard.appendChild(linkDel);
            container.append(linkCard);    
    }
    //disable google clearnet link
    $(".clearnet").click( function(e) {
        $("#forbidden").show();
    })
    //link delete
    $(".container.linksicon").click( function(e) {
        if (e.target.className == "link-del") {
            let linkId = e.target.name;
            console.log("delete link clicked for ", linkId);
            $("#" + linkId).fadeOut( function(e) {
                $(this).remove();
            })
        }
    })
    //open link editor
    $("#links-nav").click( function(e) {
        console.log("new link");
        $(".link-editor-grouper").fadeIn();
    })
    //save link
    $(".link-editor-save-btn").click( function(e) {
        let linkName = $("#l-name").val();
        let linkURI = $("#l-URI").val();
        let linkNote = $("#l-note").val();
        let linkObj = {
            linksTitle: linkName,
            linksText: linkNote,
            linksURI: linkURI
        }
        //push obj to links array
        linksData.push(linkObj);
        console.log("updated links - new list is ", linksData);
        //close editor
        $(".link-editor-grouper").fadeOut();
        composeLink(linkObj);
    })
    /*
    /* generate random 
    Math.floor(1000 + Math.random() * 9000)
    */
    //close link editor
    $(".link-editor-grouper-close").click( e => {
        $(".link-editor-grouper").fadeOut();
    })
    //chat box functionality
    $("#chat-send").click( e => {
        e.preventDefault();
        const thisPerson = e.target.className;
        console.log("chat send");
        msgContent = $("#chat-text-input").val();
        const msg = {
            class: "my-bubble",
            contents: msgContent
        }
        console.log("pushing ", msg);
        //push to convo object in memory
        whichConvo(thisPerson);
        convo.convoObject.messages.push(msg);

        //push to convo div in GUI
        const pushMsg = document.createElement("p");
        pushMsg.setAttribute("class", "message");
        pushMsg.innerText = msgContent;
        const pushBubble = document.createElement("div");
        pushBubble.setAttribute("class", "my-bubble");
        //claire's active
        if (thisPerson == "claire") {
            //clear read receipt from previous message
            $("#read-receipt").remove();
            //and append a new one
            let deliveredReceipt = document.createElement("p");
            deliveredReceipt.setAttribute("id", "read-receipt");
            deliveredReceipt.innerText = "Read";
            pushMsg.append(deliveredReceipt);
            console.log("Claire seems to be online...")
        }
        pushBubble.append(pushMsg);
        $(".chat-messages").append(pushBubble);
        $("#chat-text-input").val("");
        //scroll to btm
        const btmScroll = $(".chat-messages");
        btmScroll.scrollTop(btmScroll.prop("scrollHeight"));
       // saveConvo(msg, )
        return false;
    })
    //tab and convo switching
    $(".tab").click( e => {
        const thisPerson = e.currentTarget.id;
        console.log("clicked ", thisPerson, "'s tab.");
        //highlight current tab
        $(".tab.active").removeClass("active");
        $("#" + thisPerson).addClass("active");
        //clear convo tab contents, change chat-messages class, and load content
        $(".chat-messages").attr("class", "chat-messages");
        $(".chat-messages").empty();
        //janky match convo w person
        //var convo = {convoObject};
        whichConvo(thisPerson);
        console.log('whichconvo function returned ', convo.convoObject);
        chatCompose(thisPerson, convo.convoObject);
        //add which chat data to send button
        $("#chat-send").removeClass(); //reset classes
        //scroll to btm
        const btmScroll = $(".chat-messages");
        btmScroll.scrollTop(btmScroll.prop("scrollHeight"));
        $("#chat-send").addClass(thisPerson); //add convo class      
    })
    $(".chat-messages").click( e => {
        if (e.target.id == "lock-button") {
            unlockChat();
        }
    })
    $("#content-container").click( e => {
        if (e.target.id == "notes-lock-button") {
            unlockNotes();
        }
    })
    function unlockChat() {
        const pwTry = document.getElementById("lock-input").value;
        if (pwTry == "vincent7SEVENvincent7") {
            chatUnlocked = true;
            $("#lock-div").fadeOut(function() {
                chatCompose("unknown", unknownConvo);
            })
        } else {
            lockDiv = document.getElementById("lock-div");
            lockDiv.innerText = "INCORRECT PASSWORD";
        }
    }
    function unlockNotes() {
        let pwTry = document.getElementById("notes-lock-input").value;
        if (pwTry == "freeme7") {
            notesUnlocked = true;
            $("#notes-lock-div").fadeOut( function() {
                $(".notes-ui").css("display", "inline-block");
                //generate notes from notesData object
                notesCompose(notesData);
            });
        }
    }      
    function shortenNote(note) {
        if (note.length > 85) 
            return note.substring(0,85) + "...";
        else
            return note;
    }
    function notesCompose(notes) {
        notes.forEach( note => {
            //shorten the note with ShortenNote and store result in variable
            let shortenedNote = shortenNote(note.notesText); //** */ we linked
            console.log(" shortened note is ", shortenedNote)

            let noteCard = document.createElement("div");
                noteCard.setAttribute("class", "note-card");
                let noteTitle = document.createElement("h4");
                noteTitle.setAttribute("class", "note-title");
                let noteText = document.createElement("p");
                noteText.setAttribute("class", "note-text");
                noteTitle.innerText = note.notesTitle
                noteText.innerText = shortenedNote; //** */ we linked
                noteCard.append(noteTitle);
                noteCard.append(noteText);
                //notesUi = document.getElementByClassName("notesicon");
                notesGrouper = document.createElement("div");
                notesGrouper.setAttribute("class", "notes-ui notes-grouper");
                notesGrouper.append(noteCard);
                $(".container.notesicon").append(notesGrouper);;
                $(".notes-ui").fadeIn();
        })
    }
    function composeChatLock() {
        const lockDiv = document.createElement("div")
        lockDiv.setAttribute("id", "lock-div");
        lockDiv.innerText = "THIS CONVERSATION HAS BEEN LOCKED BY THE ADMIN. ERRCD: INFO LEAK";
        const lockInput = document.createElement('input');
        lockInput.setAttribute("type", "input");
        lockInput.setAttribute("id", "lock-input");
        lockInput.setAttribute("placeholder", "ENTER PASSWORD");
        const lockButton = document.createElement("button");
        lockButton.setAttribute("id", "lock-button");
        lockButton.innerText = "unlock";
        lockDiv.append(lockInput);
        lockDiv.append(lockButton);
        $(".chat-messages").append(lockDiv);
    }

    function chatCompose(subject, data) {
        if (!chatUnlocked && subject == "unknown") {
            return composeChatLock();
        }
        console.log("composing ", subject, "'s chat");
        $(".chat-messages").addClass(subject);
        //loop through message elements
        data.messages.forEach( message => {
            const msg = document.createElement('p');
            msg.setAttribute('class', 'message');
            msg.innerText = message.contents;
            const msgBubble = document.createElement('div');
            msgBubble.setAttribute('class', message.class);
            msgBubble.appendChild(msg);
            $(".chat-messages." + subject).append(msgBubble);
        })
        if (subject == "claire") {
                //attach a read receipt to the last message i sent
                //in the chat if the chat is with Claire
                let deliveredReceipt = document.createElement("p");
                deliveredReceipt.setAttribute("id", "read-receipt");
                deliveredReceipt.innerText = "Read";
                let lastMsg = document.querySelector(".chat-messages.claire").lastChild;
                lastMsg.lastChild.append(deliveredReceipt);
        }
    }
    function composeNotesLock() {
        const lockDiv = document.createElement("div")
        lockDiv.setAttribute("id", "notes-lock-div");
        lockDiv.innerText = "THIS APP HAS BEEN LOCKED BY THE ADMIN. ERRCD: INFO LEAK";
        const lockInput = document.createElement('input');
        lockInput.setAttribute("type", "input");
        lockInput.setAttribute("id", "notes-lock-input");
        lockInput.setAttribute("placeholder", "ENTER PASSWORD");
        const lockButton = document.createElement("button");
        lockButton.setAttribute("id", "notes-lock-button");
        lockButton.innerText = "unlock";
        lockDiv.append(lockInput);
        lockDiv.append(lockButton);
        $(".container.notesicon").append(lockDiv);
    }
})

// ------------------ notes and reference
//
//
/*
var fruits = ["apple", "orange", "cherry"];
fruits.forEach(myFunction);

function myFunction(item, index) {
  document.getElementById("demo").innerHTML += index + ":" + item + "<br>";
}

//   $(this).siblings(".chat-tab-active").find(".chat-tab-active").removeClass("chat-tab-active").addClass("chat-ta");
/*
					const userLabel = document.createElement('p')
					userLabel.setAttribute('class', 'userlabel')
                    userLabel.innerText = image.imageUploader
                   */