// Initialize variables
var questionCount = 0, correctAnswers = 0, incorrectAnswers = 0, unanswered = 0, countdown = 13;
var correct = false;
$('.results').hide();
$('#multipleChoice').hide();

// Create trivia object to hold questions
// ==================================================
var trivia = {
	"questions" : [
		{
			"question" : "Who is the queen of Naboo in Episode I: The Phantom Menace?",
			"answer" : "Padme Amidala",
			"multipleChoice" : [
				"Padme Amidala", "Yoda", "Princess Leia", "Jar Jar Binks", "Senetor Palpatine"
			]
		},
		{
			"question" : "Who is revealed in Episode I to have built C-3PO?",
			"answer" : "Anakin Skywalker",
			"multipleChoice" : [
				"Qui-Gon Jinn", "Obi-Wan Kenobi", "Anakin Skywalker", "Yoda", "Luke Skywalker"
			]
		},
		{
			"question" : "Which arm of Anakin’s does Count Dooku cut off? ",
			"answer" : "Right",
			"multipleChoice" : [
				"Left", "Both", "None", "Right", "Right Leg"
			]
		},
		{
			"question" : "What is the name of the order Darth Sidious gives the clone troopers, which means they will kill all Jedi?",
			"answer" : "Order 66",
			"multipleChoice" : [
				"Order 99", "Order 66", "Order 55", "Route 66", "Order 666"
			]
		},
		{
			"question" : "In what substance is Han Solo frozen for delivery to Jabba the Hutt?",
			"answer" : "Carbonite",
			"multipleChoice" : [
				"Gold", "Methane", "H2O", "Oxygen", "Carbonite"
			]
		},
		{
			"question" : "What year was Return of the Jedi released?",
			"answer" : "1983",
			"multipleChoice" : [
				"1979", "1981", "1983", "1993", "1986"
			]
		},
		{
			"question" : "What planet is the second Death Star orbiting in Return of the Jedi",
			"answer" : "Endor",
			"multipleChoice" : [
				"Endor", "Hoth", "Yavin IV", "Kashyyyk", "Kamino"
			]
		},
		{
			"question" : "Who serves as the genetic template for the Republic’s clone army?",
			"answer" : "Jango Fett",
			"multipleChoice" : [
				"Qui-Gon Jinn", "Yoda", "Obi-Wan Kenobi", "Jango Fett", "Boba Fett"
			]
		},
		{
			"question" : "Where does Luke go for training from the legendary Jedi Master, Yoda?",
			"answer" : " Dagobah",
			"multipleChoice" : [
				"Coruscant", "Tatooine", "Endor", "Kamino", " Dagobah"
			]
		},
		{
			"question" : "What’s Poe Dameron’s droid called?",
			"answer" : "BB-8",
			"multipleChoice" : [
				"C-3PO", "BB-8", "R2-D2", "AZI-3", "2-1B"
			]
		}
	]
}
		

// Function to display results at the end of the game
// ==================================================
function results () {
	
	$('#triviaQuestion').hide();
	$('.choices').hide();
	$('.results').show();
	$('#correct').html("Correctly Answered " + correctAnswers);
	$('#wrong').html("Wrongly Answered " + incorrectAnswers);
	$('#unanswered').html("Unanswered " + unanswered);


	}	

// Function to start game
// ==================================================
function start() {

	//Ask First Question
	askQuestion(questionCount);
	//console.log(trivia.questions[questionCount].question);

	counter = setInterval(countDownToNextQuestion,1000);
	
}




// Function to display questions
// ==================================================
function askQuestion(questionCount) {
	countdown = 13;
	$('#multipleChoice').show();
	if( questionCount < 10 ) {
		console.log(trivia.questions[questionCount].question);
		$('#triviaQuestion').html(trivia.questions[questionCount].question);

		//Display multiple choices
		$('#a').html(trivia.questions[questionCount].multipleChoice[0]);
		$('#b').html(trivia.questions[questionCount].multipleChoice[1]);
		$('#c').html(trivia.questions[questionCount].multipleChoice[2]);
		$('#d').html(trivia.questions[questionCount].multipleChoice[3]);
		$('#e').html(trivia.questions[questionCount].multipleChoice[4]);
	}

	else {
		clearInterval(counter);
		results();
	}
}


// Function to check of answer to question is correct
// ==================================================
function checkIfCorrect(guessed) {
	if( guessed === trivia.questions[questionCount].answer) {
		return true;
	}

	else {
		return false;
	}
}

// Button Listener to start the game
$('.startButton').on('click', function(){
		$('.startButton').hide();
		questionCount = 0, correctAnswers = 0, incorrectAnswers = 0, unanswered = 0, countdown = 13;

		start();
});

//Button listener to listen for answers
$('.list-group-item').on('click', function(){

	if (checkIfCorrect($(this).html()) === true) {
		correctAnswers++;
		console.log(" # of Correct Answers: " + correctAnswers);
		questionCount++;
		askQuestion(questionCount);
	}

	else if (checkIfCorrect($(this).html()) === false){
		incorrectAnswers++;
		console.log(" # of Incorrect Answers: " + incorrectAnswers);
		questionCount++;
		askQuestion(questionCount);
	}
});


// Function to time each question until next question
// ==================================================
function countDownToNextQuestion() {
	countdown--;

	// Show the countdown in the #show-countdown tag.
    $('#showCountDown').html('<h4>Time Remaining: ' + countdown + ' seconds</h4>');

    // Once countdown hits zero...
    if (countdown === 0){

        // stop countdown.
        clearInterval(counter);

        // Alert the user that time is up.
        unanswered++;
        console.log(" # of Unanswered: " + unanswered);
        console.log('Time Up!')

        // Update question count
        questionCount++;

        // If all questions, have been asked, display results
        if ( questionCount == 10 ) {
        	clearInterval(counter);
        	results();
        }

        else {
	       	// go to next question
	        askQuestion(questionCount);

	        // Update counter
	        countdown = 13;

	        // Countdown to 0
	        counter = setInterval(countDownToNextQuestion,1000);
        }

       

    }
}