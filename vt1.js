"use strict";
//@ts-check 
// Joukkueen sarja on viite data.sarjat-taulukossa lueteltuihin sarjoihin
// Joukkueen rastileimausten rastit ovat viitteitä data.rastit-Objektissa oleviin rasteihin

// Kirjoita tästä eteenpäin oma ohjelmakoodisi


/**
  * Taso 1
  * Järjestää leimaustavat aakkosjärjestykseen 
  * isoilla ja pienillä kirjaimilla ei ole järjestämisessä merkitystä (case insensitive). 
  * Leimaustavan nimen alussa tai lopussa olevalle whitespacella ei myöskääm ole merkitystä. "  foo " on siis sama kuin "foo"
  * Alkuperäistä rakennetta ei saa muuttaa tai korvata vaan järjestäminen tehdään alkup. taulukon kopiolle.
  * Järjestetty lista leimaustavoista näkyy sivulla olevalla lomakkeella
  * @param {Array} leimaustavat-taulukko, jonka kopio järjestetään
  * @param {Array} lt-kopio alkuperäisestä leimaustavat - taulukosta
  * @return {Array} palauttaa järjestetyn _kopion_ leimaustavat-taulukosta
*/
function jarjestaLeimaustavat(leimaustavat) {
  let lt = Array.from(leimaustavat);
  lt.sort();
  console.log("jarjestaLeimaustavat", leimaustavat);
  return lt; // tässä pitää palauttaa järjestetty kopio eikä alkuperäistä
}

/**
  * Taso 1
  * Järjestää sarjat aakkosjärjestykseen sarjan nimen perustella 
  * isoilla ja pienillä kirjaimilla ei ole järjestämisessä merkitystä (case insensitive)
  * Alkuperäistä rakennetta ei saa muuttaa tai korvata vaan järjestäminen tehdään alkup. taulukon kopiolle.
  * Järjestetetyt sarjat näkyvät sivulla olevalla lomakkeella
  * @param {Array} taulukko, jonka kopio järjestetään 
  * @var {Array} snimet - kopio alkuperäisestä taulukosta
  * @var {Function} nimicompare - itsetehty vertailufunktio, joka annetaan sort-funktiolle parametrinä
  * että se tietää mihin järjestykseen nimet laitetaan
  * @return {Array} palauttaa järjestetyn _kopion_ sarjat-taulukosta
  */
function jarjestaSarjat(sarjat) {
  let snimet = Array.from(sarjat);

  function nimicompare(a, b) {
    if (a.nimi < b.nimi) {
      return -1;
    }
    if (a.nimi > b.nimi) {
      return 1;
    }
    // viimeiseksi jos yhtäsuuret
    return 0;
  }
  snimet.sort(nimicompare);
  return snimet;
  console.log("jarjestaSarjat", sarjat);
  return sarjat;  // tässä pitää palauttaa järjestetty kopio eikä alkuperäistä
}


/**
  * Taso 1
  * Lisää uuden sarjan ja palauttaa tiedon onnistuiko lisääminen vai ei
  * Sarja lisätään vain jos kaikki seuraavat ehdot täyttyvät:
  *  - Toista samannimistä sarjaa ei ole olemassa. Nimien vertailussa
  *    ei huomioida isoja ja pieniä kirjaimia tai nimen alussa ja lopussa välilyöntejä etc. (whitespace). Nimien vertailu on siis caseinsensitive.
  * "  Foo " on siis sama kuin "foo"
  *    sarjan nimi ei voi olla pelkkää whitespacea. 
  * - Sarjan keston täytyy olla kokonaisluku ja suurempi kuin 0
  * - Sarjan uniikki id on luotava seuraavalla tavalla: Käy läpi kaikki sarjat ja etsi suurin id, lisää tähän 1
  *  Uusi sarja tallennetaan sarjat-taulukkoon. Sarjan on oltava seuraavaa muotoa:
  *  {
  *     "id": {Number}, // Jokaisella sarjalle oleva uniikki kokonaislukutunniste, pakollinen tieto
  *     "nimi": {String}, // Sarjan uniikki nimi, pakollinen tieto
  *     "kesto": {Number}, // sarjan kesto tunteina, pakollinen tieto
  *     "alkuaika": {String}, // Sarjan alkuaika, oletuksena ""
  *     "loppuaika": {String}, // Sarjan loppuaika, oletuksena ""
  *  }
  * Tätä funktiota voi kokeilla, kun lisää sivulla olevalla lomakkeella uuden sarjan
  * 
  * Omat kommentit:
  * Alussa verrataan syötettyä nimea jo sarjat - taulukon olemassa oleviin nimiin, sekä tarkistetaan ettei syötetty ollut vain whitespacea
  * käyttämällä säännöllisiä lausekkeita. Samalla etsitään sarjan suurinta ID:tä, jota käytetään myöhemmin uuden ID:n muodostamiseen.
  * Sitten tarkistetaan, että syötetty kesto on oikeasti numero ja suurempi kuin nolla. Sitten luodaan uudelle sarjalle uusi
  * ID lisäämällä ykkönen entiseen suurimpaan ID lukuun. Sitten muodostetaan lisättävä sarja ja syötetään siihen kaikki tarvittavat tiedot
  * 
  * @param {Array} sarjat - taulukko johon sarja lisätään 
  * @param {String} nimi - Lisättävän sarjan nimi
  * @param {String} kesto - Sarjan kesto merkkijonona
  * @param {String} alkuaika - Sarjan alkuaika, ei pakollinen
  * @param {String} loppuaika - Sarjan loppuaika, ei pakollinen
  * @return {Boolean} palauttaa true, jos sarja lisättiin tai false, jos lisäämistä ei tehty
  * @var {Function} onkoTyhjaa - Itsetehty funktio, joka säännöllisten lausekkeiden avulla poistaa tyhjät tilat merkkijonosta ja tarkastaa,
  * jäikö sen jälkeen merkkijonosta mitään jäljelle
  * @var {Number} suurinId - Suurin taulukosta löydetyn sarjan ID
  * @var {Number} uusiId - Lisätylle sarjalle tehty ID, joka saadaan lisäämällä ykkönen entiseen suurimpaan ID:hen
  * @var {Object} uusiSarja - Uusi alkio sarjat-taulukkoon, joka muodostetaan syöttämällä parametrina annetut arvot sekä itse johdettu ID
  */
