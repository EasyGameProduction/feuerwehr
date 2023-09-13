var gegenstaende = [["Trennschleifer", "RW", "G2", "TLF", ""],
["Gurtmesser", "RW", "G2", "TLF", ""],
["Flutlichtstrahler", "RW", "G2", "TLF", ""],
["Glassäge", "RW", "G2", "TLF", ""],
["Leitungsroller/- trommeln", "RW", "G2", "TLF", ""],
["Warndreieck", "RW", "G2", "TLF", ""],
["Warn-/Sicherungsleuchte", "RW", "G2", "TLF", ""],
["Hydraulische Winde", "RW", "G3", "TLF", ""],
["Mehrzweckzug", "RW", "G3", "TLF", ""],
["Rettungszylinder", "RW", "G4", "TLF", ""],
["Hydraulischer Rettungssatz", "RW", "G4", "TLF", ""],
["Schuttmulden", "RW", "G4", "TLF", ""],
["Brechstange", "RW", "G6", "TLF", ""],
["Motorkettensäge", "RW", "G6", "TLF", ""],
["Werkzeugkasten", "RW", "G6", "TLF", ""],
["Unterbaumaterial", "RW", "G6", "TLF", ""],
["Verkehrsleitkegel", "RW", "G7", "TLF", "G1"],
["Feuerlöscher", "RW", "G8", "TLF", "G2"],
["Kübelspritze", "RW", "", "TLF", "G2"],
["Schaumstrahlrohr", "RW", "", "TLF", "G6"],
["Strahlrohre", "RW", "", "TLF", "G6"]];

var index = 0;

function startGame(){
    index = 0;
    gegenstaende = this.shuffle(gegenstaende);
    document.getElementById("Geraetename").innerHTML = gegenstaende[0][0];
}
this.startGame();

function Next(){
    if(index < gegenstaende.length -1){
        index++;
        document.getElementById("Geraetename").innerHTML = gegenstaende[index][0];
    } else{
        this.startGame();
    }
}

function fahrzeugChanged(){
    var fahrzeug = document.getElementById("fahrzeuge").options[document.getElementById("fahrzeuge").selectedIndex].text;

    if(fahrzeug == "RW"){
        this.activateRW();
        this.deactivateTLF();
    } else if(fahrzeug == "TLF"){
        this.activateTLF();
        this.deactivateRW();
    }
}

function activateRW(){
    document.getElementById("RW").style.display = "flex";
}

function activateTLF(){
    document.getElementById("TLF").style.display = "flex";
}

function deactivateRW(){
    document.getElementById("RW").style.display = "none";
}

function deactivateTLF(){
    document.getElementById("TLF").style.display = "none";
}

function RW(Gate){
    if(gegenstaende[index][2] == Gate){
        alert("Richtig");
    } else if(gegenstaende[index][2] == ""){
        alert("Falsch! Das richtige Fach war auf dem TLF das Fach " + gegenstaende[index][4]);
    } else{
        alert("Falsch! Das richtige Fach war auf dem RW das Fach " + gegenstaende[index][2]);
    }
    this.Next();
}

function TLF(Gate){
    if(gegenstaende[index][4] == Gate){
        alert("Richtig");
    } else if(gegenstaende[index][4] == ""){
        alert("Falsch! Das richtige Fach war auf dem RW das Fach " + gegenstaende[index][2]);
    } else{
        alert("Falsch! Das richtige Fach war auf dem TLF das Fach " + gegenstaende[index][4]);
    }
    this.Next();
}

function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}
