'use strict';

window.addEventListener('DOMContentLoaded', () => {
    let 
        advantagesInput = document.querySelectorAll('.advantages-input'),
        removeButtons = document.querySelectorAll('.third-screen__remove-btn'),
        plus = document.querySelector('.third-screen__form__add-btn');

    const 
        prev = document.getElementById('button-back'),
        next = document.getElementById('button-next'),
        start = document.getElementById('button-start'),
        sliderWrapper = document.querySelector('.form-wrapper'),
        startNslider = document.querySelector('.start-n-slider'),
        selectSex = document.getElementById('field-sex'),
        ChioseBlock = document.querySelector('.second-screen__form__choice'),
        svgSex = document.querySelector('.svg-sex'),
        secondScreen = document.querySelector('.second-screen'),
        windowSmall = document.querySelector('.window__small'),
        stepsWrapper = document.querySelector('.steps__wrapper'),
        navBtns = document.querySelector('.nav-btns'),
        sexListItems = document.querySelectorAll('.second-screen__form__choice-item'),        
        buttonsBlock = document.querySelector('.third-screen__remove-btns'),                
        advantagesInputBlock = document.querySelector('.third-screen__advantages'),
        stepsLineGrey = document.querySelector('.steps__line'),
        progressLine = document.querySelector('.steps__progress-line'),
        circleGrey = document.querySelectorAll('.steps__circle'),
        circleDone = document.querySelectorAll('.steps__circle-done'),
        circleMove = document.querySelector('.steps__circle-move'),
        buttonSend = document.getElementById('button-send'),
        modalSuccess = document.querySelector('.modal-success'),
        blackout = document.querySelector('.blackout'),
        buttonToMain = document.getElementById('button-to-main'),
        showSexList = () => {            
            ChioseBlock.classList.toggle('changeSexList');
            svgSex.classList.toggle('rotate-180');
            secondScreen.classList.toggle('plusPadding-15px');
            windowSmall.classList.toggle('minusPadding-15px');
            stepsWrapper.classList.toggle('plusPadding-15px');
            navBtns.classList.toggle('widthMinus20px');
            stepsLineGrey.classList.toggle('left24px');                                     
        },
        recalculation = () => {
            advantagesInput = document.querySelectorAll('.advantages-input');
            removeButtons = document.querySelectorAll('.third-screen__remove-btn');
        };

    //навигация по страницам
    let offsetStart = 0;
    let offsetSlide = 0; 
    let offsetProgressLine = 0;  
    let offsetCircleMove = 0; 
    let clickOnNext = -1;

    //к началу формы
    start.addEventListener('click', () => {
        offsetStart += 900;        
        startNslider.style.transform = `translateX(-${offsetStart}px)`;
    });

    //листаем форму вперед
    next.addEventListener('click', () => {
        if (offsetSlide, offsetProgressLine, offsetCircleMove >= 0 && offsetSlide, offsetProgressLine, offsetCircleMove < 500) {
            offsetSlide += 680;
            offsetProgressLine += 337;
            offsetCircleMove += 332;
            clickOnNext += 1;
            sliderWrapper.style.transform = `translateX(-${offsetSlide}px)`;
            progressLine.style.width = `${offsetProgressLine}px`;
            circleMove.style.display = 'block';
            circleMove.style.transform = `translateX(${offsetCircleMove}px)`;      
            circleGrey[clickOnNext].style.display = 'none';
            circleDone[clickOnNext].style.display = 'block';
            console.log(clickOnNext);
            if (clickOnNext === 1) {
                windowSmall.style.height = '500px';
                navBtns.style.bottom = '283px';
                next.style.display = 'none';
                buttonSend.style.display = 'block';
            };
        };
        
    }); 

    //листаем форму назад
    prev.addEventListener('click', () => {
        if (offsetSlide, offsetProgressLine, offsetCircleMove >= 0 && clickOnNext >= 0) {
            offsetSlide -= 680;
            offsetProgressLine -= 337;
            offsetCircleMove -= 332;
            clickOnNext -= 1;
            sliderWrapper.style.transform = `translateX(-${offsetSlide}px)`
            progressLine.style.width = `${offsetProgressLine}px`;
            circleMove.style.transform = `translateX(${offsetCircleMove}px)`;
            circleDone[clickOnNext + 1].style.display = 'none';
            circleGrey[clickOnNext + 1].style.display = 'block'; 
            if (clickOnNext < 1) {
                windowSmall.style.height = 'auto';
                navBtns.style.bottom = '75px';
                next.style.display = 'block';
                buttonSend.style.display = 'none';
            };           
        };
    });
    //отправить форму
    buttonSend.addEventListener('click', () => {        
        blackout.classList.toggle('show');
        modalSuccess.style.visibility = 'visible';
        modalSuccess.style.opacity = '1';
    });
    //перезагрузка после кнопки (на главную страницу)
    buttonToMain.addEventListener('click', () => {
        location.reload();
    });

    //выдвигаем меню выбора пола
    selectSex.addEventListener('click', showSexList);
    svgSex.addEventListener('click', showSexList);

    //убираем меню выбора пола. Тень от меню была не видна, пришлось расширять блок на время появления меню.
    sexListItems.forEach(item => {
        item.addEventListener('click', () => {
            selectSex.innerText = item.innerText;
            selectSex.placeholder = item.innerText;
            selectSex.dataset.value = item.dataset.value;
            ChioseBlock.classList.toggle('changeSexList');
            svgSex.classList.toggle('rotate-180');
            secondScreen.classList.toggle('plusPadding-15px');
            windowSmall.classList.toggle('minusPadding-15px');
            stepsWrapper.classList.toggle('plusPadding-15px');
            navBtns.classList.toggle('widthMinus20px'); 
            stepsLineGrey.classList.toggle('left24px');                                 
        });
    });   
    
    //наблюдение за изменениями DOM-дерева
    const mutationObserver = new MutationObserver(recalculation => {
        advantagesInput = document.querySelectorAll('.advantages-input');
        removeButtons = document.querySelectorAll('.third-screen__remove-btn');
        console.log(recalculation);
    });
    mutationObserver.observe(advantagesInputBlock, {childList: true});
    mutationObserver.observe(buttonsBlock, {childList: true});

    //добавляем поля ввода
    plus.addEventListener('click', () => {
        const newInput = document.createElement('input');
        newInput.classList.add('advantages-input');
        newInput.setAttribute('id', 'field-advantages-4');
        newInput.setAttribute('name', 'advantages');
        newInput.setAttribute('placeholder', 'Placeholder');
        newInput.setAttribute('type', 'text');        
        advantagesInputBlock.appendChild(newInput);

        const newRemove = document.createElement('div');
        newRemove.classList.add('third-screen__remove-btn');
        newRemove.setAttribute('id', 'button-remove-4');
        newRemove.innerHTML = '<img src="icons/remove.svg" alt="remove">';
        buttonsBlock.appendChild(newRemove);

        recalculation();
    });   
    

    //удаляем лишние поля ввода     
    removeButtons.forEach((itemRemove, i) => {
        recalculation();
        itemRemove.addEventListener('click', () => {
            itemRemove.remove();
            advantagesInput[i].remove();
            recalculation();
            console.log(advantagesInput.length); 
        });
            
    });
});
