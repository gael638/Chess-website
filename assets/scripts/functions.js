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
        if(piece_case(new_case) == 1){
            $(last_case+" "+piece_class).css("z-index","0");
            $(new_case+" "+piece_class).css("z-index","5");
        }//rule when a piece move into an empty case
        else{
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