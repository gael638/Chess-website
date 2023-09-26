//return the copied array
function arrayCopy(source = []){
    let dest = [];
    for(let i=0;source[i]!=undefined;i++){
        dest.push(source[i]);
    }
    return dest;
}


//to check if a value exists in a multi-dimensionnal array
function arrayExists(array,value){
    let row;//<- to get all row of the array
    return array.some(row => row.includes(value));
}


//what to do when a move is wrong
function wrongMove(lastCase = "",newCase = ""){
    $(newCase+" div,"+lastCase+" div").css("border","2px solid red");
    $(newCase+","+lastCase).css("animation","tilt-shaking 0.2s ease-in-out 1");
    WRONG_MOVE_SOUND.play();
    setTimeout(
        function(){
            $(newCase+" div,"+lastCase+" div").css("border","");
            $(newCase+","+lastCase).css("animation","");
        },550);
}


//to reformate a currentCaseClassing into the css class selector
function classForm(htmlClass = ""){
    let cssClass = ".";
    for(let i=0;i<htmlClass.length;i++){
        if(htmlClass[i]!=" "){
            cssClass=cssClass+htmlClass[i];
        }else{
            cssClass=cssClass+".";
        }
    }
    return cssClass;
}


//function that return the piece's class  , else  return 1 if there are no piece
function pieceCase(caseClass = ""){
    let array = arrayCopy($(caseClass).children())
    let pieceClass = "";
    for(let i=0;i<array.length;i++){
        if($(array[i]).css("z-index") == "5"){
            pieceClass = array[i].className;
        }
    }
    if(pieceClass == ""){
        return 1;
    }
    return classForm(pieceClass);
}


//function that takes classes (eg : .className) and move the selected piece
function pieceMove(lastCase = "",newCase = "",pieceClass = "",caseZindex = 0,pieceMouvementLog = []){
    //when moving into a case unhighlighted
    if(caseZindex != 3){
        wrongMove(lastCase,newCase);
        return 1;
    }

    if(pieceClass != 1){

        //rule when a piece move into an empty case
        if(pieceCase(newCase) == 1){

            MOVE_SOUND.play();
            $(lastCase+" "+pieceClass).css("z-index","0");
            $(newCase+" "+pieceClass).css("z-index","5");

            //castling
            if(pieceClass.includes("king") &&   (newCase.includes("a3") || newCase.includes("a7"))  && lastCase.includes("a5")){
                if(pieceClass.includes("fotsy")){
                    if(newCase.includes("a3")){
                        $(".VIII .a1 .rook.fotsy").css("z-index","0");
                        $(".VIII .a4 .rook.fotsy").css("z-index","5");
                        pieceMouvementLog.push([pieceClass,lastCase,newCase,".rook.fotsy",".VIII .a1",".VIII .a4"]);
                        return 0;
                    }else{
                        $(".VIII .a8 .rook.fotsy").css("z-index","0");
                        $(".VIII .a6 .rook.fotsy").css("z-index","5");
                        pieceMouvementLog.push([pieceClass,lastCase,newCase,".rook.fotsy",".VIII .a8",".VIII .a6"]);
                        return 0;
                    }
                }else{
                    if(newCase.includes("a3")){
                        $(".I .a1 .rook.mainty").css("z-index","0");
                        $(".I .a4 .rook.mainty").css("z-index","5");
                        pieceMouvementLog.push([pieceClass,lastCase,newCase,".rook.mainty",".I .a1",".I .a4"]);
                        return 0;
                    }else{
                        $(".I .a8 .rook.mainty").css("z-index","0");
                        $(".I .a6 .rook.mainty").css("z-index","5");
                        pieceMouvementLog.push([pieceClass,lastCase,newCase,".rook.mainty",".I .a8",".I .a6"]);
                        return 0;
                    }
                }
            }

            pieceMouvementLog.push([pieceClass,lastCase,newCase]);
        }else{

            //rule when a piece move into a case containing a enemy piece.
            if(pieceCase(newCase).includes("mainty") == true && $(pieceClass).hasClass("fotsy")==true 
                || pieceCase(newCase).includes("fotsy") == true && $(pieceClass).hasClass("mainty")==true )
            {
                CAPTURE_SOUND.play();
                $(lastCase+" "+pieceClass).css("z-index","0");
                $(newCase+" "+pieceCase(newCase)).css("z-index","0");
                $(newCase+" "+pieceClass).css("z-index","5");
                pieceMouvementLog.push([pieceClass,lastCase,newCase]);
            }

            //when it doesn't move
            else if(lastCase == newCase){}

            //rule when moving into a piece of the same color
            else if(pieceCase(newCase).includes("mainty") == true && $(pieceClass).hasClass("mainty")==true 
                || pieceCase(newCase).includes("fotsy") == true && $(pieceClass).hasClass("fotsy")==true )
            {
                wrongMove(lastCase,newCase);
                return 1;
            }
        }

        //rule when a white pawn is to be promoted
        if($(pieceClass).hasClass("pawn fotsy") == true && lastCase.includes(".II") == true && lastCase.includes(".III") == false){
            $(".choice-box").css("z-index","3");
            $(".choice-box i").css("color","white");
            $(".choice-box i").css("text-shadow","0 0 5px black");
        }

        //rule when a black pawn is to be promoted
        if($(pieceClass).hasClass("pawn mainty") == true && lastCase.includes(".VII") == true && lastCase.includes(".VIII") == false){
            $(".choice-box").css("z-index","3");
            $(".choice-box i").css("color","black");
            $(".choice-box i").css("text-shadow","0 0 5px white");
        }
    }
    return 0;
}