function lisaaSarja(sarjat, nimi, kesto, alkuaika, loppuaika) {
  let suurinId = 0;
  for (let sarja of sarjat) {
    if ((sarja.nimi.localeCompare(nimi, 'fi', {sensitivity: 'base'}) == 0) || onkoTyhjaa(nimi)) {
      return false;
      }
    if (sarja.id > suurinId) {
      suurinId = sarja.id;
    }
    }
  function onkoTyhjaa(value) {
    if (!value.replace(/\s/g, "")) {
      return true;
      }
    }

    if (!Number.isInteger(parseInt(kesto)) || kesto <= 0) {
      return false;
    }

  let uusiId = suurinId +1;
  let uusiSarja = {
    "id": uusiId,
    "nimi": nimi,
    "kesto": parseInt(kesto),
    "alkuaika": alkuaika,
    "loppuaika": loppuaika
  };
  let uusiData = sarjat.push(uusiSarja);

  console.log("lisaaSarja", sarjat);
  return true;
}

/**
  * Taso 1
  * Poistaa joukkueen id:n perusteella data-rakenteesta ja palauttaa muuttuneen datan
  * @param {Object} joukkueet - taulukko josta joukkue poistetaan
  * @param {String} id - poistettavan joukkueen id
  * @return {Boolean} true, jos poisto onnistui tai false, jos poistettavaa joukkuetta ei löytynyt
  */
function poistaJoukkue(joukkueet, id) {
//  console.log("poistaJoukkue", joukkueet);
  return false;
}

/**
  * Taso 3
  * Järjestää rastit taulukkoon aakkosjärjestykseen rastikoodin perustella siten, että 
  * numeroilla alkavat rastit ovat kirjaimilla alkavien jälkeen. 
  * Esim. jos rastikoodit ovat 9B, 8A, 99, foobar, niin oikea järjestys olisi foobar, 8A, 99, 9B
  * isoilla ja pienillä kirjaimilla ei ole järjestämisessä merkitystä (case insensitive)
  * Jos saat konsoliin virheilmoituksen:
  *   Warning: Each child in a list should have a unique "key" prop.
  * et ole vielä asettanut rasteille oikeaa id:tä
  * @param {Object} rastit - Objekti, jonka sisältämistä rastiobjekteista muodostetaan järjestetty taulukko
  * @return {Array} palauttaa järjestetyn taulukon, joka sisältää kaikki rastiobjektit. Rastiobjektit ovat muotoa:
                                                     {
                                                        "id": rastit-objektissa käytetty kunkin rastiobjektin avain
                                                        "koodi": rastikoodi merkkijonona
                                                        "lat": latitude liukulukuna
                                                        "lon": longitude liukulukuna
                                                     } 
  */
function jarjestaRastit(rastit) {
//  console.log("jarjestaRastit", rastit);
  return [{"id":1, "koodi":"00", "lat": 0.0, "lon": 0.0}]; // tässä pitää palauttaa järjestetty taulukko rasteista
}


