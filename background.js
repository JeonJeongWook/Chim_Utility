chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        // 첫 설치시 실행할 코드
        alert('install!!')
    }
    else if(details.reason == "update"){
        // 버전 업데이트 또는 확장 프로그램에서 새로고침시
        alert('update!!')
    }
});