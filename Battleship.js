
function gameTester(GameControls) {
    console.log("test")
    var findX = Math.floor(Math.random() * 20);
    var findY = Math.floor(Math.random() * 20);
    const Letters = "ABCDEFGHIJKLMNOPQRST";
    var NumberCoordinateToLetter = Letters.substring(findY, findY + 1);
    var coordinate = NumberCoordinateToLetter + (findX + 1);

    GameControls.shootTorpedo(coordinate);
    
    if (GameControls.SunkenCounter == 5) {
        clearInterval(GameControls.Timeout);
    }
 }

class GameControls{
    constructor() {}
    SunkenCounter = 0;
    NumberOfShips = 5;
    TestMode = false;
    Timeout;
    
    startGame() {
        if (this.TestMode == true) {
            this.Timeout = setInterval(gameTester, 100, this);
            
        }
    }
    
    shootTorpedo(coordinates) {
        var LetterCoordinate = coordinates.substr(0,1).toUpperCase();
        var NumberCoordinate = coordinates.substr(1,coordinates.length - 1);
    
        const Letters = "ABCDEFGHIJKLMNOPQRST";

        var LetterCoordinateToNumber = Letters.indexOf(LetterCoordinate);
        console.log(LetterCoordinateToNumber + ":" + NumberCoordinate)

        if (Board1.boardX[LetterCoordinateToNumber ][NumberCoordinate - 1] == 0) {
            Board1.boardX[LetterCoordinateToNumber ][NumberCoordinate - 1] = 2;
            Board1.displayBoard();
            document.getElementById("WaterSplash").play();
        }
                
        if (Board1.boardX[LetterCoordinateToNumber ][NumberCoordinate - 1] == 1) {
            Board1.boardX[LetterCoordinateToNumber ][NumberCoordinate - 1] = 3;
            Board1.displayBoard();
            document.getElementById("TorpedoHit").play();
        }        

        if (ShipCarrier.shipCoordinates.indexOf(LetterCoordinateToNumber + ";" + (NumberCoordinate - 1)) > -1) {
            ShipCarrier.status = "Damaged";
            ShipCarrier.hitCounter++;
            if (ShipCarrier.hitCounter == ShipCarrier.length) {
                ShipCarrier.status = "Sunken";
                document.getElementById("RussianMan").play();
                for (var i = 0; i < ShipCarrier.shipCoordinates.length; i++) {
                    var YPos = ShipCarrier.shipCoordinates[i].split(";")[0];
                    var XPos = ShipCarrier.shipCoordinates[i].split(";")[1];
                    Board1.boardX[YPos][XPos] = 4;
                    Board1.displayBoard();
                }
                this.SunkenCounter++;
            }
        }

        if (ShipBattleship.shipCoordinates.indexOf(LetterCoordinateToNumber + ";" + (NumberCoordinate - 1)) > -1) {
            ShipBattleship.status = "Damaged";
            ShipBattleship.hitCounter++;
            if (ShipBattleship.hitCounter == ShipBattleship.length) {
                ShipBattleship.status = "Sunken";
                document.getElementById("RussianMan").play();
                for (var i = 0; i < ShipBattleship.shipCoordinates.length; i++) {
                    var YPos = ShipBattleship.shipCoordinates[i].split(";")[0];
                    var XPos = ShipBattleship.shipCoordinates[i].split(";")[1];
                    Board1.boardX[YPos][XPos] = 4;
                    Board1.displayBoard();
                }
                this.SunkenCounter++;
            }
        }

        if (ShipCruiser.shipCoordinates.indexOf(LetterCoordinateToNumber + ";" + (NumberCoordinate - 1)) > -1) {
            ShipCruiser.status = "Damaged";
            ShipCruiser.hitCounter++;
            if (ShipCruiser.hitCounter == ShipCruiser.length) {
                ShipCruiser.status = "Sunken";
                document.getElementById("RussianMan").play();
                for (var i = 0; i < ShipCruiser.shipCoordinates.length; i++) {
                    var YPos = ShipCruiser.shipCoordinates[i].split(";")[0];
                    var XPos = ShipCruiser.shipCoordinates[i].split(";")[1];
                    Board1.boardX[YPos][XPos] = 4;
                    Board1.displayBoard();
                }
                this.SunkenCounter++;
            }
        }

        if (ShipSubmarine.shipCoordinates.indexOf(LetterCoordinateToNumber + ";" + (NumberCoordinate - 1)) > -1) {
            ShipSubmarine.status = "Damaged";
            ShipSubmarine.hitCounter++;
            if (ShipSubmarine.hitCounter == ShipSubmarine.length) {
                ShipSubmarine.status = "Sunken";
                document.getElementById("RussianMan").play();
                for (var i = 0; i < ShipSubmarine.shipCoordinates.length; i++) {
                    var YPos = ShipSubmarine.shipCoordinates[i].split(";")[0];
                    var XPos = ShipSubmarine.shipCoordinates[i].split(";")[1];
                    Board1.boardX[YPos][XPos] = 4;
                    Board1.displayBoard();
                }
                this.SunkenCounter++;
            }
        }

        if (ShipDestroyer.shipCoordinates.indexOf(LetterCoordinateToNumber + ";" + (NumberCoordinate - 1)) > -1) {
            ShipDestroyer.status = "Damaged";
            ShipDestroyer.hitCounter++;
            console.log(ShipDestroyer.length)
            if (ShipDestroyer.hitCounter == ShipDestroyer.length) {
                ShipDestroyer.status = "Sunken";
                document.getElementById("RussianMan").play();
                for (var i = 0; i < ShipDestroyer.shipCoordinates.length; i++) {
                    var YPos = ShipDestroyer.shipCoordinates[i].split(";")[0];
                    var XPos = ShipDestroyer.shipCoordinates[i].split(";")[1];
                    Board1.boardX[YPos][XPos] = 4;
                    Board1.displayBoard();
                }
                this.SunkenCounter++;
            }
        }
        $("#coordinate").val("");
        $("#coordinate").focus();
        this.checkIfGameOver();

    }