function pawnMovement(row_class = [] , col_class = [] , row_value = 0 , col_value = 0 , enemy_color = "" , currentCaseClass = ""){
    
    let array = [];//<- to check if there is any pieces
    switch (enemy_color){
        case "fotsy" : 
                        for(let i=col_value-1;i<=col_value+1;i++){
                            array.push([pieceCase(row_class[row_value+1]+" "+col_class[i]),i]);
                        }
                        if(currentCaseClass.includes("row.II") == true && currentCaseClass.includes("III") == false){
                            for(let i=2;i<4;i++){
                                if(pieceCase(row_class[i]+" "+col_class[col_value]) == 1){
                                    $(row_class[i]+" "+col_class[col_value]+" .selector").css("z-index","3");
                                }else break;
                            }
                        }else if(array[1][0]==1){
                                    $(row_class[row_value+1]+" "+col_class[array[1][1]]+" .selector").css("z-index","3");
                                }
                        if($(array[0][0]).hasClass("fotsy")){
                            $(row_class[row_value+1]+" "+col_class[array[0][1]]+" .selector").css("z-index","3");
                        }
                        if($(array[2][0]).hasClass("fotsy")){
                            $(row_class[row_value+1]+" "+col_class[array[2][1]]+" .selector").css("z-index","3");
                        }
                        break;

        case "mainty" :  
                        for(let i=col_value+1;i>=col_value-1;i--){
                            array.push([pieceCase(row_class[row_value-1]+" "+col_class[i]),i]);
                        }
                        if(currentCaseClass.includes("row.VII") == true){
                            for(let i=5;i>3;i--){
                                if(pieceCase(row_class[i]+" "+col_class[col_value]) == 1){
                                    $(row_class[i]+" "+col_class[col_value]+" .selector").css("z-index","3");
                                }else break;
                            }
                        }else if(array[1][0]==1){
                                $(row_class[row_value-1]+" "+col_class[array[1][1]]+" .selector").css("z-index","3");
                        }
                        if($(array[0][0]).hasClass("mainty")){
                            $(row_class[row_value-1]+" "+col_class[array[0][1]]+" .selector").css("z-index","3");
                        }
                        if($(array[2][0]).hasClass("mainty")){
                            $(row_class[row_value-1]+" "+col_class[array[2][1]]+" .selector").css("z-index","3");
                        }
    }                
}



