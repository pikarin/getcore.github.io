function toggleAside() {
    document.getElementById("navoonAside").classList.toggle("show-aside");
}

function toggleMenu() {
  document.getElementById("navoonMenu").classList.toggle("show-menu");
}

function openContent(event, tabContent) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" navoon-active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabContent).style.display = "block";
    event.currentTarget.className += " navoon-active";
}
document.getElementById("defaultOpen").click();
