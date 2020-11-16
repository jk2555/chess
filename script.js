//1:25:22
var wboard = [['BR','BN','BB','BK','BQ','BB','BN','BR'],
                ['BP','BP','BP','BP','BP','BP','BP','BP'],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['WP','WP','WP','WP','WP','WP','WP','WP'],
                ['WR','WN','WB','WK','WQ','WB','WN','WR']]

var bboard = [['WR','WN','WB','WK','WQ','WB','WN','WR'],
                ['WP','WP','WP','WP','WP','WP','WP','WP'],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['BP','BP','BP','BP','BP','BP','BP','BP'],
                ['BR','BN','BB','BK','BQ','BB','BN','BR']]
var board = []
var playingWhite = true
var currentPiece = 0
var currentPieceColor = 0
var highlighted = []


var gameBoard = document.getElementById('board')
function start(){
    board = playingWhite ? wboard : bboard
    for (var i = 0; i<8; i++){
        for(var j = 0; j < 8; j++){
            if(board[i][j] != ''){  
                setBackgroundImage(i,j,board[i][j])
                document.getElementById(i+''+j).addEventListener('click', function(){getMoves(this.id)})
            }
        }
    }
}
start()

function getMoves(id){
    clearHighlighted()
    i = id[0]
    j = id[1]
    if (currentPiece != 0){
        document.getElementById(currentPiece).style.backgroundColor = currentPieceColor
    }
    currentPiece = id
    currentPieceColor = ((i%2 == 0 && j%2 != 0) || (i%2 != 0 && j%2 == 0)) ? '#B58962' : '#F0DAB5'
    document.getElementById(id).style.backgroundColor = "#86986A"
    var color = board[i][j][0]
    var piece = board[i][j][1]
    if (piece == 'P'){
        if (i == 6){
            highlight([(i-1)+''+j,(i-2)+''+j])
        }
    }
}

function setBackgroundImage(i,j,image){
    document.getElementById(i+''+j).style.backgroundImage = (image == 'none') ? "": ("url(Images/"+image+".jpg)")
    document.getElementById(i+''+j).style.backgroundSize = (image == 'greendot') ? '25%' : "contain"
    document.getElementById(i+''+j).style.backgroundRepeat = "no-repeat"
    document.getElementById(i+''+j).style.backgroundPosition = "center"   
}

function highlight(lst){
    for(var i = 0; i < lst.length; i++){
        highlighted.push(lst[i])
        setBackgroundImage(lst[i][0],lst[i][1],'greendot')
        document.getElementById(lst[i][0]+''+lst[i][1]).addEventListener('click', function(){moveTo(this.id)})
    }
}

function clearHighlighted(){
    for(var i = 0; i < highlighted.length; i++){
        document.getElementById(highlighted[i]).style.backgroundImage = ""
        document.getElementById(highlighted[i]).removeEventListener('click', function(){moveTo(this.id)})
    }
    highlighted = []    
}

function moveTo(id){
    var i = currentPiece[0]
    var j = currentPiece[1]
    setBackgroundImage(i,j,'none')
    setBackgroundImage(id[0],id[1],board[i][j])
    board[id[0]][id[1]] = board[i][j]
    clearHighlighted()
    setBackgroundImage(id[0],id[1],board[i][j])
    board[i][j] = ''
    document.getElementById(currentPiece).style.backgroundColor = currentPieceColor
    currentPiece = 0
}