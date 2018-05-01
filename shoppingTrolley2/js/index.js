function getCommodityHtml(commodity){
    var html='';
    html +='<li class="commodity">';
    html +='<div class="cover"><a href="#" class="btn action-delete hide">删除</a></div>';
    html +='<a href="#">';
    html +='<img src="'+commodity.img+'" alt=""/>';
    html +='<div class="commodity-name">'+commodity.name+'</div>';
    html +='<div class="commodity-price">'+commodity.price+'</div>';
    html +='</a>';
    html +='</li>';
    return html;
}

function getDate(){
    var result = [];
for(var i=0;i<3;i++){
    var rand =Math.floor(Math.random()*100);
var date ={
    img:'http://picsum.photos/200/?image='+rand,
name:'珍珠',
price:'￥'+rand
};
result.push(date)
};
return result;
}

$('.btn-add').on('click',function(e){
    e.preventDefault();
    $('.commodity').removeClass('hover');
    var products= getDate();
$.each(products,function(idx,commodity){
    var html =getCommodityHtml(commodity);
    $('.commodity-ct').append(html)
})
});

$('.btn-edit').on('click',function(e){
    e.preventDefault();
    $(".btn.hide").toggle("hide")
    $('.commodity').toggleClass("hover")

});

$('.commodity-ct').on('click',".action-delete",function(e){
    e.preventDefault();
    $(this).parents('.commodity').remove()
});
