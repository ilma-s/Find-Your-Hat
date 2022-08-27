const prompt = require('prompt-sync')({sigint: true});

let hat = '^';
let hole = 'O';
let fieldCharacter = '░';
let pathCharacter = '*';

class Field {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.startingRow = 0; // pocetne koordinate * koje se mijenjaju
        this.startingColumn = 0;
        this.field = this.generateField(row, column);
    }

    print() {
        let fieldText = '';
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
               fieldText += this.field[i][j];
            }

            console.log(fieldText);
            fieldText = '';
        }
    }

    validateInput(move) {

        if(move === 'R') {
            if (this.startingColumn + 1 > this.field[0].length) return false;
            this.startingColumn++;
        }
        else if(move === 'L') {
            if (this.startingColumn - 1 < 0) return false;
            this.startingColumn--;
        }
        else if(move === 'U') {
            if (this.startingRow - 1 < 0) return false;
            this.startingRow--;
        }
        else if(move === 'D') {
            if (this.startingRow + 1 > this.field.length) return false;
            this.startingRow++;
        }
        else return false;

        return true;

    }

    userMove(move) {
       if(!this.validateInput(move)) {
            console.log('Invalid input, try again!')
            this.startGame();
        }

        else if(this.field[this.startingRow][this.startingColumn] === hat) {
            console.log('You found your hat!');
        }
        else if(this.field[this.startingRow][this.startingColumn] === hole) {
            console.log('You fell in a hole!');
        }
        else {
            this.field[this.startingRow][this.startingColumn] = pathCharacter;
            console.log('new move');
            this.startGame();
        }
    }
    
    startGame() {
        this.print();
        const move = prompt('Which way? Enter U, D, L or R: ').toUpperCase();
        this.userMove(move);
    }

    generateField(height, width) {
        let randomX = Math.random();
        while (randomX === 0) {
            randomX = Math.random();
        }
        let hatX = Math.floor(randomX * width);

        let randomY = Math.random();
        while (randomY === 0) {
            randomY = Math.random();
        }
        let hatY = Math.floor(randomY * height);

        let probability = 0.2;
        
        let field = [[]];

        for (let i = 0; i < height; i++) {
            field[i] = [];
            for (let j = 0; j < width; j++) {
                let maxHoles = Math.random();

                if (maxHoles < probability) 
                field[i][j] = hole;

                else if (i === hatY && j === hatX) 
                field[i][j] = hat;

                else    
                field[i][j] = fieldCharacter;

            }
        }

        field[0][0]= pathCharacter;
        return field;
    }

}

const myField = new Field(10, 10);
myField.startGame();