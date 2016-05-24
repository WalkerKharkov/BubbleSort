var doc=document;
var inputElem=doc.getElementsByTagName('input')[0];
var table=doc.getElementsByTagName('table')[0];
var cells=[], tOut;

function Cell(index, value){

    this.index=index;
    this.value=value;
    var changed=false;
    this.setChanged=function(){
        changed=true;
    };
    this.getChanged=function(){
        return changed;
    };
    this.render=function(){
        var td=doc.getElementById(this.index);
        if(this.getChanged()) td.style.backgroundColor="red";
        td.innerHTML=this.value;
        td.style.textAlign="center";
        td.style.border="1px solid";
    }
}

function renderPair(/*cell1, cell2, */index1, index2, val1, val2){
    cells[index1].value=val1;
    cells[index1].render();
    cells[index2].value=val2;
    cells[index2].render();
}

function getData(){
    var inputValue=inputElem.value;
    var numbers=inputValue.split(' ');
    for (var i=0; i<numbers.length; i++) {
        numbers[i]=parseInt(numbers[i]);
        if (isNaN(numbers[i])) return -1;
    }
    if (numbers.length != 10) return -1;
    return numbers;
}
function reset(){
    clearTimeout(tOut);
    table.style.display='none';
    for (var i=0; i<10; i++){
        var td=doc.getElementById(i);
        td.innerHTML="";
        td.style.backgroundColor="white";
        td.style.borderStyle="none";
    }
    inputElem.value="";
}

function bubbleSort(){
    var numbers = getData();
    if (numbers==-1) return alert("Invalid arguments or number of arguments!");
    for (var i=0; i<10; i++ ) {
        cells[i]=new Cell(i, numbers[i]);
        cells[i].render();
    }
    table.style.display='table';
    var delay=1000;
    var buffer=0;
    for (var i=9; i>=0; i--){
        for (var j=0; j<i; j++){
            if (cells[j].value>cells[j+1].value){
                buffer=cells[j].value;
                cells[j].value=cells[j+1].value;
                cells[j+1].value=buffer;
                cells[j].setChanged();
                cells[j+1].setChanged();
                //setTimeout(renderPair, delay, cells[j], cells[j+1]);
                tOut=setTimeout(renderPair, delay, j, j+1, cells[j].value, cells[j+1].value);
                delay+=1000;
            }
        }
    }
}
