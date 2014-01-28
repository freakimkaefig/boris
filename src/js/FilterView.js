Boris.FilterView = function () {
    var filterdElements = [];
    var that = {},
    searchView,


    init = function (searchViewValue) {
        console.log("filter view init");
        $(document).ready(function () {
            $('input[type=radio]').click(function () {
                searchView = searchViewValue;

                clearFilter();
                filter(this.value);
                filterdElements = getResult(filterdElements); // in filterdElements stehen alle zuversteckende Coktailnumern
                searchView.hideCocktailsById(filterdElements);
                // console.log(filterdElements);
            });
        });

    };

    that.init = init;

    function filter(flavor) { // bitter / sweet / fruity / sour

        var list = getdata(); // hole die alle Rezepte + Zutaten

        //   console.log("Bisherige ergebnisse " + typeof (filterdElements[0]));



        for (var i = 1; i <= Object.keys(list.data).length; i++) { // iteriere durch alle Cocktails

            switch (flavor) {
                case "Bitter":
                    checkBitter(list, i);
                    break;
                case "Sweet":
                    checkSweet(list, i);
                    break;
                case "Fruity":
                    checkFruity(list, i);
                    break;
                case "Sour":
                    checkSour(list, i);
                    break;
                default:

                    break;
            }
        };

        //  console.log(typeof (list.data[i].rating.flavor));
        //   console.log("bitter: " + parseFloat(list.data[i].rating.bitter.average));


        // console.log(recipe.data[1].recipe[1].id);

        console.log("Wert: " + typeof (filterdElements[0]));


        //filterdElements.sort(compare);
        return filterdElements;


        //console.log(" Menge 1 Zutat 5 :" + parseFloat(list.data[aktuell].recipe[2].id));

        //console.log(Object.keys(list.data[1].recipe.id).length);
        //console.log(Object.keys(list.data[4].recipe).length); // Anzahl der Zutaten für jeweiligen Cocktail
        // console.log("Rezepte Länge: " + Object.keys(list.data).length); // Anzahl Vorhandene Rezepte


    };


    function checkBitter(list, aktuell) {

        if (parseFloat(list.data[aktuell].rating.bitter.average) >= 3) { // anzahl der ergebnisse beschränken

            var wert = parseFloat(list.data[aktuell].rating.bitter.value) / parseFloat(list.data[aktuell].rating.bitter.average); // warscheinlichkeit dass über 3 / durchschnitt

            /*   for (var i = 0; i < filterdElements.length; i++) {// gehe die vorher gefilterten elemente durch
            if (parseFloat(filterdElements[i].name) == aktuell) {

            wert += parseFloat(filterdElements[i].wert.valueOf()); // addiere den vorherigen wert zu dem aktuellen
            filterdElements[i].wert = wert;
            return;
            }
            } */

            filterdElements.push({ name: parseFloat(aktuell), wert: wert }); // weise wert von cocktail ergebnis array zu
        };

    }

    function checkSweet(list, aktuell) {

        if (parseFloat(list.data[aktuell].rating.sweet.average) >= 3) { // anzahl der ergebnisse beschränken

            var wert = parseFloat(list.data[aktuell].rating.sweet.value) / parseFloat(list.data[aktuell].rating.sweet.average); // warscheinlichkeit dass über 3 / durchschnitt


            /*   for (var i = 0; i < filterdElements.length; i++) {// gehe die vorher gefilterten elemente durch

            if (parseFloat(filterdElements[i].name) == aktuell) {

            wert += parseFloat(filterdElements[i].wert.valueOf()); // addiere den vorherigen wert zu dem aktuellen
            filterdElements[i].wert = wert;
            return;
            }
            } */

            filterdElements.push({ name: parseFloat(aktuell), wert: wert }); // weise wert von cocktail ergebnis array zu
        };

    }

    function checkFruity(list, aktuell) {

        if (parseFloat(list.data[aktuell].rating.fruity.average) >= 3) { // anzahl der ergebnisse beschränken

            var wert = parseFloat(list.data[aktuell].rating.fruity.value) / parseFloat(list.data[aktuell].rating.fruity.average); // warscheinlichkeit dass über 3 / durchschnitt


            /*   for (var i = 0; i < filterdElements.length; i++) {// gehe die vorher gefilterten elemente durch

            if (parseFloat(filterdElements[i].name) == aktuell) {

            wert += parseFloat(filterdElements[i].wert.valueOf()); // addiere den vorherigen wert zu dem aktuellen
            filterdElements[i].wert = wert;
            return;
            }
            } */

            filterdElements.push({ name: parseFloat(aktuell), wert: wert }); // weise wert von cocktail ergebnis array zu


        };

    }

    function checkSour(list, aktuell) {

        if (list.data[aktuell].rating.sour == undefined) {
            return;
        }
        if (parseFloat(list.data[aktuell].rating.bitter.average) >= 3) { // anzahl der ergebnisse beschränken

            var wert = parseFloat(list.data[aktuell].rating.sour.value) / parseFloat(list.data[aktuell].rating.sour.average); // warscheinlichkeit dass über 3 / durchschnitt

            /*      for (var i = 0; i < filterdElements.length; i++) {// gehe die vorher gefilterten elemente durch
            if (parseFloat(filterdElements[i].name) == aktuell) {

            wert += parseFloat(filterdElements[i].wert.valueOf()); // addiere den vorherigen wert zu dem aktuellen
            filterdElements[i].wert = wert;
            return;
            }
            } */

            filterdElements.push({ name: parseFloat(aktuell), wert: wert }); // weise wert von cocktail ergebnis array zu
        };

    }

    function getResult(filterdElements) {
        var ergebnis = [];
        var zuverstecken = getdata();
        var tempArr = [];

        for (var i = 1; i <= Object.keys(zuverstecken.data).length; i++) { //bekomme alle cocktail nummern
            tempArr.push(i);
        }
        zuverstecken = new Array();


        filterdElements.sort(compare);
        // console.log(filterdElements);
        for (var i = 0; i < filterdElements.length; i++) { //bekomme nur die gefiltertern cocktail nummern

            ergebnis.push(parseFloat(filterdElements[i].name));
        };

        for (var i = 1; i <= tempArr.length; i++) {  // bekomme all zuversteckendend cocktail nummern
            if (ergebnis.indexOf(i) == -1) {
                //console.log("hide", i);
                zuverstecken.push(i);
            }
        }
        //console.log(ergebnis);
        return zuverstecken;
    }


    function clearFilter() {
        filterdElements = [];
    }

    function compare(a, b) {
        if (a.wert > b.wert)
            return -1;
        if (a.wert < b.wert)
            return 1;
        return 0;
    }



    function getdata() {
        // getCocktails.php?rating=3&recipe

        var data = {
            "success": 1,
            "data": {
                "1": {
                    "name": "Barbados",
                    "description": "",
                    "image": "",
                    "orders": "0",
                    "offers": "0",
                    "recipe": [{
                        "id": "7",
                        "name": "Wei\u00dfer Rum",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "40",
                        "amount": "0.6",
                        "order": "0"
                    }, {
                        "id": "5",
                        "name": "Blue Curacao",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "25",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "1",
                        "name": "Ananassaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.2",
                        "order": "0"
                    }
			],
                    "rating": {
                        "bitter": {
                            "average": "4.3750",
                            "value": "0.8750"
                        },
                        "sweet": {
                            "average": "1.3750",
                            "value": "0.0000"
                        },
                        "fruity": {
                            "average": "1.6250",
                            "value": "0.0000"
                        },
                        "strong": {
                            "average": "4.7500",
                            "value": "1.0000"
                        },
                        "taste": {
                            "average": "1.2500",
                            "value": "0.0000"
                        },
                        "look": {
                            "average": "2.2500",
                            "value": "0.1250"
                        }
                    },
                    "events": [{
                        "tag": "at a statnight",
                        "value": "0.5000"
                    }, {
                        "tag": "at a preparty",
                        "value": "0.3750"
                    }, {
                        "tag": "in a disco",
                        "value": "0.3750"
                    }, {
                        "tag": "at a home party",
                        "value": "0.2500"
                    }, {
                        "tag": "at a cocktailbar",
                        "value": "0.2500"
                    }, {
                        "tag": "never",
                        "value": "0.1250"
                    }, {
                        "tag": "on a winternight",
                        "value": "0.0000"
                    }, {
                        "tag": "on a summernight",
                        "value": "0.0000"
                    }, {
                        "tag": "on the couch",
                        "value": "0.0000"
                    }, {
                        "tag": "at a businessparty",
                        "value": "0.0000"
                    }, {
                        "tag": "at a wedding",
                        "value": "0.0000"
                    }, {
                        "tag": "after dinner",
                        "value": "0.0000"
                    }, {
                        "tag": "on the beach",
                        "value": "0.0000"
                    }, {
                        "tag": "on the first date",
                        "value": "0.0000"
                    }
			]
                },
                "2": {
                    "name": "Emerald Dreams",
                    "description": null,
                    "image": null,
                    "orders": null,
                    "offers": null,
                    "recipe": [{
                        "id": "8",
                        "name": "Wodka",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "40",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "5",
                        "name": "Blue Curacao",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "25",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "3",
                        "name": "Orangensaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.6",
                        "order": "0"
                    }
			],
                    "rating": {
                        "bitter": {
                            "average": "1.8182",
                            "value": "0.0909"
                        },
                        "sweet": {
                            "average": "2.9091",
                            "value": "0.3636"
                        },
                        "fruity": {
                            "average": "3.1818",
                            "value": "0.5455"
                        },
                        "strong": {
                            "average": "3.0000",
                            "value": "0.2727"
                        },
                        "taste": {
                            "average": "3.1818",
                            "value": "0.5455"
                        },
                        "look": {
                            "average": "3.2727",
                            "value": "0.4545"
                        }
                    },
                    "events": [{
                        "tag": "on the beach",
                        "value": "0.5455"
                    }, {
                        "tag": "at a preparty",
                        "value": "0.4545"
                    }, {
                        "tag": "on a summernight",
                        "value": "0.3636"
                    }, {
                        "tag": "at a cocktailbar",
                        "value": "0.3636"
                    }, {
                        "tag": "at a home party",
                        "value": "0.2727"
                    }, {
                        "tag": "at a statnight",
                        "value": "0.2727"
                    }, {
                        "tag": "in a disco",
                        "value": "0.1818"
                    }, {
                        "tag": "on the first date",
                        "value": "0.0909"
                    }, {
                        "tag": "at a wedding",
                        "value": "0.0909"
                    }, {
                        "tag": "on a winternight",
                        "value": "0.0000"
                    }, {
                        "tag": "never",
                        "value": "0.0000"
                    }, {
                        "tag": "on the couch",
                        "value": "0.0000"
                    }, {
                        "tag": "at a businessparty",
                        "value": "0.0000"
                    }, {
                        "tag": "after dinner",
                        "value": "0.0000"
                    }
			]
                },
                "3": {
                    "name": "Green Devil",
                    "description": null,
                    "image": null,
                    "orders": null,
                    "offers": null,
                    "recipe": [{
                        "id": "7",
                        "name": "Wei\u00dfer Rum",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "40",
                        "amount": "0.4",
                        "order": "0"
                    }, {
                        "id": "5",
                        "name": "Blue Curacao",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "25",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "3",
                        "name": "Orangensaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.4",
                        "order": "0"
                    }
			],
                    "rating": {
                        "bitter": {
                            "average": "3.6667",
                            "value": "0.6667"
                        },
                        "sweet": {
                            "average": "2.0000",
                            "value": "0.0000"
                        },
                        "fruity": {
                            "average": "2.0000",
                            "value": "0.0000"
                        },
                        "strong": {
                            "average": "4.6667",
                            "value": "1.0000"
                        },
                        "taste": {
                            "average": "1.5556",
                            "value": "0.0000"
                        },
                        "look": {
                            "average": "2.1111",
                            "value": "0.1111"
                        }
                    },
                    "events": [{
                        "tag": "at a preparty",
                        "value": "0.6667"
                    }, {
                        "tag": "at a home party",
                        "value": "0.6667"
                    }, {
                        "tag": "at a statnight",
                        "value": "0.3333"
                    }, {
                        "tag": "at a cocktailbar",
                        "value": "0.1111"
                    }, {
                        "tag": "at a businessparty",
                        "value": "0.1111"
                    }, {
                        "tag": "never",
                        "value": "0.0000"
                    }, {
                        "tag": "on a summernight",
                        "value": "0.0000"
                    }, {
                        "tag": "on a winternight",
                        "value": "0.0000"
                    }, {
                        "tag": "in a disco",
                        "value": "0.0000"
                    }, {
                        "tag": "on the couch",
                        "value": "0.0000"
                    }, {
                        "tag": "at a wedding",
                        "value": "0.0000"
                    }, {
                        "tag": "after dinner",
                        "value": "0.0000"
                    }, {
                        "tag": "on the beach",
                        "value": "0.0000"
                    }, {
                        "tag": "on the first date",
                        "value": "0.0000"
                    }
			]
                },
                "4": {
                    "name": "Captain Chaos",
                    "description": null,
                    "image": null,
                    "orders": null,
                    "offers": null,
                    "recipe": [{
                        "id": "7",
                        "name": "Wei\u00dfer Rum",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "40",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "6",
                        "name": "Gin",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "40",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "3",
                        "name": "Orangensaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "2",
                        "name": "Maracujasaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "8",
                        "name": "Wodka",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "40",
                        "amount": "0.2",
                        "order": "0"
                    }
			],
                    "rating": {
                        "bitter": {
                            "average": "3.6667",
                            "value": "0.6667"
                        },
                        "sweet": {
                            "average": "2.4444",
                            "value": "0.2222"
                        },
                        "fruity": {
                            "average": "2.6250",
                            "value": "0.3750"
                        },
                        "strong": {
                            "average": "4.0000",
                            "value": "0.6667"
                        },
                        "taste": {
                            "average": "2.0000",
                            "value": "0.2222"
                        },
                        "look": {
                            "average": "3.2222",
                            "value": "0.5556"
                        }
                    },
                    "events": [{
                        "tag": "at a home party",
                        "value": "0.5556"
                    }, {
                        "tag": "at a cocktailbar",
                        "value": "0.4444"
                    }, {
                        "tag": "at a preparty",
                        "value": "0.3333"
                    }, {
                        "tag": "on the beach",
                        "value": "0.3333"
                    }, {
                        "tag": "at a statnight",
                        "value": "0.3333"
                    }, {
                        "tag": "on a summernight",
                        "value": "0.2222"
                    }, {
                        "tag": "at a businessparty",
                        "value": "0.1111"
                    }, {
                        "tag": "on a winternight",
                        "value": "0.0000"
                    }, {
                        "tag": "never",
                        "value": "0.0000"
                    }, {
                        "tag": "on the couch",
                        "value": "0.0000"
                    }, {
                        "tag": "at a wedding",
                        "value": "0.0000"
                    }, {
                        "tag": "after dinner",
                        "value": "0.0000"
                    }, {
                        "tag": "on the first date",
                        "value": "0.0000"
                    }, {
                        "tag": "in a disco",
                        "value": "0.0000"
                    }
			]
                },
                "5": {
                    "name": "Men in blue",
                    "description": null,
                    "image": null,
                    "orders": null,
                    "offers": null,
                    "recipe": [{
                        "id": "4",
                        "name": "Zitronensaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "5",
                        "name": "Blue Curacao",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "25",
                        "amount": "0.4",
                        "order": "0"
                    }, {
                        "id": "8",
                        "name": "Wodka",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "40",
                        "amount": "0.4",
                        "order": "0"
                    }
			],
                    "rating": {
                        "bitter": {
                            "average": "3.7778",
                            "value": "0.5556"
                        },
                        "sweet": {
                            "average": "1.7778",
                            "value": "0.0000"
                        },
                        "fruity": {
                            "average": "2.1111",
                            "value": "0.0000"
                        },
                        "strong": {
                            "average": "4.3333",
                            "value": "0.8889"
                        },
                        "taste": {
                            "average": "2.2222",
                            "value": "0.2222"
                        },
                        "look": {
                            "average": "4.2222",
                            "value": "0.7778"
                        }
                    },
                    "events": [{
                        "tag": "at a statnight",
                        "value": "0.4444"
                    }, {
                        "tag": "at a preparty",
                        "value": "0.3333"
                    }, {
                        "tag": "in a disco",
                        "value": "0.2222"
                    }, {
                        "tag": "at a cocktailbar",
                        "value": "0.2222"
                    }, {
                        "tag": "at a businessparty",
                        "value": "0.2222"
                    }, {
                        "tag": "at a wedding",
                        "value": "0.2222"
                    }, {
                        "tag": "at a home party",
                        "value": "0.1111"
                    }, {
                        "tag": "on the beach",
                        "value": "0.1111"
                    }, {
                        "tag": "on a summernight",
                        "value": "0.1111"
                    }, {
                        "tag": "never",
                        "value": "0.0000"
                    }, {
                        "tag": "on a winternight",
                        "value": "0.0000"
                    }, {
                        "tag": "on the couch",
                        "value": "0.0000"
                    }, {
                        "tag": "after dinner",
                        "value": "0.0000"
                    }, {
                        "tag": "on the first date",
                        "value": "0.0000"
                    }
			]
                },
                "6": {
                    "name": "Santo Domingo",
                    "description": null,
                    "image": null,
                    "orders": null,
                    "offers": null,
                    "recipe": [{
                        "id": "7",
                        "name": "Wei\u00dfer Rum",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "40",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "5",
                        "name": "Blue Curacao",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "25",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "3",
                        "name": "Orangensaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.4",
                        "order": "0"
                    }, {
                        "id": "2",
                        "name": "Maracujasaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.2",
                        "order": "0"
                    }
			],
                    "rating": {
                        "bitter": {
                            "average": "2.0000",
                            "value": "0.1111"
                        },
                        "sweet": {
                            "average": "3.8889",
                            "value": "0.7778"
                        },
                        "fruity": {
                            "average": "3.5556",
                            "value": "0.6667"
                        },
                        "strong": {
                            "average": "3.2222",
                            "value": "0.4444"
                        },
                        "taste": {
                            "average": "3.2222",
                            "value": "0.4444"
                        },
                        "look": {
                            "average": "2.7778",
                            "value": "0.1111"
                        }
                    },
                    "events": [{
                        "tag": "at a cocktailbar",
                        "value": "0.5556"
                    }, {
                        "tag": "at a home party",
                        "value": "0.4444"
                    }, {
                        "tag": "on a summernight",
                        "value": "0.4444"
                    }, {
                        "tag": "at a statnight",
                        "value": "0.3333"
                    }, {
                        "tag": "on the first date",
                        "value": "0.2222"
                    }, {
                        "tag": "in a disco",
                        "value": "0.2222"
                    }, {
                        "tag": "at a preparty",
                        "value": "0.2222"
                    }, {
                        "tag": "on the beach",
                        "value": "0.2222"
                    }, {
                        "tag": "at a businessparty",
                        "value": "0.1111"
                    }, {
                        "tag": "at a wedding",
                        "value": "0.1111"
                    }, {
                        "tag": "never",
                        "value": "0.0000"
                    }, {
                        "tag": "on a winternight",
                        "value": "0.0000"
                    }, {
                        "tag": "on the couch",
                        "value": "0.0000"
                    }, {
                        "tag": "after dinner",
                        "value": "0.0000"
                    }
			]
                },
                "7": {
                    "name": "Swamp Water",
                    "description": null,
                    "image": null,
                    "orders": null,
                    "offers": null,
                    "recipe": [{
                        "id": "7",
                        "name": "Wei\u00dfer Rum",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "40",
                        "amount": "0.4",
                        "order": "0"
                    }, {
                        "id": "5",
                        "name": "Blue Curacao",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "25",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "4",
                        "name": "Zitronensaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "3",
                        "name": "Orangensaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.2",
                        "order": "0"
                    }
			],
                    "rating": {
                        "bitter": {
                            "average": "2.7778",
                            "value": "0.3333"
                        },
                        "sweet": {
                            "average": "2.6667",
                            "value": "0.3333"
                        },
                        "fruity": {
                            "average": "2.7778",
                            "value": "0.4444"
                        },
                        "strong": {
                            "average": "3.3333",
                            "value": "0.5556"
                        },
                        "taste": {
                            "average": "2.2222",
                            "value": "0.2222"
                        },
                        "look": {
                            "average": "2.3333",
                            "value": "0.1111"
                        }
                    },
                    "events": [{
                        "tag": "at a preparty",
                        "value": "0.4444"
                    }, {
                        "tag": "at a statnight",
                        "value": "0.4444"
                    }, {
                        "tag": "at a home party",
                        "value": "0.3333"
                    }, {
                        "tag": "on a summernight",
                        "value": "0.3333"
                    }, {
                        "tag": "on the beach",
                        "value": "0.3333"
                    }, {
                        "tag": "in a disco",
                        "value": "0.1111"
                    }, {
                        "tag": "at a cocktailbar",
                        "value": "0.1111"
                    }, {
                        "tag": "at a wedding",
                        "value": "0.1111"
                    }, {
                        "tag": "never",
                        "value": "0.0000"
                    }, {
                        "tag": "on a winternight",
                        "value": "0.0000"
                    }, {
                        "tag": "on the couch",
                        "value": "0.0000"
                    }, {
                        "tag": "at a businessparty",
                        "value": "0.0000"
                    }, {
                        "tag": "after dinner",
                        "value": "0.0000"
                    }, {
                        "tag": "on the first date",
                        "value": "0.0000"
                    }
			]
                },
                "8": {
                    "name": "The Waikiki",
                    "description": null,
                    "image": null,
                    "orders": null,
                    "offers": null,
                    "recipe": [{
                        "id": "8",
                        "name": "Wodka",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "40",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "1",
                        "name": "Ananassaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.8",
                        "order": "0"
                    }
			],
                    "rating": {
                        "bitter": {
                            "average": "1.6250",
                            "value": "0.1250"
                        },
                        "sweet": {
                            "average": "4.1250",
                            "value": "0.7500"
                        },
                        "fruity": {
                            "average": "4.0000",
                            "value": "0.8750"
                        },
                        "strong": {
                            "average": "2.6250",
                            "value": "0.2500"
                        },
                        "taste": {
                            "average": "3.8750",
                            "value": "0.5000"
                        },
                        "look": {
                            "average": "3.6250",
                            "value": "0.5000"
                        }
                    },
                    "events": [{
                        "tag": "on the beach",
                        "value": "0.8750"
                    }, {
                        "tag": "at a home party",
                        "value": "0.3750"
                    }, {
                        "tag": "at a preparty",
                        "value": "0.3750"
                    }, {
                        "tag": "on a summernight",
                        "value": "0.3750"
                    }, {
                        "tag": "at a wedding",
                        "value": "0.2500"
                    }, {
                        "tag": "on the first date",
                        "value": "0.1250"
                    }, {
                        "tag": "at a cocktailbar",
                        "value": "0.1250"
                    }, {
                        "tag": "at a businessparty",
                        "value": "0.1250"
                    }, {
                        "tag": "never",
                        "value": "0.0000"
                    }, {
                        "tag": "on a winternight",
                        "value": "0.0000"
                    }, {
                        "tag": "on the couch",
                        "value": "0.0000"
                    }, {
                        "tag": "at a statnight",
                        "value": "0.0000"
                    }, {
                        "tag": "after dinner",
                        "value": "0.0000"
                    }, {
                        "tag": "in a disco",
                        "value": "0.0000"
                    }
			]
                },
                "9": {
                    "name": "Yellow G-Point",
                    "description": null,
                    "image": null,
                    "orders": null,
                    "offers": null,
                    "recipe": [{
                        "id": "8",
                        "name": "Wodka",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "40",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "5",
                        "name": "Blue Curacao",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "25",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "4",
                        "name": "Zitronensaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "2",
                        "name": "Maracujasaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.4",
                        "order": "0"
                    }
			],
                    "rating": {
                        "bitter": {
                            "average": "2.5714",
                            "value": "0.1429"
                        },
                        "sweet": {
                            "average": "2.8750",
                            "value": "0.2500"
                        },
                        "fruity": {
                            "average": "3.6250",
                            "value": "0.7500"
                        },
                        "strong": {
                            "average": "2.5714",
                            "value": "0.1429"
                        },
                        "taste": {
                            "average": "3.3750",
                            "value": "0.3750"
                        },
                        "look": {
                            "average": "2.8750",
                            "value": "0.3750"
                        }
                    },
                    "events": [{
                        "tag": "in a disco",
                        "value": "0.5000"
                    }, {
                        "tag": "at a preparty",
                        "value": "0.5000"
                    }, {
                        "tag": "at a cocktailbar",
                        "value": "0.3750"
                    }, {
                        "tag": "on the beach",
                        "value": "0.3750"
                    }, {
                        "tag": "at a home party",
                        "value": "0.2500"
                    }, {
                        "tag": "on a summernight",
                        "value": "0.2500"
                    }, {
                        "tag": "on a winternight",
                        "value": "0.2500"
                    }, {
                        "tag": "never",
                        "value": "0.1250"
                    }, {
                        "tag": "on the couch",
                        "value": "0.1250"
                    }, {
                        "tag": "at a statnight",
                        "value": "0.1250"
                    }, {
                        "tag": "at a wedding",
                        "value": "0.1250"
                    }, {
                        "tag": "after dinner",
                        "value": "0.1250"
                    }, {
                        "tag": "at a businessparty",
                        "value": "0.0000"
                    }, {
                        "tag": "on the first date",
                        "value": "0.0000"
                    }
			]
                },
                "10": {
                    "name": "Soft Poison",
                    "description": null,
                    "image": null,
                    "orders": null,
                    "offers": null,
                    "recipe": [{
                        "id": "5",
                        "name": "Blue Curacao",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "25",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "3",
                        "name": "Orangensaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.8",
                        "order": "0"
                    }
			],
                    "rating": {
                        "bitter": {
                            "average": "1.7778",
                            "value": "0.1111"
                        },
                        "sweet": {
                            "average": "3.8889",
                            "value": "0.5556"
                        },
                        "fruity": {
                            "average": "4.1111",
                            "value": "0.8889"
                        },
                        "strong": {
                            "average": "1.4444",
                            "value": "0.0000"
                        },
                        "taste": {
                            "average": "4.4444",
                            "value": "0.8889"
                        },
                        "look": {
                            "average": "3.5556",
                            "value": "0.6667"
                        }
                    },
                    "events": [{
                        "tag": "on the beach",
                        "value": "0.6667"
                    }, {
                        "tag": "at a cocktailbar",
                        "value": "0.6667"
                    }, {
                        "tag": "on a summernight",
                        "value": "0.3333"
                    }, {
                        "tag": "at a wedding",
                        "value": "0.2222"
                    }, {
                        "tag": "on the first date",
                        "value": "0.2222"
                    }, {
                        "tag": "on a winternight",
                        "value": "0.1111"
                    }, {
                        "tag": "at a preparty",
                        "value": "0.1111"
                    }, {
                        "tag": "at a businessparty",
                        "value": "0.1111"
                    }, {
                        "tag": "at a home party",
                        "value": "0.1111"
                    }, {
                        "tag": "at a statnight",
                        "value": "0.1111"
                    }, {
                        "tag": "never",
                        "value": "0.0000"
                    }, {
                        "tag": "on the couch",
                        "value": "0.0000"
                    }, {
                        "tag": "after dinner",
                        "value": "0.0000"
                    }, {
                        "tag": "in a disco",
                        "value": "0.0000"
                    }
			]
                },
                "11": {
                    "name": "Baltic",
                    "description": null,
                    "image": null,
                    "orders": null,
                    "offers": null,
                    "recipe": [{
                        "id": "8",
                        "name": "Wodka",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "40",
                        "amount": "0.15",
                        "order": "0"
                    }, {
                        "id": "5",
                        "name": "Blue Curacao",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "25",
                        "amount": "0.15",
                        "order": "0"
                    }, {
                        "id": "3",
                        "name": "Orangensaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.55",
                        "order": "0"
                    }, {
                        "id": "2",
                        "name": "Maracujasaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.15",
                        "order": "0"
                    }
			],
                    "rating": {
                        "bitter": {
                            "average": "1.5000",
                            "value": "0.0000"
                        },
                        "sweet": {
                            "average": "4.2857",
                            "value": "0.8571"
                        },
                        "fruity": {
                            "average": "4.2857",
                            "value": "0.9286"
                        },
                        "strong": {
                            "average": "2.0714",
                            "value": "0.0000"
                        },
                        "taste": {
                            "average": "4.3571",
                            "value": "0.7857"
                        },
                        "look": {
                            "average": "3.7143",
                            "value": "0.6429"
                        }
                    },
                    "events": [{
                        "tag": "on the beach",
                        "value": "0.6429"
                    }, {
                        "tag": "on a summernight",
                        "value": "0.5714"
                    }, {
                        "tag": "at a cocktailbar",
                        "value": "0.5714"
                    }, {
                        "tag": "at a preparty",
                        "value": "0.2143"
                    }, {
                        "tag": "in a disco",
                        "value": "0.2143"
                    }, {
                        "tag": "at a businessparty",
                        "value": "0.1429"
                    }, {
                        "tag": "at a statnight",
                        "value": "0.0714"
                    }, {
                        "tag": "never",
                        "value": "0.0714"
                    }, {
                        "tag": "at a home party",
                        "value": "0.0714"
                    }, {
                        "tag": "on a winternight",
                        "value": "0.0000"
                    }, {
                        "tag": "on the couch",
                        "value": "0.0000"
                    }, {
                        "tag": "at a wedding",
                        "value": "0.0000"
                    }, {
                        "tag": "after dinner",
                        "value": "0.0000"
                    }, {
                        "tag": "on the first date",
                        "value": "0.0000"
                    }
			]
                },
                "12": {
                    "name": "Gin and Juice",
                    "description": null,
                    "image": null,
                    "orders": null,
                    "offers": null,
                    "recipe": [{
                        "id": "6",
                        "name": "Gin",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "40",
                        "amount": "0.4",
                        "order": "0"
                    }, {
                        "id": "3",
                        "name": "Orangensaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.6",
                        "order": "0"
                    }
			],
                    "rating": {
                        "bitter": {
                            "average": "3.8000",
                            "value": "0.7000"
                        },
                        "sweet": {
                            "average": "2.6000",
                            "value": "0.1000"
                        },
                        "fruity": {
                            "average": "2.8000",
                            "value": "0.4000"
                        },
                        "strong": {
                            "average": "3.8000",
                            "value": "0.7000"
                        },
                        "taste": {
                            "average": "3.0000",
                            "value": "0.4000"
                        },
                        "look": {
                            "average": "4.2000",
                            "value": "0.7000"
                        }
                    },
                    "events": [{
                        "tag": "at a preparty",
                        "value": "0.6000"
                    }, {
                        "tag": "at a home party",
                        "value": "0.4000"
                    }, {
                        "tag": "at a statnight",
                        "value": "0.4000"
                    }, {
                        "tag": "on a summernight",
                        "value": "0.1000"
                    }, {
                        "tag": "in a disco",
                        "value": "0.1000"
                    }, {
                        "tag": "on the beach",
                        "value": "0.1000"
                    }, {
                        "tag": "on the couch",
                        "value": "0.1000"
                    }, {
                        "tag": "at a cocktailbar",
                        "value": "0.1000"
                    }, {
                        "tag": "on a winternight",
                        "value": "0.0000"
                    }, {
                        "tag": "never",
                        "value": "0.0000"
                    }, {
                        "tag": "at a businessparty",
                        "value": "0.0000"
                    }, {
                        "tag": "at a wedding",
                        "value": "0.0000"
                    }, {
                        "tag": "on the first date",
                        "value": "0.0000"
                    }, {
                        "tag": "after dinner",
                        "value": "0.0000"
                    }
			]
                },
                "13": {
                    "name": "Green Eyes",
                    "description": null,
                    "image": null,
                    "orders": null,
                    "offers": null,
                    "recipe": [{
                        "id": "8",
                        "name": "Wodka",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "40",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "5",
                        "name": "Blue Curacao",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "25",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "3",
                        "name": "Orangensaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.6",
                        "order": "0"
                    }
			],
                    "rating": {
                        "bitter": {
                            "average": "2.7778",
                            "value": "0.3333"
                        },
                        "sweet": {
                            "average": "3.2222",
                            "value": "0.3333"
                        },
                        "fruity": {
                            "average": "3.2222",
                            "value": "0.4444"
                        },
                        "strong": {
                            "average": "3.1111",
                            "value": "0.4444"
                        },
                        "taste": {
                            "average": "3.3333",
                            "value": "0.5556"
                        },
                        "look": {
                            "average": "3.1111",
                            "value": "0.3333"
                        }
                    },
                    "events": [{
                        "tag": "at a businessparty",
                        "value": "0.3333"
                    }, {
                        "tag": "at a cocktailbar",
                        "value": "0.3333"
                    }, {
                        "tag": "on a summernight",
                        "value": "0.2222"
                    }, {
                        "tag": "at a statnight",
                        "value": "0.2222"
                    }, {
                        "tag": "at a home party",
                        "value": "0.2222"
                    }, {
                        "tag": "in a disco",
                        "value": "0.2222"
                    }, {
                        "tag": "at a preparty",
                        "value": "0.1111"
                    }, {
                        "tag": "on a winternight",
                        "value": "0.1111"
                    }, {
                        "tag": "on the beach",
                        "value": "0.1111"
                    }, {
                        "tag": "never",
                        "value": "0.0000"
                    }, {
                        "tag": "on the couch",
                        "value": "0.0000"
                    }, {
                        "tag": "at a wedding",
                        "value": "0.0000"
                    }, {
                        "tag": "after dinner",
                        "value": "0.0000"
                    }, {
                        "tag": "on the first date",
                        "value": "0.0000"
                    }
			]
                },
                "14": {
                    "name": "The Dodo",
                    "description": null,
                    "image": null,
                    "orders": null,
                    "offers": null,
                    "recipe": [{
                        "id": "1",
                        "name": "Ananassaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "2",
                        "name": "Maracujasaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.3",
                        "order": "0"
                    }, {
                        "id": "4",
                        "name": "Zitronensaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "8",
                        "name": "Wodka",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "40",
                        "amount": "0.3",
                        "order": "0"
                    }
			],
                    "rating": {
                        "bitter": {
                            "average": "1.6000",
                            "value": "0.0000"
                        },
                        "sweet": {
                            "average": "3.4000",
                            "value": "0.6000"
                        },
                        "fruity": {
                            "average": "4.2000",
                            "value": "0.8000"
                        },
                        "strong": {
                            "average": "2.6000",
                            "value": "0.0000"
                        },
                        "taste": {
                            "average": "4.0000",
                            "value": "0.8000"
                        },
                        "look": {
                            "average": "4.0000",
                            "value": "0.8000"
                        }
                    },
                    "events": [{
                        "tag": "on the beach",
                        "value": "0.8000"
                    }, {
                        "tag": "on a summernight",
                        "value": "0.6000"
                    }, {
                        "tag": "at a cocktailbar",
                        "value": "0.4000"
                    }, {
                        "tag": "at a home party",
                        "value": "0.2000"
                    }, {
                        "tag": "at a preparty",
                        "value": "0.2000"
                    }, {
                        "tag": "at a statnight",
                        "value": "0.2000"
                    }, {
                        "tag": "in a disco",
                        "value": "0.2000"
                    }, {
                        "tag": "on a winternight",
                        "value": "0.0000"
                    }, {
                        "tag": "never",
                        "value": "0.0000"
                    }, {
                        "tag": "on the couch",
                        "value": "0.0000"
                    }, {
                        "tag": "at a businessparty",
                        "value": "0.0000"
                    }, {
                        "tag": "at a wedding",
                        "value": "0.0000"
                    }, {
                        "tag": "after dinner",
                        "value": "0.0000"
                    }, {
                        "tag": "on the first date",
                        "value": "0.0000"
                    }
			]
                },
                "15": {
                    "name": "Hurricane",
                    "description": null,
                    "image": null,
                    "orders": null,
                    "offers": null,
                    "recipe": [{
                        "id": "7",
                        "name": "Wei\u00dfer Rum",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "40",
                        "amount": "0.4",
                        "order": "0"
                    }, {
                        "id": "3",
                        "name": "Orangensaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "2",
                        "name": "Maracujasaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.2",
                        "order": "0"
                    }, {
                        "id": "1",
                        "name": "Ananassaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.2",
                        "order": "0"
                    }
			],
                    "rating": {
                        "bitter": {
                            "average": "2.8462",
                            "value": "0.3077"
                        },
                        "sweet": {
                            "average": "3.2308",
                            "value": "0.5385"
                        },
                        "fruity": {
                            "average": "2.4615",
                            "value": "0.0769"
                        },
                        "strong": {
                            "average": "4.0000",
                            "value": "0.6154"
                        },
                        "taste": {
                            "average": "2.4615",
                            "value": "0.1538"
                        },
                        "look": {
                            "average": "1.3846",
                            "value": "0.0000"
                        }
                    },
                    "events": [{
                        "tag": "at a cocktailbar",
                        "value": "0.3846"
                    }, {
                        "tag": "at a home party",
                        "value": "0.2308"
                    }, {
                        "tag": "on a winternight",
                        "value": "0.2308"
                    }, {
                        "tag": "at a statnight",
                        "value": "0.2308"
                    }, {
                        "tag": "at a preparty",
                        "value": "0.1538"
                    }, {
                        "tag": "on the beach",
                        "value": "0.0769"
                    }, {
                        "tag": "in a disco",
                        "value": "0.0769"
                    }, {
                        "tag": "never",
                        "value": "0.0000"
                    }, {
                        "tag": "on a summernight",
                        "value": "0.0000"
                    }, {
                        "tag": "on the couch",
                        "value": "0.0000"
                    }, {
                        "tag": "at a businessparty",
                        "value": "0.0000"
                    }, {
                        "tag": "at a wedding",
                        "value": "0.0000"
                    }, {
                        "tag": "after dinner",
                        "value": "0.0000"
                    }, {
                        "tag": "on the first date",
                        "value": "0.0000"
                    }
			]
                },
                "16": {
                    "name": "Monkey Wrench",
                    "description": null,
                    "image": null,
                    "orders": null,
                    "offers": null,
                    "recipe": [{
                        "id": "7",
                        "name": "Wei\u00dfer Rum",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "40",
                        "amount": "0.4",
                        "order": "0"
                    }, {
                        "id": "1",
                        "name": "Ananassaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.6",
                        "order": "0"
                    }
			],
                    "rating": {
                        "bitter": {
                            "average": "2.8333",
                            "value": "0.3333"
                        },
                        "sweet": {
                            "average": "3.1667",
                            "value": "0.3333"
                        },
                        "fruity": {
                            "average": "2.6667",
                            "value": "0.1667"
                        },
                        "strong": {
                            "average": "4.1667",
                            "value": "0.8333"
                        },
                        "taste": {
                            "average": "1.5000",
                            "value": "0.0000"
                        },
                        "look": {
                            "average": "1.1667",
                            "value": "0.0000"
                        }
                    },
                    "events": [{
                        "tag": "at a home party",
                        "value": "0.6667"
                    }, {
                        "tag": "at a preparty",
                        "value": "0.5000"
                    }, {
                        "tag": "at a statnight",
                        "value": "0.3333"
                    }, {
                        "tag": "at a businessparty",
                        "value": "0.3333"
                    }, {
                        "tag": "on the beach",
                        "value": "0.1667"
                    }, {
                        "tag": "at a cocktailbar",
                        "value": "0.1667"
                    }, {
                        "tag": "on a summernight",
                        "value": "0.0000"
                    }, {
                        "tag": "never",
                        "value": "0.0000"
                    }, {
                        "tag": "on a winternight",
                        "value": "0.0000"
                    }, {
                        "tag": "on the couch",
                        "value": "0.0000"
                    }, {
                        "tag": "at a wedding",
                        "value": "0.0000"
                    }, {
                        "tag": "after dinner",
                        "value": "0.0000"
                    }, {
                        "tag": "on the first date",
                        "value": "0.0000"
                    }, {
                        "tag": "in a disco",
                        "value": "0.0000"
                    }
			]
                },
                "17": {
                    "name": "Rum Orange",
                    "description": null,
                    "image": null,
                    "orders": null,
                    "offers": null,
                    "recipe": [{
                        "id": "7",
                        "name": "Wei\u00dfer Rum",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "40",
                        "amount": "0.4",
                        "order": "0"
                    }, {
                        "id": "3",
                        "name": "Orangensaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.6",
                        "order": "0"
                    }
			],
                    "rating": {
                        "bitter": {
                            "average": "3.3333",
                            "value": "0.5556"
                        },
                        "sweet": {
                            "average": "1.8889",
                            "value": "0.0000"
                        },
                        "fruity": {
                            "average": "2.0000",
                            "value": "0.0000"
                        },
                        "strong": {
                            "average": "4.2222",
                            "value": "0.6667"
                        },
                        "taste": {
                            "average": "1.5556",
                            "value": "0.1111"
                        },
                        "look": {
                            "average": "1.6667",
                            "value": "0.0000"
                        }
                    },
                    "events": [{
                        "tag": "at a statnight",
                        "value": "0.4444"
                    }, {
                        "tag": "at a preparty",
                        "value": "0.2222"
                    }, {
                        "tag": "at a home party",
                        "value": "0.2222"
                    }, {
                        "tag": "in a disco",
                        "value": "0.2222"
                    }, {
                        "tag": "at a cocktailbar",
                        "value": "0.2222"
                    }, {
                        "tag": "at a businessparty",
                        "value": "0.2222"
                    }, {
                        "tag": "on a winternight",
                        "value": "0.1111"
                    }, {
                        "tag": "on a summernight",
                        "value": "0.0000"
                    }, {
                        "tag": "never",
                        "value": "0.0000"
                    }, {
                        "tag": "on the couch",
                        "value": "0.0000"
                    }, {
                        "tag": "at a wedding",
                        "value": "0.0000"
                    }, {
                        "tag": "after dinner",
                        "value": "0.0000"
                    }, {
                        "tag": "on the beach",
                        "value": "0.0000"
                    }, {
                        "tag": "on the first date",
                        "value": "0.0000"
                    }
			]
                },
                "18": {
                    "name": "Safari",
                    "description": null,
                    "image": null,
                    "orders": null,
                    "offers": null,
                    "recipe": [{
                        "id": "8",
                        "name": "Wodka",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "40",
                        "amount": "0.6",
                        "order": "0"
                    }, {
                        "id": "4",
                        "name": "Zitronensaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.4",
                        "order": "0"
                    }
			],
                    "rating": {
                        "bitter": {
                            "average": "2.8750",
                            "value": "0.5000"
                        },
                        "sweet": {
                            "average": "1.5000",
                            "value": "0.0000"
                        },
                        "fruity": {
                            "average": "3.0000",
                            "value": "0.2500"
                        },
                        "strong": {
                            "average": "3.7500",
                            "value": "0.6250"
                        },
                        "taste": {
                            "average": "3.1250",
                            "value": "0.3750"
                        },
                        "look": {
                            "average": "3.7500",
                            "value": "0.7500"
                        }
                    },
                    "events": [{
                        "tag": "on a summernight",
                        "value": "0.6250"
                    }, {
                        "tag": "on the beach",
                        "value": "0.5000"
                    }, {
                        "tag": "at a home party",
                        "value": "0.5000"
                    }, {
                        "tag": "at a cocktailbar",
                        "value": "0.3750"
                    }, {
                        "tag": "at a statnight",
                        "value": "0.3750"
                    }, {
                        "tag": "at a preparty",
                        "value": "0.2500"
                    }, {
                        "tag": "in a disco",
                        "value": "0.2500"
                    }, {
                        "tag": "on the first date",
                        "value": "0.1250"
                    }, {
                        "tag": "never",
                        "value": "0.0000"
                    }, {
                        "tag": "on a winternight",
                        "value": "0.0000"
                    }, {
                        "tag": "on the couch",
                        "value": "0.0000"
                    }, {
                        "tag": "at a businessparty",
                        "value": "0.0000"
                    }, {
                        "tag": "at a wedding",
                        "value": "0.0000"
                    }, {
                        "tag": "after dinner",
                        "value": "0.0000"
                    }
			]
                },
                "19": {
                    "name": "Screwdriver",
                    "description": "Wodka-O",
                    "image": null,
                    "orders": null,
                    "offers": null,
                    "recipe": [{
                        "id": "8",
                        "name": "Wodka",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "40",
                        "amount": "0.4",
                        "order": "0"
                    }, {
                        "id": "3",
                        "name": "Orangensaft",
                        "description": "",
                        "unit": "cl",
                        "alcohol": "0",
                        "amount": "0.6",
                        "order": "0"
                    }
			],
                    "rating": {
                        "bitter": {
                            "average": "3.1429",
                            "value": "0.5714"
                        },
                        "sweet": {
                            "average": "2.5714",
                            "value": "0.1429"
                        },
                        "fruity": {
                            "average": "2.7143",
                            "value": "0.4286"
                        },
                        "strong": {
                            "average": "4.0000",
                            "value": "0.7143"
                        },
                        "taste": {
                            "average": "2.5714",
                            "value": "0.1429"
                        },
                        "look": {
                            "average": "4.5714",
                            "value": "1.0000"
                        }
                    },
                    "events": [{
                        "tag": "at a preparty",
                        "value": "0.7143"
                    }, {
                        "tag": "on the beach",
                        "value": "0.2857"
                    }, {
                        "tag": "at a statnight",
                        "value": "0.2857"
                    }, {
                        "tag": "at a home party",
                        "value": "0.2857"
                    }, {
                        "tag": "on the first date",
                        "value": "0.1429"
                    }, {
                        "tag": "on a summernight",
                        "value": "0.1429"
                    }, {
                        "tag": "in a disco",
                        "value": "0.1429"
                    }, {
                        "tag": "never",
                        "value": "0.0000"
                    }, {
                        "tag": "on a winternight",
                        "value": "0.0000"
                    }, {
                        "tag": "on the couch",
                        "value": "0.0000"
                    }, {
                        "tag": "at a businessparty",
                        "value": "0.0000"
                    }, {
                        "tag": "at a wedding",
                        "value": "0.0000"
                    }, {
                        "tag": "at a cocktailbar",
                        "value": "0.0000"
                    }, {
                        "tag": "after dinner",
                        "value": "0.0000"
                    }
			]
                }
            }
        }
        return data;

    };

    return that;
};