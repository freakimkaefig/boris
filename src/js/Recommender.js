
var similar = [];
var ergebnis = [];

function recommend(aktuell) { // gibt ein array zurück mit cocktailnummern in abnehmender ähnlichkeit

    var list = getdata(); // hole die alle Rezepte + Zutaten
    
    for (var i = 1; i <= Object.keys(list.data).length; i++) { // iteriere durch alle Cocktails
        if (aktuell == i) { continue; }                        // Kein selbstvergleich

        getDistance(list, aktuell, i);

      };
    // console.log(recipe.data[1].recipe[1].id);


    similar.sort(compare);
   // console.log(similar);

    for (var i = 0; i < similar.length; i++) {

        ergebnis.push(similar[i].name);

    };

   // console.log(ergebnis);
    return ergebnis;


    //console.log(" Menge 1 Zutat 5 :" + parseFloat(list.data[aktuell].recipe[2].id));

    //console.log(Object.keys(list.data[1].recipe.id).length);
    //console.log(Object.keys(list.data[4].recipe).length); // Anzahl der Zutaten für jeweiligen Cocktail
    // console.log("Rezepte Länge: " + Object.keys(list.data).length); // Anzahl Vorhandene Rezepte


};


function getDistance(list, aktuell, vergleich) {

    var summe = 0;
    var rest = []; // ungleiche zutaten
    var treffer = []; // gleiche zutaten

    for (var j = 0; j < Object.keys(list.data[aktuell].recipe).length; j++) { // iteriert durch alle Zutaten des aktuellen Cocktails

        for (var k = 0; k < Object.keys(list.data[vergleich].recipe).length; k++) { // iteriert durch alle Zutaten des zu vergleichenden Cocktails

            
            if (parseFloat(list.data[aktuell].recipe[j].id) == parseFloat(list.data[vergleich].recipe[k].id)) { // finde gleiche zutaten
              
               // console.log("Aktuell + " + vergleich + ": " + list.data[aktuell].recipe[j].id + " - Vergleich: " + list.data[vergleich].recipe[k].id);

                treffer.push(parseFloat(list.data[aktuell].recipe[j].id));              // füge die gleichen zutaten in hilfsarray
                summe += calcDistance(parseFloat(list.data[aktuell].recipe[j].amount), parseFloat(list.data[vergleich].recipe[k].amount)); // berechne unterschied zwischen gleichen zutaten
                
               
            }
            else if (parseFloat(list.data[aktuell].recipe[j].id) != parseFloat(list.data[vergleich].recipe[k].id)) { // finde ungleiche zutaten

                rest.push(parseFloat(list.data[vergleich].recipe[k].id));
                rest.push(parseFloat(list.data[aktuell].recipe[j].id));

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

        for (var j = 0; j < list.data[aktuell].recipe.length; j++) {

            if (parseFloat(list.data[aktuell].recipe[j].id) == rest[i]) {
                summe += calcDistance(parseFloat(list.data[aktuell].recipe[j].amount), 0);

                continue;
            }
        }

        for (var j = 0; j < list.data[vergleich].recipe.length; j++) {

            if (parseFloat(list.data[vergleich].recipe[j].id) == rest[i]) {
                summe += calcDistance(parseFloat(list.data[vergleich].recipe[j].amount), 0);
                continue;
            }
        }

    }

    similar.push({ name: parseFloat(vergleich), wert: parseFloat(summe) }); // weise abstand von cocktail ergebnis array zu

}


function calcDistance(menge1, menge2) {

    return Math.abs(menge1 - menge2);
}


function compare(a, b) {
    if (a.wert < b.wert)
        return -1;
    if (a.wert > b.wert)
        return 1;
    return 0;
}

function getdata() {

    var data = 

{
	"success" : 1,
	"data" : {
		"1" : {
			"name" : "Barbados",
			"description" : "",
			"image" : "",
			"orders" : "0",
			"offers" : "0",
			"recipe" : [{
					"id" : "7",
					"name" : "Wei\u00dfer Rum",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "40",
					"amount" : "0.6",
					"order" : "0"
				}, {
					"id" : "5",
					"name" : "Blue Curacao",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "25",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "1",
					"name" : "Ananassaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.2",
					"order" : "0"
				}
			]
		},
		"2" : {
			"name" : "Emerald Dreams",
			"description" : null,
			"image" : null,
			"orders" : null,
			"offers" : null,
			"recipe" : [{
					"id" : "8",
					"name" : "Wodka",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "40",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "5",
					"name" : "Blue Curacao",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "25",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "3",
					"name" : "Orangensaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.6",
					"order" : "0"
				}
			]
		},
		"3" : {
			"name" : "Green Devil",
			"description" : null,
			"image" : null,
			"orders" : null,
			"offers" : null,
			"recipe" : [{
					"id" : "7",
					"name" : "Wei\u00dfer Rum",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "40",
					"amount" : "0.4",
					"order" : "0"
				}, {
					"id" : "5",
					"name" : "Blue Curacao",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "25",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "3",
					"name" : "Orangensaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.4",
					"order" : "0"
				}
			]
		},
		"4" : {
			"name" : "Captain Chaos",
			"description" : null,
			"image" : null,
			"orders" : null,
			"offers" : null,
			"recipe" : [{
					"id" : "7",
					"name" : "Wei\u00dfer Rum",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "40",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "6",
					"name" : "Gin",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "40",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "3",
					"name" : "Orangensaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "2",
					"name" : "Maracujasaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "8",
					"name" : "Wodka",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "40",
					"amount" : "0.2",
					"order" : "0"
				}
			]
		},
		"5" : {
			"name" : "Men in blue",
			"description" : null,
			"image" : null,
			"orders" : null,
			"offers" : null,
			"recipe" : [{
					"id" : "4",
					"name" : "Zitronensaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "5",
					"name" : "Blue Curacao",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "25",
					"amount" : "0.4",
					"order" : "0"
				}, {
					"id" : "8",
					"name" : "Wodka",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "40",
					"amount" : "0.4",
					"order" : "0"
				}
			]
		},
		"6" : {
			"name" : "Santo Domingo",
			"description" : null,
			"image" : null,
			"orders" : null,
			"offers" : null,
			"recipe" : [{
					"id" : "7",
					"name" : "Wei\u00dfer Rum",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "40",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "5",
					"name" : "Blue Curacao",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "25",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "3",
					"name" : "Orangensaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.4",
					"order" : "0"
				}, {
					"id" : "2",
					"name" : "Maracujasaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.2",
					"order" : "0"
				}
			]
		},
		"7" : {
			"name" : "Swamp Water",
			"description" : null,
			"image" : null,
			"orders" : null,
			"offers" : null,
			"recipe" : [{
					"id" : "7",
					"name" : "Wei\u00dfer Rum",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "40",
					"amount" : "0.4",
					"order" : "0"
				}, {
					"id" : "5",
					"name" : "Blue Curacao",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "25",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "4",
					"name" : "Zitronensaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "3",
					"name" : "Orangensaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.2",
					"order" : "0"
				}
			]
		},
		"8" : {
			"name" : "The Waikiki",
			"description" : null,
			"image" : null,
			"orders" : null,
			"offers" : null,
			"recipe" : [{
					"id" : "8",
					"name" : "Wodka",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "40",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "1",
					"name" : "Ananassaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.8",
					"order" : "0"
				}
			]
		},
		"9" : {
			"name" : "Yellow G-Point",
			"description" : null,
			"image" : null,
			"orders" : null,
			"offers" : null,
			"recipe" : [{
					"id" : "8",
					"name" : "Wodka",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "40",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "5",
					"name" : "Blue Curacao",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "25",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "4",
					"name" : "Zitronensaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "2",
					"name" : "Maracujasaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.4",
					"order" : "0"
				}
			]
		},
		"10" : {
			"name" : "Soft Poison",
			"description" : null,
			"image" : null,
			"orders" : null,
			"offers" : null,
			"recipe" : [{
					"id" : "5",
					"name" : "Blue Curacao",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "25",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "3",
					"name" : "Orangensaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.8",
					"order" : "0"
				}
			]
		},
		"11" : {
			"name" : "Baltic",
			"description" : null,
			"image" : null,
			"orders" : null,
			"offers" : null,
			"recipe" : [{
					"id" : "8",
					"name" : "Wodka",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "40",
					"amount" : "0.15",
					"order" : "0"
				}, {
					"id" : "5",
					"name" : "Blue Curacao",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "25",
					"amount" : "0.15",
					"order" : "0"
				}, {
					"id" : "3",
					"name" : "Orangensaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.55",
					"order" : "0"
				}, {
					"id" : "2",
					"name" : "Maracujasaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.15",
					"order" : "0"
				}
			]
		},
		"12" : {
			"name" : "Gin and Juice",
			"description" : null,
			"image" : null,
			"orders" : null,
			"offers" : null,
			"recipe" : [{
					"id" : "6",
					"name" : "Gin",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "40",
					"amount" : "0.4",
					"order" : "0"
				}, {
					"id" : "3",
					"name" : "Orangensaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.6",
					"order" : "0"
				}
			]
		},
		"13" : {
			"name" : "Green Eyes",
			"description" : null,
			"image" : null,
			"orders" : null,
			"offers" : null,
			"recipe" : [{
					"id" : "8",
					"name" : "Wodka",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "40",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "5",
					"name" : "Blue Curacao",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "25",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "3",
					"name" : "Orangensaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.6",
					"order" : "0"
				}
			]
		},
		"14" : {
			"name" : "The Dodo",
			"description" : null,
			"image" : null,
			"orders" : null,
			"offers" : null,
			"recipe" : [{
					"id" : "1",
					"name" : "Ananassaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "2",
					"name" : "Maracujasaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.3",
					"order" : "0"
				}, {
					"id" : "4",
					"name" : "Zitronensaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "8",
					"name" : "Wodka",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "40",
					"amount" : "0.3",
					"order" : "0"
				}
			]
		},
		"15" : {
			"name" : "Hurricane",
			"description" : null,
			"image" : null,
			"orders" : null,
			"offers" : null,
			"recipe" : [{
					"id" : "7",
					"name" : "Wei\u00dfer Rum",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "40",
					"amount" : "0.4",
					"order" : "0"
				}, {
					"id" : "3",
					"name" : "Orangensaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "2",
					"name" : "Maracujasaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.2",
					"order" : "0"
				}, {
					"id" : "1",
					"name" : "Ananassaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.2",
					"order" : "0"
				}
			]
		},
		"16" : {
			"name" : "Monkey Wrench",
			"description" : null,
			"image" : null,
			"orders" : null,
			"offers" : null,
			"recipe" : [{
					"id" : "7",
					"name" : "Wei\u00dfer Rum",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "40",
					"amount" : "0.4",
					"order" : "0"
				}, {
					"id" : "1",
					"name" : "Ananassaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.6",
					"order" : "0"
				}
			]
		},
		"17" : {
			"name" : "Rum Orange",
			"description" : null,
			"image" : null,
			"orders" : null,
			"offers" : null,
			"recipe" : [{
					"id" : "7",
					"name" : "Wei\u00dfer Rum",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "40",
					"amount" : "0.4",
					"order" : "0"
				}, {
					"id" : "3",
					"name" : "Orangensaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.6",
					"order" : "0"
				}
			]
		},
		"18" : {
			"name" : "Safari",
			"description" : null,
			"image" : null,
			"orders" : null,
			"offers" : null,
			"recipe" : [{
					"id" : "8",
					"name" : "Wodka",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "40",
					"amount" : "0.6",
					"order" : "0"
				}, {
					"id" : "4",
					"name" : "Zitronensaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.4",
					"order" : "0"
				}
			]
		},
		"19" : {
			"name" : "Screwdriver",
			"description" : "Wodka-O",
			"image" : null,
			"orders" : null,
			"offers" : null,
			"recipe" : [{
					"id" : "8",
					"name" : "Wodka",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "40",
					"amount" : "0.4",
					"order" : "0"
				}, {
					"id" : "3",
					"name" : "Orangensaft",
					"description" : "",
					"unit" : "cl",
					"alcohol" : "0",
					"amount" : "0.6",
					"order" : "0"
				}
			]
		}
	}
}
return data;
};