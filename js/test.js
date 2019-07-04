// 在網頁載入時取得廣告資訊
window.onload = GetAd()

// 若廣告資訊載入成功，則自動在頁面上顯示廣告
window.addEventListener('on-ad-loaded',function(){
    console.log('載入廣告')
    // id為Ad1之欄位僅能顯BANNER類型的廣告
    SetAd('#Ad1','BANNER')
    // id為Ad2之欄位僅能顯VIDEO類型的廣告
    SetAd('#Ad2','VIDEO')
})

// 若廣告載入失敗則在console顯示無廣告
window.addEventListener('on-ad-failed',function(){
    console.log('目前無廣告')
})

// 若廣告載入失敗則在console顯示已呼叫impression_url
window.addEventListener('on-ad-impression',function(){
    console.log('已呼叫impression_url')
})