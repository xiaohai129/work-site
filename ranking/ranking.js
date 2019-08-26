function samResize() {
  var docEl = document.documentElement;
  var clientWidth = docEl.clientWidth;
  if (!clientWidth) {
      return
  }
  docEl.style.fontSize = 100 * (clientWidth / 750) + "px"
  console.log(clientWidth)
}

$(function () {
  samResize();
  let admin = new Admin('.ranking_wrap');
})

class Admin {
  constructor (el) {
    this.$dom = $(el);
    this.init();
  }
  init () {
    this.getData().then(res=>{
      console.log(res)
    })
    this.initEvent();
  }
  initEvent () {
    this.$dom.find('.content_box .title_box').on('click', function(){
      let $tEl = $(this);
      let $cEl =  $tEl.parent();
      let $cBtn = $tEl.find('.more_btn span');
      if($cEl.hasClass('active')){
        $cEl.removeClass('active')
        $cBtn.text('SHOW');
      }else{
        $cEl.addClass('active')
        $cBtn.text('LESS');
      }
    })
  }
  getData () {
   return new Promise((resolve,reject)=>{
     return $.ajax({
       type:'post',
       url:'https://api.sportradar.com/soccer/trial/v4/en/seasons/sr:season:66441/standings.json?api_key=9844ump7d8vzcsrrn2dmvhdr',
       dataType: 'jsonp',
       success:(res)=>{
         resolve();
         console.log(res)
         return res;
       }
     })
   })
  }
}