    checkIfGameOver() {
        if(this.SunkenCounter == this.NumberOfShips) {
            $("#GameOverBox").show();
        }
    }

}

class Board{
    constructor() {
        this.boardSize = 20;
        this.boardX = new Array(this.boardSize);
    
    }

    

    setBoard() {


        for (var i = 0; i < this.boardX.length; i++) {
            this.boardX[i] = new Array(this.boardSize);

            for (var h = 0; h < this.boardX.length; h++) {
                this.boardX[i][h] = 0;
            }

        }

        this.displayBoard();

    }

    displayBoard() {
        $("#board").html("");
        
        for (var j = 0; j < this.boardX.length; j++) {
            
            $("#board").append("<div>");
            for (var g = 0; g < this.boardX.length; g++) {
                switch(this.boardX[j][g]) {
                    case 0:
                        $("#board").append("<span class = \"Checkers Water\"></span>");
                        break;
                    case 1:
                        $("#board").append("<span class = \"Checkers Ships\"></span>");
                        break;
                    case 2:
                        $("#board").append("<span class = \"Checkers Miss\"></span>");
                        break;
                    case 3:
                        $("#board").append("<span class = \"Checkers Damaged\"></span>");
                        break;
                    case 4:
                        $("#board").append("<span class = \"Checkers Sunken\"></span>");
                        break;
                }
            }
            
            $("#board").append("</div>");

        }

        
       
    }


}

class Ship{
    constructor(type, length, shipCoordinates, orientation, status, onboard, hitCounter) {
        this.type = type;
        this.length = length;
        this.shipCoordinates = shipCoordinates;
        this.orientation = orientation;
        this.status = status;
        this.onboard = onboard;
        this.hitCounter = 0;
    }
    
    dragShip() {


    }
    
    rotateShip() {


    }


}

class AIShip extends Ship{
    constructor(type, length, shipCoordinates, orientation, status, onboard, hitCounter) {
        super(type, length, shipCoordinates, orientation, status, onboard, hitCounter)

    }

