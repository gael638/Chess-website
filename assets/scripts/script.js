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

let last_selected = [];
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



function case_select(str){
    let j = last_selected.length-1;
    if(last_selected[j]!="" && last_selected[j]!=str){
        //$(last_selected[j]+" .selector").css("z-index","0");
        $(".selector").css("z-index","0");
    }
    if(str != last_selected[j]){

        let piece = piece_case(str);

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


        if($(piece).hasClass("pawn") == true){
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
        
            






    }
    if(str == last_selected[j]){
        if($(str+" .selector").css("z-index")=="3"){
            $(".selector").css("z-index","0");
            last_selected.push("");
            return 1;
        }else{
            $(str+" .selector").css("z-index","3");
        }
    }
    last_selected.push(str);
}





$(".white,.black").click(
    function (event){
        let x = $(event.target).parent()[0];
        let y = $(x).parent()[0];
        let coo = class_form(y.className)+" "+class_form(x.className);
        //console.log(coo);
        case_select(coo);
        if(last_selected.length > 1 
            && piece_case(last_selected[last_selected.length-2]) != 1 
            && coo != last_selected[last_selected.length-2])
            {
                piece_move(last_selected[last_selected.length-2],
                            coo,
                            piece_case(last_selected[last_selected.length-2]));

                //console.log(1);
                case_select(coo);
            }
    }
);
