'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const 
        prev = document.getElementById('button-back'),
        next = document.getElementById('button-next'),
        start = document.getElementById('button-start'),
        sliderWrapper = document.querySelector('.form-wrapper'),
        stepers = document.querySelector('.steps'),
        startNslider = document.querySelector('.start-n-slider');
    
    
    let offsetStart = 0;
    let offsetSlide = 0;    

    start.addEventListener('click', () => {
        offsetStart += 900;        
        startNslider.style.transform = `translateX(-${offsetStart}px)`

    }) 

    next.addEventListener('click', () => {
        offsetSlide += 680;
        sliderWrapper.style.transform = `translateX(-${offsetSlide}px)`
    }) 
    prev.addEventListener('click', () => {
        offsetSlide -= 680;
        sliderWrapper.style.transform = `translateX(-${offsetSlide}px)`
    }); 
    console.log(offsetSlide);


});
