'use strict';

var tooltipObj = new Tooltip({
  elem: document.querySelectorAll('.target-tooltip')
});

var popup320 = new Popup320({
  shareButton: document.querySelector('.share-button'),
  modal320: document.querySelector('.modalWin320'),
  modalOverlay: document.querySelector('.modal-overlay'),
  closeModal320: document.querySelector('.close-popup320')
});

function Tooltip(options) {

    var elem = options.elem;
    
    elem.forEach(function(item,i){
        
        elem[i].onmouseover = function(event) {
            var target = event.target;
            while(target != this) {
                target = target.parentElement;      
            }
             
            render(target);
          }
        
    }); 
    
    elem.forEach(function(item,i){
        elem[i].onmouseout = function() {
            var tooltip = document.querySelectorAll('.tooltip');
            hide(tooltip);
        }
    });
                 
    function hide(tooltip) {
         for (var i = 0; i < tooltip.length; i++) {
            tooltip[i].classList.add('hide');
        }
    }
    
    function render(target) {
        var content = target.getAttribute('data-tooltip');
        var tooltip = document.createElement('div');
        tooltip.innerHTML = content;
        tooltip.classList.add('tooltip');
        
        addTooltip(target,tooltip);
    }
    
    function addTooltip(target,tooltip) {
        
        document.body.appendChild(tooltip);
        var coordinate = target.getBoundingClientRect();
        var top = coordinate.top - tooltip.offsetHeight - 10;
        var left = coordinate.left + (target.offsetWidth - tooltip.offsetWidth) / 2 - 5;
        tooltip.style.top = top + 'px';
        tooltip.style.left = left  + 'px'; 
    }
}



function Popup320(options) {
    
   var shareButton = options.shareButton,
       modal320 = options.modal320,
       modalOverlay = options.modalOverlay,
       closeModal320 = options.closeModal320; 
    
    shareButton.onclick = function() {
        modal320.classList.add('modal320-show');
        modalOverlay.classList.add('modal320-show');
    }
    
    closeModal320.onclick = function() {
        modal320.classList.remove('modal320-show');
        modalOverlay.classList.remove('modal320-show'); 
    }
}
