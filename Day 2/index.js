let fs = require('fs')
 
let input = fs.readFileSync('./input.txt').toString()
 
function parseRounds(input)
{
    return input.split('\n')
}
let testInput = ['AZ','AX','AY','BZ','BX','BY','CZ','CX','CY']
let testInput2 = ['A Y',
	'B X',
	'C Z']
 
function processRounds(roundsArray)
{
    let roundObjs = [];
    let opponentChoice, yourChoice, opponentResult, yourResult
    roundsArray.forEach(r=>{
        //console.log(r.replaceAll('\r',''))
        if(r.includes('A'))
        {
            opponentChoice = 'rock'
        }
        if(r.includes('B'))
        {
            opponentChoice = 'paper'
        }
        if(r.includes('C'))
        {
            opponentChoice = 'scissors'
        }
        if(r.includes('X'))
        {
            yourChoice = 'rock'
        }
        if(r.includes('Y'))
        {
            yourChoice = 'paper'
        }
        if(r.includes('Z'))
        {
            yourChoice = 'scissors'
        }
 
        if(opponentChoice===yourChoice)
        {
            opponentResult = 'draw'
            yourResult = 'draw'
        }
        else if(opponentChoice==='rock' && yourChoice=='scissors')
        {
            opponentResult='win'
            yourResult='lose'
        }
        else if(opponentChoice==='rock' && yourChoice=='paper')
        {
            opponentResult='lost'
            yourResult='win'
        }
        else if(opponentChoice==='scissors' && yourChoice==='paper')
        {
            opponentResult='win'
            yourResult='lose'
        }
        else if(opponentChoice==='scissors' && yourChoice==='rock')
        {
            opponentResult='lose'
            yourResult='win'
        }
        else if(opponentChoice==='paper' && yourChoice=='scissors')
        {
            opponentResult='lose'
            yourResult='win'
        }
        else if(opponentChoice==='paper' && yourChoice=='rock')
        {
            opponentResult='win'
            yourResult='lose'
        }
        roundObjs.push({opponentResult:opponentResult, yourResult:yourResult, opponentChoice:opponentChoice, yourChoice:yourChoice})
    })
    return roundObjs
}
 
function processRoundsPart2(roundsArray)
{
    let roundObjs = [];
    let opponentChoice, yourChoice, opponentResult, yourResult
    roundsArray.forEach(r=>{
        //console.log(r.replaceAll('\r',''))
	   let roundInput = ''
        if(r.includes('A'))
        {
            opponentChoice = 'rock'
		  roundInput+='A'
        }
        if(r.includes('B'))
        {
            opponentChoice = 'paper'
		  roundInput+='B'
        }
        if(r.includes('C'))
        {
            opponentChoice = 'scissors'
		  roundInput+='C'
        }
        if(r.includes('X'))
        {
            yourResult='lose'
            opponentResult='win'
		  roundInput+='X'
        }
        if(r.includes('Y'))
        {
            yourResult='draw'
            opponentResult='draw'
		  roundInput+='Y'
        }
        if(r.includes('Z'))
        {
            yourResult='win'
            opponentResult='lose'
		  roundInput+='Z'
        }
 
        if(yourResult==='win')
        {
            switch(opponentChoice)
            {
                case 'rock':
                    yourChoice='paper'
			break;
                case 'paper':
                    yourChoice='scissors'
			break;
                case 'scissors':
                    yourChoice='rock'
			break;
			default:
				yourChoice='shit!!!'
            }
        }
        if(yourResult==='lose')
        {
            switch(opponentChoice)
            {
                case 'rock':
                    yourChoice='scissors'
			break;
                case 'paper':
                    yourChoice='rock'
			break;
                case 'scissors':
                    yourChoice='paper'
			break;
			default:
				yourChoice='shit!!!'
            }
        }
        if(yourResult==='draw')
        {
            yourChoice=opponentChoice
        }
	   let opponentPoints = 0 
	   let yourPoints = 0

	   if(opponentResult==='win')
        {
            opponentPoints+=6
        }
        if(opponentResult==='draw')
        {
            opponentPoints+=3
        }
	   if(yourResult==='win')
        {
            yourPoints+=6
        }
        if(yourResult==='draw')
        {
            yourPoints+=3
        }
	   if(opponentChoice==='rock')
        {
            opponentPoints+=1
        }
        if(opponentChoice==='paper')
        {
            opponentPoints+=2
        }
        if(opponentChoice==='scissors')
        {
            opponentPoints+=3
        }
	   if(yourChoice==='rock')
        {
            yourPoints+=1
        }
        if(yourChoice==='paper')
        {
            yourPoints+=2
        }
        if(yourChoice==='scissors')
        {
            yourPoints+=3
        }
        roundObjs.push({roundInput:roundInput,
		 opponentResult:opponentResult, yourResult:yourResult,
		 opponentChoice:opponentChoice, yourChoice:yourChoice,
		 opponentPoints:opponentPoints, yourPoints:yourPoints})
		 
    })
    return roundObjs
}
 