/**
  * Taso 3
  * Lisää joukkueen data-rakenteeseen ja palauttaa muuttuneen datan
  * Joukkue lisätään vain jos kaikki seuraavat ehdot täyttyvät:
  *  - Toista samannimistä joukkuetta ei ole olemassa. Nimien vertailussa
  *    ei huomioida isoja ja pieniä kirjaimia tai nimen alussa ja lopussa välilyöntejä etc. (whitespace). Nimien vertailu on siis caseinsensitive.
  *    "  Foo " on siis sama kuin "foo"
  *    Joukkueen nimi ei voi olla pelkkää whitespacea. 
  *  - Leimaustapoja on annettava vähintään yksi kappale. Leimaustapojen
  *     on löydyttävä data.leimaustavat-taulukosta
  *  - Jäseniä on annettava vähintään kaksi kappaletta. 
  *  - Saman joukkueen jäsenillä ei saa olla kahta samaa nimeä (caseinsensitive)
  *  - Sarjan id, jota vastaava sarja on löydyttävä data.sarjat-objektin sarjoista
  *
  *  Uusi joukkue tallennetaan data.joukkueet-taulukkoon. Joukkueen on oltava seuraavaa muotoa:
  *  {
  *     "id": {Number}, // jokaisella joukkueella oleva uniikki kokonaislukutunniste
  *     "nimi": {String}, // Joukkueen uniikki nimi
  *     "jasenet": {Array}, // taulukko joukkueen jäsenien nimistä
  *     "leimaustapa": {Array}, // taulukko joukkueen leimaustapojen indekseistä (kts. data.leimaustavat)
  *     "rastileimaukset": {Array}, // taulukko joukkueen rastileimauksista. Oletuksena tyhjä eli []
  *     "sarja": {Object}, // viite joukkueen sarjaan, joka löytyy data.sarjat-taulukosta
  *     "pisteet": {Number}, // joukkueen pistemäärä, oletuksena 0
  *     "matka": {Number}, // joukkueen kulkema matka, oletuksena 0
  *     "aika": {String}, // joukkueen käyttämä aika "h:min:s", oletuksena "00:00:00"
  *  }
  * @param {Object} Objekti, jonka joukkueet-taulukkoon joukkue lisätään 
  * @param {String} nimi - Lisättävän joukkueen nimi
  * @param {Array} leimaustavat - Taulukko leimaustavoista
  * @param {String} sarja - Joukkueen sarjan id-tunniste
  * @param {Array} jasenet - joukkueen jäsenet
  * @return {Object} palauttaa aluperäisen datan
  */
function lisaaJoukkue(data, nimi, leimaustavat, sarja, jasenet) {
//  console.log("lisaaJoukkue", data);
  return data;
}

/**
  * Taso 3
  * Laskee joukkueen käyttämän ajan. Tulos tallennetaan joukkue.aika-ominaisuuteen.
  * Käytä merkkijonoa, jossa aika on muodossa "hh:mm:ss". Esim. "07:30:35"
  * Jos aikaa ei kyetä laskemaan, funktio palauttaa tyhjän merkkijonon ""
  * Aika lasketaan viimeisestä (ajan mukaan) LAHTO-rastilla tehdystä leimauksesta alkaen aina
  * ensimmäiseen (ajan mukaan) MAALI-rastilla tehtyyn leimaukseen asti. Leimauksia jotka tehdään
  * ennen viimeistä lähtöleimausta tai ensimmäisen maalileimauksen jälkeen ei huomioida.
  * Mahdollisia MAALI-rastin leimauksia, jotka tehdään ennen viimeistä LAHTO-rastilla leimausta, ei huomioida
  * Ts. LAHTO-rastin leimaaminen nollaa aina kaikki leimaukset mukaanlukien mahdollisen MAALI-rastileimauksen
  * @param {Object} joukkue
  * @return {Object} joukkue
  */
function laskeAika(joukkue) {
  return joukkue;
}

