var gegenstaende = [["Trennschleifer", "RW", "G2", "TLF", ""],
["Gurtmesser", "RW", "G2", "TLF", "G1"],
["Flutlichtstrahler", "RW", "G2", "TLF", ""],
["Glassäge", "RW", "G2", "TLF", "G1"],
["Leitungsroller/- trommeln", "RW", "G2", "TLF", "G4"],
["Warndreieck", "RW", "G2", "TLF", ""],
["Warn-/Sicherungsleuchte", "RW", "G2", "TLF", ""],
["Hydraulische Winde", "RW", "G3", "TLF", ""],
["Mehrzweckzug", "RW", "G3", "TLF", ""],
["Rettungszylinder", "RW", "G4", "TLF", "G1"],
["Hydraulischer Rettungssatz", "RW", "G4", "TLF", "G1"],
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
var fehler = 0;

function startGame(){
    index = 0;
    fehler = 0;
    gegenstaende = this.shuffle(gegenstaende);
    document.getElementById("Geraetename").innerHTML = gegenstaende[0][0];
    document.getElementById("Aufgabe").innerHTML = "Aufgabe: 1/" + gegenstaende.length.toString();
}
this.startGame();

function Next(){
    if(index < gegenstaende.length -1){
        index++;
        document.getElementById("Geraetename").innerHTML = gegenstaende[index][0];
        document.getElementById("Aufgabe").innerHTML = "Aufgabe: " + (+index + +1).toString() + "/" + gegenstaende.length.toString();
    } else{
        if(fehler == 0){
            Swal.fire({
                title: 'Fehlerfrei',
                text: 'Du hast alle ' + gegenstaende.length.toString() + ' richtig beantwortet.',
                icon: 'success',
                timerProgressBar: true,
                timer: 4000,
                didOpen: () => {Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft()
                }, 100)
              },
              willClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
              }
            })
        } else if(fehler <= 2){
            Swal.fire({
                title: 'Naja',
                text: 'Du hast ' + (+gegenstaende.length - +fehler).toString() + ' von ' + gegenstaende.length.toString() + ' richtig beantwortet.',
                icon: 'warning',
                timerProgressBar: true,
                timer: 4000,
                didOpen: () => {Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft()
                }, 100)
              },
              willClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
              }
            })
        } else if(fehler >= 3){
            Swal.fire({
                title: 'Übungsbedarf',
                text: 'Du hast nur ' + (+gegenstaende.length - +fehler).toString() + ' von ' + gegenstaende.length.toString() + ' richtig beantwortet.',
                icon: 'error',
                timerProgressBar: true,
                timer: 4000,
                didOpen: () => {Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft()
                }, 100)
              },
              willClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
              }
            })
        }
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
        if(gegenstaende[index][4] == ""){
            //alert("Richtig");
            Swal.fire(
                'Richtig',
                '',
                'success'
              )
        } else{
            //alert("Richtig, ist außerdem noch auf dem TLF Fach " + gegenstaende[index][4]);
            Swal.fire(
                'Richtig',
                'Zusätzlich in TLF Fach ' + gegenstaende[index][4],
                'success'
            )
        }
    } else if(gegenstaende[index][2] == ""){
        fehler++;
        //alert("Falsch! Das richtige Fach war auf dem TLF das Fach " + gegenstaende[index][4]);
        Swal.fire(
            'Falsch!',
            'Das richtige Fach war auf dem TLF das Fach ' + gegenstaende[index][4],
            'error'
        )
    } else{
        fehler++;
        //alert("Falsch! Das richtige Fach war auf dem RW das Fach " + gegenstaende[index][2]);
        Swal.fire(
            'Falsch!',
            'Das richtige Fach war auf dem RW das Fach ' + gegenstaende[index][2],
            'error'
          )
    }
    this.Next();
}

function TLF(Gate){
    if(gegenstaende[index][4] == Gate){
        if(gegenstaende[index][2] == ""){
            //alert("Richtig");
            Swal.fire(
                'Richtig',
                '',
                'success'
              )
        } else{
            //alert("Richtig, ist außerdem noch auf dem RW Fach " + gegenstaende[index][2]);
            Swal.fire(
                'Richtig',
                'Zusätzlich in RW Fach ' + gegenstaende[index][2],
                'success'
            )
        }
    } else if(gegenstaende[index][4] == ""){
        fehler++;
        //alert("Falsch! Das richtige Fach war auf dem RW das Fach " + gegenstaende[index][2]);
        Swal.fire(
            'Falsch!',
            'Das richtige Fach war auf dem RW das Fach ' + gegenstaende[index][2],
            'error'
          )
    } else{
        fehler++;
        //alert("Falsch! Das richtige Fach war auf dem TLF das Fach " + gegenstaende[index][4]);
        Swal.fire(
            'Falsch!',
            'Das richtige Fach war auf dem TLF das Fach ' + gegenstaende[index][4],
            'error'
          )
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
