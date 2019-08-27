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
    this.$dom.find('.content_box .title_box').eq(0).click();
    this.$dom.find('.tips_wrap').click();
    this.$dom.find('.type_list_box li').eq(0).click();
  }
  initEvent () {
    let tipsHeight = this.$dom.find('.tips_wrap').height() - this.$dom.find('.tips_wrap .shrink_btn').height() ;
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
      return false;
    })

    this.$dom.find('.tips_wrap').on('click',function () {
      let $tEl = $(this);
      let isopen = $tEl.attr('isopen');
      if(isopen == 1){
        $tEl.css('bottom',0).attr('isopen',0).removeClass('active');
      }else{
        $tEl.css('bottom',-tipsHeight).attr('isopen',1).addClass('active');
      }
      return false;
    })

    this.$dom.find('.type_list_box li').on('click', (e) => {
      let $tEl = $(e.target);
      let index = $tEl.data('index');
      if(index >= 0){
        let $btns = this.$dom.find('.type_list_box li').removeClass('active');
        $btns.eq(index).addClass('active');
        let $panels = this.$dom.find('.detail_list_box').css('display','none');
        $panels.eq(index).css('display','table');
        this.$dom.find('#type_list_underline').css('left', (33.3*index)+'%')
      }
      return false;
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