function rookMovement(row_class = [] , col_class = [] , row_value = 0 , col_value = 0 , enemy_color = "" , currentCaseClass = ""){
    for(let i=row_value+1;i<8;i++){
        if(pieceCase(row_class[i]+" "+col_class[col_value]) == 1){
            $(row_class[i]+" "+col_class[col_value]+" .selector").css("z-index","3");
        }else{
            if($(pieceCase(row_class[i]+" "+col_class[col_value])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[col_value]+" .selector").css("z-index","3");
                if($(pieceCase(row_class[i]+" "+col_class[col_value])).hasClass("king") == true){
                    continue;
                }
            }
            break;
        }
    }
    for(let i=row_value-1;i>=0;i--){
        if(pieceCase(row_class[i]+" "+col_class[col_value]) == 1){
            $(row_class[i]+" "+col_class[col_value]+" .selector").css("z-index","3");
        }else{
            if($(pieceCase(row_class[i]+" "+col_class[col_value])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[col_value]+" .selector").css("z-index","3");
                if($(pieceCase(row_class[i]+" "+col_class[col_value])).hasClass("king") == true){
                    continue;
                }
            }
            break;
        }
    }
    for(let i=col_value+1;i<8;i++){
        if(pieceCase(row_class[row_value]+" "+col_class[i]) == 1){
            $(row_class[row_value]+" "+col_class[i]+" .selector").css("z-index","3");
        }else{
            if($(pieceCase(row_class[row_value]+" "+col_class[i])).hasClass(enemy_color)){
                $(row_class[row_value]+" "+col_class[i]+" .selector").css("z-index","3");
                if($(pieceCase(row_class[row_value]+" "+col_class[i])).hasClass("king") == true){
                    continue;
                }
            }
            break;
        }
    }
    for(let i=col_value-1;i>=0;i--){
        if(pieceCase(row_class[row_value]+" "+col_class[i]) == 1){
            $(row_class[row_value]+" "+col_class[i]+" .selector").css("z-index","3");
        }else{
            if($(pieceCase(row_class[row_value]+" "+col_class[i])).hasClass(enemy_color)){
                $(row_class[row_value]+" "+col_class[i]+" .selector").css("z-index","3");
                if($(pieceCase(row_class[row_value]+" "+col_class[i])).hasClass("king") == true){
                    continue;
                }
            }
            break;
        }
    }
}



function bishopMovement(row_class = [] , col_class = [] , row_value = 0 , col_value = 0 , enemy_color = "" , currentCaseClass = ""){
    for(let i=row_value+1,j=col_value+1;i<8;i++,j++){
        if(pieceCase(row_class[i]+" "+col_class[j]) == 1){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(pieceCase(row_class[i]+" "+col_class[j])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
                if($(pieceCase(row_class[i]+" "+col_class[j])).hasClass("king")){
                    continue;
                }
            }
            break;
        }
    }
    for(let i=row_value-1,j=col_value-1;i>=0;i--,j--){
        if(pieceCase(row_class[i]+" "+col_class[j]) == 1){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(pieceCase(row_class[i]+" "+col_class[j])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
                if($(pieceCase(row_class[i]+" "+col_class[j])).hasClass("king")){
                    continue;
                }
            }
            break;
        }    }
    for(let i=row_value+1,j=col_value-1;i<8;i++,j--){
        if(pieceCase(row_class[i]+" "+col_class[j]) == 1){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(pieceCase(row_class[i]+" "+col_class[j])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
                if($(pieceCase(row_class[i]+" "+col_class[j])).hasClass("king")){
                    continue;
                }
            }
            break;
        }    }
    for(let i=row_value-1,j=col_value+1;i>=0;i--,j++){
        if(pieceCase(row_class[i]+" "+col_class[j]) == 1){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(pieceCase(row_class[i]+" "+col_class[j])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
                if($(pieceCase(row_class[i]+" "+col_class[j])).hasClass("king")){
                    continue;
                }
            }
            break;
        }    }
}



