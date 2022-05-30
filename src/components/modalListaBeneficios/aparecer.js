var btn = document.querySelector('#show-or-hide');
var aparecer = document.querySelector('.numeroCupom_g2');

btn.addEventListener('click', function(){
    if(aparecer.style.display === 'block'){
        aparecer.style.display = 'none'
    }else{
        aparecer.style.display = 'block';
    }
});