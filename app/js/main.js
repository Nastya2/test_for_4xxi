"use strict";

var tooltipObj = new Tooltip({elem: document.querySelectorAll(".target-tooltip")});

var popup320 = new Popup({
  shareButton: document.querySelector(".share-button"),
  modal: document.querySelector(".modalWin320"),
  modalOverlay: document.querySelector(".modal-overlay"),
  closeModal: document.querySelector(".close-popup320")
});

function Tooltip(options) {
    var elem = options.elem;
    elem.forEach(function(item,i){
        elem[i].onmouseover = function(event) {
            var target = event.target;
            while (target != this) {
                target = target.parentElement;
            }
        render(target);
        };
   });
    elem.forEach(function(item,i) {
        elem[i].onmouseout = function() {
            var tooltip = document.querySelectorAll(".tooltip");
            hide(tooltip);
        };
    });
    function hide(tooltip) {
        for (var i = 0; i < tooltip.length; i++) {
            tooltip[i].classList.add("hide");
        }
    }
    function render(target) {
        var content = target.getAttribute("data-tooltip");
        var tooltip = document.createElement("div");
        tooltip.innerHTML = content;
        tooltip.classList.add("tooltip");
        addTooltip(target,tooltip);
    }
    function addTooltip(target,tooltip) {
        document.body.appendChild(tooltip);
        var coordinate = target.getBoundingClientRect();
        var top = coordinate.top - tooltip.offsetHeight - 10;
        var left = coordinate.left + (target.offsetWidth - tooltip.offsetWidth) / 2 - 5;
        tooltip.style.top = top + "px";
        tooltip.style.left = left  + "px"; 
    }
}

function Popup(options) {
    var shareButton = options.shareButton,
        modal = options.modal,
        modalOverlay = options.modalOverlay,
        closeModal = options.closeModal; 
    shareButton.onclick = function() {
        modal.classList.add("modal-show");
        modalOverlay.classList.add("modal-show");
    };
    closeModal.onclick = function() {
        modal.classList.remove("modal-show");
        modalOverlay.classList.remove("modal-show"); 
    };
}