function kingMovement(row_class = [] , col_class = [] , row_value = 0 , col_value = 0 , enemy_color = "" , currentCaseClass = "", pieceMouvementLog = [[]], couverture = [[],[]]){
    //the king's normal moves
    for(let i=col_value-1;i<col_value+2;i++){
        for(let j=row_value-1;j<row_value+2;j++){
            if(pieceCase(row_class[j]+" "+col_class[i]) == 1){
                if(enemy_color == "fotsy"){
                    if(couverture[0].includes(row_class[j]+" "+col_class[i]) == false){
                        $(row_class[j]+" "+col_class[i]+" .selector").css("z-index","3");
                    }
                }else{
                    if(couverture[1].includes(row_class[j]+" "+col_class[i]) == false){
                        $(row_class[j]+" "+col_class[i]+" .selector").css("z-index","3");
                    }
                }
            }else{
                if($(pieceCase(row_class[j]+" "+col_class[i])).hasClass(enemy_color)){
                    $(row_class[j]+" "+col_class[i]+" .selector").css("z-index","3");
                }
            }
        }
    }

    //castling
    if( (row_value == 7 || row_value == 0)  && col_value == 4){


        let caseAvailability = 0;//<- to check the cases' availability
        for(let i = 1 ; i<col_value ; i++){
            if(pieceCase(row_class[row_value]+" "+col_class[i]) == 1){
                caseAvailability++;
            }
        }
        if(caseAvailability == 3 && 
            (row_value == 7 && //<-  for white
            arrayExists(pieceMouvementLog,".row.VIII .black.a1") == false &&
            arrayExists(pieceMouvementLog,".row.VIII .black.a5") == false &&
            couverture[1].includes(String(row_class[7]+" "+col_class[3])) == false &&
            couverture[1].includes(String(row_class[7]+" "+col_class[2])) == false ||
            row_value == 0 && //<- for black
            arrayExists(pieceMouvementLog,".row.I .white.a1") == false &&
            arrayExists(pieceMouvementLog,".row.I .white.a5") == false &&
            couverture[0].includes(String(row_class[0]+" "+col_class[3])) == false &&
            couverture[0].includes(String(row_class[0]+" "+col_class[2])) == false))
            {
                $(row_class[row_value]+" "+col_class[col_value-2]+" .selector").css("z-index","3");
            }
        

        caseAvailability = 0
        for(let i = col_value+1 ; i<=col_value+2 ; i++){
            if(pieceCase(row_class[row_value]+" "+col_class[i]) == 1){
                caseAvailability++;
            }
        }
        if(caseAvailability == 2 && 
            (row_value == 7 && 
            arrayExists(pieceMouvementLog,String(".row.VIII .white.a8")) == false &&
            arrayExists(pieceMouvementLog,String(".row.VIII .black.a5")) == false &&
            couverture[1].includes(String(row_class[7]+" "+col_class[5])) == false &&
            couverture[1].includes(String(row_class[7]+" "+col_class[6])) == false ||
            row_value == 0 && 
            arrayExists(pieceMouvementLog,String(".row.I .black.a8")) == false &&
            arrayExists(pieceMouvementLog,String(".row.I .white.a5")) == false &&
            couverture[0].includes(String(row_class[0]+" "+col_class[5])) == false &&
            couverture[0].includes(String(row_class[0]+" "+col_class[6])) == false))
            {
                $(row_class[row_value]+" "+col_class[col_value+2]+" .selector").css("z-index","3");
            }
    }
}



