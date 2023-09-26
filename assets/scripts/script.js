//---------------DOM MANIPULATION-------------------//

//add all the pieces to cases
$(".white,.black").append(
    '<div class="selector"></div>',
    '<i class="king mainty fa-solid fa-chess-king" style="color: #000000;"></i>',
    '<i class="queen mainty fa-solid fa-chess-queen" style="color: #000000;"></i>',
    '<i class="rook mainty fa-solid fa-chess-rook" style="color: #000000;"></i>',
    '<i class="bishop mainty fa-solid fa-chess-bishop" style="color: #000000;"></i>',
    '<i class="knight mainty fa-solid fa-chess-knight" style="color: #000000;"></i>',
    '<i class="pawn mainty fa-solid fa-chess-pawn" style="color: #000000;"></i>',
    '<i class="king fotsy fa-solid fa-chess-king" style="color: #fff;"></i>',
    '<i class="queen fotsy fa-solid fa-chess-queen" style="color: #fff;"></i>',
    '<i class="rook fotsy fa-solid fa-chess-rook" style="color: #fff;"></i>',
    '<i class="bishop fotsy fa-solid fa-chess-bishop" style="color: #fff;"></i>',
    '<i class="knight fotsy fa-solid fa-chess-knight" style="color: #fff;"></i>',
    '<i class="pawn fotsy fa-solid fa-chess-pawn" style="color: #fff;"></i>'
);

//add background image to white cases
$(".blanc").append('<img src="./assets/image/white.jpeg"/>');
//add background image to black cases
$(".noir").append('<img src="./assets/image/wood black.png"/>');

//---------------VARIABLES----------------//

    //sounds//
let MOVE_SOUND = new Audio('./assets/sounds/move.mp3');
let CAPTURE_SOUND = new Audio('./assets/sounds/capture.mp3');
let WRONG_MOVE_SOUND = new Audio('./assets/sounds/wrong.mp3');
let CHECK_SOUND = new Audio('./assets/sounds/check.mp3');
let PROMOTE_SOUND = new Audio('./assets/sounds/promote.mp3');

    //others//
