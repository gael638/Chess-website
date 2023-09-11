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


let select_log = [];


$(".white,.black").click(
    function (event){
        let x = $(event.target).parent()[0];
        let y = $(x).parent()[0];
        let coo = class_form(y.className)+" "+class_form(x.className);


        case_select(coo,select_log);
        if(select_log.length > 1 
            && piece_case(select_log[select_log.length-2]) != 1 
            && coo != select_log[select_log.length-2])

        {
            
                    piece_move(select_log[select_log.length-2],
                        coo,
                        piece_case(select_log[select_log.length-2])
                    );

                    //case_select(coo,select_log);
                    //case_select(coo,select_log);
                
                                
        }
    }
);