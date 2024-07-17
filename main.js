var g_next_key   //다음 키 버튼
var g_prev_key   //이전 키 버튼
var g_keystop = 2000    //ms, 해당 ms동안 키 인식 안함
var g_keywork = 1    // 1-작동중, 0-정지  input, textarea 태그 일 경우 기능 정지
var g_scrollTime = 50   //스크롤 시 한번에 움직이면 못쫓아가니 딜레이 주기(1000ms = 1s, 50 = 0.05s)

var g_input_key
var g_input_number = 0  //1:숫자 키 입력중.. / 0:종료
var g_number_array = new Array()

//페이지네이션
var g_prev_button   //이전 버튼
var g_prev_page     //이전 페이지
var g_next_page     //다음 페이지
var g_next_button   //다음 버튼

//페이지 업
function pageUp() {
    window.scrollBy({
        top : -innerHeight / 4,
    })
}
//페이지 다운
function pageDown() {
    window.scrollBy({
        top : innerHeight / 4,
    })
}

//키 g_keystop 밀리초 만큼 정지
function keyworkStop() {
    g_keywork = 0
    setTimeout(() => {
        g_keywork = 1
    }, g_keystop)
}

function comment_click() {
    var comment_area_list = document.querySelectorAll("div#commentEtc.commentContainer")
    comment_area_list.forEach(input => {
        input.addEventListener('focusin', (event) => {
                g_keywork = 0
        })
        input.addEventListener('focusout', (event) => {
                g_keywork = 1
        })
    })
}

/*
    chim_btn : 침하하, 침흑흑, 스크랩 버튼
    msg : 침하하 / 침흑흑 / 스크랩
    type : 1 - 취소 시 빨간색
           0 - 누를 시 빨간색
*/
function actionAlert(chim_btn, msg, type) {
    //침하하, 스크랩 버튼
    if(type == 1) {
        if(chim_btn.innerHTML.indexOf("취소") < 0) {
            message = `정말 ${msg} 하시겠습니까?`
        } else {
            message = `⚠정말 ${msg} 취소 하시겠습니까❓⚠`
        }
    }
    //침흑흑 버튼
    else {
        if(chim_btn.innerHTML.indexOf("취소") > 0) {
            message = `정말 ${msg} 취소 하시겠습니까?`
        } else {
            message = `⚠정말 ${msg} 하시겠습니까❓⚠`
        }
    }

    if(confirm(message) == true) {
        chim_btn.click()
    }
}

function getNumberArray() {
    let key = g_input_number
    let array = g_number_array
    g_input_number = ''
    g_number_array = []
    return array
}

//키 입력 체크
function keyCheck() {
    let keyValue = window.event.keyCode    //입력한 키 값
    //넘버패드
    if(keyValue >= 96 && keyValue <= 105) {
        keyValue -= 48
    }
    let keyChar = String.fromCharCode(keyValue)

    //해당 버튼 클릭 시 g_keystop 밀리초만큼 기능 일시정지
    switch(keyValue) {
        case  9:    //Tab
        case 16:    //L-Shift
        case 17:    //L-Ctrl
        case 18:    //L-Alt
        case 20:    //CapsLock
        case 21:    //R-Alt
        case 25:    //R-Ctrl
        case 91:    //L-Win
        case 92:    //R-Win
        case 93:    //R-General Key
            keyworkStop()
            break

        //게시글 이동 관련
        case 37:    //← left arrow  , 이전 글
            if(g_prev_key != null) g_prev_key.click()
            break
        case 39:    //→ right arrow , 다음 글
            if(g_next_key != null) g_next_key.click()
            break

        default:
            break
    }

    if(g_keywork == 0) return

    switch(keyChar) {
        //게시글 이동 관련
        case 'A':   //이전 글
            if(g_prev_key != null) g_prev_key.click()
            break
        case 'D':   //다음 글
            if(g_next_key != null) g_next_key.click()
            break

        //페이지 이동 관련
        case 'W':   //페이지 업
            setTimeout(() => pageUp(), 0)
            setTimeout(() => pageUp(), g_scrollTime/2)
            setTimeout(() => pageUp(), g_scrollTime)
            break
        case 'S':   //페이지 다운
            setTimeout(() => pageDown(), 0)
            setTimeout(() => pageDown(), g_scrollTime/2)
            setTimeout(() => pageDown(), g_scrollTime)
            break

        case 'Z':   //게시글 제목 이동
            let title = document.querySelector('div.titleContainer')
            if(title != null) title.scrollIntoView()
            break
        case 'X':   //댓글 이동
            let comment = document.querySelector('div.likeContainer')
            if(comment != null) comment.scrollIntoView()
            break
        case 'C':   //글 목록 이동
            let board = document.querySelector('h2.bottomBoardListHeader')
            if(board != null) board.scrollIntoView()
            break

        //게시글 추천 관련
        case 'R':   //침하하 클릭
            let chimhaha = document.querySelector('button#like')
            actionAlert(chimhaha, "침하하", 1)
            break
        case 'F':   //침흑흑 클릭
            let chimhkhk = document.querySelector('button#disLike')
            actionAlert(chimhkhk, "침흑흑", 0)
            break
        case 'T':   //스크랩 클릭
            let chimscrap = document.querySelector('button#scrap')
            actionAlert(chimscrap, "스크랩", 1)
            break

        case 'Q':   //이전 페이지
            if(g_prev_page != null) {
                g_prev_page.click()
            } else if(g_prev_button != null) {
                g_prev_button.click()
            }
            
            break
        case 'E':   //다음 페이지
            if(g_next_page != null) {
                g_next_page.click()
            } else if(g_next_button != null) {
                g_next_button.click()
            }
            break

        case 'V':   //게시글 이동
            g_input_key = 'V'
            g_input_number = g_input_number == 0 ? 1 : 0

            //0으로 바뀌면 1일때 쌓은 문자열 실행
            if(g_input_number == 0) {
                let array = new Array()
                array = getNumberArray()
                let num = array.join('')

                //아무키도 안눌렀을 경우
                if(num == 0 || array.length <= 0) {
                    break
                } 

                //없는 숫자일 경우
                if(num > board_list.length) {
                    break
                }
                board_list[num-1].click()
            }
            break

        //키보드 윗쪽 숫자
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            if(g_input_number == 1) {
                g_number_array.push(keyChar)
            }
            break
        default:
            break
    }
}

