var map={0:126,1:48,2:109,3:121,4:51,5:91,6:95,7:112,8:127,9:123," ":0,A:119,a:125,B:127,b:31,C:78,c:13,D:126,d:61,E:79,e:111,F:71,f:71,G:94,g:123, 'ğ': 123,H:55,h:23,I:48, 'İ': 48, i:16, 'ı': 16,J:60,j:56,K:55,k:23,L:14,l:6,M:85,m:85,N:21,n:21,O:126,o:29,P:103,p:103,Q:115,q:115,R:119,r:5,S:91,s:91, 'ş': 91,T:70,t:15,U:62,u:28,V:39,v:35,W:63,w:43,X:37,x:37,Y:59,y:51,Z:109,z:109,"ö":93,"ü":92};


function calculate(event){
    event.preventDefault();
    var text = $('#text').val();
    to7segment(text)
}

function to7segment(value) {
    var mapResult = map[value];
    if (typeof mapResult === "undefined") {
        $("#result").hide();
        $("#err").show();
    } else {
        $("#result").show();
        $("#err").hide();
        var convertDecimal = mapResult * 2;
        var finalHex = convertDecimal.toString(16).toUpperCase();
        var convertBinary = Number(convertDecimal).toString(2);
        $("#result .typedNumber").html(value);
        $("#result #hexadecimal").html("0x" + finalHex);
        $("#result #decimal").html(convertDecimal);
        $("#result #binary").html(
            "B'" + padString(convertBinary, 8, "0") + "'"
        );
        screenPaint(convertBinary);
    }
}

function padString(str, len, padWith) {
    var padLength = len - str.length;
    return padLength < 1 ? str : Array(padLength + 1).join(padWith) + str;
}

function screenPaint(number) {
    var numberDigits = [];
    var length = number.toString().length,
        _counter = length;
    while (_counter > 0) {
        var int = parseInt(number % 10);
        numberDigits.push(int);
        number = number / 10;
        _counter--;
    }
    $("#display-screen div").removeClass("active");
    for (var i = 0; i < length; i++) {
        if (numberDigits[i] == 1) $("[data-binary='"+ i +"']").addClass("active");
    }

    numberDigits.length = 0;
}