function queenMovement(row_class = [] , col_class = [] , row_value = 0 , col_value = 0 , enemy_color = "" , currentCaseClass = ""){
    //the square move
    for(let i=col_value-1;i<col_value+2;i++){
        for(let j=row_value-1;j<row_value+2;j++){
            if(pieceCase(row_class[j]+" "+col_class[i]) == 1){
                $(row_class[j]+" "+col_class[i]+" .selector").css("z-index","3");
            }else{
                if($(pieceCase(row_class[j]+" "+col_class[i])).hasClass(enemy_color)){
                    $(row_class[j]+" "+col_class[i]+" .selector").css("z-index","3");
                }
            }
        }
    }

    // the X move
    for(let i=row_value+1,j=col_value+1;i<8;i++,j++){
        if(pieceCase(row_class[i]+" "+col_class[j]) == 1){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(pieceCase(row_class[i]+" "+col_class[j])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
                if($(pieceCase(row_class[i]+" "+col_class[j])).hasClass("king")){
                    continue;
                }
            }
            break;
        }
    }
    for(let i=row_value-1,j=col_value-1;i>=0;i--,j--){
        if(pieceCase(row_class[i]+" "+col_class[j]) == 1){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(pieceCase(row_class[i]+" "+col_class[j])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
                if($(pieceCase(row_class[i]+" "+col_class[j])).hasClass("king")){
                    continue;
                }
            }
            break;
        }    }
    for(let i=row_value+1,j=col_value-1;i<8;i++,j--){
        if(pieceCase(row_class[i]+" "+col_class[j]) == 1){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(pieceCase(row_class[i]+" "+col_class[j])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
                if($(pieceCase(row_class[i]+" "+col_class[j])).hasClass("king")){
                    continue;
                }
            }
            break;
        }    }
    for(let i=row_value-1,j=col_value+1;i>=0;i--,j++){
        if(pieceCase(row_class[i]+" "+col_class[j]) == 1){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(pieceCase(row_class[i]+" "+col_class[j])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
                if($(pieceCase(row_class[i]+" "+col_class[j])).hasClass("king")){
                    continue;
                }
            }
            break;
        }
    }

    //the + move
    for(let i=row_value+1;i<8;i++){
        if(pieceCase(row_class[i]+" "+col_class[col_value]) == 1){
            $(row_class[i]+" "+col_class[col_value]+" .selector").css("z-index","3");
        }else{
            if($(pieceCase(row_class[i]+" "+col_class[col_value])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[col_value]+" .selector").css("z-index","3");
                if($(pieceCase(row_class[i]+" "+col_class[col_value])).hasClass("king")){
                    continue;
                }
            }
            break;
        }
    }
    for(let i=row_value-1;i>=0;i--){
        if(pieceCase(row_class[i]+" "+col_class[col_value]) == 1){
            $(row_class[i]+" "+col_class[col_value]+" .selector").css("z-index","3");
        }else{
            if($(pieceCase(row_class[i]+" "+col_class[col_value])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[col_value]+" .selector").css("z-index","3");
                if($(pieceCase(row_class[i]+" "+col_class[col_value])).hasClass("king")){
                    continue;
                }
            }
            break;
        }
    }
    for(let i=col_value+1;i<8;i++){
        if(pieceCase(row_class[row_value]+" "+col_class[i]) == 1){
            $(row_class[row_value]+" "+col_class[i]+" .selector").css("z-index","3");
        }else{
            if($(pieceCase(row_class[row_value]+" "+col_class[i])).hasClass(enemy_color)){
                $(row_class[row_value]+" "+col_class[i]+" .selector").css("z-index","3");
                if($(pieceCase(row_class[row_value]+" "+col_class[i])).hasClass("king")){
                    continue;
                }
            }
            break;
        }
    }
    for(let i=col_value-1;i>=0;i--){
        if(pieceCase(row_class[row_value]+" "+col_class[i]) == 1){
            $(row_class[row_value]+" "+col_class[i]+" .selector").css("z-index","3");
        }else{
            if($(pieceCase(row_class[row_value]+" "+col_class[i])).hasClass(enemy_color)){
                $(row_class[row_value]+" "+col_class[i]+" .selector").css("z-index","3");
                if($(pieceCase(row_class[row_value]+" "+col_class[i])).hasClass("king")){
                    continue;
                }
            }
            break;
        }
    }
}