let SELECT_LOG = [];//<- to log every selected case
let PIECE_MOUVEMENT_LOG = [[]];//<- to log every pieces that has moved
let COUVERTURE = [[],[]];//<- all the cases pieces can reach , [0]: for white and [1]: for black
let TURN = 0;//<- to check whose TURN is it , even : white , odd : black
let CHECK_INDICATIOR = 0;//<- to tell if a color is being checked or not : 1 for checked and 0 otherwise
let GAME_STATE = [
        [
            ".row.I .a1",
            ".rook.mainty.fa-solid.fa-chess-rook"
        ],
        [
            ".row.I .a2",
            ".knight.mainty.fa-solid.fa-chess-knight"
        ],
        [
            ".row.I .a3",
            ".bishop.mainty.fa-solid.fa-chess-bishop"
        ],
        [
            ".row.I .a4",
            ".queen.mainty.fa-solid.fa-chess-queen"
        ],
        [
            ".row.I .a5",
            ".king.mainty.fa-solid.fa-chess-king"
        ],
        [
            ".row.I .a6",
            ".bishop.mainty.fa-solid.fa-chess-bishop"
        ],
        [
            ".row.I .a7",
            ".knight.mainty.fa-solid.fa-chess-knight"
        ],
        [
            ".row.I .a8",
            ".rook.mainty.fa-solid.fa-chess-rook"
        ],
        [
            ".row.II .a1",
            ".pawn.mainty.fa-solid.fa-chess-pawn"
        ],
        [
            ".row.II .a2",
            ".pawn.mainty.fa-solid.fa-chess-pawn"
        ],
        [
            ".row.II .a3",
            ".pawn.mainty.fa-solid.fa-chess-pawn"
        ],
        [
            ".row.II .a4",
            ".pawn.mainty.fa-solid.fa-chess-pawn"
        ],
        [
            ".row.II .a5",
            ".pawn.mainty.fa-solid.fa-chess-pawn"
        ],
        [
            ".row.II .a6",
            ".pawn.mainty.fa-solid.fa-chess-pawn"
        ],
        [
            ".row.II .a7",
            ".pawn.mainty.fa-solid.fa-chess-pawn"
        ],
        [
            ".row.II .a8",
            ".pawn.mainty.fa-solid.fa-chess-pawn"
        ],
        [
            ".row.III .a1",
            1
        ],
        [
            ".row.III .a2",
            1
        ],
        [
            ".row.III .a3",
            1
        ],
        [
            ".row.III .a4",
            1
        ],
        [
            ".row.III .a5",
            1
        ],
        [
            ".row.III .a6",
            1
        ],
        [
            ".row.III .a7",
            1
        ],
        [
            ".row.III .a8",
            1
        ],
        [
            ".row.IV .a1",
            1
        ],
        [
            ".row.IV .a2",
            1
        ],
        [
            ".row.IV .a3",
            1
        ],
        [
            ".row.IV .a4",
            1
        ],
        [
            ".row.IV .a5",
            1
        ],
        [
            ".row.IV .a6",
            1
        ],
        [
            ".row.IV .a7",
            1
        ],
        [
            ".row.IV .a8",
            1
        ],
        [
            ".row.V .a1",
            1
        ],
        [
            ".row.V .a2",
            1
        ],
        [
            ".row.V .a3",
            1
        ],
        [
            ".row.V .a4",
            1
        ],
        [
            ".row.V .a5",
            1
        ],
        [
            ".row.V .a6",
            1
        ],
        [
            ".row.V .a7",
            1
        ],
        [
            ".row.V .a8",
            1
        ],
        [
            ".row.VI .a1",
            1
        ],
        [
            ".row.VI .a2",
            1
        ],
        [
            ".row.VI .a3",
            1
        ],
        [
            ".row.VI .a4",
            1
        ],
        [
            ".row.VI .a5",
            1
        ],
        [
            ".row.VI .a6",
            1
        ],
        [
            ".row.VI .a7",
            1
        ],
        [
            ".row.VI .a8",
            1
        ],
        [
            ".row.VII .a1",
            ".pawn.fotsy.fa-solid.fa-chess-pawn"
        ],
        [
            ".row.VII .a2",
            ".pawn.fotsy.fa-solid.fa-chess-pawn"
        ],
        [
            ".row.VII .a3",
            ".pawn.fotsy.fa-solid.fa-chess-pawn"
        ],
        [
            ".row.VII .a4",
            ".pawn.fotsy.fa-solid.fa-chess-pawn"
        ],
        [
            ".row.VII .a5",
            ".pawn.fotsy.fa-solid.fa-chess-pawn"
        ],
        [
            ".row.VII .a6",
            ".pawn.fotsy.fa-solid.fa-chess-pawn"
        ],
        [
            ".row.VII .a7",
            ".pawn.fotsy.fa-solid.fa-chess-pawn"
        ],
        [
            ".row.VII .a8",
            ".pawn.fotsy.fa-solid.fa-chess-pawn"
        ],
        [
            ".row.VIII .a1",
            ".rook.fotsy.fa-solid.fa-chess-rook"
        ],
        [
            ".row.VIII .a2",
            ".knight.fotsy.fa-solid.fa-chess-knight"
        ],
        [
            ".row.VIII .a3",
            ".bishop.fotsy.fa-solid.fa-chess-bishop"
        ],
        [
            ".row.VIII .a4",
            ".queen.fotsy.fa-solid.fa-chess-queen"
        ],
        [
            ".row.VIII .a5",
            ".king.fotsy.fa-solid.fa-chess-king"
        ],
        [
            ".row.VIII .a6",
            ".bishop.fotsy.fa-solid.fa-chess-bishop"
        ],
        [
            ".row.VIII .a7",
            ".knight.fotsy.fa-solid.fa-chess-knight"
        ],
        [
            ".row.VIII .a8",
            ".rook.fotsy.fa-solid.fa-chess-rook"
        ]
];//<- to log a game state , which means every pieces positions
let GAME_STATE_LOG = [];//<- to log every game state
GAME_STATE_LOG.push([]);
for(let i=0; i<GAME_STATE.length; i++){
    GAME_STATE_LOG[GAME_STATE_LOG.length - 1].push(GAME_STATE[i]);
}

    //coordinate//
