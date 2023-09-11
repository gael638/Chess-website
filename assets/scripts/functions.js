function array_copy(src = []){
    let dest = [];
    for(let i=0;src[i]!=undefined;i++){
        dest.push(src[i]);
    }
    return dest;
}//return the copied array



function wrong_move(last_case = "",new_case = ""){
    $(new_case+" div,"+last_case+" div").css("border","2px solid red");
    $(new_case+","+last_case).css("animation","tilt-shaking 0.2s ease-in-out 1");
    let audio = new Audio('./assets/sounds/wrong.mp3');
    audio.play();
    setTimeout(
        function(){
            $(new_case+" div,"+last_case+" div").css("border","");
            $(new_case+","+last_case).css("animation","");
        },550);
}//what to do when a move is wrong



function class_form(str){
    let str1 = ".";
    for(let i=0;i<str.length;i++){
        if(str[i]!=" "){
            str1=str1+str[i];
        }else{
            str1=str1+".";
        }
    }
    return str1;
}//reformate a string into the css class selector



function piece_case(str){
    let array = array_copy($(str).children())
    let piece_class = "";
    for(let i=0;i<array.length;i++){
        if($(array[i]).css("z-index") == "5"){
            piece_class = array[i].className;
        }
    }
    if(piece_class == ""){
        return 1;
    }
    return class_form(piece_class);
}//return the piece's class  , else  return 1 if there are no piece



function piece_move(last_case = "",new_case = "",piece_class = ""){
    if(piece_class != 1){
        console.log($(new_case+" .selector").css("z-index"));
        if(piece_case(new_case) == 1 //&& $(new_case+" .selector").css("z-index")=="3"
        ){
            $(last_case+" "+piece_class).css("z-index","0");
            $(new_case+" "+piece_class).css("z-index","5");
        }//rule when a piece move into an empty case
        else  if($(new_case+" .selector").css("z-index")!="3"){
            wrong_move(last_case,new_case);
        }else{
            if(piece_case(new_case).includes("mainty") == true && $(piece_class).hasClass("fotsy")==true 
                || piece_case(new_case).includes("fotsy") == true && $(piece_class).hasClass("mainty")==true )
            {
                $(last_case+" "+piece_class).css("z-index","0");
                $(new_case+" "+piece_case(new_case)).css("z-index","0");
                $(new_case+" "+piece_class).css("z-index","5");
                console.log("here");
            }//rule when a piece move into a case containing a enemy piece.
            else if(last_case == new_case){

            }
            else if(piece_case(new_case).includes("mainty") == true && $(piece_class).hasClass("mainty")==true 
                || piece_case(new_case).includes("fotsy") == true && $(piece_class).hasClass("fotsy")==true )
            {
                wrong_move(last_case,new_case);
            }//rule when moving into a piece of the same color
        }
    }
}//takes classes (eg : .className) and move the selected piece



