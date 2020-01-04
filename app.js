  /*
  LonelySim by Chase Heidebur - 2020
  Escape the UI game
  */

$(document).ready(function() {
    var linksData = [];

    var notesData = [{
        notesTitle: "this note",
        notesText: "every day is exactly the same. every day is exactly the same. every day is exactly the same. every day is exactly the same. every day is exactly the same, but some days aren't. Read the third note."
    }, {
        notesTitle: "cold showers",
        notesText: "I've been eating too many sweets lately, but then again, who's going to judge? If I want a piece of dark chocolate after spending an hour at the DMV, then I will have it."
    }, {
        notesTitle: "inspiration",
        notesText: "is it healthy to run only on inspiration and nothing else? sometimes it sure does feel like I need some guidance. or energy. i can only drink so much iced coffee before I explode. HEY LOSER IT'S JAMES. I FIGURED IT OUT - JUST DELETE ALL YOUR CONTACTS. Apparently the simulation thinks you need new friends."
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
            contents: "no, you wrote some code thing. and what the hell? You are literally so rude. I only forget things sometimes. Reply when you get this."
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

    //reset game or play again
    $(".play-again").click( e => {
        resetGame();
    })
    $("#game-reset").click( e => {
        resetGame();
    })
    function resetGame() {
        window.location.reload();
    }
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
            if (seconds <= -1) {
                //turn off the interval at 0
                clearInterval();
                return loseGame();
            }
        timer.innerText = seconds--;
        }, 1000);
    }
    function loseGame() {
        $("#timer").fadeOut( e => {
            console.log("hi");
            $("#losegame-modal").fadeIn();
        })
    }
    //nav functionality
    $(".nav-icon").click( e => {
        //flash effect
        $("#content-flash").fadeIn(100, function(e) {
            $(this).fadeOut(200, afterFlash());
        })
        function afterFlash() {
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

            //this line fades the desired content in.
            //everything is hidden by default except the chat, which is the first screen
            $("." + thisIcon).fadeIn();
        }
    })

    //link functionality
    function composeLinks(links) {
        links.forEach( link => {
            composeLink(link)
        })
    }
    function composeLink(link) {
        let linkCard = document.createElement("div");
            linkCard.setAttribute("class", "link-card");
            let linkTitle = document.createElement("h4");
            linkTitle.setAttribute("class", "link-title clearnet-link");
            linkTitle.innerText = link.linksTitle;
            let linkText = document.createElement("p");
            linkText.setAttribute("class", "link-text clearnet-link");
            linkText.innerText = link.linksText;
            let linkDel = document.createElement("button");
            linkDel.setAttribute("class", "link-del");
            linkDel.setAttribute("name", link.id);
            linkCard.setAttribute("id", link.id);
            let linkAnchor = document.createElement("a");            
            linkAnchor.setAttribute("href", ("http://" + link.linksURI));
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
    //disable clearnet links
    $(".clearnet-link").click( function(e) {
        $("#forbidden").show();
        console.log("clearnet link clicked! escape attempt logged");
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
    $("#links-nav").click( e => {
        $(".link-editor-grouper").fadeIn();
    })
    //close link editor
    $(".link-editor-grouper-close").click( e => {
        $(".link-editor-grouper").fadeOut();
    })
    //save link
    $(".link-editor-save-btn").click( function(e) {
        let linkName = $("#l-name").val();
        let linkURI = $("#l-URI").val();
        let linkNote = $("#l-note").val();
        //validate inputs to check for data
        if (!linkName || !linkURI || !linkNote) {
            $("#error-p").remove();
            console.log("no values for link");
            let errorP = document.createElement("p");
            errorP.setAttribute("id", "error-p");
            errorP.setAttribute("color", "red");
            errorP.innerText = "Please enter values for each input.";
            let linkContainer = document.getElementsByClassName("link-editor-container")[0];
            linkContainer.append(errorP);
            return;
        }
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
        //reset values
        $("#l-name").val("");
        $("#l-URI").val("");
        $("#l-note").val("");
        //compose the links
        composeLink(linkObj);
    })

    //open note editor
    $("#notes-nav").click( e => {
        $(".note-editor-grouper").fadeIn();
    })
    //close note editor
    $(".note-editor-grouper-close").click( e => {
        $(".note-editor-grouper").fadeOut();
    })
    //save new note
    $(".note-editor-save-btn").click( e => {
        let noteName = $("#n-name").val();
        let noteContents = $("#n-contents").val();
        //create and append an error msg if no values
        if (!noteName || !noteContents) {
            $("#error-p").remove();
            console.log("no values for link");
            let errorP = document.createElement("p");
            errorP.setAttribute("id", "error-p");
            errorP.setAttribute("color", "red");
            errorP.innerText = "Please enter values for each input.";
            let linkContainer = document.getElementsByClassName("note-editor-container")[0];
            linkContainer.append(errorP);
            return;
        }
        //assign delete buttons and container divs an ID to delete a note
        let uniqueId = Math.floor(1000 + Math.random() * 9000);

        let notesGrouper = document.createElement("div");
        notesGrouper.setAttribute("class", "notes-ui notes-grouper");
        notesGrouper.setAttribute("id", uniqueId);

        let noteCard = document.createElement("div");
        noteCard.setAttribute("class", "note-card");

        let noteDelete = document.createElement("p");
        noteDelete.setAttribute("class", "note-delete");
        noteDelete.setAttribute("name", uniqueId);
        noteDelete.innerText = "✖️";

        let noteTitle = document.createElement("h4");
        noteTitle.setAttribute("class", "note-title");
        noteTitle.innerText = noteName;
        let noteText = document.createElement("p");
        noteText.setAttribute("class", "note-text");
        noteText.innerText = noteContents;
        noteCard.append(noteDelete);
        noteCard.append(noteTitle);
        noteCard.append(noteText);
        notesGrouper.append(noteCard);
        let notesContainer = document.getElementsByClassName("notesicon")[0];
        notesContainer.append(notesGrouper);
        $(".note-editor-grouper").fadeOut();
        
        //reset values
        $("#n-name").val("");
        $("#n-contents").val("");

        //push note into notes object
        let newNote = {
            notesTitle: noteName,
            notesText: noteContents
        }
        notesData.push(newNote);
    })
    //delete note
    $(".container.notesicon").click( function(e) {
        if (e.target.className == "note-delete") {
            let noteId = e.target.getAttribute("name");
            console.log(e.target);
            console.log("delete note id ", noteId);
            $("#" + noteId).remove();
        }
    })
    //chat box functionality
    $("#chat-send").click( e => {
        e.preventDefault();
        const thisPerson = e.target.className;
        console.log("chat send");
        let msgContent = $("#chat-text-input").val();
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
            let lockDiv = document.getElementById("lock-div");
            lockDiv.innerText = "INCORRECT PASSWORD";
        }
    }

    //contacts functionality
    $(".delete-contact").click(function(e) {

        let thisContact = e.target.getAttribute("name");
        console.log("deleting ", thisContact);
        $("#" + thisContact).fadeOut(400, function(e) {

            $(this).remove();

            //if there are <=5 child nodes, all contacts are gone, and usr winz
            var contacts = document.getElementsByClassName("container contactsicon")[0];
            if (contacts.childNodes.length <= 5) {
                let time = document.getElementById("timer-sec").innerText;
                console.log("time is ", time)
                console.log("No more contacts remain - finished the game in ", time, "seconds.");
                endGame(time);
            }
        })
    })
    //endgame functionality
    function endGame(gameTime) {
        $("#timer").fadeOut(400, function(e) {
            let winTimeCounter = document.getElementById("win-time");
            winTimeCounter.innerText = gameTime;
            $("#endgame-modal").fadeIn();
        });
        
    }
    //notes functionality
    //open note window
    $(".container.notesicon").click(function(e) {
        if (e.target.className == "expand-note") {
            //grab full note contents
            let noteId = e.target.getAttribute("note-id");
            console.log("expanding note id", noteId);
            let note = document.getElementById(noteId);
            let noteText = note.getAttribute("full-note-text");
            let noteTitle = note.getAttribute("note-title");

            //append contents to note window
            let noteWindowTitle = document.getElementById("notes-window-title");
            noteWindowTitle.innerText = noteTitle;
            let noteWindowP = document.getElementById("notes-window-content");
            noteWindowP.innerText = noteText;

            //show note window
            $("#notes-window-grouper").fadeIn();
        }
    })
    //close note window
    $("#close-notes-window").click( e => {
        $("#notes-window-grouper").fadeOut();
    })
    function unlockNotes() {
        let pwTry = document.getElementById("notes-lock-input").value;
        if (pwTry == "freeme7") {
            notesUnlocked = true;
            $("#notes-lock-div").fadeOut( function() {
                $(".notes-ui").css("display", "inline-block");
                //generate notes from notesData object
                notesCompose(notesData);
            })
        } else {
            $("#error-p").remove();
            let errorP = document.createElement("p");
            errorP.setAttribute("id", "error-p");
            errorP.setAttribute("color", "red");
            errorP.innerText = "Incorrect password";
            let unlockDiv = document.getElementById("notes-lock-div");
            unlockDiv.append(errorP);
        }
    }      
    function shortenNote(note) {
        if (note.length > 85) 
            return note.substring(0,100) + "...";
        else
            return note;
    }
    function notesCompose(notes) {
        notes.forEach( note => {
            //assign delete buttons and container divs an ID to delete a note
            let uniqueId = Math.floor(1000 + Math.random() * 9000);

            //shorten the note with ShortenNote and store result in variable;
            let shortenedNote = shortenNote(note.notesText);
            console.log(" shortened note is ", shortenedNote)

            //notesGrouper is the container everything
            let notesGrouper = document.createElement("div");
            notesGrouper.setAttribute("class", "notes-ui notes-grouper");
            notesGrouper.setAttribute("id", uniqueId);

            //noteCard is another container to help me position more granularly;
            let noteCard = document.createElement("div");
            noteCard.setAttribute("class", "note-card");
            
            //then with the actual contents, starting with the delete button
            let noteDelete = document.createElement("p");
            noteDelete.setAttribute("class", "note-delete");
            noteDelete.setAttribute("name", uniqueId);
            noteDelete.innerText = "✖️";

            let noteTitle = document.createElement("h4");
            noteTitle.setAttribute("class", "note-title");
            let noteText = document.createElement("p");
            noteText.setAttribute("class", "note-text");
            let expandNote = document.createElement("a");
            expandNote.setAttribute("note-id", uniqueId);
            expandNote.setAttribute("class", "expand-note");
            expandNote.innerText = "read more";
            noteTitle.innerText = note.notesTitle;
            noteText.innerText = shortenedNote;

            //store the non-shortened note in a hidden value for expansion
            notesGrouper.setAttribute("note-title", note.notesTitle);
            notesGrouper.setAttribute("full-note-text", note.notesText);

            //compile the created elements
            noteCard.append(noteDelete);
            noteCard.append(noteTitle);
            noteCard.append(noteText);
            noteCard.append(expandNote);
            notesGrouper.append(noteCard);
            $(".container.notesicon").append(notesGrouper);
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
    //compose divs with chat object and display them
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