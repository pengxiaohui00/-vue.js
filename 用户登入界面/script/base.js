/**
 * Created by С�� on 2018/3/27.
 */
function $(selector){
    return document.querySelector(selector);
}
function $$(selector){
    return document.querySelectorAll(selector);
}
$("header .login").onclick= function(e) {
    e.stopPropagation();
    $(".flip-modal").style.display="block"
};
$(".flip-modal").addEventListener("click",function(e){
    e.stopPropagation();
    if(e.target.classList.contains('login')){
        $('.flip-modal').classList.remove('register');
        $('.flip-modal').classList.add('login')
    }
    if(e.target.classList.contains('register')){
        $(".flip-modal").classList.add('register');
        $('.flip-modal').classList.remove('login')
    }
    if(e.target.classList.contains('close')){
        $(".flip-modal").style.display='none';
    }
});
document.addEventListener('click',function(){
    $('.flip-modal').style.display="none"
});
$(".modal-login form").addEventListener("submit",function(e){
    e.preventDefault();
    if(!/^\w{3,8}$/.test($('.modal-login input[name=username]').value)){
        $('.modal-login .errormsg').innerText="�û�����Ҫ����3-8���ַ���������ĸ�����»���";
        return false
    }
    if(!/^\w{6,10}$/.test($(".modal-login  input[name=password]").value)){
        $('.modal-login .errormsg').innerText="������Ҫ����6-10���ַ���������ĸ�����»���";
        return false;
    }
    this.submit();
});
$('.modal-register form').addEventListener('submit', function(e){
    e.preventDefault();
    if(!/^\w{3,8}$/.test($('.modal-register input[name=username]').value)){
        $('.modal-register .errormsg').innerText="�û�����Ҫ����3-8���ַ���������ĸ�����»���";
        return false
    }
    if(/^xiaohui$/.test($('.modal-register input[name=username]').value)){
        $('.modal-register .errormsg').innerText="�û����Ѵ���";
        return false
    }
    if(!/^\w{6,10}$/.test($(".modal-register input[name=password]").value)){
        $('.modal-register .errormsg').innerText="������Ҫ����6-10���ַ���������ĸ�����»���";
        return false
    }
    if($('.modal-register input[name=password]').value !==$('.modal-register input[name=password2]').value){
        $(".modal-register .errormsg").innerText= "������������벻һ��";
        return false
    }
    this.submit();
})