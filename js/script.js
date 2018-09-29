(() => {
    console.log('esisto');

    let array = ['A','B','C','D','E','F','G','H','I'];
    const jsonPath = '/resources/data.json'; 
    let data = [];
    var json = $.getJSON(jsonPath, e => data = e.courses);

    console.log(data);

    let index = 0;
    let indicatorWrapper = document.querySelector('.indicator-wrapper div');
    let courseIcon = document.querySelector('.course-icon');
    let courseTitle = document.querySelector('.course-title');
    let courseContent = document.querySelector('.course-content');
    
    setTimeout(() => {
        for(i=0;i<data.length;++i){
            let divNode = document.createElement('div');
            divNode.classList += 'inactive indicator';
            indicatorWrapper.appendChild(divNode);
        }
    },10);
    setInterval(()=>{
        // courseIcon.innerHTML = "<i class="+data[index].icon+"></i>";
        // courseIcon.
        courseIcon.classList = ['course-icon '+ data[index].icon];
        courseTitle.innerHTML = '<b>'+data[index].title+'</b>';
        courseContent.innerHTML = '<p>'+data[index].content+'</p>';

        // var node = document.createElement('p');
        // var textnode = document.createTextNode(data[index].content); 
        // node.appendChild(textnode);
        // courseContent.appendChild(node);
        // let nod = document.querySelectorAll('.indicator');
        // console.log(nod[0]);
        toggleClass(indicatorWrapper.children[index]);
        // index >= 1 ? toggleClass(indicatorWrapper.children[index-1]) :  toggleClass(indicatorWrapper.children[data.length-1]);
        // let previous = indicatorWrapper.children[index-1];

        let previous = '';
        if(index == 0){
            previous = indicatorWrapper.children[data.length-1];
            if(previous.classList.contains('active') ){
                previous.classList.toggle('active');
            }
        }
        else {
            previous = indicatorWrapper.children[index-1];
            previous.classList.toggle('active');
        }
        

        // toggleClass(node);
        
        data.length != ++index ? index : index = 0;
    },2000);

    toggleClass = (node) => {
        node.classList.toggle('active');
    }



})()