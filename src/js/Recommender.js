
var similar = [];
var ergebnis = [];

function recommend(aktuell, list) { // gibt ein array zurück mit cocktailnummern in abnehmender ähnlichkeit
            //var list = getdata(); // hole die alle Rezepte + Zutaten
    //console.log(list);

            for (var i = 1; i <= Object.keys(list).length; i++) { // iteriere durch alle Cocktails
                if (aktuell == i) { continue; }                        // Kein selbstvergleich

                getDistance(list, aktuell, i);

            };
            // console.log(recipe.data[1].recipe[1].id);


            similar.sort(compare);
          //   console.log(similar.wert);

            for (var i = 0; i < similar.length; i++) {
               // console.log("Name + "+ similar[i].name +"wert + " +similar[i].wert);
                ergebnis.push(similar[i].name);

            };

             console.log(ergebnis);
            return ergebnis;

};


function getDistance(list, aktuell, vergleich) {

    var summe = 0;
    var rest = []; // ungleiche zutaten
    var treffer = []; // gleiche zutaten

    for (var j = 0; j < Object.keys(list[aktuell].recipe).length; j++) { // iteriert durch alle Zutaten des aktuellen Cocktails

        for (var k = 0; k < Object.keys(list[vergleich].recipe).length; k++) { // iteriert durch alle Zutaten des zu vergleichenden Cocktails

            
            if (parseFloat(list[aktuell].recipe[j].id) == parseFloat(list[vergleich].recipe[k].id)) { // finde gleiche zutaten
              
               // console.log("Aktuell + " + vergleich + ": " + list.data[aktuell].recipe[j].id + " - Vergleich: " + list.data[vergleich].recipe[k].id);

                treffer.push(parseFloat(list[aktuell].recipe[j].id));              // füge die gleichen zutaten in hilfsarray
                summe += calcDistance(parseFloat(list[aktuell].recipe[j].amount), parseFloat(list[vergleich].recipe[k].amount)); // berechne unterschied zwischen gleichen zutaten
                
               
            }
            else if (parseFloat(list[aktuell].recipe[j].id) != parseFloat(list[vergleich].recipe[k].id)) { // finde ungleiche zutaten

                rest.push(parseFloat(list[vergleich].recipe[k].id));
                rest.push(parseFloat(list[aktuell].recipe[j].id));

            }
        };


    };
    // console.log("rest vorher: " +rest);

    for (var i = 0; i < treffer.length; i++) {          // stelle sicher, dass gleiche zutaten nicht bei den ungleichen dabei sind
        rest = jQuery.grep(rest, function (value) {
            return value != treffer[i];
        });
    }
    rest = $.unique(rest);                              // stelle sicher, dass unterschiedliche zutaten array nur einzeln belegt ist
    rest = $.unique(rest);
   // similar[vergleich] = summe;

    for (var i = 0; i < rest.length; i++) {          // berechne abstand zwischen einzelnen zutaten

        for (var j = 0; j < list[aktuell].recipe.length; j++) {

            if (parseFloat(list[aktuell].recipe[j].id) == rest[i]) {
                summe += calcDistance(parseFloat(list[aktuell].recipe[j].amount), 0);

                continue;
            }
        }

        for (var j = 0; j < list[vergleich].recipe.length; j++) {

            if (parseFloat(list[vergleich].recipe[j].id) == rest[i]) {
                summe += calcDistance(parseFloat(list[vergleich].recipe[j].amount), 0);
                continue;
            }
        }

    }
    summe = Math.sqrt(summe);
    similar.push({ name: parseFloat(vergleich), wert: parseFloat(summe) }); // weise abstand von cocktail ergebnis array zu

}


function calcDistance(menge1, menge2) {

    return (Math.abs(menge1 - menge2) * Math.abs(menge1 - menge2));
}


function compare(a, b) {
    if (a.wert < b.wert)
        return -1;
    if (a.wert > b.wert)
        return 1;
    return 0;
}