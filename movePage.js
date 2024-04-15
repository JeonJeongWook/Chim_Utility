/* 목록에서 [다음], [이전] 가져오기 */
let item_btn_list = document.querySelectorAll("div.listAndEdit div.button a")
var inHTML     //목록에서 category 클래스에서 가져오기
var next_key   //다음 키
var prev_key   //이전 키
var count = 0  //다음, 이전 키 연결시 1씩 증가
var keyWork = 1    /* 1-작동중, 0-중지  input, textarea 태그 일 경우 기능 중지 */

function keyCheck() {
    var keyValue = window.event.keyCode    //입력한 키 값
    console.log('keyValue : ' + keyValue)//테스트 값

    if(keyWork == 1) {
        //a키 => 이전 글
        if(keyValue == 65 && next_key != null) {
            next_key.click()
        }
        //d키 => 다음 글
        else if(keyValue == 68 && prev_key != null) {
            prev_key.click()
        }
        //w키 => 페이지 업
        else if(keyValue == 87) {
            console.log('press w')
            window.scrollBy({
                top : -innerHeight / 3 * 2,
                behavior : "smooth"
            })
        }
        //s키 => 페이지 다운
        else if(keyValue == 83) {
            console.log('press s')
            window.scrollBy({
                top : innerHeight / 3 * 2,
                behavior : "smooth"
            })
        }
    } else {
        return
    }
}

//키 누를때 keyCheck 함수 실행
top.document.onkeydown = keyCheck

// 마우스 클릭시 tag 가져옴
top.document.addEventListener('mousedown', (event) =>{
    // console.log(event.target.outer)
    var tagName = event.target.tagName
    if(tagName == "TEXTAREA" || tagName == "INPUT"){
        keyWork = 0
    }else{
        keyWork = 1
    }
})

// 이전, 다음 버튼 오브젝트 가져옴
// console.log(item_btn_list)
item_btn_list.forEach((item_btn_list) => {
    inHTML = item_btn_list.innerHTML

    if(count == 2) {
        return
    }else if(inHTML.indexOf("다음") != -1) {
        next_key = item_btn_list
        console.log('next_key ' + next_key)
        count++
    } else if(inHTML.indexOf("이전") != -1) {
        prev_key = item_btn_list
        console.log('prev_key ' + prev_key)
        count++
    }
})