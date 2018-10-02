/*
Version: 1.0
Module: script.js
*/

(() => {
    //declare all invariant values
    const WINDOW_WIDTH = window.innerWidth;
    const ICON_PARENT_NODE = '.icon-container';
    const TITLE_PARENT_NODE = '.course-title';
    const CONTENT_PARENT_NODE = '.course-content';
    const JSON_PATH = '/resources/data.json';
    const MAIN = document.querySelector('main');


    const CAROUSEL_LEFT_BUTTON = document.querySelector('button[name="left"]');
    const CAROUSEL_RIGHT_BUTTON = document.querySelector('button[name="right"]');
    const INDICATOR_DEFAULT_CLASS = 'inactive indicator';
    const INDICATOR_ACTIVE_CLASS = 'active';
    const COURSE_ICON_DEFAULT_CLASS = 'course-icon';

    //decalre local variables
    let index = 0;
    let swipeStart = 0;
    let previousIndex = 0;
    let data = [];
    let carouselList = [];
    let indicatorWrapper = document.querySelector('.indicator-wrapper div');

    

    //fetches data locally and adds its content to the list 'data'
    var json = $.getJSON(JSON_PATH, (obj)=>{
        data = obj.courses;
    });

    //creates a Carousel object for each data object present in 'data' list
    //using the relative values
    //uses setTimeout to contrast synch issue
    setTimeout(() => {
        for(i=0;i<data.length;++i){
            let divNode = document.createElement('div');

            divNode.classList += INDICATOR_DEFAULT_CLASS;
            
            i==0 ? divNode.classList += ' '+INDICATOR_ACTIVE_CLASS : null;

            indicatorWrapper.appendChild(divNode);
            
            carouselList.push(new Carousel(data[i].icon, data[i].title, data[i].content)
            .setIconClass(COURSE_ICON_DEFAULT_CLASS)
            .setIconParentNode(ICON_PARENT_NODE)
            .setTitleParentNode(TITLE_PARENT_NODE)
            .setContentParentNode(CONTENT_PARENT_NODE));
        }
    },0);

    

    //sets offest value from where mouse-down event has happend
    swipeStart = (e) => {
        swipeStart = e.offsetX;
    }

    //calculates difference between initial offset value and last offser value
    swipeEnd = (e) => {
        e.offsetX > swipeStart ? changeContent(true)
        : e.offsetX > WINDOW_WIDTH/2 ? changeContent(true)
        : changeContent(false);
    }

    

    //updates carousel components
    changeContent = (isRight) => {

        index = updateIndex(carouselList,index,isRight);
        updateIndicator(indicatorWrapper, index, previousIndex, INDICATOR_ACTIVE_CLASS);

        carouselList[index]
        .displayIconNode()
        .displayTitleNode()
        .displayContentNode();
        previousIndex = index;
    };


    //calculates appropriate index value and returns it
    updateIndex = (dataArray, index, isRight) => {
        if(isRight){
            if(++index != dataArray.length){
                return index;
            }
            else {
                return 0;
            }
        }
        else {
            if(--index != -1){
                return index;
            }
            else {
                return dataArray.length-1;
            }
        }    
    }


    //toggles classname for current indicator and previous indicator
    updateIndicator = (indicatorArray, index, previousIndex, className) => {
        indicatorArray.children[index].classList.toggle(className);
        indicatorArray.children[previousIndex].classList.toggle(className);
    }

    //add event listeners to DOM 'main' tag
    MAIN.addEventListener('touchStart', swipeStart, false);
    MAIN.addEventListener('mousedown', swipeStart, false);
    MAIN.addEventListener('touchEnd', swipeEnd, false);
    MAIN.addEventListener('mouseup', swipeEnd, false);
    CAROUSEL_LEFT_BUTTON.addEventListener('click', changeContent, false);
    CAROUSEL_RIGHT_BUTTON.addEventListener('click', changeContent, false);


    //Carousel object
    //it uses the builder design pattern in some
    //instances to make code more readable
    function Carousel(icon, title, content) {
        this.icon = icon;
        this.title = title;
        this.content = content;
        this.classList = [icon];
        this.iconNode = document.createElement('i');

        this.iconParentNode = '';
        this.titleParentNode = '';
        this.contentParentNode = '';


        //retrives DOM given a selector name
        this.getParentNode = (name) => {
            return document.querySelector(name);
        };


        //adds class name to local class list
        this.setIconClass = (iconClass) => {
            !this.classList.includes(iconClass) ? this.classList.push(iconClass) : null;
            return this;
        };

        //sets DOM node in which icon must be displayed
        this.setIconParentNode = (node) => {
            this.iconParentNode = this.getParentNode(node);
            return this;
        }

        //sets DOM node in which course title must be displayed
        this.setTitleParentNode = (node) => {
            this.titleParentNode = this.getParentNode(node);
            return this;
        }

        //sets DOM node in which course description must be displayed
        this.setContentParentNode = (node) => {
            this.contentParentNode = this.getParentNode(node);
            return this;
        }
    
        //publishes the icon DOM element on display
        this.displayIconNode = () => {
            this.iconNode.classList = this.classList.join(' ');
            $(this.iconParentNode).clearQueue();
            $(this.iconParentNode).stop();
            $(this.iconParentNode).animate({fontSize: '.9em'},500,()=>{
                this.iconParentNode.innerHTML = '';
               
                this.iconParentNode.appendChild(this.iconNode);
            $(this.iconParentNode).animate({fontSize: '1em'},100);
            });

            return this;
         };

        //publishes the course title DOM element on display
        this.displayTitleNode = () => {
            $(this.titleParentNode).clearQueue();
            $(this.titleParentNode).stop();
            $(this.titleParentNode).animate({fontSize: '.9em'},100,()=>{
                this.titleParentNode.innerHTML = '<b>'+this.title+'</b>';
            $(this.titleParentNode).animate({fontSize: '1em'},100);
            });
           
           return this;
        };

        //publishes the course description DOM element on display
        this.displayContentNode = () => {
            $(this.contentParentNode).clearQueue();
            $(this.contentParentNode).stop();
            $(this.contentParentNode).animate({fontSize: '.9em'},500,()=>{
                this.contentParentNode.innerHTML = '<p>'+this.content+'</p>';
            $(this.contentParentNode).animate({fontSize: '1em'},100);
        });
            return this;
        };
    }

   
})()