/**
  * Taso 3 ja Taso 5
  *  Järjestää joukkueet järjestykseen haluttujen tietojen perusteella
  *  järjestetään ensisijaisesti kasvavaan aakkosjärjestykseen 
  *  mainsort-parametrin mukaisen tiedon perusteella. mainsort voi olla joukkueen nimi, sarjan nimi, matka, aika tai pisteet
  *  Järjestäminen on tehtävä alkuperäisen taulukon kopiolle. Alkuperäistä ei saa muuttaa tai korvata.
  *  Joukkueen jäsenet järjestetään aina aakkosjärjestykseen. Alkuperäisen joukkueobjektin jäsenten järjestys ei saa muuttua.
  *  Joukkueen leimaustavat järjestetään myös aina aakkosjärjestykseen leimaustapojen nimien mukaan
  *  Isoilla ja pienillä kirjaimilla ei ole missään järjestämisissä merkitystä (case insensitive) eikä myöskään alussa tai lopussa olevalla whitespacella. Vertailu on siis caseinsensitive.
  *  sortorder-parametrin käsittely vain tasolla 5
  *  jos sortorder-parametrina on muuta kuin tyhjä taulukko, käytetään 
  *  sortorderin ilmoittamaa järjestystä eikä huomioida mainsort-parametria: 
  *  ensisijaisesti järjestetään taulukon ensimmäisen alkion tietojen perusteella, 
  *  toissijaisesti toisen jne.
  *  sortorder-taulukko sisältää objekteja, joissa kerrotaan järjestysehdon nimi (key),
  *  järjestyssuunta (1 = nouseva, -1 = laskeva) ja järjestetäänkö numeerisesti (true)
  *  vai aakkosjärjestykseen (false)
  *  Toteuta sortorder-taulukon käsittely siten, että taulukossa voi olla vaihteleva määrä rivejä
  *  Sarja täytyy huomioida erikoistapauksena
  *	 sortorder = [
  *	 {"key": "sarja", "order": 1, "numeric": false},
  *	 {"key": "nimi", "order": 1, "numeric": false},
  *	 {"key": "matka", "order": -1, "numeric": true},
  *	 {"key": "aika", "order": 1, "numeric": false},
  *	 {"key": "pisteet", "order": -1, "numeric": true}
  *	]
  * @param {Object} data - tietorakenne, jonka data.joukkueet-taulukko järjestetään 
  * @param {String} mainsort - ensimmäinen (ainoa) järjestysehto, joka voi olla nimi, sarja, matka, aika tai pisteet  TASO 3
  * @param {Array} sortorder - mahdollinen useampi järjestysehto TASO 5
  * @return {Array} palauttaa järjestetyn ja täydennetyn _kopion_ data.joukkueet-taulukosta
  */
function jarjestaJoukkueet(data, mainsort="nimi", sortorder=[] ) {
  return data.joukkueet;
}

/**
  * Taso 5
  * Laskee joukkueen kulkeman matkan. Matka tallennetaan joukkue.matka-ominaisuuteen liukulukuna
  * Laske kuinka pitkän matkan kukin joukkue on kulkenut eli laske kunkin rastivälin
  * pituus ja laske yhteen kunkin joukkueen kulkemat rastivälit. Jos rastille ei löydy
  * sijaintitietoa (lat ja lon), niin kyseistä rastia ei lasketa matkaan mukaan. Matka
  * lasketaan viimeisestä LAHTO-rastilla tehdystä leimauksesta alkaen aina
  * ensimmäiseen MAALI-rastilla tehtyyn leimaukseen asti. Leimauksia jotka tehdään
  * ennen lähtöleimausta tai maalileimauksen jälkeen ei huomioida.
  * Käytä annettua apufunktiota getDistanceFromLatLonInKm
  * @param {Object} joukkue
  * @return {Object} joukkue
  */
function laskeMatka(joukkue) {
  return joukkue;
}

/**
  * Taso 5
  * Laskee joukkueen saamat pisteet. Pistemäärä tallennetaan joukkue.pisteet-ominaisuuteen
  * Joukkue saa kustakin rastista pisteitä rastin koodin ensimmäisen merkin
  * verran. Jos rastin koodi on 9A, niin joukkue saa yhdeksän (9) pistettä. Jos rastin
  * koodin ensimmäinen merkki ei ole kokonaisluku, niin kyseisestä rastista saa nolla
  * (0) pistettä. Esim. rasteista LÄHTÖ ja F saa 0 pistettä.
  * Samasta rastista voi sama joukkue saada pisteitä vain yhden kerran. Jos
  * joukkue on leimannut saman rastin useampaan kertaan lasketaan kyseinen rasti
  * mukaan pisteisiin vain yhden kerran.
  * Rastileimauksia, jotka tehdään ennen lähtöleimausta tai maalileimauksen jälkeen, ei
  * huomioida.
  * Maalileimausta ei huomioida kuin vasta lähtöleimauksen jälkeen.
  * Jos joukkueella on useampi lähtöleimaus, niin pisteet lasketaan vasta
  * viimeisen lähtöleimauksen jälkeisistä rastileimauksista.
  * Joukkue, jolla ei ole ollenkaan rastileimauksia, saa 0 pistettä
  * @param {Object} joukkue
  * @return {Object} joukkue
  */
function laskePisteet(joukkue) {
  return joukkue;
}



// apufunktioita tasolle 5
/**
  * Laskee kahden pisteen välisen etäisyyden
  */
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  let R = 6371; // Radius of the earth in km
  let dLat = deg2rad(lat2-lat1);  // deg2rad below
  let dLon = deg2rad(lon2-lon1);
  let a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  let d = R * c; // Distance in km
  return d;
}
/**
   Muuntaa asteet radiaaneiksi
  */
function deg2rad(deg) {
  return deg * (Math.PI/180);
}

