/*
 * Create a list that holds all of your cards
 */
const classesarray = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];




// Shuffle function from http://stackoverflow.com/a/2450976





function shuffle(array) {//to shuffle cards 
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function generateCards() {// to generate cards and add it to html file

    const htmlarray = []
    for (const clas of classesarray) {
        htmlarray.push(`<li class="card"><i class="fa ${clas}"></i></li>`);
    }

    const shuffledarray = shuffle(htmlarray);

    for (const el of shuffledarray) {
        document.getElementsByClassName('deck')[0].insertAdjacentHTML('beforeend', el);

    }
}


window.onload = generateCards();


let cards = document.getElementsByClassName('card');
let freeze = document.getElementsByClassName('deck');

arrcards = [];
opencards = [];
let count_opencards = 0;
let count = 0;

for (const card of cards) {// loop to add even listener to every card

    card.addEventListener('click', function () {

        if (!card.classList.contains('show') || !card.classList.contains('open')) {

            card.classList.add('open');
            card.classList.add('show');

            arrcards.push(card);
            if (arrcards.length == 2) {

                freeze[0].classList.add("freeze");

                setTimeout(function () {
                    ifmatch(arrcards);
                    arrcards = [];
                }, 500);

                setTimeout(function () {

                    freeze[0].classList.remove("freeze");

                }, 1000);
            }


        }


    });

}

// function to sheck if the cards mach each other or not, to add to open card and to trigger pop-up when the game in the end
function ifmatch(arrcards) {

    let l = arrcards[0].getElementsByTagName('i');
    let l2 = arrcards[1].getElementsByTagName('i');

    for (const c of classesarray) {

        if (l[0].classList.contains(c))
            if (l2[0].classList.contains(c)) {

                count_opencards = count_opencards + 2;
                counter(count += 1);

                arrcards[0].classList.add('match');
                arrcards[1].classList.add('match');

                for (let arrc of arrcards) {
                    opencards.push(arrc);
                }

                if (count_opencards == 16) {

                    let numstars = document.getElementsByClassName('fa-star');
                    numstars = [...numstars];


                    swal({
                        title: "Congratulations!",
                        text: `you won! with ${count} Moves and ${numstars.length} stars.`,
                        icon: "success",
                        button: "play again?",
                    });
                }
                arrcards = [];

                return true;

            } else {

                for (let arrcard of arrcards) {
                    arrcard.classList.remove('open');
                    arrcard.classList.remove('show');
                    arrcard.classList.add('unmatch');

                }
                setTimeout(function () {
                    counter(count += 1 / 2);
                    arrcards[0].classList.remove('unmatch');
                    arrcards[1].classList.remove('unmatch');
                }, 500);

            }
    }

}



/* to restart the game by reloading to start everything from the beginning*/
let restart = document.getElementsByClassName('fa-repeat')[0];

restart.addEventListener('click', function () {

    document.location.reload(true);
})

/* function to count the number of moves */

function counter(count) {

    document.getElementsByClassName('moves')[0].innerHTML = count;

    star_rating(count);


}


function star_rating(count) {

    let star = document.getElementsByClassName('fa-star');
    star = [...star];


    if (count == 8) {

        star[2].classList.remove('fa-star');

        star[2].classList.add('fa-star-o');
    }

    if (count == 12) {

        star[1].classList.remove('fa-star');

        star[1].classList.add('fa-star-o');
    }

    if (count == 15) {

        star[0].classList.remove('fa-star');

        star[0].classList.add('fa-star-o');
    }



}

isFirstClick = true;
document.getElementsByClassName('deck')[0].addEventListener('click', function(){
	// check whether this is the first click
	if (isFirstClick) {
		// we set the flag here to false to block it from starting the timer again on upcoming clicks, we simply indicate that the next clicks are not the first click.
		isFirstClick = false 
		// then we start the timer
		start_timer()
	}
})

function start_timer() {


    if (true) {
        var timer = document.getElementById("my_timer").innerHTML;
        var arr = timer.split(":");
        var min = arr[0];
        var sec = arr[1];
  
        if (sec == 59) {
                min++;
            
            if (min < 10) min = "0" + min;
            sec = 0;
        } else {
            sec++;
            if (sec < 10) sec = "0" + sec;
        }
  
        document.getElementById("my_timer").innerHTML = min + ":" + sec;
        setTimeout(start_timer, 1000);
    }
  }



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