//키 누를때 keyCheck 함수 실행
top.document.onkeydown = keyCheck

/***********************************
** url 변경 시 실행 **
설명: 이전, 다음 버튼 오브젝트 찾은 후 변수에 저장
***********************************/
var item_btn_list = document.querySelectorAll("div.listAndEdit div.button a")
item_btn_list.forEach((item_btn_list) => {
    let inHTML = item_btn_list.innerHTML

    if(g_next_key != null && g_prev_key!= null) {
        return
    }else if(inHTML.indexOf("다음") != -1) {
        g_next_key = item_btn_list
    } else if(inHTML.indexOf("이전") != -1) {
        g_prev_key = item_btn_list
    }
})

/***********************************
** url 변경 시 실행 **
type=text인 input Tag, textarea Tag에 focus 이벤트 등록
focus in  = 단축키 기능 OFF
focus out = 단축키 기능 ON
***********************************/
var input_list = document.querySelectorAll("input[type='text'], textarea")
input_list.forEach((input) => {
    input.addEventListener('focusin', (event) => {
            g_keywork = 0
    })
    input.addEventListener('focusout', (event) => {
            g_keywork = 1
    })
})



// 댓글 div 변경 감지
var comment_div = document.querySelector('div#comments.comments')

let observer = new MutationObserver((mutations) => {
    //노드 변경 감지 작업
    let comment_btn = comment_div.querySelectorAll('button#commentReply')
    comment_btn.forEach((comment_btn) => {
        comment_btn.addEventListener('click', comment_click)
    })

    let textarea = comment_div.querySelectorAll('textarea')
    //var textarea = document.querySelectorAll('textarea[name="reply"]#etcText')
    textarea.forEach((textarea) => {
        textarea.addEventListener('focusin', (event) => {
                g_keywork = 0
        })
        textarea.addEventListener('focusout', (event) => {
                g_keywork = 1
        })
    })
})
let option = {
    attributes: true,
    childList: true,
    characterData: true
}

if(comment_div != null) {
    observer.observe(comment_div, option)

    //댓글 버튼에 이벤트 등록
    var comment_btn = comment_div.querySelectorAll('button#commentReply')
    comment_btn.forEach((comment_btn) => {
        comment_btn.addEventListener('click', comment_click)
    })
}


/***********************************
** url 변경 시 실행 **
해당 게시글 목록이 있으면 앞에 번호 부여
***********************************/
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
})


/***********************************
** url 변경 시 실행 **
페이지네이션
***********************************/
var pagination = document.querySelectorAll('section.pagination div')

//페이지네이션 클래스
for(i=0; i<pagination.length; i++) {
    //이전 버튼
    if(pagination[i].className == 'prev') {
        g_prev_button = pagination[i].getElementsByTagName('a')[0]
    }

    //todo 손봐야 함
    //페이지 번호
    if(pagination[i].className == 'number') {
        var number_div = pagination[i].getElementsByTagName('a')

        for(j=0; j<number_div.length; j++) {

            if(number_div[j].className == 'selected') {
                if(j >= 0) {
                    g_prev_page = number_div[j-1]
                }

                if(j <= 4) {
                    g_next_page = number_div[j+1]
                }

                break
            }
        }
    }

    //다음 버튼
    if(pagination[i].className == 'next') {
        g_next_button = pagination[i].getElementsByTagName('a')[0]
    }
}

console.log('chim_util ready')