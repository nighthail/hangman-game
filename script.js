
let passedGuesses = ""
let correctGuesses = ""
let tries = 0
let pickedWord = ""
let tempword = pickedWord
let underScore = "_"

let user = ''

import { hangmanWords } from "./wordlist.js"

// lägg detta i highscore.js och gör om den till en klass som sparar både namn och highscore
// Bugg: sätter rätt bokstav som felaktig

class Player {
  constructor(name, score) {
    this.name = name;
    this.score = score;
    localStorage.setItem(name, score)
  }
}


function getUser() {
  user = prompt("Please enter your name", "Harry Potter")
  if (user == null || user == "") {
    let anonNum = Math.floor(100 + Math.random() * 900)
    user = "Anonymous" + anonNum
  }
  user = new Player(user, 0)
  document.getElementById("currentUser").innerText = user.name
  userScoreUpdate(user.score)
}
getUser()
//

getRandomWord()

function getRandomWord() { // RANDOMIZAR ett ord ur en lista av ord
  let wordList = hangmanWords
  const words = wordList.split(' ')
  let NUMB = Math.floor(Math.random() * 7)
  pickedWord = 'BENJAMIN'//words[NUMB] (Temporary word for debug purposes)
  tempword = pickedWord
  genclue(pickedWord)
}


function genclue() {
  for (let index = 1; index < pickedWord.length; index++) { // genererar ledtråd
    underScore += "_"
    document.getElementById("word").innerText = underScore
  }
}


document.getElementById("submit").onclick = function submit() {
  let guess = document.getElementById("guessbox").value.toUpperCase() // tar in den gissade bokstaven
  document.getElementById("guessbox").value = ''
  if (guess == '') {
    return
  } else {
    compareWords(guess)
  }
}

function compareWords(guessedword) {
  // if som räknar antalet försök
  if (tries > 1) {
    alert("You lost :( The word was: " + pickedWord)
    let user = document.getElementById("currentUser").innerText
    let score = document.getElementById("currentScore").innerText
    document.getElementById("highscore").innerHTML = user + " : " + score
    //localStorage.setItem(highscore, name + " : " + score)

  }
  else {
    if (guessedword.length == 1) {// ser till att det bara finns en bokstav

      if (pickedWord.includes(guessedword) && !correctGuesses.includes(guessedword)) { // Kollar att gissningen är rätt och inte upprepad
        correctGuesses = correctGuesses + guessedword
        let recuringLetter = pickedWord.split(guessedword).length - 1 // ta fram antalet ggr bokstaven förekommer

        user.score += 10
        userScoreUpdate(user.score)

        // For loop som kollar att bokstaven ersätts på ALLA ställen
        for (let index = 0; index < recuringLetter; index++) {
          let placement = tempword.indexOf(guessedword) + 1
          tempword = pickedWord.replace(guessedword, " ")
          let before = underScore.slice(0, placement - 1)
          let after = underScore.slice(placement)
          underScore = before + guessedword + after

        }

        document.getElementById("word").innerText = underScore

        if (document.getElementById("word").innerText == pickedWord) {
          alert("Congrats! The correct word was " + pickedWord)
          // Om du vinner
          user.score += 50
          userScoreUpdate(user.score)
          return
        }

        return

      }

      if (passedGuesses.includes(guessedword)) { // Om du upprepar samma bokstav
        alert("You need to pick a new letter")
        return
      }

      else {
        passedGuesses = passedGuesses + guessedword
        document.getElementById("guesses").innerText = "  " + passedGuesses
        tries = tries + 1
        document.getElementById("tries").innerText = tries + "/5"
        document.getElementById("hangmanImage").style.content = "url('img/" + tries + ".png')"
        //console.log(user.score)
        user.score -= 5
        userScoreUpdate(user.score)

      }
    }
    else if (guessedword == pickedWord) {
      alert("Congrats! The correct word was " + pickedWord)
      document.getElementById("word").innerText = pickedWord
      user.score += 100
      userScoreUpdate(user.score)

      // Om du vinner
      winTracker()

    }
    else { // BER DIG ANVÄNDA ENBART ETT ORD
      alert("Only one letter allowed at a time!")
    }
  }
}

function winTracker() {
  // något som håller reda på score under spelandet och laddar om med nytt ord utan att fråga om ny användare.
  getRandomWord()
}

function userScoreUpdate(score) {
  document.getElementById("currentScore").innerText = score
}

