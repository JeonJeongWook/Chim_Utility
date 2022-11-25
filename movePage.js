let item_btn_list = document.querySelectorAll("#boardList a.item div.info span.category");
var next, prev;
var count = 0;
var inHTML;

item_btn_list.forEach((item_btn_list, index) => {
    // console.log(`index ${index} item_btn_list ${item_btn_list.innerHTML}`);
    inHTML = item_btn_list.innerHTML;
    console.log("inhtml : " + inHTML);
    
    
    if(count == 2){
        // console.log("next > " + next.outerHTML);
        // console.log("prev > " + prev.outerHTML);
        return;
    }else if(inHTML == "다음"){
        next = item_btn_list.parentElement.parentElement;
        count++;
    } else if(inHTML == "이전"){
        prev = item_btn_list.parentElement.parentElement;
        count++;
    }
});