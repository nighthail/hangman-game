let passedGuesses = ""
let correctGuesses = ""
let tries = 0
let pickedWord = ""
let tempword = pickedWord
let underScore = "-"


import { hangmanWords } from "./wordlist.js"

//lägg detta i highscore.js och gör om den till en klass som sparar både namn och highscore


class User {
  constructor(name, score) {
    this.name = name;
    this.score = score;
    localStorage.setItem(name, score)
  }
}


function getUser() {
  let user = prompt("Please enter your name", "Harry Potter");
  if (user == null || user == "") {
    user = "Anonymous"
  }
  user = new User(user, 0)
  document.getElementById("currentUser").innerText = user.name
  document.getElementById("currentScore").innerText = user.score

}
getUser()
//

getRandomWord()

function getRandomWord() { // RANDOMIZAR ett ord ur en lista av ord
  let wordList = hangmanWords
  const words = wordList.split(' ')
  let NUMB = Math.floor(Math.random() * 7)
  pickedWord = words[NUMB]
  tempword = pickedWord
  genclue(pickedWord)
}


function genclue() {
  for (let index = 1; index < pickedWord.length; index++) { // genererar ledtråd
    underScore += "-"
    document.getElementById("word").innerText = underScore

  }

}


document.getElementById("submit").onclick = function submit() {
  let guess = document.getElementById("guessbox").value.toUpperCase() // tar in den gissade bokstaven
  if (guess == '') {
    return
  } else {
    compareWords(guess)
  }
}

function compareWords(guessedword) {
  // if som räknar antalet försök
  if (tries > 5) {
    alert("You lost :( The word was: " + pickedWord)
  }
  else {


    if (guessedword.length == 1) {// ser till att det bara finns en bokstav

      if (pickedWord.includes(guessedword) && !correctGuesses.includes(guessedword)) { // Kollar att gissningen är rätt och inte upprepad
        correctGuesses = correctGuesses + guessedword
        let recuringLetter = pickedWord.split(guessedword).length - 1 // ta fram antalet ggr bokstaven förekommer



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
          alert("Congrats!")
          // Om du vinner
          winTracker()

        }


      }

      else if (correctGuesses.includes(guessedword)) { // Om du upprepar samma bokstav
        alert("You need to pick a new letter")
      }

      else {
        passedGuesses = passedGuesses + guessedword
        document.getElementById("guesses").innerText = "  " + passedGuesses
        tries = tries + 1
        document.getElementById("tries").innerText = tries + "/5"
        document.getElementById("hangmanImage").style.content = "url('img/" + tries + ".png')"
      }
    }
    else if (guessedword == pickedWord || completeGuess == pickedWord) {
      alert("Congrats!")
      document.getElementById("word").innerText = pickedWord
      // Om du vinner
      winTracker()

    }
    else { // BER DIG ANVÄNDA ENBART ETT ORD
      alert("Only one letter allowed at a time!")
    }
  }
}

function winTracker() {
  userScore += 1
}