function knightMovement(row_class = [] , col_class = [] , row_value = 0 , col_value = 0 , enemy_color = "" , currentCaseClass = ""){
    for(let i=row_value-3,j=col_value;i<=row_value-1;i++,j++){
        if(pieceCase(row_class[i]+" "+col_class[j]) == 1 && i!=row_value-3){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(pieceCase(row_class[i]+" "+col_class[j])).hasClass(enemy_color) && i!=row_value-3){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
            }
        }      
    }
    for(let i=row_value-3,j=col_value;i<=row_value-1;i++,j--){
        if(pieceCase(row_class[i]+" "+col_class[j]) == 1 && i!=row_value-3){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(pieceCase(row_class[i]+" "+col_class[j])).hasClass(enemy_color) && i!=row_value-3){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
            }
        } 
    }
    for(let i=row_value+3,j=col_value;i>=row_value+1;i--,j++){
        if(pieceCase(row_class[i]+" "+col_class[j]) == 1 && i!=row_value+3){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(pieceCase(row_class[i]+" "+col_class[j])).hasClass(enemy_color) && i!=row_value+3){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
            }
        } 
    }
    for(let i=row_value+3,j=col_value;i>=row_value+1;i--,j--){
        if(pieceCase(row_class[i]+" "+col_class[j]) == 1 && i!=row_value+3){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(pieceCase(row_class[i]+" "+col_class[j])).hasClass(enemy_color) && i!=row_value+3){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
            }
        } 
    }
}


function caseSelect(currentCaseClass = "",last_case_log = [], pieceMouvementLog = [], couverture = [[],[]]){

    let row_class = COORDINATE_LIST[0]; //<- list of all the row classes
    let col_class = COORDINATE_LIST[1]; //<- list of all the column classes

    let j = last_case_log.length-1;//<- self explanatory


    if(last_case_log[j]!="" && last_case_log[j]!=currentCaseClass){
        $(".selector").css("z-index","0");
    }


    if(currentCaseClass != last_case_log[j]){
        //defining coordinate
        let piece = pieceCase(currentCaseClass);
        let last_piece = pieceCase(last_case_log[j]);
        $(currentCaseClass+" .selector").css("z-index","3");
        let col_value = 0;
        let row_value = 0;
        for(let i=0;i<8;i++){
                if(currentCaseClass.includes(col_class[i]) == true){
                    col_value = i;
                }
                if(currentCaseClass.includes(row_class[i]) == true){
                    row_value = i;
                }
        }

        if(last_piece != 1 && piece == 1){
            $(currentCaseClass+" .selector").css("z-index","0");
        }

        if($(piece).hasClass("pawn") == true){
            //$(".selector").css("z-index","0");
            if($(piece).hasClass("mainty") == true){
                pawnMovement(row_class,col_class,row_value,col_value,"fotsy" , currentCaseClass);
            }

            if($(piece).hasClass("fotsy") == true){
                pawnMovement(row_class,col_class,row_value,col_value,"mainty" , currentCaseClass);
            }
        }

        if($(piece).hasClass("rook") == true){
            if($(piece).hasClass("mainty") == true){
                rookMovement(row_class,col_class,row_value,col_value,"fotsy" , currentCaseClass);
            }

            if($(piece).hasClass("fotsy") == true){
                rookMovement(row_class,col_class,row_value,col_value,"mainty" , currentCaseClass);
            }
        }

        if($(piece).hasClass("bishop") == true){
            if($(piece).hasClass("mainty") == true){
                bishopMovement(row_class,col_class,row_value,col_value,"fotsy" , currentCaseClass);
            }

            if($(piece).hasClass("fotsy") == true){
                bishopMovement(row_class,col_class,row_value,col_value,"mainty" , currentCaseClass);
            }
        }

        if($(piece).hasClass("king") == true){
            if($(piece).hasClass("mainty") == true){
                kingMovement(row_class,col_class,row_value,col_value,"fotsy" , currentCaseClass, pieceMouvementLog, couverture);
            }

            if($(piece).hasClass("fotsy") == true){
                kingMovement(row_class,col_class,row_value,col_value,"mainty" , currentCaseClass, pieceMouvementLog, couverture);
            }  
        }

        if($(piece).hasClass("queen") == true){
            if($(piece).hasClass("mainty") == true){
                queenMovement(row_class,col_class,row_value,col_value,"fotsy" , currentCaseClass);
            }

            if($(piece).hasClass("fotsy") == true){
                queenMovement(row_class,col_class,row_value,col_value,"mainty" , currentCaseClass);
            }  
        }

        if($(piece).hasClass("knight") == true){
            if($(piece).hasClass("mainty") == true){
                knightMovement(row_class,col_class,row_value,col_value,"fotsy" , currentCaseClass);
            }

            if($(piece).hasClass("fotsy") == true){
                knightMovement(row_class,col_class,row_value,col_value,"mainty" , currentCaseClass);
            }  
        }
    }


    if(currentCaseClass == last_case_log[j]){
        if($(currentCaseClass+" .selector").css("z-index")=="3"){
            $(".selector").css("z-index","0");
            last_case_log.push("");
            return 1;
        }else{
            $(currentCaseClass+" .selector").css("z-index","3");
        }
    }
    last_case_log.push(currentCaseClass);
}

