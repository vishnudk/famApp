
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
                var flScreenBtn = document.createElement('button');
                var downloadBtn = document.createElement('button');

                var deleteIcon = document.createElement('i');
                deleteIcon.className = 'fa fa-trash';
                btn.appendChild(deleteIcon);
                btn.id = k;
                btn.className = 'btn1';

                var fullscreenIcon = document.createElement('i');
                fullscreenIcon.className = 'glyphicon glyphicon-fullscreen';
                flScreenBtn.appendChild(fullscreenIcon);
                flScreenBtn.id = k;
                flScreenBtn.className = 'btn2';

                var downloadIcon = document.createElement('i');
                downloadIcon.className = 'fa fa-download';
                downloadBtn.appendChild(downloadIcon);
                downloadBtn.id = k;
                downloadBtn.className = 'btn3';

                if (data[k]['filename'].includes('mp4')) {

                    var tmImg = document.createElement('video');
                    // tmImg.setAttribute("controls", "controls");

                }
                else {
                    var tmImg = document.createElement('img');
                }


                tmImg.id = data[k]['filename'];
                tmImg.src = url;
                tmImg.style.width = "100%";
                tmImg.style.height = "100%";
                tmDiv.appendChild(tmImg);
                mainDiv.appendChild(tmDiv);
                tmDiv.appendChild(da);
                tmDiv.appendChild(btn);
                tmDiv.appendChild(downloadBtn);
                tmDiv.appendChild(flScreenBtn);

            }




            var btn_itm = document.getElementsByClassName('btn1');
            for (var bt1 = 0; bt1 < btn_itm.length; bt1++) {
                btn_itm[bt1].addEventListener('click', function () {
                    var idNo = Number(this.id) + Number(1);
                    alert("deleteing.....");
                    try {
                        // console.log(document.getElementById(idNo).getElementsByTagName('img')[0].id);
                        fetch('http://localhost:3000/delete/' + document.getElementById(idNo).getElementsByTagName('img')[0].id).catch(() => {
                            alert("File deleted!!")
                            window.location.href = "http://localhost:5000/gallery"
                        });
                    }
                    catch (err) {
                        // console.log(document.getElementById(idNo).getElementsByTagName('video')[0].id);
                        fetch('http://localhost:3000/delete/' + document.getElementById(idNo).getElementsByTagName('video')[0].id).catch(() => {
                            alert("File deleted!!")
                            window.location.href = "http://localhost:5000/gallery"
                        });
                    }

                })
            }
        }).then(() => {
            // console.log(document.getElementsByClassName('btn2').length);
            // ##########################################################################
            var mItmsBtn = document.getElementsByClassName('btn2');
            var downloadBtnTmp = document.getElementsByClassName('btn3');
            var mItms = document.getElementsByClassName("gd-itm");
            for (var j = 0; j < mItms.length; j++) {
                mItms[j].style.display = 'inline-grid';
                // console.log("reached the for loop at the least0");

            }
            for (var ino = 0; ino < mItmsBtn.length; ino++) {
                downloadBtnTmp[ino].addEventListener('click', function () {
                    document.getElementById(Number(this.id) + Number(1)).getElementsByTagName('a')[0].click();
                });

                // console.log("reached the for loop at the least");
                mItmsBtn[ino].addEventListener('click', function () {
                    var id = this.id;
                    for (var jno = 0; jno < mItms.length; jno++) {
                        if (mItms[jno].style.display != 'none') {
                            if (jno != id) { mItms[jno].style.display = 'none'; }
                            else {
                                // console.log(document.getElementById(Number(id) + Number(1)).getElementsByTagName('video')[0].controls);
                                if (document.getElementById(Number(id) + Number(1)).getElementsByTagName('video')[0].controls == false) {
                                    // console.log('going to be true');
                                    try {
                                        // console.log(document.getElementById(Number(id) + Number(1)).getElementsByTagName('video').controls);
                                        document.getElementById(Number(id) + Number(1)).getElementsByTagName('video')[0].controls = 'true';//.setAttribute("controls", "controls");
                                    }
                                    catch (e) {

                                    }
                                }
                                else {
                                    try {
                                        // console.log('going to be false');

                                        // console.log(document.getElementById(Number(id) + Number(1)).getElementsByTagName('video').controls);
                                        document.getElementById(Number(id) + Number(1)).getElementsByTagName('video')[0].controls = false;//.setAttribute("controls", "controls");
                                    }
                                    catch (e) {

                                    }
                                }
                                // console.log(document.getElementById(Number(id) + Number(1)).getElementsByTagName('video')[0].controls);

                            }
                        }
                        else {
                            mItms[jno].style.display = 'inline-grid';

                        }
                    }
                    // console.log(id);
                });

            }

            // ##########################################################################

        });

}





