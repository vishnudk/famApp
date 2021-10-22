
function test() {
    //  <div id="6" class="gd-itm">
    //         <img style="width:100%;height:100%;" src="https://thispersondoesnotexist.com/image">
    //     </div>
    var mainDiv = document.getElementById('gd-cnt');
  for(var k = 0;k<10;k++){
      var tmDiv = document.createElement('div');
      tmDiv.id = k+1;
      tmDiv.className = "gd-itm";
      
      var tmImg = document.createElement('img');
      tmImg.src = "https://thispersondoesnotexist.com/image";
      tmImg.style.width = "100%";
      tmImg.style.height = "100%";
      tmDiv.appendChild(tmImg);
      mainDiv.appendChild(tmDiv);

  }
  var mItms = document.getElementsByClassName("gd-itm");
  for (var j = 0;j<mItms.length;j++){
            mItms[j].style.display = 'inline-grid';
        }
for (var i = 0; i < mItms.length; i++) {

    mItms[i].onclick = function () {
        var id = this.id;
        for (var j = 0;j<mItms.length;j++){
            if(mItms[j].style.display != 'none'){
            if (j+1 != id)
            {mItms[j].style.display = 'none';}}
            else{
                mItms[j].style.display = 'inline-grid';
            }
        }
        console.log(id);
}
}}