//to get the cases that a color control
function piecesCouverture(color_couverture = [], pieceColor = "", row_class = [], col_class = []){

    //reset color_couverture
    color_couverture.splice(0,color_couverture.length);


    //iterating through the cases
    for(let i = 0; i < row_class.length; i++){
        for(let j = 0; j < col_class.length; j++){

            if(String(pieceCase(row_class[i]+" "+col_class[j])).includes(pieceColor)){

                //selecting a case if it containes a piece
                caseSelect(row_class[i]+" "+col_class[j]);

                //iterating through the cases again to find all highlighted cases
                for(let k = 0; k < row_class.length; k++){
                    for(let l = 0; l < col_class.length; l++){

                        //case when the piece is not a pawn , it just add all the pieces's possible movement
                        if(String(pieceCase(row_class[i]+" "+col_class[j])).includes("pawn") == false){
                            if($(row_class[k]+" "+col_class[l]+" .selector").css("z-index") == 3){
                                if(color_couverture.includes(row_class[k]+" "+col_class[l]) == false){
                                    color_couverture.push(row_class[k]+" "+col_class[l]);
                                }
                            }
                        }
                        //if it's a pawn , then it adds the cases where the pawn can capture a piece
                        else{
                            if($(row_class[k]+" "+col_class[l]+" .selector").css("z-index") == 3){
                                if(row_class[k]+" "+col_class[l] == row_class[i]+" "+col_class[j]){
                                    if(color_couverture.includes(row_class[k]+" "+col_class[l]) == false){
                                        color_couverture.push(row_class[k]+" "+col_class[l]);
                                    }

                                    switch(pieceColor){
                                        case "fotsy":   if(color_couverture.includes(row_class[k-1]+" "+col_class[l-1]) == false){
                                                            if(l-1 >= 0){
                                                                color_couverture.push(row_class[k-1]+" "+col_class[l-1]);
                                                            }
                                                        }
                                                        if(color_couverture.includes(row_class[k-1]+" "+col_class[l+1]) == false){
                                                            if(l+1 < col_class.length){
                                                                color_couverture.push(row_class[k-1]+" "+col_class[l+1]);
                                                            }
                                                        }
                                                        break;
                                        case "mainty":   if(color_couverture.includes(row_class[k+1]+" "+col_class[l-1]) == false){
                                                            if(l-1 >= 0){
                                                                color_couverture.push(row_class[k+1]+" "+col_class[l-1]);
                                                            }
                                                        }
                                                        if(color_couverture.includes(row_class[k+1]+" "+col_class[l+1]) == false){
                                                            if(l+1 < col_class.length){
                                                                color_couverture.push(row_class[k+1]+" "+col_class[l+1]);
                                                            }
                                                        }
                                    }
                                }
                            }
                        }
                        
                    }
                }

                //deselect all the cases
                $(".selector").css("z-index","0");
            }
        }
    }
}

//check if a king is checked , return the king's position if yes and false if not
function isChecked(enemy_couverture = [], kingColor = ""){

    let row_class = COORDINATE_LIST[0]; //<- list of all the row classes
    let col_class = COORDINATE_LIST[1]; //<- list of all the column classes

    for(let i = 0; i < row_class.length; i++){
        for(let j = 0; j < col_class.length; j++){
            if(String(pieceCase(row_class[i]+" "+col_class[j])).includes(".king."+kingColor)){
                if(enemy_couverture.includes(row_class[i]+" "+col_class[j])){
                    return row_class[i]+" "+col_class[j];
                }else{
                    return false;
                }
            }
        }
    }
}