    setShip(type, length, board) {
        var shipPosX = Math.floor(Math.random() * 20);
        var shipPosY = Math.floor(Math.random() * 20);
        var orientation = Math.floor(Math.random() * 4);
        var tempLength = length;
        var shipCollision = false;
        var outsideBoard = false;
        
        console.log(orientation)
        console.log("x: " + (shipPosX) + " y: " + (shipPosY))

        if (orientation == 0) {
            if (shipPosY - length < -1) {
                outsideBoard = true;
            } else {
                for (var m = 0; m < tempLength; m++) {
                    if (board.boardX[shipPosY - m][shipPosX] == 1) {shipCollision = true;}
                    console.log("shipCollision "+ shipCollision);
                }
            }
            
            if (outsideBoard == true || shipCollision == true) {
                console.log("Error");
                this.setShip(type, tempLength, board);
            } else {
                var shipCoordinates = [];
                for (var i = 0; i < length; i++) {
                    board.boardX[shipPosY - i][shipPosX] = 1;
                    shipCoordinates.push (shipPosY - i + ";" + shipPosX);
                }
                this.updateShipProperties(type, tempLength, shipCoordinates, orientation, "Clean");
            }
        }

        if (orientation == 1) {
            if (shipPosX + length > 20) {
                outsideBoard = true;
            } else {
                for (var m = 0; m < tempLength; m++) {
                    if (board.boardX[shipPosY][shipPosX + m] == 1) {shipCollision = true;}
                    console.log("shipCollision "+ shipCollision);
                }
            }

            if (outsideBoard == true || shipCollision == true) {
                console.log("Error");
                this.setShip(type, tempLength, board);
            } else {
                var shipCoordinates = [];
                for (var i = 0; i < length; i++) {
                    board.boardX[shipPosY][shipPosX + i] = 1;
                    shipCoordinates.push (shipPosY + ";" + (shipPosX + i));
                }
                this.updateShipProperties(type, tempLength, shipCoordinates, orientation, "Clean");
            }
        }

        if (orientation == 2) {
            if (shipPosY + length > 20) {
                outsideBoard = true;
            } else {
                for (var m = 0; m < tempLength; m++) {
                    if (board.boardX[shipPosY + m][shipPosX] == 1) {shipCollision = true;}
                    console.log("shipCollision "+ shipCollision);
                }
            }
            

            if (outsideBoard == true || shipCollision == true) {
                console.log("Error");
                this.setShip(type, tempLength, board);
            } else {
                var shipCoordinates = [];
                for (var i = 0; i < length; i++) {
                    board.boardX[shipPosY + i][shipPosX] = 1;
                    shipCoordinates.push (shipPosY + i + ";" + shipPosX);
                }  
                this.updateShipProperties(type, tempLength, shipCoordinates, orientation, "Clean");
            }
        }

        if (orientation == 3) {
            if (shipPosX - length < -1) {
                outsideBoard = true;
            } else {
                for (var m = 0; m < tempLength; m++) {
                    if (board.boardX[shipPosY][shipPosX - m] == 1) {shipCollision = true;}
                    console.log("shipCollision "+ shipCollision);
                }
            }
            

            if (outsideBoard == true || shipCollision == true) {
                console.log("Error")
                this.setShip(type, tempLength, board);
            } else {
                var shipCoordinates = [];
                for (var i = 0; i < length; i++) {
                    board.boardX[shipPosY][shipPosX - i] = 1;
                    shipCoordinates.push (shipPosY + ";" + (shipPosX - i));
                }
                this.updateShipProperties(type, tempLength, shipCoordinates, orientation, "Clean");
            }
        }

        
        
    

        

        board.displayBoard();
        
    }

    updateShipProperties(type, length, shipCoordinates, orientation, status) {
        this.type = type;
        this.length = length;
        this.shipCoordinates = shipCoordinates;
        this.orientation = orientation;
        this.status = status;
        console.log(this)
    }

}


var GameControls1;
var Board1;
var ShipCarrier = new AIShip;
var ShipBattleship = new AIShip;
var ShipCruiser = new AIShip;
var ShipSubmarine = new AIShip;
var ShipDestroyer = new AIShip;
document.addEventListener("DOMContentLoaded", (event) => {
    GameControls1 = new GameControls;
    Board1 = new Board;

    Board1.setBoard();
    

    ShipCarrier.setShip("Carrier", 5, Board1);
    ShipBattleship.setShip("Battleship", 4, Board1);
    ShipCruiser.setShip("Cruiser", 3, Board1);
    ShipSubmarine.setShip("Submarine", 3, Board1);
    ShipDestroyer.setShip("Destroyer", 2, Board1);
    
    $(document).on('keypress',function(e) {
        if(e.which == 13) {
            if($("#coordinate").val() != "") {
                GameControls1.shootTorpedo($("#coordinate").val());
            }
        }
    });
}
)




