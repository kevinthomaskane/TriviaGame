var questions =
            [{ Q: "What color is the sky?", options: ["Red", "Blue", "Green", "Blue"], A: "Blue" }, { Q: "Spinach is high in which mineral?", options: ["Fiber", "Potassium", "Iron", "Calcium"], A: "Iron" }, { Q: "Who was the first president of the US?", options: ["George Washington", "Thomas Jefferson", "Abe Lincoln", "James Madison"], A: "George Washington" }, { Q: "Which fictional city is the home of Batman?", options: ["Grantham City", "Washington DC", "NYC", "Gotham City"], A: "Gotham City" }, { Q: "Which type of dog has breeds called Scottish, Welsh and Irish?", options: ["Rotweiler", "Terrier", "Poodle", "German Shephard"], A: "Terrier" }, { Q: "Babe Ruth is associated with which sport?", options: ["Baseball", "Basketball", "Football", "Hockey"], A: "Baseball" }]
        var compChoice = [];
        var userChoice = [];
        var wins = parseInt(0);
        var losses = parseInt(0);
        var number = 15;
        var intervalId;
        var currentButton;
        var runs = parseInt(0);
        $("button").attr("disabled", false)

        $(document).on("click", "#start", function (event) {
            event.preventDefault();
            compChoose();
            writeChoices(compChoice[0].options);
            run();
            $("#start").hide();

        })


        function compChoose() {
            var choice = questions[Math.floor(Math.random() * questions.length)];
            var current = questions.indexOf(choice);
            questions.splice(current, 1)
            compChoice.push(choice);
            $("#question").append(choice.Q)
            runs++
            console.log(runs)

        }
        function writeChoices(arr) {
            for (let i = 0; i < arr.length; i++) {
                $("#answers").append(`<button type="button" class="btn btn-default btn-lg btn-block answers">${arr[i]}</button>`)
            }

        }
        function run() {
            $("#counter").html(`<h2> ${number} </h2>`);
            clearInterval(intervalId);
            intervalId = setInterval(decrement, 1000);
        }
        function decrement() {
            number--;
            $("#counter").html(`<h2> ${number} </h2>`);
            if (number === 0 && runs < 3) {
                losses++;
                console.log(losses)
                stop();
                $("button").attr("disabled", true)
                $("#answers").append(`<h3>The answer was ${compChoice[0].A}</h3>`)
                setTimeout(nextQuestion, 3000);
            }
            if (number === 0 && runs === 3) {
                checkWin();
            }

            if (number <= 5) {
                $("h2").addClass("red");

            }

        }
        function stop() {
            clearInterval(intervalId);
        }

        $(document).on("click", ".answers", function (event) {
            event.preventDefault();
            userChoice.push($(this).html())
            currentButton = $(this);
            $("button").attr("disabled", true)
            checkWin();
        })

        $(document).on("click", ".restart", function (event) {
            event.preventDefault();
            questions =
                [{ Q: "What color is the sky?", options: ["Red", "Blue", "Green", "Blue"], A: "Blue" }, { Q: "Spinach is high in which mineral?", options: ["Fiber", "Potassium", "Iron", "Calcium"], A: "Iron" }, { Q: "Who was the first president of the US?", options: ["George Washington", "Thomas Jefferson", "Abe Lincoln", "James Madison"], A: "George Washington" }, { Q: "Which fictional city is the home of Batman?", options: ["Grantham City", "Washington DC", "NYC", "Gotham City"], A: "Gotham City" }, { Q: "Which type of dog has breeds called Scottish, Welsh and Irish?", options: ["Rotweiler", "Terrier", "Poodle", "German Shephard"], A: "Terrier" }, { Q: "Babe Ruth is associated with which sport?", options: ["Baseball", "Basketball", "Football", "Hockey"], A: "Baseball" }]
            compChoice = [];
            userChoice = [];
            number = 15;
            intervalId;
            wins = parseInt(0);
            losses = parseInt(0);
            runs = parseInt(0);
            $("#counter").html('')
            $("#answers").html('')
            $("#question").html('')
            $("#Score").html('')
            compChoose();
            writeChoices(compChoice[0].options);
            run();
        })


        function nextQuestion() {
            compChoice = [];
            userChoice = [];
            number = 15;
            intervalId;
            $("#counter").html('')
            $("#answers").html('')
            $("#question").html('')
            $("#Score").html('')
            compChoose();
            writeChoices(compChoice[0].options);
            run();
        }

        function checkWin() {
            if (userChoice[0] === compChoice[0].A && runs < 3) {
                wins++
                clearInterval(intervalId);
                currentButton.append(`<h3 class="bg-success">Correct</h3>`)
                setTimeout(nextQuestion, 3000);
            }
            if (userChoice[0] !== compChoice[0].A && runs < 3) {
                losses++
                clearInterval(intervalId);
                currentButton.append(`<h3 class="bg-danger">Incorrect the answer was ${compChoice[0].A}</h3>`)
                setTimeout(nextQuestion, 3000);
            }
            while (runs === 3) {
                if (userChoice[0] !== compChoice[0].A && number !== 0) {
                    losses++
                    clearInterval(intervalId);
                    currentButton.append(`<h3 class="bg-danger">Incorrect the answer was ${compChoice[0].A}</h3>`)
                }
                if (userChoice[0] === compChoice[0].A) {
                    wins++
                    clearInterval(intervalId);

                    currentButton.append(`<h3 class="bg-success">Correct</h3>`)
                }
                if (number === 0) {
                    losses++
                    clearInterval(intervalId);
                    $("#answers").append(`<h3 class="bg-danger">The answer was ${compChoice[0].A}</h3>`)
                    $("button").attr("disabled", true)
                }
                setTimeout(showScore, 3000)
                break
            }
        }

        function showScore() {
            clearInterval(intervalId);
            $("#counter").html('')
            $("#answers").html('')
            $("#question").html('')
            console.log(wins)
            console.log(losses)
            $("#Score").html(`<h2> you answered ${wins} correct and ${losses} incorrect</h2>`)
            $("#start").attr({ disabled: false, class: "restart btn btn-success" })
            $("#start").html("restart").show();
        }