//to check a checkmate , return true or false
function isCheckMated(enemyColorCouverture = [], kingColor = "", gameState = []){
    if (isChecked(enemyColorCouverture, kingColor) == false){
        return false;
    }

    let row_class = COORDINATE_LIST[0]; //<- list of all the row classes
    let col_class = COORDINATE_LIST[1]; //<- list of all the column classes
    
    let enemy_couverture = [];

    switch(kingColor){
        case "fotsy":   
            for(let i = 0; i < row_class.length; i++){
                for(let j = 0; j < col_class.length; j++){
        
                    if(String(pieceCase(row_class[i]+" "+col_class[j])).includes(kingColor)){
        
                        //iterating through the cases again to find all highlighted cases
                        for(let k = 0; k < row_class.length; k++){
                            for(let l = 0; l < col_class.length; l++){

                                //selecting a case if it containes a piece
                                caseSelect(row_class[i]+" "+col_class[j]);

                                if($(row_class[k]+" "+col_class[l]+" .selector").css("z-index") == 3 && row_class[k]+" "+col_class[l] != row_class[i]+" "+col_class[j]){
                                    
                                    $(row_class[k]+" "+col_class[l]+" "+pieceCase(row_class[k]+" "+col_class[l])).css("z-index", "0");
                                    $(row_class[k]+" "+col_class[l]+" "+pieceCase(row_class[i]+" "+col_class[j])).css("z-index", "5");
                                    $(row_class[i]+" "+col_class[j]+" "+pieceCase(row_class[i]+" "+col_class[j])).css("z-index", "0");
                                    piecesCouverture(enemy_couverture, "mainty", row_class, col_class);
                                    if(isChecked(enemy_couverture, "fotsy") == false){
                                        loadGameState(gameState);
                                        return false;
                                    }
                                    loadGameState(gameState);
                                    
                                }
                            }
                        }
                        $(".selector").css("z-index","0");
                    }
                }
            }
            break;
        case "mainty": 
            for(let i = 0; i < row_class.length; i++){
                for(let j = 0; j < col_class.length; j++){
        
                    if(String(pieceCase(row_class[i]+" "+col_class[j])).includes(kingColor)){
        
                        //iterating through the cases again to find all highlighted cases
                        for(let k = 0; k < row_class.length; k++){
                            for(let l = 0; l < col_class.length; l++){

                                //selecting a case if it containes a piece
                                caseSelect(row_class[i]+" "+col_class[j]);

                                if($(row_class[k]+" "+col_class[l]+" .selector").css("z-index") == 3 && row_class[k]+" "+col_class[l] != row_class[i]+" "+col_class[j]){
                                    
                                    $(row_class[k]+" "+col_class[l]+" "+pieceCase(row_class[k]+" "+col_class[l])).css("z-index", "0");
                                    $(row_class[k]+" "+col_class[l]+" "+pieceCase(row_class[i]+" "+col_class[j])).css("z-index", "5");
                                    $(row_class[i]+" "+col_class[j]+" "+pieceCase(row_class[i]+" "+col_class[j])).css("z-index", "0");
                                    piecesCouverture(enemy_couverture, "fotsy", row_class, col_class);
                                    if(isChecked(enemy_couverture, "mainty") == false){
                                        loadGameState(gameState);
                                        return false;
                                    }
                                    loadGameState(gameState);
                                }
                            }
                        }
                        $(".selector").css("z-index","0");
                    }
                }
            }     
    }

    return true;
}

//to save the current game state into a variable
function saveGameState(gameState = [], row_class = [], col_class = []){
    gameState.splice(0,gameState.length);
    for(let i=0; i<row_class.length; i++){
        for(let j=0; j<col_class.length; j++){
            gameState.push([String(row_class[i]+" "+col_class[j]),pieceCase(row_class[i]+" "+col_class[j])]);
        }
    }
}

//to load a game state
function loadGameState(gameState = [[]]){
    $("i").css("z-index","0");
    for(let i=0; i<gameState.length; i++){
        if(gameState[i][1] != 1){ 
            $(gameState[i][0]+" "+gameState[i][1]).css("z-index","5");
        }
    }
}
