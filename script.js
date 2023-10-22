document.addEventListener("DOMContentLoaded", function() {
    // Sample data for questions
    const questions = [
        {
            query: "select *\nfrom table\nwhere value < ___",
            choices: ["50", "60", "80", "90"],
            correct: "60",
            tableData: [
                {name: "A", value: 40, highlight: true},
                {name: "B", value: 50, highlight: true},
                {name: "C", value: 70, highlight: false},
                {name: "D", value: 80, highlight: false}
            ]
        },
        {
            query: "select *\nfrom table\nwhere value < ___",
            choices: ["20", "25", "30", "35"],
            correct: "35",
            tableData: [
                {name: "A", value: 20, highlight: true},
                {name: "B", value: 25, highlight: true},
                {name: "C", value: 30, highlight: true},
                {name: "D", value: 35, highlight: false}
            ]
        }
        // ... other questions ...
    ];    

    let currentQuestionIndex = 0;

    const nextBtn = document.getElementById("nextBtn");
    // const questionElem = document.querySelector(".sql-query");
    const choicesElem = document.querySelector(".choices"); // Assuming you have a container for choices

    function displayQuestion(index) {
        const question = questions[index];
        
        // Update the query
        const questionElem = document.querySelector(".sql-query");
        questionElem.innerHTML = question.query.replace("___", '<span class="blank">___</span>');
        //questionElem.textContent = question.query;
        
        // Update the choices (you might need to modify this based on your HTML structure)
        choicesElem.innerHTML = ""; // Clear previous choices
        question.choices.forEach(choice => {
            const btn = document.createElement("button");
            btn.textContent = choice;
            btn.addEventListener("click", function() {
                //onAnswerSelected(choice === question.correct);
                checkAnswer(choice, question.correct);
            });
            choicesElem.appendChild(btn);
        });

        // Update the table
        const tableBody = document.querySelector("tbody");
        tableBody.innerHTML = ""; // Clear previous rows
        question.tableData.forEach(row => {
            const tr = document.createElement("tr");
            if (row.highlight) {
                tr.classList.add("highlight");
            }
            tr.innerHTML = `
                <td>${row.name}</td>
                <td>${row.value}</td>
            `;
            tableBody.appendChild(tr);
        });
    }

    function lockChoices() {
        const choiceButtons = document.querySelectorAll(".choices button");
        choiceButtons.forEach(button => {
            button.setAttribute('disabled', true);
        });
    }
    
    function unlockChoices() {
        const choiceButtons = document.querySelectorAll(".choices button");
        choiceButtons.forEach(button => {
            button.removeAttribute('disabled');
        });
    }    

    function checkAnswer(selectedChoice, correctChoice) {
        const sqlElement = document.querySelector(".sql-query");
        
        // Replace the blank with the selected choice
        sqlElement.innerHTML 
        = sqlElement.innerHTML.replace('<span class="blank">___</span>', `<span class="selected">${selectedChoice}</span>`);
        
        const feedback = document.querySelector('.feedback');
        if (selectedChoice === correctChoice) {
            feedback.textContent = 'Correct!';
            feedback.style.color = 'green';
        } else {
            feedback.textContent = `Incorrect. The correct answer is ${correctChoice}.`;
            feedback.style.color = 'red';
        }
        feedback.removeAttribute('hidden');
    
        // Show the next button
        document.getElementById("nextBtn").removeAttribute('hidden');

        lockChoices();
    }    

    nextBtn.addEventListener("click", function() {
        // Increment the question index
        currentQuestionIndex++;
        
        // If there's another question, display it
        if (currentQuestionIndex < questions.length) {
            displayQuestion(currentQuestionIndex);
            document.querySelector('.feedback').setAttribute('hidden', true);
            nextBtn.setAttribute('hidden', true);
            unlockChoices();
        } else {
            // All questions are done; maybe show a completion message or reset the game
            alert("You've completed all the questions!");
        }
    });

    // Initially display the first question
    displayQuestion(currentQuestionIndex);
});
