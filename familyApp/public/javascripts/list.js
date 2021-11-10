
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    }
}



function newElementEnter(event) {

    if (event.keyCode === 13) {
        event.preventDefault(event);
        document.getElementById("add-btn").click();
    }

}
// Create a new list item when clicking on the "Add" button
function enterDataToUi(inputValue) {
    var li = document.createElement("li");

    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("text-container").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    putDataToDataBase(inputValue);
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.remove();
            var xhr = new XMLHttpRequest();
            xhr.open("POST", 'http://localhost:5000/removeFromDataBase', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({
                itm: div.innerText.split("\n")[0]
            }));
            // removeFromDataBase
        }
    }
}
function newElement() {

    enterDataToUi(document.getElementById("text-container").value);

}


function getDataFromDataBase() {
    // listGetData
    fetch('http://localhost:5000/listGetData').then(data => { return data.json() })
        .then(res => {
            data = res['result'];
            console.log(res['result']);
            for (var j = 0; j < data.length; j++) {
                console.log(data[j]['itmName']);
                enterDataToUi(data[j]['itmName']);
            }
        });
}

function putDataToDataBase(data) {
    var f = 0;
    fetch('http://localhost:5000/listGetData').then(dat => { return dat.json() })
        .then(res => {

            dat1 = res['result'];
            console.log("====================");
            console.log(dat1);
            if (dat1.length != 0) {
                for (var j = 0; j < dat1.length; j++) {
                    console.log(dat1[j]['itmName']);
                    if (dat1[j]['itmName'] === data) {
                        f = Number(f) + Number(1);
                    }
                }
            }
            return f;
        }).then((res) => {
            console.log(res);
            if (res == 0) {
                console.log(data);
                var xhr = new XMLHttpRequest();
                xhr.open("POST", 'http://localhost:5000/updateListItm', true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({
                    itm: data
                }));
            }
        });

}