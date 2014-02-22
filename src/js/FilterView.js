Boris.FilterView = function () {
    var filterdElementsTaste = [];
    var filterdElementsAlc = [];
    var filterdElementsAll = [];
    var that = {},
    mainController,
    mainModel,
    searchView,
    $searchOutput,
    $searchOutputText,
    searchOutputValue = "",
    searchOutputValueTaste = "",
    searchOutputValueAlc = "",
    $searchOutputClose,

    database,

    init = function (searchViewValue) {
        console.log("filter view init");
        initData();

        $(document).ready(function () {
            $('input[type=radio]').click(function () {

                filterdElementsAll = [];

                if (this.name == "groupTaste") {

                    filterdElementsTaste = [];
                    filter(this.value);

                    searchOutputValueTaste = this.value;

                }
                else {
                    filterdElementsAlc = [];
                    filterAlc(this.value);

                    searchOutputValueAlc = this.value;
                }
                searchOutputValue = "";
                searchOutputValue += searchOutputValueTaste + " " + searchOutputValueAlc;
                searchView = searchViewValue;
                refresh();

                onFilter();

            });
        });

        //Statuszeile
        $searchOutput = $('#search-output');
        $searchOutputText = $('#search-output .output-line #output');
        $searchOutputClose = $('#search-output .output-line #close');
        $searchOutputClose.on('click', onSearchOutputClose);

    },

    initData = function () {
        $.get('php/getCocktails.php?rating=3&recipe', function (data) {
            database = data;
        });

    },

    onSearchOutputClose = function () {
        $searchOutput.fadeOut(300);
        $searchOutputText.text("");
        searchView.reshowAllCocktails();
        clearFilter();
        searchOutputValue = "";
    },

    onFilter = function () {
        $searchOutputText.text(searchOutputValue);
        $searchOutput.fadeIn(300);
    };

    that.init = init;

    function refresh() {

        if (filterdElementsTaste[0] == undefined) { // schaun ob nur Alc gewählt wurde

            filterdElementsAll = getResult(filterdElementsAlc); // in filterdElements stehen alle zuversteckende Coktailnumern
            searchView.hideCocktailsById(filterdElementsAll);

        }
        else if (filterdElementsAlc[0] == undefined) { // schaun ob nur Taste gewählt wurde

            filterdElementsAll = getResult(filterdElementsTaste); // in filterdElements stehen alle zuversteckende Coktailnumern
            searchView.hideCocktailsById(filterdElementsAll);

        }
        else {

            for (var i = 0; i < filterdElementsAlc.length; i++) { // iteriere durch alle Cocktails

                if ($.inArray(filterdElementsAlc[i], filterdElementsTaste) !== -1) {
                    filterdElementsAll.push(filterdElementsAlc[i]);
                }
            }

            filterdElementsAll = getResult(filterdElementsAll); // in filterdElements stehen alle zuversteckende Coktailnumern
            searchView.hideCocktailsById(filterdElementsAll);

        }
        // console.log("all: + " + filterdElementsAll);
    };

    function filter(flavor) { // bitter / sweet / fruity / sour

        var list = getdata(); // hole die alle Rezepte + Zutaten

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
        return filterdElementsTaste;

    };

    function filterAlc(alc) { // bitter / sweet / fruity / sour

        var list = getdata(); // hole die alle Rezepte + Zutaten

        for (var i = 1; i <= Object.keys(list.data).length; i++) { // iteriere durch alle Cocktails

            switch (alc) {
                case "Alc-Free":
                    checkFree(list, i);
                    break;
                case "Weak":
                    checkWeak(list, i);
                    break;
                case "Middle":
                    checkMiddle(list, i);
                    break;
                case "Strong":
                    checkStrong(list, i);
                    break;
                default:

                    break;
            }
        };

        return filterdElementsAlc;
    };


    function checkBitter(list, aktuell) {

        if (parseFloat(list.data[aktuell].rating.bitter.value) >= 0.5) { // anzahl der ergebnisse beschränken

            // var wert = parseFloat(list.data[aktuell].rating.bitter.value) / parseFloat(list.data[aktuell].rating.bitter.average); // warscheinlichkeit dass über 3 / durchschnitt

            filterdElementsTaste.push(parseFloat(aktuell)); // weise wert von cocktail ergebnis array zu
        };

    }

    function checkSweet(list, aktuell) {

        if (parseFloat(list.data[aktuell].rating.sweet.value) >= 0.5) { // anzahl der ergebnisse beschränken

            //var wert = parseFloat(list.data[aktuell].rating.sweet.value) / parseFloat(list.data[aktuell].rating.sweet.average); // warscheinlichkeit dass über 3 / durchschnitt

            filterdElementsTaste.push(parseFloat(aktuell)); // weise wert von cocktail ergebnis array zu
        };

    }

    function checkFruity(list, aktuell) {

        if (parseFloat(list.data[aktuell].rating.fruity.value) >= 0.5) { // anzahl der ergebnisse beschränken

            //var wert = parseFloat(list.data[aktuell].rating.fruity.value) / parseFloat(list.data[aktuell].rating.fruity.average); // warscheinlichkeit dass über 3 / durchschnitt

            filterdElementsTaste.push(parseFloat(aktuell)); // weise wert von cocktail ergebnis array zu
        };

    }

    function checkSour(list, aktuell) {

        if (list.data[aktuell].rating.sour == undefined) {
            return;
        }
        if (parseFloat(list.data[aktuell].rating.sour.value) >= 0.5) { // anzahl der ergebnisse beschränken

            //var wert = parseFloat(list.data[aktuell].rating.sour.value) / parseFloat(list.data[aktuell].rating.sour.average); // warscheinlichkeit dass über 3 / durchschnitt

            filterdElementsTaste.push(parseFloat(aktuell)); // weise wert von cocktail ergebnis array zu
        };

    }

    function checkFree(list, aktuell) { // hier muss noch alkoholfreie coktails abgerufen werden
        //   $alcoholPercentage += $ingredient->alcohol * $ingredient->amount;
        var IsWithout = true;
        for (var j = 0; j < Object.keys(list.data[aktuell].recipe).length; j++) {
            if (list.data[aktuell].recipe[j].alcohol == 0) {

            }
            else {
                IsWithout = false;
            }
        }
        if (IsWithout == true) {
            filterdElementsAlc.push(parseFloat(aktuell));
        }

    }

    function checkWeak(list, aktuell) {

        if (parseFloat(list.data[aktuell].rating.strong.value) <= 0.3) { // anzahl der ergebnisse beschränken

            //var wert = parseFloat(list.data[aktuell].rating.strong.value) / parseFloat(list.data[aktuell].rating.strong.average); // warscheinlichkeit dass über 3 / durchschnitt

            filterdElementsAlc.push(parseFloat(aktuell)); // weise wert von cocktail ergebnis array zu
        };

    }

    function checkMiddle(list, aktuell) {

        if (parseFloat(list.data[aktuell].rating.strong.value) > 0.3 && parseFloat(list.data[aktuell].rating.strong.value) <= 0.6) { // anzahl der ergebnisse beschränken

            //console.log(" aktuell middel: " + aktuell);
            // var wert = parseFloat(list.data[aktuell].rating.strong.value) / parseFloat(list.data[aktuell].rating.strong.average); // warscheinlichkeit dass über 3 / durchschnitt

            filterdElementsAlc.push(parseFloat(aktuell)); // weise wert von cocktail ergebnis array zu
        };

    }

    function checkStrong(list, aktuell) {

        if (parseFloat(list.data[aktuell].rating.strong.value) > 0.6) { // anzahl der ergebnisse beschränken

            //var wert = parseFloat(list.data[aktuell].rating.strong.value) / parseFloat(list.data[aktuell].rating.strong.average); // warscheinlichkeit dass über 3 / durchschnitt

            filterdElementsAlc.push(parseFloat(aktuell)); // weise wert von cocktail ergebnis array zu
        };

    }


    function getResult(filterdElement) {
        var ergebnis = [];
        var zuverstecken = getdata();
        var tempArr = [];

        for (var i = 1; i <= Object.keys(zuverstecken.data).length; i++) { //bekomme alle cocktail nummern
            tempArr.push(i);
        }
        zuverstecken = new Array();

        ergebnis = filterdElement;

        for (var i = 1; i <= tempArr.length; i++) {  // bekomme all zuversteckendend cocktail nummern
            if (ergebnis.indexOf(i) == -1) {
                zuverstecken.push(i);
            }
        }
        return zuverstecken;
    }


    function clearFilter() {
        filterdElementsAll = [];
        filterdElementsTaste = [];
        filterdElementsAlc = [];
        //searchOutputValue = "";
        $('.input-group input').prop('checked', false);
    }

    function compare(a, b) {
        if (a.wert > b.wert)
            return -1;
        if (a.wert < b.wert)
            return 1;
        return 0;
    }



    function getdata() {
        return database;
    };

    return that;
};