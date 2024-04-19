var board_list = document.querySelectorAll("section#boardList a.item")
var count = 0

board_list.forEach(board => {
    count++

    let newDiv = document.createElement("div")
    let newSpan = document.createElement("span")
    let newText = document.createTextNode(count)

    newDiv.style.display = 'flex'
    newDiv.style.justifyContent = 'center'
    newDiv.style.alignItems = 'center'

    newSpan.style.marginRight = 5 +'px'
    newSpan.style.lineHeight = 20 + 'px'
    newSpan.appendChild(newText)
    newDiv.appendChild(newSpan)

    board.prepend(newDiv)
});