let COORDINATE_LIST = [
    [
        ".row.I",
        ".row.II",
        ".row.III",
        ".row.IV",
        ".row.V",
        ".row.VI",
        ".row.VII",
        ".row.VIII"
    ],
    [
        ".a1",
        ".a2",
        ".a3",
        ".a4",
        ".a5",
        ".a6",
        ".a7",
        ".a8"
    ]
];//list of rows and columns' classes : [0]for rows and [1]for columns



//-------------EVENTS----------------------//
loadGameState(GAME_STATE);

//used to move pieces
$(".white,.black").on("click",
    function (){

        //--------------variables------------//
        let x = $(this)[0];//<- column coordinate
        let y = $(x).parent()[0];//<- row coordinate
        let currentCase = classForm(y.className)+" "+classForm(x.className);//<- (row,column) coordinate
        let currentCaseSelectorZindex = $(currentCase+" .selector").css("z-index");//<- the case's selector's z-index
        let currentCasePiece = String(pieceCase(currentCase));//<- piece contained inside the case


        //------------functions------------//

        //only allow pieces with the right color to be selected
        if(TURN % 2 == 0){
            if(currentCasePiece.includes("mainty") == true && currentCaseSelectorZindex != 3){
                return ;
            }
        }else{
            if(currentCasePiece.includes("fotsy") == true && currentCaseSelectorZindex != 3){
                return ; 
            }
        }


        //when checked, only allow pieces able to uncheck to be selected
        //in the same way hide highlighted cases that can't uncheck
        if(CHECK_INDICATIOR == 1 && currentCasePiece != "1" && currentCaseSelectorZindex != 3){
            let continuation = 0;//<- to check if the code should continue or not , 0 not and 1 yes
            let allowedCases = [currentCase];//<- case allowed to be highlighted

            //for black
            if(currentCasePiece.includes("mainty") == true){
                let mainty_couverture = [];
                for(let i = 0; i<COORDINATE_LIST[0].length; i++){
                    for(let j=0; j<COORDINATE_LIST[1].length; j++){
                        caseSelect(currentCase, [], [], COUVERTURE);
                        if($(COORDINATE_LIST[0][i]+" "+COORDINATE_LIST[1][j]+" .selector").css("z-index") == 3){
                            $(COORDINATE_LIST[0][i]+" "+COORDINATE_LIST[1][j]+" i").css("z-index","0");
                            $(COORDINATE_LIST[0][i]+" "+COORDINATE_LIST[1][j]+" "+currentCasePiece).css("z-index","5");
                            $(currentCase+" "+currentCasePiece).css("z-index","0");
                            piecesCouverture(mainty_couverture,"fotsy",COORDINATE_LIST[0], COORDINATE_LIST[1]);
                            if(isChecked(mainty_couverture, "mainty") == false){
                                allowedCases.push(COORDINATE_LIST[0][i]+" "+COORDINATE_LIST[1][j]);
                                loadGameState(GAME_STATE);
                                continuation = 1;
                                //i = 10;
                                continue;
                            }
                            loadGameState(GAME_STATE);
                        }
                    }
                }
            }

            //for white
            if(currentCasePiece.includes("fotsy") == true){
                let fotsy_couverture = [];
                for(let i = 0; i<COORDINATE_LIST[0].length; i++){
                    for(let j=0; j<COORDINATE_LIST[1].length; j++){
                        caseSelect(currentCase, [], [], COUVERTURE);
                        if($(COORDINATE_LIST[0][i]+" "+COORDINATE_LIST[1][j]+" .selector").css("z-index") == 3){
                            $(COORDINATE_LIST[0][i]+" "+COORDINATE_LIST[1][j]+" i").css("z-index","0");
                            $(COORDINATE_LIST[0][i]+" "+COORDINATE_LIST[1][j]+" "+currentCasePiece).css("z-index","5");
                            $(currentCase+" "+currentCasePiece).css("z-index","0");
                            piecesCouverture(fotsy_couverture,"mainty",COORDINATE_LIST[0], COORDINATE_LIST[1]);
                            if(isChecked(fotsy_couverture, "fotsy") == false){
                                allowedCases.push(COORDINATE_LIST[0][i]+" "+COORDINATE_LIST[1][j]);
                                loadGameState(GAME_STATE);
                                continuation = 1;
                                //i = 10;
                                continue;
                            }
                            loadGameState(GAME_STATE);
                        }
                    }
                }
            }
            
            $(".selector").css("z-index","0");
            if(continuation != 1){
                return;
            }

            SELECT_LOG.push(currentCase);
            for(let i=0; i<allowedCases.length; i++){
                $(allowedCases[i]+" .selector").css("z-index","3")
            }

        }else{
            //select a case , and show the piece's possible move
            caseSelect(currentCase, SELECT_LOG, PIECE_MOUVEMENT_LOG, COUVERTURE);
        }

        

        //when two or more cases has been selected
        if(SELECT_LOG.length > 1  && 
            pieceCase(SELECT_LOG[SELECT_LOG.length-2]) != 1  && 
            currentCase != SELECT_LOG[SELECT_LOG.length-2])

        {
                    second_time = 0;//<- To check if a case should be selected a second time after a piece move

                    //A debug for when a piece move into an empty case it stays selected toghether with *1*
                    if (pieceCase(currentCase) == 1){
                        second_time++;
                    }

                    //move a piece into the newly selected case if possible , increment the turn variable and save the game state
                    if (pieceMove(SELECT_LOG[SELECT_LOG.length-2],
                                    currentCase,
                                    pieceCase(SELECT_LOG[SELECT_LOG.length-2]), 
                                    currentCaseSelectorZindex,
                                    PIECE_MOUVEMENT_LOG) == 0)
                    {
                        TURN++;
                        saveGameState(GAME_STATE, COORDINATE_LIST[0], COORDINATE_LIST[1]);
                        GAME_STATE_LOG.push([]);
                        for(let i=0; i<GAME_STATE.length; i++){
                            GAME_STATE_LOG[GAME_STATE_LOG.length - 1].push(GAME_STATE[i]);
                        }
                    }

                    //to deselect the new case
                    caseSelect(currentCase,SELECT_LOG);
                    // *1*
                    if(second_time == 1){
                        caseSelect(currentCase,SELECT_LOG); 
                    }


                    //refreshing the colors' couverture
                    piecesCouverture(COUVERTURE[0], "fotsy", COORDINATE_LIST[0], COORDINATE_LIST[1]);
                    piecesCouverture(COUVERTURE[1], "mainty", COORDINATE_LIST[0], COORDINATE_LIST[1]);

                    //checking if any king is checked
                    setTimeout(function(){
                        $(".row div .blanc,.row div .noir").css("border","");
                        CHECK_INDICATIOR = 0;
                        if(isChecked(COUVERTURE[0], "mainty") != false){
                            CHECK_SOUND.play();
                            $(isChecked(COUVERTURE[0], "mainty")+" .blanc,"+isChecked(COUVERTURE[0], "mainty")+" .noir").css("border","2px solid red");

                            //check if checkmated
                            if(isCheckMated(COUVERTURE[1], "mainty", GAME_STATE) == true){
                                alert("checkmate");
                            }else{
                                CHECK_INDICATIOR = 1;
                            }
                        }
                        if(isChecked(COUVERTURE[1], "fotsy") != false){
                            CHECK_SOUND.play();
                            $(isChecked(COUVERTURE[1], "fotsy")+" .blanc,"+isChecked(COUVERTURE[1], "fotsy")+" .noir").css("border","2px solid red");

                            //check if checkmated
                            if(isCheckMated(COUVERTURE[0], "fotsy", GAME_STATE) == true){
                                alert("checkmate");
                            }else{
                                CHECK_INDICATIOR = 1;
                            }
                        }
                    }, 550);

                    $(".selector").css("z-index","0");
        }
    }
);

