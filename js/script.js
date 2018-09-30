(() => {
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

    let index = 0;
    let previousIndex = 0;
    let data = [];
    let carouselList = [];
    let indicatorWrapper = document.querySelector('.indicator-wrapper div');

    

    var json = $.getJSON(JSON_PATH, (obj)=>{
        data = obj.courses;
    }).done(function(){ 
        var ca = new Carousel(data[0].icon, data[0].title, data[0].content)
        .setIconClass(COURSE_ICON_DEFAULT_CLASS)
        .setIconParentNode(ICON_PARENT_NODE)
        .setTitleParentNode(TITLE_PARENT_NODE)
        .setContentParentNode(CONTENT_PARENT_NODE);
    }) ;

    
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

    

    let xStart = 0;
    swipeStart = (e) => {
        xStart = e.offsetX;
    }
    swipeEnd = (e) => {
        e.offsetX > xStart ? changeContent(true)
        : e.offsetX > WINDOW_WIDTH/2 ? changeContent(true)
        : changeContent(false);
    }

    

    changeContent = (isRight) => {

        index = updateIndex(carouselList,index,isRight);
        updateIndicator(indicatorWrapper, index, previousIndex, INDICATOR_ACTIVE_CLASS);

        carouselList[index]
        .displayIconNode()
        .displayTitleNode()
        .displayContentNode();
        previousIndex = index;
    };


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


    updateIndicator = (indicatorArray, index, previousIndex, className) => {
        indicatorArray.children[index].classList.toggle(className);
        indicatorArray.children[previousIndex].classList.toggle(className);
    }

    MAIN.addEventListener('touchStart', swipeStart, false);
    MAIN.addEventListener('mousedown', swipeStart, false);
    MAIN.addEventListener('touchEnd', swipeEnd, false);
    MAIN.addEventListener('mouseup', swipeEnd, false);
    CAROUSEL_LEFT_BUTTON.addEventListener('click', changeContent, false);
    CAROUSEL_RIGHT_BUTTON.addEventListener('click', changeContent, false);


    
    function Carousel(icon, title, content) {
        this.icon = icon;
        this.title = title;
        this.content = content;
        this.classList = [icon];
        this.iconNode = document.createElement('i');

        this.iconParentNode = '';
        this.titleParentNode = '';
        this.contentParentNode = '';



        this.getParentNode = (name) => {
            return document.querySelector(name);
        };

        this.setIconClass = (iconClass) => {
            !this.classList.includes(iconClass) ? this.classList.push(iconClass) : null;
            return this;
        };

        this.setIconParentNode = (node) => {
            this.iconParentNode = this.getParentNode(node);
            return this;
        }

        this.setTitleParentNode = (node) => {
            this.titleParentNode = this.getParentNode(node);
            return this;
        }

        this.setContentParentNode = (node) => {
            this.contentParentNode = this.getParentNode(node);
            return this;
        }


        this.displayIconNode = () => {
            this.iconNode.classList = this.classList.join(' ');
            $(this.iconParentNode).clearQueue();
            $(this.iconParentNode).stop();
            $(this.iconParentNode).animate({fontSize: '.9em'},500,()=>{
                this.iconParentNode.innerHTML = null;
               
                this.iconParentNode.appendChild(this.iconNode);
            $(this.iconParentNode).animate({fontSize: '1em'},100);
            });

            return this;
         };

        this.displayTitleNode = () => {
            $(this.titleParentNode).clearQueue();
            $(this.titleParentNode).stop();
            $(this.titleParentNode).animate({fontSize: '.9em'},100,()=>{
                this.titleParentNode.innerHTML = '<b>'+this.title+'</b>';
            $(this.titleParentNode).animate({fontSize: '1em'},100);
            });
           
           return this;
        };

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

    function CarouselIndicator(isActive){
        this.disabledColor = disabledColor;
        this.activeColor = activeColor;

        this.setActiveColor = (color) => {
            this.activeColor = color;
        }

        this.setDisabledColor = (color) => {
            this.disabledColor = color;
        }
    }

   
})()