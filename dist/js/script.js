'use strict';

window.addEventListener('DOMContentLoaded', () => {
    let 
        advantagesInput = document.querySelectorAll('.advantages-input'),
        removeButtons = document.querySelectorAll('.third-screen__remove-btn2'),
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
        inputText = document.querySelectorAll('[type="text"]'),
        inputMail = document.querySelector('[type="email"]'),
        firstForm = document.querySelectorAll('[data-num-page="1"]'),
        errorlabel = document.querySelectorAll('.errorlabel'),
        inputPagetwo = document.querySelectorAll('.second-screen__form_input'),
        advantagesVisibility = document.querySelectorAll('[data-visibility="visible"]'),
        checkboxGroup = document.querySelectorAll('[type="checkbox"]'),     
        checkboxP = document.getElementById('checkbox-p'),  
        textarea = document.getElementById('field-about'),
        textareaTip = document.querySelector('.four-screen__tip'),
        parentPlus = document.querySelector('.third-screen__form'),
        allInputs = document.getElementsByTagName('input'),

        showSexList = () => {            
            ChioseBlock.classList.toggle('changeSexList');
            svgSex.classList.toggle('rotate-180');
            secondScreen.classList.toggle('plusPadding-15px');
            windowSmall.classList.toggle('minusPadding-15px');
            stepsWrapper.classList.toggle('plusPadding-15px');
            navBtns.classList.toggle('widthMinus20px');
            stepsLineGrey.classList.toggle('left24px');                                     
        },
        removeError = (inputList) => {
            inputList.forEach(input => {
                if (input.classList.contains('errorBorder')) {
                    input.classList.remove('errorBorder'); 
                }
                if (input.previousSibling.textContent && clickOnNext !== 0) {
                    input.previousSibling.textContent = '';
                }   
                if (checkboxP.textContent = 'Not selected') {
                    checkboxP.textContent = 'Checkbox group';
                    checkboxP.style.color = 'black';
                }                
            });           
        };

    //навигация по страницам
    let offsetStart = 0;
    let offsetSlide = 0; 
    let offsetProgressLine = 0;  
    let offsetCircleMove = 0; 
    let clickOnNext = -1;
    //количество полей ввода
    let InputCount = 1;
    //актуальный массив из id видимых полей
    let visibleInputs = [];
    //индекс для visibleInputs
    let f = 0;
    //количество пустых чекбоксов
    let checkboxEmptyCounter = 0;

    //к началу формы
    start.addEventListener('click', () => {
    //валидация формы 1-й страницы
        removeError(firstForm);
        let result = true;
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        firstForm.forEach(input => {
            //на пустое поле
            if (input.value == '') {
                input.classList.add('errorBorder');
                input.previousSibling.textContent = "You haven't entered anything";
                result = false;
            }
            //на 11 цифр
            else if (input.value.length && input.type == 'number')  {                
                if (input.value.length !== 11) {
                    input.classList.add('errorBorder');
                    input.previousSibling.textContent = 'Enter 11 numbers in the format "79998887766"';
                    result = false;
                }
            }
            // на корректную почту
            else if (input.type == 'email' && EMAIL_REGEXP.test(inputMail.value) == false || inputMail.value.length > 30) {
                
                
                    inputMail.classList.add('errorBorder');
                    inputMail.previousSibling.textContent = 'Enter your valid email address';
                    result = false;                
            };
            console.log(inputMail.value.length > 30);
            console.log(input.type == 'email');
            console.log(EMAIL_REGEXP.test(inputMail.value) == false);
        });  
        if (result == true) {
            offsetStart += 900;        
        startNslider.style.transform = `translateX(-${offsetStart}px)`;
        };
    });  
    //помещаем выбор пользователя в INPUT 
    sexListItems.forEach(item => {
        item.addEventListener('click', () => {            
            selectSex.value = item.dataset.value;  
            console.log(selectSex.value);         
        });
    });
    //листаем форму вперед
    
    next.addEventListener('click', () => {        
        let result = true;
        if (clickOnNext == -1) {
            inputPagetwo.forEach(input => {
                if (input.nextSibling.classList.contains('errorTip')) {
                    input.nextSibling.classList.remove('errorTip'); 
                    input.nextSibling.textContent = 'Tip';                   
                }
                if (input.classList.contains('errorBorder')) {
                    input.classList.remove('errorBorder');                    
                }
            });
        };
        removeError(inputPagetwo);
        //валидация формы 2-й страницы        
        if (clickOnNext == -1) {             
            inputPagetwo.forEach(input => {                               
                if (input.value == '') {
                    input.nextSibling.textContent = "The field must be filled in";
                    input.nextSibling.classList.add('errorTip');
                    result = false;
                }
                if (input.value) {
                    if (input.value.length < 2) {
                        input.classList.add('errorBorder');
                        input.nextSibling.textContent = "Enter at least 2 characters";
                        input.nextSibling.classList.add('errorTip');
                        result = false;
                    }
                    if (input.value.length > 30) {
                        input.classList.add('errorBorder');
                        input.nextSibling.textContent = "Maximum of 30 characters";
                        result = false;
                    }                                   
                };
                
            });           
        };
        //валидация формы 3-й страницы
        //пресчитываем видимых полей при любом взамиодействии с third-screen__form
        parentPlus.addEventListener('click', () => {   
            f = 0;    
            for (let i = 0; i < parentPlus.firstElementChild.children.length; i++) {            
                if (parentPlus.firstElementChild.children[i].dataset.visibility == 'visible') {
                    visibleInputs[f] = parentPlus.firstElementChild.children[i].getAttribute('id');  
                    f++;              
                };           
            };
            console.log(visibleInputs);
            console.log(`количество в массиве видимых (f) = ${f}`);            
        });        
        if (clickOnNext == 0 ) {          
             
            //динамические поля
            removeError(advantagesInput)
            advantagesInput.forEach((input, i) => {                
                if (input.getAttribute('id') == visibleInputs[i]) {
                    //если пустое поле, то красная рамка и просьба заполнить поле
                    if (input.value == '') { 
                        input.classList.add('errorBorder');
                        input.classList.add('errorPlaceholder')
                        input.placeholder = 'Fill out this';                   
                        result = false;       
                    } 
                    //если меньше 2-х символов, то красная рамка и предупреждение
                    if (input.value && input.value.length < 2) { 
                        input.value = "";             
                        input.classList.add('errorBorder');
                        input.placeholder = "minimum of 2 characters"
                        input.classList.add('errorPlaceholder')
                        result = false;                    
                    }
                }                
            });         
            //чекбокс
            checkboxGroup.forEach(item => {
                if (item.checked == false) {
                    checkboxEmptyCounter++;                   
                }                              
            });
            if (checkboxEmptyCounter == 3) {
                checkboxP.textContent = 'Not selected';
                checkboxP.style.color = 'red';
                result = false;
            }
        }        
        //перелистывание
        if (offsetSlide, offsetProgressLine, offsetCircleMove >= 0 && offsetSlide, offsetProgressLine, offsetCircleMove < 500 && result == true) {
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
            if (clickOnNext === 1) {
                windowSmall.style.height = '500px';
                navBtns.style.bottom = '283px';
                next.style.display = 'none';
                buttonSend.style.display = 'block';
            };
        };
        console.log(clickOnNext);
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
        console.log(clickOnNext);
    });
    //отправить форму
    buttonSend.addEventListener('click', (e) => { 
        e.preventDefault();
        if (textarea.value) {
            textareaTip.textContent = 'Tip';
            textareaTip.style.color = 'black';
        }
        let result = true; 
        console.log(textareaTip);
        if (textarea.value == '' || textarea.value.length < 2) {
            console.log('err')
            textareaTip.textContent = 'Tell us about yourself in a free form';
            textareaTip.style.color = 'red';
            result = false;  
            return result;          
        }      
        if (result == true) {
            console.log('test')
            blackout.classList.toggle('show');
            modalSuccess.style.visibility = 'visible';
            modalSuccess.style.opacity = '1';
        }
        //перезагрузка после кнопки (на главную страницу)
        buttonToMain.addEventListener('click', () => {
        location.reload();
        });
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
    //создаем массив для удаленных полей
    const removeInputs = [];
    //счетчик удаленных полей
    let j = 0;
    //добавляем поля ввода
    plus.addEventListener('click', () => {
        //плюс исчезает, если полей 5шт
        if (InputCount >= 4) {
            plus.style.cssText = 'display: none';
        }
        //достаем из массива удаленные поля
        if (j > 0) {
            advantagesInput[removeInputs[j-1]].style.cssText = 'display: block';
            removeButtons[removeInputs[j-1]].style.cssText = 'display: block';
            advantagesInput[removeInputs[j-1]].dataset.visibility = 'visible'
            removeInputs.pop()
            j--;
            InputCount++;
        }
        else if (InputCount < 4) {
            //если массив удаленных полей пуст, то показываем новые
            advantagesInput[InputCount + 1].style.cssText = 'display: block';
            removeButtons[InputCount + 1].style.cssText = 'display: block';
            advantagesInput[InputCount + 1].dataset.visibility = 'visible'
            InputCount++;         
        };       
    }); 
    removeButtons.forEach((removeItem, i) => {         
        removeItem.addEventListener('click', () => {
            if (InputCount > 0) {
                advantagesInput[i].value = '';
                advantagesInput[i].placeholder = "Placeholder";
                advantagesInput[i].classList.remove('errorBorder');
                advantagesInput[i].classList.remove('errorPlaceholder');
                advantagesInput[i].dataset.visibility = 'hidden';
                advantagesInput[i].style.cssText = 'display: none';
                removeButtons[i].style.cssText = 'display: none';
                InputCount--;  
                removeInputs[j] = i;
                j++;
                for (let h = 0; h <= visibleInputs.length; h++) {
                    if (visibleInputs[h] == removeItem.dataset.removeinput) {
                        console.log(`удаляемый элемент ${removeItem.dataset.removeinput}`);
                        console.log(`индекс в массиве видимых (h) =${h}` );
                        visibleInputs.splice(h, 2);
                    }
                }               
                            
            }  
            if (InputCount < 4) {
                plus.style.cssText = 'display: block';
            }              
        });
    });

});

