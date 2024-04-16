/* 목록에서 [다음], [이전] 가져오기 */
var g_next_key   //다음 키 버튼
var g_prev_key   //이전 키 버튼
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

/*
    chim_btn : 침하하, 침흑흑, 스크랩 버튼
    msg : 침하하 / 침흑흑 / 스크랩
    type : 1 - 취소 시 빨간색
           0 - 누를 시 빨간색
*/
function actionAlert(chim_btn, msg, type) {
    let result = 0;
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
    //게시글 이동 관련
    //a키 => 이전 글
    if(keyValue == 65 && g_prev_key != null) {
        g_prev_key.click()
    }
    //d키 => 다음 글
    else if(keyValue == 68 && g_next_key != null) {
        g_next_key.click()
    }

    //페이지 이동 관련
    //w키 => 페이지 업
    else if(keyValue == 87) {
        setTimeout(() => pageUp(), 0);
        setTimeout(() => pageUp(), g_scrollTime/2);
        setTimeout(() => pageUp(), g_scrollTime);
    }
    //s키 => 페이지 다운
    else if(keyValue == 83) {
        setTimeout(() => pageDown(), 0);
        setTimeout(() => pageDown(), g_scrollTime/2);
        setTimeout(() => pageDown(), g_scrollTime);
    }

    //z키 => 게시글 제목 이동
    else if(keyValue == 90) {
        let title = document.querySelector('div.titleContainer')
        if(title != null) title.scrollIntoView()
    }
    //x키 => 댓글창 이동, 침하하 컨테이너 이동
    else if(keyValue == 88) {
        //let comment = document.querySelector('div.commentsTitle')
        let comment = document.querySelector('div.likeContainer')
        if(comment != null) comment.scrollIntoView()
    }
    //c키 => 글 목록
    else if(keyValue == 67) {
        let board = document.querySelector('h2.bottomBoardListHeader')
        if(board != null) board.scrollIntoView()
    }

    //r키 => 침하하
    else if(keyValue == 82) {
        let chimhaha = document.querySelector('button#like')
        actionAlert(chimhaha, "침하하", 1)
    }
    //f키 => 침흑흑
    else if(keyValue == 70) {
        let chimhkhk = document.querySelector('button#disLike')
        actionAlert(chimhkhk, "침흑흑", 0)
    }
    //q키 => 스크랩
    else if(keyValue == 81) {
        let chimscrap = document.querySelector('button#scrap')
        actionAlert(chimscrap, "스크랩", 1)
    }
    else {
        return;
    }
}

//키 누를때 keyCheck 함수 실행
if(g_keywork == 1 ) {
    top.document.onkeydown = keyCheck
}

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