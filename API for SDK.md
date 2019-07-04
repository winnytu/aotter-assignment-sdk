# 載入廣告設定
## 初始化：載入廣告
```
GetAd()
```

Example
```
window.onload = GetAd()
```

## 載入廣告

```
SetAd(selector,type) 
```

| Name           | Type        | Description                                                                     |
|----------------|-------------|---------------------------------------------------------------------------------|
| success        | String      | 廣告欄位之dom名稱                                                                 |
| id             | String      | BANNER or VIDEO                                                                 |

Example
```
window.addEventListener('on-ad-loaded',function(){
    SetAd('#Ad1','BANNER')
}
```

# 監聽事件

## 廣告載入成功
```
on-ad-loaded
```

Example
```
window.addEventListener('on-ad-loaded',function(){
    console.log('載入廣告')
})
```

## 廣告載入失敗
```
on-ad-failed
```

Example
```
window.addEventListener('on-ad-failed',function(){
    console.log('目前無廣告')
})
```

## 廣告載入成功並出現在畫面50%超過1秒後，呼叫impression_url成功

```
on-ad-impression

```
Example
```
window.addEventListener('on-ad-impression',function(){
    console.log('已呼叫impression_url')
})
```