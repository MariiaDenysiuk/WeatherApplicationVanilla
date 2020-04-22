class EventObserver {
    constructor () {
        this.observers = [];
    }

    subscribe (fn) {
        this.observers.push(fn);
    }

    unsubscribe (data) {
        this.observers.forEach(subscribe => this.subscribe(data))
    }

    broadcast (data) {
        this.observers.forEach(subscriber => subscriber(data))
    }
}

class DomManipulation {
    findAll = (el) => {
        return document.querySelectorAll(el);
    }

    findParticularSelector = (el) => {
        return document.guerySelector(el);
    }

    addInnerHtmlI = (el, html, callback) => {
        el.innerHTML = '';
        const createElement = document.createElement('i');
        createElement.classList.add('fas', html);
        this.addListener(createElement, callback);
        el.appendChild(createElement);
    }

    addClass = (el, className) => {
        this.findAll('.cont__output').forEach(n => n.classList.remove('active_block', 'disactive_block'));
        el.classList.add(className);
    }

    addListener = (el, callback) => {
        el.addEventListener('click', () => callback() );
    }
   
}

class SvgCreator {
    point1Y = 90;
    point1X = 65;
    point2X = 85;

    createSvg = (vals) => { 
          if(vals === '1') {
            this.point1Y = this.point1Y + 10; 
            this.point1X = this.point1X + 3;
            this.point2X = this.point2X - 3;
    
            const svg = document.getElementById('s3');
            svg.setAttribute('d', "M "+this.point1X+ " "+this.point1Y+" L "+this.point2X+ " "+this.point1Y+ " L 75 113 z"); 
        } else {
             const svg = document.getElementById('s3')  
             svg.setAttribute('d', "M 65 90 L 85 90 L 75 113 z");     
        }
  
  }
}


class CheckBoxCreator {
    svgPicture =  new SvgCreator();    

    modal = document.querySelector('.modal');
    btn = document.querySelector('.modal_button');
    
    checkboxCreation = (event) => {
        this.modal.classList.add('active-modal');
        this.btn.addEventListener('click', this.onClick)
    }
    
    onClick = (event) => {
        this.createCheckbox();
        this.svgPicture.createSvg('0');
        this.modal.classList.remove('active-modal');     
    }

    createCheckbox = () => {
        const outputContainer = document.querySelector('.cont__output');
        const inputValue = document.querySelector('.modal_input').value;
        const div = document.createElement('div');
        let checkbox = document.createElement('input');
        let label = document.createElement('label');  
      
        label.innerText = inputValue;
    
        checkbox.type = "checkbox"; 
        checkbox.name = "name"; 
        checkbox.value = "value"; 
        
        checkbox.addEventListener('click', this.checkboxListener);    
        div.appendChild(checkbox);
        div.appendChild(label);
        outputContainer.appendChild(div);
    }

    checkboxListener = (event) => {
        this.svgPicture.createSvg('1');
    }

}


class Templater {
    observer = new EventObserver();
    domFinder = new DomManipulation();
    checkboxObj = new CheckBoxCreator();

    childButn = this.domFinder.findAll('.button__child');
    parentButn = this.domFinder.findAll('.button__parent');
    outputContainer = this.domFinder.findAll('.cont__output');

    templatesButtons = {
        'weatherButtons': () => {
            this.domFinder.addInnerHtmlI(this.childButn[0], 'fa-palette', () => changeWeatherColor_1());
            this.domFinder.addInnerHtmlI(this.childButn[1], 'fa-palette', () => changeWeatherColor());
        },
        'timeButtons': () => {
            this.domFinder.addInnerHtmlI(this.childButn[0], 'fa-plus', this.checkboxObj.checkboxCreation);
            this.domFinder.addInnerHtmlI(this.childButn[1], 'fa-palette', () => changeTimeColor());
        },
    }
    
    templatesContainers = {
        'weatherButtons': () => {
            this.domFinder.addClass(this.outputContainer[1], 'active_block');
            this.domFinder.addClass(this.outputContainer[0], 'disactive_block');
        },
        'timeButtons': () => {
            this.domFinder.addClass(this.outputContainer[0], 'active_block');
            this.domFinder.addClass(this.outputContainer[1], 'disactive_block');
        },
    }

     subscriber = () => {
        this.observer.subscribe((data) => {
            this.templatesContainers[data]();
        });
    
        this.observer.subscribe((data) => {
            this.templatesButtons[data]()
        }); 
     }

     broadcaster = () => {
        this.observer.broadcast('timeButtons');
        this.parentButn[0].addEventListener('click', () => {
            this.observer.broadcast('timeButtons');
        });
        
        this.parentButn[1].addEventListener('click', () => {
             this.observer.broadcast('weatherButtons');
        });
     }
    
    
}

const trmplaters = new Templater();
trmplaters.subscriber();
trmplaters.broadcaster();



// const changeTimeColor = () => {
//     console.log('time color was changed');
// }

// const changeWeatherColor = () => {
//     console.log('weather color was changed');
// }

// const changeWeatherColor_1 = () => {
//     console.log('weather 1 color was changed');
// }


// event listener for popup

