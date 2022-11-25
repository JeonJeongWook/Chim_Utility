/* 목록에서 [다음], [이전] 가져오기 */
let item_btn_list = document.querySelectorAll("#boardList a.item div.info span.category");
var inHTML;     //목록에서 category 클래스에서 가져오기
var next_key;   //다음 키
var prev_key;   //이전 키
var count = 0;  //다음, 이전 키 연결시 1씩 증가
var keyWork = 1;    /* 1-작동중, 0-중지  input, textarea 태그 일 경우 기능 중지 */

function keyCheck(){
    var keyValue = window.event.keyCode;    //입력한 키 값
    // console.log('keyValue : ' + keyValue);//테스트 값

    if(keyWork == 1){
        if((keyValue == 107 || keyValue == 187) && next_key != null){    //키패드 + 107 / 텐키리스 = 187
            next_key.click();
        }else if((keyValue == 109 || keyValue == 189) && prev_key != null){      //키패드 - 109 / 텐키리스 - 189
            prev_key.click();
        }
    }else{
        return;
    }
}

top.document.onkeydown = keyCheck;

/* 마우스 클릭시 tag 가져옴 */
top.document.addEventListener('mousedown', (event) =>{
    console.log(event.target.outer);
    var tagName = event.target.tagName;
    if(tagName == "TEXTAREA" || tagName == "INPUT"){
        // console.log("글쓰는 중");
        keyWork = 0;
    }else{
        keyWork = 1;
    }
});

/* 다음, 이전 글 가져옴 */
item_btn_list.forEach((item_btn_list) => {
    inHTML = item_btn_list.innerHTML;
    
    if(count == 2){
        return;
    }else if(inHTML == "다음"){
        next_key = item_btn_list.parentElement.parentElement;
        count++;
    } else if(inHTML == "이전"){
        prev_key = item_btn_list.parentElement.parentElement;
        count++;
    }
});