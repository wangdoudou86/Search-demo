{
    // 1.初始化数据
    var hash1 = init()
    var keys = hash1['key']
    var hash = hash1['hash']
  
    // 2.生成键盘
    generateKeyboard(keys, hash)

    // 3.监听用户是否按键
    listentoUser(hash)

    // 生成的工具函数
    function init() {
        var keys = {
            '0': { 0: 'q', 1: 'w', 2: 'e', 3: 'r', 4: 't', 5: 'y', 6: 'u', 7: 'i', 8: 'o', 9: 'p', length: 10 },
            '1': { 0: 'a', 1: 's', 2: 'd', 3: 'f', 4: 'g', 5: 'h', 6: 'j', 7: 'k', 8: 'l', length: 9 },
            '2': { 0: 'z', 1: 'x', 2: 'c', 3: 'v', 4: 'b', 5: 'n', 6: 'm', length: 7 },
            'length': 3
        }//[]是一种简写方式，字符需要加引号，数字可以不加
        var hash = {
            'q': 'y.qq.com', 'w': 'weibo.com', 'e': 'v.qq.com', 'r': 'jianshu.com', 't': 'tmall.com', 'y': 'yys.163.com', 'u': undefined, 'i': 'iqiyi.com', 'o': undefined, 'p': 'baidu.com', 'a': 'acfun.cn', 's': 'javascript.ruanyifeng.com',
            'd': 'douban.com', 'f': 'sm.ms', 'g':undefined , 'h':'huaban.com', 'j': 'js.jirengu.com', 'k': undefined, 'l': undefined, 'z': 'zhihu.com', 'x': 'xiedaimala.com', 'c': undefined, 'v': undefined, 'b': 'bilibili.com',
            'n': 'naver.com', 'm': 'www.mgtv.com'
        }
        var hashInLocalStorage = getfromLocalStorage('cundang')//取出存档的hash
        if (hashInLocalStorage) {
            hash = hashInLocalStorage //如果有存档的hash，那么就用存档的hash
        }
        return {
            'key': keys,
            'hash': hash
        }
    }
    function generateKeyboard(keys, hash) {
        for (let index = 0; index < keys['length']; index++) {
            var divM = tag('div')//生成一个名字为div1的div标签
            divM.className = 'row'
            mainM.appendChild(divM)

            row = keys[index]//第一个数组[0到10] 第二个数组[0到9] 第三个数组[0到7] console.log(row) 可以打印出看下row的数组
            for (let index2 = 0; index2 < row['length']; index2++) {
                var spanM = creareSpan(row[index2])

                var imgM = createImg(hash[row[index2]])

                var buttonM = createButton(row[index2])

                var kbdM = tag('kbd')
                kbdM.className = 'key'
                kbdM.appendChild(imgM)
                kbdM.appendChild(buttonM)
                kbdM.appendChild(spanM)
                divM.appendChild(kbdM)//把填好内容的<kbd>放到一个小盒子里
            }
        }
    }
    function listentoUser(hash) {
        document.onkeypress = function (kk) { //()里的名字随便取，按键时的所有信息都存在这个变量里
            //console.log(kk)这个可以看按键的所有信息
            var keyP = kk['key']
            var website = hash[keyP]
            //location.href = 'http://'+website 在当前页面打开网址，但希望新开页面打开
            window.open('http://' + website, '_blank')
        }
    }
    function getfromLocalStorage(name) {
        return JSON.parse(localStorage.getItem(name) || 'null')
    }
    function tag(tagName) {
        return document.createElement(tagName)
    }
    function creareSpan(textContent) {
        var spanM = tag('span')
        spanM.className = 'text'
        spanM.textContent = textContent
        return spanM
    }
    function createImg(domain) {
        var imgM = tag('img')
        imgM.className = 'icona'
        if (domain) {
            imgM.src = 'http://' + domain + '/favicon.ico'
        } else {
            imgM.src = '//i.loli.net/2017/11/15/5a0c61e793cf2.png'
        }
        imgM.onerror = function (bb) {
            bb.target.src = '//i.loli.net/2017/11/15/5a0c61e793cf2.png'
        }//监听网址，如果错误，就打开上面图片   
        return imgM
    }
    function createButton(id) {
        var buttonM = tag('button')
        buttonM.textContent = '编辑'
        buttonM.id = id //给button一个id
        buttonM.onclick = function (aa) {
            var button2 = aa['target']
            var img2 = button2.previousSibling//返回button2的前一个节点
            var key = button2['id']//获取字母
            var x = prompt('输入你想要的网址吧')
            hash[key] = x //赋新的网址
            img2.src = 'http://' + x + '/favicon.ico' //图标随着网址变化而变
            img2.onerror = function (bb) {
                bb.target.src = '//i.loli.net/2017/11/15/5a0c61e793cf2.png'
            }
            localStorage.setItem('cundang', JSON.stringify(hash)) //保存在浏览器
        }
        return buttonM
    }
}