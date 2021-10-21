var mItms = document.getElementsByClassName("gd-itm");
for (var i = 0; i < mItms.length; i++) {

    mItms[i].onclick = function () {
        // var div = this.parentElement;
        // for (var j = 0; j < mItms.length; j++) {
        //     if (j != div.id) {
        //         mItms[j].style.display = "none";
        //     }
        // }
        alert("function called succesfully!!");
    }
}
function test() {
    alert("hello how are you ");
}