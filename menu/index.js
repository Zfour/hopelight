var hopelight_menu_append_div = (parent, text) => {
    if (typeof text === 'string') {
        var temp = document.createElement('div');
        temp.innerHTML = text;
        // 防止元素太多 进行提速
        var frag = document.createDocumentFragment();
        while (temp.firstChild) {
            frag.appendChild(temp.firstChild);
        }
        parent.appendChild(frag);
    } else {
        parent.appendChild(text);
    }
};
var  hopelight_switchDarkMode=() => { // Switch Between Light And Dark Mode
    var darkmode_text = document.getElementById('darkmode_switchbutton_text')
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (nowMode === 'light') {
        darkmode_text.innerHTML='开灯'
        activateDarkMode()
        saveToLocal.set('theme', 'dark', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
    } else {
        darkmode_text.innerHTML='关灯'
        activateLightMode()
        saveToLocal.set('theme', 'light', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
    }
    // handle some cases
    typeof utterancesTheme === 'function' && utterancesTheme()
    typeof FB === 'object' && window.loadFBComment()
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
};

var hopelight_nav_bar = document.getElementById('nav')
var search_button_origin = document.getElementById('search-button')
search_button_origin.remove()
var hopelight_temple = `<div id="hopelight_plus_menu" class="hopelight_plus_menu">

<div id="darkmode_navswitch">
<a class="site-page social-icon darkmode_switchbutton" onclick="hopelight_switchDarkMode()" title="模式切换" data-pjax-state="">
<i class="fas fa-adjust"></i>
<span  id = 'darkmode_switchbutton_text'></span>
</a></div>

<div id="search-button">
<a class="site-page social-icon search">
<i class="fas fa-search fa-fw"></i>
<span id = 'search_text'>搜索</span>
</a></div>

<div id="hopelight_menu_music_player">
<div id="aplayer-uxAIfEUs" 
class="aplayer aplayer-tag-marker meting-tag-marker" 
data-id="000PeZCQ1i4XVs" 
data-lrctype="none" 
data-server="tencent" 
data-type="artist" 
data-mode="circulation" 
data-autoplay="false" 
data-mutex="true" 
data-listmaxheight="340px" 
data-preload="auto" 
data-listfolded="true" 
data-theme="#3F51B5"></div>
<div class="music_button" id="pre-button">
<a class="site-page social-icon per" onclick="aplayers[0].skipBack();hopelight_music_play_new()">
<i class="fas fa-step-backward fa-fw"></i>
</a></div>
<div class="music_button" id="play-button" >
<a class="site-page social-icon hopelight_music_play" onclick="hopelight_music_play()"><i class="fas fa-play fa-fw"></i></a></div>
<div class="music_button" id="next-button">
<a class="site-page social-icon next" onclick="aplayers[0].skipForward();hopelight_music_play_new()">
<i class="fas fa-step-forward fa-fw"></i>
</a></div>
</div>


</div>`
hopelight_menu_append_div(hopelight_nav_bar,hopelight_temple)

window.addEventListener('load', () => {
    let loadFlag = false
    const openSearch = function () {
        document.body.style.cssText = 'width: 100%;overflow: hidden'
        document.querySelector('#local-search .search-dialog').style.display = 'block'
        document.querySelector('#local-search-input input').focus()
        btf.fadeIn(document.getElementById('search-mask'), 0.5)
        if (!loadFlag) {
            search(GLOBAL_CONFIG.localSearch.path)
            loadFlag = true
        }
        // shortcut: ESC
        document.addEventListener('keydown', function f (event) {
            if (event.code === 'Escape') {
                closeSearch()
                document.removeEventListener('keydown', f)
            }
        })
    }

    const closeSearch = function () {
        document.body.style.cssText = "width: '';overflow: ''"
        const $searchDialog = document.querySelector('#local-search .search-dialog')
        $searchDialog.style.animation = 'search_close .5s'
        setTimeout(() => { $searchDialog.style.cssText = "display: none; animation: ''" }, 500)
        btf.fadeOut(document.getElementById('search-mask'), 0.5)
    }

    // click function
    const searchClickFn = () => {
        document.querySelector('#search-button > .search').addEventListener('click', openSearch)
        document.getElementById('search-mask').addEventListener('click', closeSearch)
        document.querySelector('#local-search .search-close-button').addEventListener('click', closeSearch)
    }

    searchClickFn()
})

var darkmode_text = document.getElementById('darkmode_switchbutton_text')
var hopelight_nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
if (hopelight_nowMode === 'light') {
    darkmode_text.innerHTML='关灯'
} else {
    darkmode_text.innerHTML='开灯'
}
function hopelight_music_play(){

    aplayers[0].toggle()
    if (document.getElementsByClassName('hopelight_music_play')){
    if (document.getElementsByClassName('hopelight_music_play')[0].innerHTML === '<i class="fas fa-play fa-fw"></i>'){
        document.getElementsByClassName('hopelight_music_play')[0].innerHTML = '<i class="fas fa-pause fa-fw"></i>'

        document.getElementsByClassName('aplayer-pic')[0].classList.remove("music_spin_pause")
         document.getElementsByClassName('aplayer-pic')[0].classList.add("music_spin")
    }else {
        document.getElementsByClassName('hopelight_music_play')[0].innerHTML = '<i class="fas fa-play fa-fw"></i>'
        document.getElementsByClassName('aplayer-pic')[0].classList.add("music_spin_pause")
        document.getElementsByClassName('aplayer-pic')[0].classList.remove("music_spin")
    }
    }
    


}
function hopelight_music_play_new(){
    aplayers[0].play()
    if (document.getElementsByClassName('hopelight_music_play')){
    document.getElementsByClassName('aplayer-pic')[0].classList.add("music_spin")
    document.getElementsByClassName('hopelight_music_play')[0].innerHTML = '<i class="fas fa-pause fa-fw"></i>'
}}
