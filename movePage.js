var g_next_key   //다음 키 버튼
var g_prev_key   //이전 키 버튼
var g_keystop = 2000    //ms, 해당 ms동안 키 인식 안함
var g_keywork = 1    // 1-작동중, 0-정지  input, textarea 태그 일 경우 기능 정지
var g_scrollTime = 50   //스크롤 시 한번에 움직이면 못쫓아가니 딜레이 주기(1000ms = 1s, 50 = 0.05s)

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
    }, g_keystop);
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

//키 입력 체크
function keyCheck() {
    let keyValue = window.event.keyCode    //입력한 키 값
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
            setTimeout(() => pageUp(), 0);
            setTimeout(() => pageUp(), g_scrollTime/2);
            setTimeout(() => pageUp(), g_scrollTime);
            break
        case 'S':   //페이지 다운
            setTimeout(() => pageDown(), 0);
            setTimeout(() => pageDown(), g_scrollTime/2);
            setTimeout(() => pageDown(), g_scrollTime);
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
        case 'Q':   //스크랩 클릭
            let chimscrap = document.querySelector('button#scrap')
            actionAlert(chimscrap, "스크랩", 1)
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