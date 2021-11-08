
function test() {
    //  <div id="6" class="gd-itm">
    //         <img style="width:100%;height:100%;" src="https://thispersondoesnotexist.com/image">
    //     </div>
    var mainDiv = document.getElementById('gd-cnt');
    let data;
    fetch('http://localhost:5000/apiData').then(data => { return data.json() })
        .then(res => {
            data = res['data'];
            console.log(res['data'])
            let url;
            let k;
            // var url = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fthumbs.dreamstime.com%2Fz%2Ferror-text-written-programming-code-abstract-technology-background-software-developer-computer-script-concept-monitor-153546994.jpg&imgrefurl=https%3A%2F%2Fwww.dreamstime.com%2Ferror-text-written-programming-code-abstract-technology-background-software-developer-computer-script-concept-monitor-image153546994&tbnid=opX8GB35WyoZXM&vet=12ahUKEwjrntfTsob0AhWaVCsKHUWIBSwQMygIegUIARC_AQ..i&docid=j5MWXfR9tWLZ0M&w=1600&h=1019&q=304%20error&ved=2ahUKEwjrntfTsob0AhWaVCsKHUWIBSwQMygIegUIARC_AQ'
            for (k = 0; k < data.length; k++) {
                url = 'http://localhost:3000/files/' + data[k]['filename'];

                var tmDiv = document.createElement('div');
                tmDiv.id = k + 1;
                tmDiv.className = "gd-itm";
                var da = document.createElement('a');
                da.href = url;
                da.setAttribute("download", "true");
                var btn = document.createElement('button');
                btn.innerText = "delete";
                btn.id = k;
                btn.className = 'btn1';
                if (data[k]['filename'].includes('mp4')) {

                    var tmImg = document.createElement('video');
                    tmImg.setAttribute("controls", "controls");

                }
                else {
                    var tmImg = document.createElement('img');
                }
                btn.onClick = function () {

                    console.log("hello how are you ");//+ this.id)
                    // console.log(tmImg[0].id);

                }

                tmImg.id = data[k]['filename'];
                tmImg.src = url;
                tmImg.style.width = "100%";
                tmImg.style.height = "100%";
                tmDiv.appendChild(tmImg);
                mainDiv.appendChild(tmDiv);
                tmDiv.appendChild(da);
                tmDiv.appendChild(btn);

            }

            // var mItms = document.getElementsByClassName("gd-itm");
            // for (var j = 0; j < mItms.length; j++) {
            //     mItms[j].style.display = 'inline-grid';
            // }
            // for (var i = 0; i < mItms.length; i++) {

            //     mItms[i].onclick = function () {
            //         var id = this.id;
            //         for (var j = 0; j < mItms.length; j++) {
            //             if (mItms[j].style.display != 'none') {
            //                 if (j + 1 != id) { mItms[j].style.display = 'none'; }
            //             }
            //             else {
            //                 mItms[j].style.display = 'inline-grid';
            //             }
            //         }
            //         console.log(id);
            //     }
            // }
            var btn_itm = document.getElementsByClassName('btn1');
            for (var bt1 = 0; bt1 < btn_itm.length; bt1++) {
                btn_itm[bt1].addEventListener('click', function () {
                    var idNo = Number(this.id) + Number(1);
                    alert("deleteing.....");
                    try {
                        console.log(document.getElementById(idNo).getElementsByTagName('img')[0].id);
                        fetch('http://localhost:3000/delete/' + document.getElementById(idNo).getElementsByTagName('img')[0].id).catch(() => {
                            alert("File deleted!!")
                            window.location.href = "http://localhost:5000/gallery"
                        });
                    }
                    catch (err) {
                        console.log(document.getElementById(idNo).getElementsByTagName('video')[0].id);
                        fetch('http://localhost:3000/delete/' + document.getElementById(idNo).getElementsByTagName('video')[0].id).catch(() => {
                            alert("File deleted!!")
                            window.location.href = "http://localhost:5000/gallery"
                        });
                    }

                })
            }
        });

}





