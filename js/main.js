let $allbuttons = $('#buttons>button')
let $images = $('#images')
let $img = $('#images>img')
let current = 0
let imgWide =new Image();
imgWide.src="img/team-cover1.jpg";
let range = imgWide.width


makeFakeSlides()
$images.css({transform:`translateX(${-range}px)`})  // 图片宽度
activeButton($allbuttons.eq(0))
bindEvents()

let timeId =setInterval(function(){
  goToSlides(current+1)
},2000)

$('#container').on('mouseenter',function(){
  window.clearInterval(timeId)
})

$('#container').on('mouseleave',function(){
  timeId =setInterval(function(){
  goToSlides(current+1)
},2000)
})

$allbuttons.on('mouseenter',function(e){
 activeButton($(e.currentTarget))
})

$allbuttons.on('mouseleave',function(e){
  $(e.currentTarget).removeClass('red')
})

function bindEvents(){
  $('#buttons').on('click','button',function(e){
    let $button = $(e.currentTarget);
    let index = $button.index();
    goToSlides(index);
  })
}


function activeButton($button){
  $button.addClass('red')
 .siblings('.red').removeClass('red');
}

function makeFakeSlides(){
  let $firstCopy = $img.eq(0).clone(true)
  let $lastCopy = $img.eq($img.length-1).clone(true)

  $images.append($firstCopy)
  $images.prepend($lastCopy)
}
  
function goToSlides(index){
      if(index>$allbuttons.length-1){
        index = 0;
      }else if(index<0){
        index = $allbuttons.length-1;
      }
      if(current === $allbuttons.length-1 && index === 0){
      $images.css({transform:`translateX(${-($allbuttons.length+1)*range}px)`})
      .one('transitionend',function(){
       $images.hide().offset();
       $images.css({transform:`translateX(${-(index+1)*range}px)`}).show();
     })
       activeButton($allbuttons.eq(index))
    }else if(current === 0 && index === $allbuttons.length-1){
      $images.css({transform:'translateX(0px)'})
      .one('transitionend',function(){
       $images.hide().offset();
       $images.css({transform:`translateX(${-(index+1)*range}px)`}).show();
     })
        activeButton($allbuttons.eq(index))
    }else{
        $images.css({transform:`translateX(${-(index+1)*range}px)`});
         activeButton($allbuttons.eq(index))
    }    
      current = index;
}

document.addEventListener('visibilitychange',function(){
  if(document.hidden){
    window.clearInterval(timeId)
  }else{
    timeId =setInterval(function(){
  goToSlides(current+1)
   },2000)
  }
})