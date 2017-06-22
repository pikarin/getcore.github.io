// nava accordion 
var navaAcc = document.getElementsByClassName("nava-Accordion");
var c;

for (c = 0; c < navaAcc.length; c++) {
  navaAcc[c].onclick = function() {
    this.classList.toggle("nava-accordion-active");
    var navaPanel = this.nextElementSibling;
    if (navaPanel.style.maxHeight){
      navaPanel.style.maxHeight = null;
    } else {
      navaPanel.style.maxHeight = navaPanel.scrollHeight + "px";
    } 
  }
} 