//behavior when promoting a pawn
$(".choice button").on("click",
        function() {

        //---------------variables------------------//
        let fired_button = $(this);
        let value = fired_button.val();

        let newCase = SELECT_LOG[SELECT_LOG.length-2];
        let pieceClass = pieceCase(newCase);

        let pieceColor = "";
        if(pieceClass.includes("fotsy") == true){
            pieceColor = "fotsy";
        }else{
            pieceColor = "mainty";
        }
        

        //---------------------functions-------------//

        //changing the pawn's icon
        switch(value){
            case "1" : 
                $(newCase+" "+pieceClass).css("z-index","0");
                $(newCase+" .queen."+pieceColor).css("z-index","5");
                $(".choice-box").css("z-index","-1");
                break;
            case "2" : 
                $(newCase+" "+pieceClass).css("z-index","0");
                $(newCase+" .rook."+pieceColor).css("z-index","5");
                $(".choice-box").css("z-index","-1");
                break;
            case "3" : 
                $(newCase+" "+pieceClass).css("z-index","0");
                $(newCase+" .knight."+pieceColor).css("z-index","5");
                $(".choice-box").css("z-index","-1");
                break;
            case "4" : 
                $(newCase+" "+pieceClass).css("z-index","0");
                $(newCase+" .bishop."+pieceColor).css("z-index","5");
                $(".choice-box").css("z-index","-1");
        }

        //play the promote sound
        PROMOTE_SOUND.play();

        //refreshing the colors' couverture
        piecesCouverture(COUVERTURE[0], "fotsy", COORDINATE_LIST[0], COORDINATE_LIST[1]);
        piecesCouverture(COUVERTURE[1], "mainty", COORDINATE_LIST[0], COORDINATE_LIST[1]);

        saveGameState(GAME_STATE, COORDINATE_LIST[0], COORDINATE_LIST[1]);
        GAME_STATE_LOG.push([]);
        for(let i=0; i<GAME_STATE.length; i++){
            GAME_STATE_LOG[GAME_STATE_LOG.length - 1].push(GAME_STATE[i]);
        }
        //checking if any king is checked
        setTimeout(function(){
            $(".row div .blanc,.row div .noir").css("border","");
            CHECK_INDICATIOR = 0;
            if(isChecked(COUVERTURE[0], "mainty") != false){
                CHECK_SOUND.play();
                $(isChecked(COUVERTURE[0], "mainty")+" .blanc,"+isChecked(COUVERTURE[0], "mainty")+" .noir").css("border","2px solid red");

                //check if checkmated
                if(isCheckMated(COUVERTURE[1], "mainty", GAME_STATE) == true){
                    alert("checkmate");
                }else{
                    CHECK_INDICATIOR = 1;
                }
            }
            if(isChecked(COUVERTURE[1], "fotsy") != false){
                CHECK_SOUND.play();
                $(isChecked(COUVERTURE[1], "fotsy")+" .blanc,"+isChecked(COUVERTURE[1], "fotsy")+" .noir").css("border","2px solid red");

                //check if checkmated
                if(isCheckMated(COUVERTURE[0], "fotsy", GAME_STATE) == true){
                    alert("checkmate");
                }else{
                    CHECK_INDICATIOR = 1;
                }
            }
        }, 550);
    }
);

//restart the game
$(".restart").on("click",
    function(){
        loadGameState(GAME_STATE_LOG[0]);
        for(let i=0; GAME_STATE_LOG.length != 1; i++){
            GAME_STATE_LOG.pop();
        }
        TURN = 0;
    }
);

//back function
$(".back").on("click",
    function(){
        if(GAME_STATE_LOG.length > 1){
            loadGameState(GAME_STATE_LOG[GAME_STATE_LOG.length - 2]);
            GAME_STATE_LOG.pop();
            TURN++;
        }
    }
);
