const SELECTIONS = [
    {
        name: 'rock',
        emoji: '✊',
        beats: 'scissors'
    },
    {
        name: 'papper',
        emoji: '✋',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✌',
        beats: 'papper'
    }
]

document.addEventListener("DOMContentLoaded", function(event) {
    const selectionButtons = document.querySelectorAll('[data-selection]');
    const finalColumn = document.querySelector('[data-final-column]');
    const computerScoreSpan = document.querySelector('[data-computer-score]');
    const yourScoreSpan = document.querySelector('[data-your-score]');

    selectionButtons.forEach(selectionButton => {
        selectionButton.addEventListener('click', e =>{
            const selectionName = selectionButton.dataset.selection;
            const selection = SELECTIONS.find( selection => selection.name === selectionName )
            makeSelection(selection,finalColumn,computerScoreSpan,yourScoreSpan);
        });
    });

});


function makeSelection(selection,finalColumn,computerScoreSpan,yourScoreSpan){
        
    const computerSeletion = randomSelection();
    const yourWinner = isWinner(selection,computerSeletion);
    const computerWinner = isWinner(computerSeletion, selection);
    
    addSelectionResult(finalColumn,computerSeletion,computerWinner);
    addSelectionResult(finalColumn,selection,yourWinner);
    
    if (yourWinner) incrementScore(yourScoreSpan);
    if (computerWinner) incrementScore(computerScoreSpan);
}

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

function addSelectionResult(finalColumn,selection,winner){
    const div = document.createElement('div');
    div.innerText = selection.emoji;
    div.classList.add('result-selection');
    if(winner) div.classList.add('winner')
    finalColumn.after(div)
}

function isWinner(selection, opponentSelection){
    return selection.beats === opponentSelection.name;
}

function randomSelection(){
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length) 
    return SELECTIONS[randomIndex]
}