function calculateOpponentWinPoints(objs)
{
    let points = 0
    objs.forEach(result=>{
        if(result.opponentResult==='win')
        {
            points+=6
        }
        if(result.opponentResult==='draw')
        {
            points+=3
        }
       
    })
    return points
}
 
function calculateYourWinPoints(objs)
{
    let points = 0
    objs.forEach(result=>{
        if(result.yourResult==='win')
        {
            points+=6
        }
        if(result.yourResult==='draw')
        {
            points+=3
        }
       
    })
    return points
}
 
function calculateOpponentChoicePoints(objs)
{
    let points = 0
    objs.forEach(result=>{
        if(result.opponentChoice==='rock')
        {
            points+=1
        }
        if(result.opponentChoice==='paper')
        {
            points+=2
        }
        if(result.opponentChoice==='scissors')
        {
            points+=3
        }
    })
    return points
}
 
function calculateYourChoicePoints(objs)
{
    let points = 0
    objs.forEach(result=>{
        if(result.yourChoice==='rock')
        {
            points+=1
        }
        if(result.yourChoice==='paper')
        {
            points+=2
        }
        if(result.yourChoice==='scissors')
        {
            points+=3
        }
    })
    return points
}

function sum(a, b) {
	return a + b;
}

function addPoints(objs)
{
	yPoints = 0
	oPoints = 0
	objs.forEach(bout=>{
		yPoints+=bout.yourPoints
		oPoints+=bout.opponentPoints
	})
	return [oPoints, yPoints]
}

let rounds = processRounds(parseRounds(input))
let roundsPart2 = processRoundsPart2(parseRounds(input))
let tester = processRoundsPart2(testInput)
let tester2 = processRoundsPart2(testInput2)

console.log(tester)
console.log(addPoints(tester))
console.log(addPoints(tester2))
console.log(addPoints(roundsPart2))


console.log('test: Your points:',
calculateYourChoicePoints(tester)+calculateYourWinPoints(tester),
'Opponent points:',
calculateOpponentChoicePoints(tester)+calculateOpponentWinPoints(tester))

console.log('Test2: Your points:',
calculateYourChoicePoints(tester2)+calculateYourWinPoints(tester2),
'Opponent points:',
calculateOpponentChoicePoints(tester2)+calculateOpponentWinPoints(tester2))

console.log('Your points:',
calculateYourChoicePoints(rounds)+calculateYourWinPoints(rounds),
'Opponent points:',
calculateOpponentChoicePoints(rounds)+calculateOpponentWinPoints(rounds))
 
console.log('Your points part 2:',
calculateYourChoicePoints(roundsPart2)+calculateYourWinPoints(roundsPart2),
'Opponent points part 2:',
calculateOpponentChoicePoints(roundsPart2)+calculateOpponentWinPoints(roundsPart2))
console.log(rounds.length)
console.log(roundsPart2.length)

module.exports = {processRounds, processRoundsPart2, calculateYourWinPoints, calculateYourChoicePoints, calculateOpponentWinPoints, calculateOpponentChoicePoints, sum}