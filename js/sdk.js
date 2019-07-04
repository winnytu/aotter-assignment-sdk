// 廣告資訊（尚未載入）
var AdInfo = {}


// 設定監聽事件 (chrome/firefox/edge/safari/IE)
// 廣告載入成功
var EventSuccess = document.createEvent('Event')
EventSuccess.initEvent('on-ad-loaded')
// // 廣告載入失敗
var EventFailed = document.createEvent('Event')
EventFailed.initEvent('on-ad-failed')
// // 達成impression條件
var EventImpressionSuccess = document.createEvent('Event')
EventImpressionSuccess.initEvent('get-ad-impression')
// // 呼叫impression_url
var EventImpressionSend = document.createEvent('Event')
EventImpressionSend.initEvent('on-ad-impression')


// 取得廣告資訊
GetAd = function(){
        const xhr = new XMLHttpRequest(); 
        xhr.open('GET','http://localhost:3000/ads')
        xhr.onload= function load(){
            if (xhr.status === 200){
                let data = JSON.parse(xhr.responseText)
                PreSetAd(data)
                if (data.success){
                    // 成功載入廣告，觸發on-ad-loaded事件
                    window.dispatchEvent(EventSuccess)
                } else {
                    // 沒有成功載入廣告，觸發on-ad-failed事件
                    window.dispatchEvent(EventFailed);
                }
            } else {
                // 取得廣告資料失敗
                console.log(xhr.status);
            }
        };
        xhr.send('null') 
}


PreSetAd= function(obj){
    return this.AdInfo = obj
}



// 在頁面上存在的廣告欄位中顯示廣告
SetAd = function(selector,type){
    const AdShow1 = `
        <div id="#AdLoaded" style="width:100%;background-color:#e5e5e5;border:1px solid #ccc">
        <a style="text-decoration:none;color:#000;font-weight:600" href="${AdInfo.url}">
            <img style="width:100%" src="${AdInfo.image}" alt="">
            <div class="title" style="padding:10px;text-decoration:none">
            <div style="color:#828282;padding-bottom:3px">AGIRLS.AOTTER.NET</div>${AdInfo.title}</div>
        </a>
        </div>`
    const AdShow2 = `
        <div id="#AdLoaded" style="position: relative;padding-bottom: 56.25%;padding-top: 30px;height: 0;overflow: hidden;">
        <iframe style="position: absolute;top: 0;left: 0;"src="${AdInfo.video_url}" width="100%" height="100%" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>`
    if (AdInfo.type === type){
        if (type === 'BANNER'){
        document.querySelector(selector).innerHTML = AdShow1
        } else {
        document.querySelector(selector).innerHTML = AdShow2
        }
    } 
    // 每0.1秒檢查是否有達成impression條件
    var check = setInterval(AdImpression,100,selector)
}

// 檢查是否有達成impression條件：廣告出現在畫面上超過 50%至少一秒
AdImpression = function(selector){
    const AdPosition = document.querySelector(selector).offsetTop
    const Adheight = document.querySelector(selector).offsetHeight
    const WindowHeight = window.innerHeight
    if (window.scrollY+WindowHeight-AdPosition>0.5*Adheight){
        setTimeout(() => {
            // 若有達成則觸發get-ad-impression事件，並僅能觸發一次
            window.dispatchEvent(EventImpressionSuccess)
        }, 1000);
    } 
}

// 呼叫impression_url
SendImpression = function(){
    var url = AdInfo.impression_url
    var xhrsend = new XMLHttpRequest();
    xhrsend.open('post',url)
    xhrsend.setRequestHeader("Content-type", " application/json");
    xhrsend.onload= function load(){
        if (xhrsend.status === 200){
            console.log(xhrsend.responseText)
        } else {
            console.log(xhrsend.status)
        }
    };
    xhrsend.send(AdInfo)
    window.dispatchEvent(EventImpressionSend)
    
}

// 監聽get-ad-impression ，若觸發成功則呼叫impression_url
window.addEventListener('get-ad-impression', SendImpression,{once: true})