function pawn_movement(row_class = [] , col_class = [] , row_value = 0 , col_value = 0 , enemy_color = "" , str = ""){
    
    let array = [];//<- to check if there is any pieces
    switch (enemy_color){
        case "fotsy" : 
                        for(let i=col_value-1;i<=col_value+1;i++){
                            array.push([piece_case(row_class[row_value+1]+" "+col_class[i]),i]);
                        }
                        if(str.includes("II") == true && str.includes("III") == false){
                            for(let i=2;i<4;i++){
                                if(piece_case(row_class[i]+" "+col_class[col_value]) == 1){
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
                            array.push([piece_case(row_class[row_value-1]+" "+col_class[i]),i]);
                        }
                        if(str.includes("row.VII") == true){
                            for(let i=5;i>3;i--){
                                if(piece_case(row_class[i]+" "+col_class[col_value]) == 1){
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



function rook_movement(row_class = [] , col_class = [] , row_value = 0 , col_value = 0 , enemy_color = "" , str = ""){
    for(let i=row_value+1;i<8;i++){
        if(piece_case(row_class[i]+" "+col_class[col_value]) == 1){
            $(row_class[i]+" "+col_class[col_value]+" .selector").css("z-index","3");
        }else{
            if($(piece_case(row_class[i]+" "+col_class[col_value])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[col_value]+" .selector").css("z-index","3");
            }
            break;
        }
    }
    for(let i=row_value-1;i>=0;i--){
        if(piece_case(row_class[i]+" "+col_class[col_value]) == 1){
            $(row_class[i]+" "+col_class[col_value]+" .selector").css("z-index","3");
        }else{
            if($(piece_case(row_class[i]+" "+col_class[col_value])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[col_value]+" .selector").css("z-index","3");
            }
            break;
        }
    }
    for(let i=col_value+1;i<8;i++){
        if(piece_case(row_class[row_value]+" "+col_class[i]) == 1){
            $(row_class[row_value]+" "+col_class[i]+" .selector").css("z-index","3");
        }else{
            if($(piece_case(row_class[row_value]+" "+col_class[i])).hasClass(enemy_color)){
                $(row_class[row_value]+" "+col_class[i]+" .selector").css("z-index","3");
            }
            break;
        }
    }
    for(let i=col_value-1;i>=0;i--){
        if(piece_case(row_class[row_value]+" "+col_class[i]) == 1){
            $(row_class[row_value]+" "+col_class[i]+" .selector").css("z-index","3");
        }else{
            if($(piece_case(row_class[row_value]+" "+col_class[i])).hasClass(enemy_color)){
                $(row_class[row_value]+" "+col_class[i]+" .selector").css("z-index","3");
            }
            break;
        }
    }
}



function bishop_movement(row_class = [] , col_class = [] , row_value = 0 , col_value = 0 , enemy_color = "" , str = ""){
    for(let i=row_value+1,j=col_value+1;i<8;i++,j++){
        if(piece_case(row_class[i]+" "+col_class[j]) == 1){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(piece_case(row_class[i]+" "+col_class[j])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
            }
            break;
        }
    }
    for(let i=row_value-1,j=col_value-1;i>=0;i--,j--){
        if(piece_case(row_class[i]+" "+col_class[j]) == 1){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(piece_case(row_class[i]+" "+col_class[j])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
            }
            break;
        }    }
    for(let i=row_value+1,j=col_value-1;i<8;i++,j--){
        if(piece_case(row_class[i]+" "+col_class[j]) == 1){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(piece_case(row_class[i]+" "+col_class[j])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
            }
            break;
        }    }
    for(let i=row_value-1,j=col_value+1;i>=0;i--,j++){
        if(piece_case(row_class[i]+" "+col_class[j]) == 1){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(piece_case(row_class[i]+" "+col_class[j])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
            }
            break;
        }    }
}



function king_movement(row_class = [] , col_class = [] , row_value = 0 , col_value = 0 , enemy_color = "" , str = ""){
    for(let i=col_value-1;i<col_value+2;i++){
        for(let j=row_value-1;j<row_value+2;j++){
            if(piece_case(row_class[j]+" "+col_class[i]) == 1){
                $(row_class[j]+" "+col_class[i]+" .selector").css("z-index","3");
            }else{
                if($(piece_case(row_class[j]+" "+col_class[i])).hasClass(enemy_color)){
                    $(row_class[j]+" "+col_class[i]+" .selector").css("z-index","3");
                }
            }
        }
    }
}



function queen_movement(row_class = [] , col_class = [] , row_value = 0 , col_value = 0 , enemy_color = "" , str = ""){
    for(let i=col_value-1;i<col_value+2;i++){
        for(let j=row_value-1;j<row_value+2;j++){
            if(piece_case(row_class[j]+" "+col_class[i]) == 1){
                $(row_class[j]+" "+col_class[i]+" .selector").css("z-index","3");
            }else{
                if($(piece_case(row_class[j]+" "+col_class[i])).hasClass(enemy_color)){
                    $(row_class[j]+" "+col_class[i]+" .selector").css("z-index","3");
                }
            }
        }
    }


    for(let i=row_value+1,j=col_value+1;i<8;i++,j++){
        if(piece_case(row_class[i]+" "+col_class[j]) == 1){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(piece_case(row_class[i]+" "+col_class[j])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
            }
            break;
        }
    }
    for(let i=row_value-1,j=col_value-1;i>=0;i--,j--){
        if(piece_case(row_class[i]+" "+col_class[j]) == 1){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(piece_case(row_class[i]+" "+col_class[j])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
            }
            break;
        }    }
    for(let i=row_value+1,j=col_value-1;i<8;i++,j--){
        if(piece_case(row_class[i]+" "+col_class[j]) == 1){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(piece_case(row_class[i]+" "+col_class[j])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
            }
            break;
        }    }
    for(let i=row_value-1,j=col_value+1;i>=0;i--,j++){
        if(piece_case(row_class[i]+" "+col_class[j]) == 1){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(piece_case(row_class[i]+" "+col_class[j])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
            }
            break;
        }
    }

    for(let i=row_value+1;i<8;i++){
        if(piece_case(row_class[i]+" "+col_class[col_value]) == 1){
            $(row_class[i]+" "+col_class[col_value]+" .selector").css("z-index","3");
        }else{
            if($(piece_case(row_class[i]+" "+col_class[col_value])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[col_value]+" .selector").css("z-index","3");
            }
            break;
        }
    }
    for(let i=row_value-1;i>=0;i--){
        if(piece_case(row_class[i]+" "+col_class[col_value]) == 1){
            $(row_class[i]+" "+col_class[col_value]+" .selector").css("z-index","3");
        }else{
            if($(piece_case(row_class[i]+" "+col_class[col_value])).hasClass(enemy_color)){
                $(row_class[i]+" "+col_class[col_value]+" .selector").css("z-index","3");
            }
            break;
        }
    }
    for(let i=col_value+1;i<8;i++){
        if(piece_case(row_class[row_value]+" "+col_class[i]) == 1){
            $(row_class[row_value]+" "+col_class[i]+" .selector").css("z-index","3");
        }else{
            if($(piece_case(row_class[row_value]+" "+col_class[i])).hasClass(enemy_color)){
                $(row_class[row_value]+" "+col_class[i]+" .selector").css("z-index","3");
            }
            break;
        }
    }
    for(let i=col_value-1;i>=0;i--){
        if(piece_case(row_class[row_value]+" "+col_class[i]) == 1){
            $(row_class[row_value]+" "+col_class[i]+" .selector").css("z-index","3");
        }else{
            if($(piece_case(row_class[row_value]+" "+col_class[i])).hasClass(enemy_color)){
                $(row_class[row_value]+" "+col_class[i]+" .selector").css("z-index","3");
            }
            break;
        }
    }
}



function knight_movement(row_class = [] , col_class = [] , row_value = 0 , col_value = 0 , enemy_color = "" , str = ""){
    for(let i=row_value-3,j=col_value;i<=row_value-1;i++,j++){
        if(piece_case(row_class[i]+" "+col_class[j]) == 1 && i!=row_value-3){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(piece_case(row_class[i]+" "+col_class[j])).hasClass(enemy_color) && i!=row_value-3){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
            }
        }      
    }
    for(let i=row_value-3,j=col_value;i<=row_value-1;i++,j--){
        if(piece_case(row_class[i]+" "+col_class[j]) == 1 && i!=row_value-3){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(piece_case(row_class[i]+" "+col_class[j])).hasClass(enemy_color) && i!=row_value-3){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
            }
        } 
    }
    for(let i=row_value+3,j=col_value;i>=row_value+1;i--,j++){
        if(piece_case(row_class[i]+" "+col_class[j]) == 1 && i!=row_value+3){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(piece_case(row_class[i]+" "+col_class[j])).hasClass(enemy_color) && i!=row_value+3){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
            }
        } 
    }
    for(let i=row_value+3,j=col_value;i>=row_value+1;i--,j--){
        if(piece_case(row_class[i]+" "+col_class[j]) == 1 && i!=row_value+3){
            $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
        }else{
            if($(piece_case(row_class[i]+" "+col_class[j])).hasClass(enemy_color) && i!=row_value+3){
                $(row_class[i]+" "+col_class[j]+" .selector").css("z-index","3");
            }
        } 
    }
}


function case_select(str = "",last_case_log = []){
    let row_class = [
        ".row.I",
        ".row.II",
        ".row.III",
        ".row.IV",
        ".row.V",
        ".row.VI",
        ".row.VII",
        ".row.VIII"
    ];
    let col_class = [
        ".a1",
        ".a2",
        ".a3",
        ".a4",
        ".a5",
        ".a6",
        ".a7",
        ".a8"
    ];
    let j = last_case_log.length-1;


    if(last_case_log[j]!="" && last_case_log[j]!=str){
        $(".selector").css("z-index","0");
    }


    if(str != last_case_log[j]){
        //defining coordinate
        let piece = piece_case(str);
        let last_piece = piece_case(last_case_log[j]);
        $(str+" .selector").css("z-index","3");
        let col_value = 0;
        let row_value = 0;
        for(let i=0;i<8;i++){
                if(str.includes(col_class[i]) == true){
                    col_value = i;
                }
                if(str.includes(row_class[i]) == true){
                    row_value = i;
                }
        }
//--------------------------------------------------//
        if(last_piece != 1 && piece == 1){
            $(str+" .selector").css("z-index","0");
        }

        if($(piece).hasClass("pawn") == true){
            //$(".selector").css("z-index","0");
            if($(piece).hasClass("mainty") == true){
                pawn_movement(row_class,col_class,row_value,col_value,"fotsy" , str);
            }

            if($(piece).hasClass("fotsy") == true){
                pawn_movement(row_class,col_class,row_value,col_value,"mainty" , str);
            }
        }

        if($(piece).hasClass("rook") == true){
            if($(piece).hasClass("mainty") == true){
                rook_movement(row_class,col_class,row_value,col_value,"fotsy" , str);
            }

            if($(piece).hasClass("fotsy") == true){
                rook_movement(row_class,col_class,row_value,col_value,"mainty" , str);
            }
        }

        if($(piece).hasClass("bishop") == true){
            if($(piece).hasClass("mainty") == true){
                bishop_movement(row_class,col_class,row_value,col_value,"fotsy" , str);
            }

            if($(piece).hasClass("fotsy") == true){
                bishop_movement(row_class,col_class,row_value,col_value,"mainty" , str);
            }
        }

        if($(piece).hasClass("king") == true){
            if($(piece).hasClass("mainty") == true){
                king_movement(row_class,col_class,row_value,col_value,"fotsy" , str);
            }

            if($(piece).hasClass("fotsy") == true){
                king_movement(row_class,col_class,row_value,col_value,"mainty" , str);
            }  
        }

        if($(piece).hasClass("queen") == true){
            if($(piece).hasClass("mainty") == true){
                queen_movement(row_class,col_class,row_value,col_value,"fotsy" , str);
            }

            if($(piece).hasClass("fotsy") == true){
                queen_movement(row_class,col_class,row_value,col_value,"mainty" , str);
            }  
        }

        if($(piece).hasClass("knight") == true){
            if($(piece).hasClass("mainty") == true){
                knight_movement(row_class,col_class,row_value,col_value,"fotsy" , str);
            }

            if($(piece).hasClass("fotsy") == true){
                knight_movement(row_class,col_class,row_value,col_value,"mainty" , str);
            }  
        }
    }


    if(str == last_case_log[j]){
        if($(str+" .selector").css("z-index")=="3"){
            $(".selector").css("z-index","0");
            last_case_log.push("");
            return 1;
        }else{
            $(str+" .selector").css("z-index","3");
        }
    }
    last_case_log.push(str);
}