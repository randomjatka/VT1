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
  * @var {Array} lt-kopio alkuperäisestä leimaustavat - taulukosta
  * @return {Array} palauttaa järjestetyn _kopion_ leimaustavat-taulukosta
*/
function jarjestaLeimaustavat(leimaustavat) {
  let lt = Array.from(leimaustavat);
  // TODO: whitespace check
  lt.sort(Intl.Collator('fi', {sensitivity: 'base'}).compare);
  console.log("jarjestaLeimaustavat", lt);
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
  * että sarjat voidaan järjestää nimen mukaan.
  * @return {Array} palauttaa järjestetyn _kopion_ sarjat-taulukosta
  */
function jarjestaSarjat(sarjat) {
  let snimet = Array.from(sarjat);

  function nimicompare(a, b) {
    let tulos = a.nimi.localeCompare(b.nimi, 'fi', {sensitivity: 'base'});
    if ( tulos) {
      return tulos;
    }
  }
  snimet.sort(nimicompare);
  console.log("jarjestaSarjat", snimet);
  return snimet; // tässä pitää palauttaa järjestetty kopio eikä alkuperäistä
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
  let nimiValilyonnit = nimi.replace(/\s/g, "");
  if (nimiValilyonnit == "") {return false;}
  for (let sarja of sarjat) {
    if ((sarja.nimi.localeCompare(nimiValilyonnit, 'fi', {sensitivity: 'base'}) == 0)) {
      return false;
      }
    if (sarja.id > suurinId) {
      suurinId = sarja.id;
    }
    }
    // TODO: Tämä kelpuuttaa vielä syötteitä kuten "1a", antaa tulokseksi 1. pitäisikö kaikki kirjaimet syötteestä kieltää?
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
  sarjat.push(uusiSarja);

  console.log("lisaaSarja", sarjat);
  return true;
}

/**
  * Taso 1
  * Poistaa joukkueen id:n perusteella data-rakenteesta ja palauttaa muuttuneen datan
  * @param {Object} joukkueet - taulukko josta joukkue poistetaan
  * @param {String} id - poistettavan joukkueen id
  * @return {Boolean} true, jos poisto onnistui tai false, jos poistettavaa joukkuetta ei löytynyt
  * @var {Number} poistettavaIndeksi - sen joukkue-alkion indeksi, joka halutaan poistaa
  * @var {Function} tarkistaId - Itsetehty funktio, joka vertaa haluttua ID:tä datasta löytyvien joukkueiden ID:eihin.
  * Tämä syötetään parametrinä findIndex-funktiolle, joka hoitaa varsinaisen datan läpikäynnin
  */
function poistaJoukkue(joukkueet, id) {
  function tarkistaId(value) {
    if (parseInt(value.id) == parseInt(id)) {
      return true;
    }
    return false;
  }

  let poistettavaIndeksi = joukkueet.findIndex(tarkistaId);

  if (poistettavaIndeksi == -1) {
    return false;
  }
  joukkueet.splice(poistettavaIndeksi, 1);
  console.log("poistaJoukkue", joukkueet);
  return true;
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
  * 
  * Omat kommentit:
  * Ensin luodaan uuden taulukon pohja ja indeksi, jonka avulla seurataan monettako taulukon alkiota käsitellään.
  * Sitten täytetään silmukalla vanhan rastit - objektin avaimet ja arvot yhteen objektiin, ja luotu objekti
  * lisätään uuteen taulukkoon joka iteraatiolla.
  * 
  * Sitten erotetaan rastien alkioista numerolla alkavat ja kirjaimella alkavat. Erotus tehdään filter-funktiolla,
  * jossa tarkastellaan koodi-alkioiden ensimmäistä merkkiä ja säännöllisellä lausekkeella katsotaan, onko se digit (numero vai ei).
  * Muodostetut rastien puolikkaat järjestetään normaalisti. Sitten kirjaimella alkavien rastien perään liitetään numerolla alkavat.
  * @param {Object} rastit - Objekti, jonka sisältämistä rastiobjekteista muodostetaan järjestetty taulukko
  * @return {Array} palauttaa järjestetyn taulukon, joka sisältää kaikki rastiobjektit. Rastiobjektit ovat muotoa:
                                                     {
                                                        "id": rastit-objektissa käytetty kunkin rastiobjektin avain
                                                        "koodi": rastikoodi merkkijonona
                                                        "lat": latitude liukulukuna
                                                        "lon": longitude liukulukuna
                                                     }
  * @var {Array} idsuodatettavat - Taulukko, johon pakataan rastit - objektin avaimet ja arvot
  * @var {Number} indeksi - Apuluku, jota käytetään silmukan suorituksessa viittaamaan taulukon alkioihin
  * @var {Object} suodatettava - Uusi objekti, joka toimii idsuodatettavat - taulukon sisältö alkioina
  * @var {Array} numerollaAlkavat - Rastit, jotka alkavat numerolla
  * @var {Array} kirjaimellaAlkavat - Rastit, jotka alkavat kirjaimella
  * @var {Function} koodicompare - Apufunktio, joka vertaa rastien koodi-osioita keskenään
  */                                   
function jarjestaRastit(rastit) {
  
  let idsuodatettavat = [];
  let indeksi = 0;

  // TODO: for:in sijasta while silmukka, missä ehtona indeksi<rastit.length-1
  // TODO: ehkä ei let-lausetta silmukan sisään?
  for (let rasti in rastit) {

    let suodatettava = {
      "id": Object.keys(rastit)[indeksi],
      "koodi": Object.values(rastit)[indeksi].koodi,
      "lat": Object.values(rastit)[indeksi].lat,
      "lon": Object.values(rastit)[indeksi].lon,
    };
    // 
    idsuodatettavat[indeksi] = suodatettava;
    indeksi++;
  }

  let numerollaAlkavat = idsuodatettavat.filter(function (currentValue, index, array) {
    if ( currentValue.koodi && /\d/.test(currentValue.koodi[0])) {
      return true;
    } 
  });

  let kirjaimellaAlkavat = idsuodatettavat.filter(function (currentValue, index, array) {
    if ( currentValue.koodi && !/\d/.test(currentValue.koodi[0])) {
      return true;
    } 
  });


  function koodicompare(a, b) {
    let tulos = a.koodi.localeCompare(b.koodi, 'fi', {sensitivity: 'base'});
    if ( tulos) {
      return tulos;
    }
  }

  numerollaAlkavat.sort(koodicompare);
  kirjaimellaAlkavat.sort(koodicompare);

  console.log("jarjestaRastit", kirjaimellaAlkavat.concat(numerollaAlkavat));
  return kirjaimellaAlkavat.concat(numerollaAlkavat);

// return [{"id":1, "koodi":"00", "lat": 0.0, "lon": 0.0}]; // tässä pitää palauttaa järjestetty taulukko rasteista
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
  * Omat kommentit: Ensin poistetaan lomakkeen antama tyhjä nimi. Sitten tarkistetaan, että annettu joukkueen nimi ei ole jo olemassa.
  * Suurin löydetty joukkueen ID otetaan talteen, jotta sillä voi muodostaa uuden joukkueen ID:n.
  * Sitten katsotaan, että jokainen leimaustapa on olemassa, ja tallennetaan niiden indeksit lisättävälle joukkueelle.
  * Sitten katsotaan, että syötetyissä jäsenien nimissä ei ole duplikaatteja. Lopuksi vielä katsotaan, että sarjan ID on olemassa,
  * ja lisätään sarja myös joukkueeseen. Sitten täytetään joukkueen tiedot ja lisätään se dataan.
  * 
  * @param {Object} Objekti, jonka joukkueet-taulukkoon joukkue lisätään 
  * @param {String} nimi - Lisättävän joukkueen nimi
  * @param {Array} leimaustavat - Taulukko leimaustavoista
  * @param {String} sarja - Joukkueen sarjan id-tunniste
  * @param {Array} jasenet - joukkueen jäsenet
  * @return {Object} palauttaa aluperäisen datan
  * 
  * @var {Number} suurinId - Suurin joukkueet -taulukosta löydetty joukkueen ID
  * @var {Boolean} onkoOlemassa - Apumuuttuja, jolla pidetään muistissa onko leimaustapa olemassa
  * @var {Array} leimausIndeksit - Aputaulukko, jolla pidetään muistissa syötettyjen leimaustapojen indeksit
  * @var {Boolean} onkoIdOlemassa - Apumuuttuja, jolla pidetään muistissa onko sarja olemassa
  * @var {Object} lisattavaSarja - Apumuuttuja, jolla pidetään muistissa se sarja, johon syötetty sarjan ID täsmäsi
  * @var {Object} lisattavaJoukkue - Joukkue, johon laitetaan syötetyt tiedot ja lisätään dataan
  */
function lisaaJoukkue(data, nimi, leimaustavat, sarja, jasenet) {

  // Lomake palauttaa myös tyhjän jäsenrivin joten poistetaan se
  jasenet.splice(jasenet.indexOf(""), 1);

  // Poistetaan joukkueen nimestä whitespace ja vertaillaan olemassa oleviin nimiin.
  // Jos löytyy joukkue, jonka nimi on sama kuin lisättävän joukkueen (localcompare vertaus == 0), niin ei lisätä joukkuetta
  // Lisäksi joukkeita käsitellessä katsotaan läpi niiden ID:t, ja tallennetaan suurin jonka avulla voidaan tehdä uuden joukkueen ID
  if (leimaustavat.length < 1) { return data;}
  let suurinId = 0;
  let nimiValilyonnit = nimi.replace(/\s/g, "");
  if (nimiValilyonnit == "") {return data;}
  for (let joukkue of data.joukkueet) {
    if ((joukkue.nimi.localeCompare(nimiValilyonnit, 'fi', {sensitivity: 'base'}) == 0)) {
      return data;
      }
    if (joukkue.id > suurinId) {
      suurinId = joukkue.id;
      }
    }

  // Kaksi sisäkkäistä silmukkaa, joilla tarkistetaan että jokainen leimaustapa löytyy kertaalleen alkuperäisestä datasta.
  // Kun yksi leimaustapa on löydetty, tallennetaan myös sen indeksi jonka avulla voidaan täyttää uuden joukkuueen "leimaustapa" alkio.
  // Sitten siirrytään uuteen leimaustapaan ja etsitään sekin alkuperäisestä datasta. Jos jotain leimaustapaa ei löydy, ei lisätä joukkuetta
  let onkoOlemassa = false;
  let leimausIndeksit = [];
  for (let leimaustapa of leimaustavat) {
    for (let vertausleima of data.leimaustavat) {
      if (leimaustapa == vertausleima) {
        onkoOlemassa = true;
        leimausIndeksit.push(data.leimaustavat.indexOf(leimaustapa));
        break;
      }
    }
    if (!onkoOlemassa) {return data;}
    onkoOlemassa = false;
  }

  // Kaksi sisäkkäistä silmukkaa, joilla verrataan jokaisen jäsenen nimeä kaikkiin jäsenet - taulukossa jälkeen tuleviin nimiin.
  // Edellä oleviin nimiin ei tarvitse vertaa koska aikaisemmat iteraatiot jo hoitivat sen
  // firstIndex ja lastIndex of vertailut, jos nämä ei ole samat niin duplikaatteja löytyi. mahdollinen tehostus?
  if (jasenet.length < 2) { return data;}
  let indeksi = 0;
  let indeksij = 0;
  while (indeksi < jasenet.length-1) {
    while ((indeksi + indeksij) < jasenet.length-1) {
      if (jasenet[indeksi].localeCompare(jasenet[indeksi + indeksij + 1], 'fi', {sensitivity: 'base'}) == 0) {return data;}
      indeksij++;
    }
    indeksij = 0;
    indeksi++;
  }

  // Katsotaan, että sarjan ID löytyy datasta, muuten palautetaan alkuperäinen data. Kun täsmäävä sarjan id löydetään, tallennetaan
  // se jotta se voidaan täyttää uuden joukkueen sarjaksi
  // TODO: väliaikainen taulukko, missä kaikki data.sarjat id:et, sitten exists - funktio että löytyykö id, säästyy silmukoimiselta.
  let onkoIdOlemassa = false;
  let lisattavaSarja = {};
  for (let vertausSarja of data.sarjat) {
    if (sarja == vertausSarja.id) { 
      onkoIdOlemassa = true;
      lisattavaSarja = vertausSarja;
    }
  }
  if (!onkoIdOlemassa) { return data;}

  suurinId++;
  let lisattavaJoukkue = {
    "id": suurinId,
    "nimi": nimi,
    "jasenet": jasenet,
    "leimaustapa": leimausIndeksit,
    "rastileimaukset": leimaustavat,
    "sarja": lisattavaSarja,
    "pisteet": 0,
    "matka": 0,
    "aika": "00:00:00"
  };

  data.joukkueet.push(lisattavaJoukkue);
  
  console.log("lisaaJoukkue", data);
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
  * 
  * OMAT kommentit: Ensin suodatetaan datasta ne rastileimaukset, joissa koodina on "LAHTO". Sitten näistä etsitään
  * myöhin lähtö silmukalla. Sitten suodatetaan datasta ne rastileimaukset, joissa koodina on "MAALI". Näistä etsitään
  * aikaisin saapuminen, ja lisäksi varmistetaan että saapuminen oli varmasti vasta viimeisen lähdön jälkeen. Lähdön
  * ja maaliin saapumisen leimauksien ajankohdat vähennetään toisistaan, ja lopputulos muokataan millisekunneista
  * hh:mm:ss muotoon.
  * 
  * @param {Object} joukkue
  * @return {Object} joukkue
  * 
  * @var {function} vertaaLahtoon - Apufunktio, jolla filteröidään lähtörastin leimat
  * @var {function} vertaaMaaliin - Apufunktio, jolla filteröidään maalirastin leimat
  * @var {Array} lahtoLeimaukset - Suodatetut leimaukset, jossa koodi on LAHTO
  * @var {Array} maaliLeimaukset - Suodatetut leimaukset, jossa koodi on MAALI
  * @var {Date} vikaLahto - Muuttuja, johon tallennetaan tähän mennessä viimeisimmän lähdön aika
  * @var {Date} ekamaali - Muuttuja, johon tallennetaan tähän mennessä ensimmäisen maalin aika, joka tulee viimeisen lähdön jälkeen
  * @var {Boolean} loytyikoValidiaLeimaa - Apumuuttuja, jolla varmistetaan että ainakin yksi maalin rastitus oli viimeisen lähdön
  * jälkeen
  * @var {Number} joukkueenAika - Erotus ensimmäisen maalin ja viimeisen lähdön ajoista, millisekunneissa
  * @var {function} millisekuntitTunneiksi - Funktio, jolla millisekunnit esitetään muodossa: hh:mm:ss
  */
function laskeAika(joukkue) {
  function vertaaLahtoon(value) {
    if (value.rasti === undefined) {return false;}
    if (value.rasti.koodi == "LAHTO") {return true;}
  }

  function vertaaMaaliin(value) {
    if (value.rasti === undefined) {return false;}
    if (value.rasti.koodi == "MAALI") {return true;}
  }

  // TODO: Tässä luultavasti sort-funktio pilaa alkuperäisenkin datan, ja johtaa ikuiseen silmukkaan suorituksen aikana.
  // tee tilalle funktio joka etsii manuaalisesti viimeisen lähdön ja ensimmäisen maalin
  // TODO: exists - funktiolla voisi katsoa että sekä maaleja että lähtöjä on olemassa
  let lahtoLeimaukset = joukkue.rastileimaukset.filter(vertaaLahtoon);
  if (lahtoLeimaukset.length < 1) {return joukkue;}
  let vikaLahto = new Date(Date.parse('01 Jan 1970 00:00:00 GMT'));
  let indeksi = 0;
  while (indeksi < lahtoLeimaukset.length) {
    if (vikaLahto < Date.parse(lahtoLeimaukset[indeksi].aika)) {vikaLahto = Date.parse(lahtoLeimaukset[indeksi].aika);}
    indeksi++;
  }

  let maaliLeimaukset = joukkue.rastileimaukset.filter(vertaaMaaliin);
  if (maaliLeimaukset.length < 1) {return joukkue;}
  let ekamaali = new Date(Date.parse(maaliLeimaukset[0].aika));


  // TODO: katso että tarviiko erikseen tarkistaa, onko jokin maali ennen vikaalähtöä. luultavasti ei koska 
  // jos ekamaali olisi ennen vikaalähtöä, niin laskutoimitus olisi negatiivinen
  let loytyikoValidiaLeimaa = false;

  let indeksij = 0;
  while (indeksij < maaliLeimaukset.length) {
    if (ekamaali > Date.parse(maaliLeimaukset[indeksij].aika)) {
      if (Date.parse(vikaLahto) < Date.parse(maaliLeimaukset[indeksij].aika)) {
        ekamaali = Date.parse(maaliLeimaukset[indeksij].aika);
        loytyikoValidiaLeimaa = true;
        }
      }
    indeksij++;
  }

  //if (!loytyikoValidiaLeimaa) {return joukkue;}

  let joukkueenAika = Math.abs(ekamaali - vikaLahto);

  // Tällä funktiolla muutetaan millisekunnit helpommin luettavaan esitysmuotoon: hh:mm:ss. Sekunnit, minuutit ja tunnit saadaan kaikki modulo-operaatiolla.
  function millisekuntitTunneiksi(kesto) {
    let sekuntit = Math.floor(kesto / 1000) % 60;
    let minuutit = Math.floor(kesto / (1000*60) % 60);
    let tunnit = Math.floor(kesto / (1000*60*60) % 24);

    tunnit = (tunnit < 10) ? "0" + tunnit : tunnit;
    minuutit = (minuutit < 10) ? "0" + minuutit : minuutit;
    sekuntit = (sekuntit < 10) ? "0" + sekuntit : sekuntit;

    return tunnit + ":" + minuutit + ":" + sekuntit;
  }

  joukkue.aika = millisekuntitTunneiksi(joukkueenAika);
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
  *
  * Omat Kommentit:
  * Ensin otetaan järjestämättömät joukkueet ja järjestetään apufunktioilla niiden jäsenet ja leimaustavat sisäisesti oikeiksi.
  * Tämä tehdään silmukoilla, jotta tietorakenteesta saa aina joukkue kerrallaan sisäiset datat järjestettyä.
  * Sitten otetaan koko joukkueet-data, ja järjestetään se mainsortin antaman kriteerin mukaan. Apufunktio pystyy
  * erottamaan sarjan, matkan ja pisteiden mukaan, ja loput kriteerit menevät oletustapauksen mukaan sillä kaikkien niiden
  * attribuutit löytyvät joukkueen ensimmäiseltä tasolta.
  * 
  * @param {Object} data - tietorakenne, jonka data.joukkueet-taulukko järjestetään 
  * @param {String} mainsort - ensimmäinen (ainoa) järjestysehto, joka voi olla nimi, sarja, matka, aika tai pisteet  TASO 3
  * @param {Array} sortorder - mahdollinen useampi järjestysehto TASO 5
  * @return {Array} palauttaa järjestetyn ja täydennetyn _kopion_ data.joukkueet-taulukosta
  * 
  * @var {Object} kopioJoukkueet - kopio alkuperäisestä joukkueet datasta, järjestystä varten
  * @var {Function} nimicompare - Apufunktio, jolla päätetään, minkä attribuutin mukaan joukkueet järjestetään
  * @var {Function} numeroCompare - Apufunktio, jolla järjestetään joukkueiden leimaustavat
  * @var {Function} toinenCompare - Apufunktio, jolla järjestetään joukkueiden jäsenet
  */
function jarjestaJoukkueet(data, mainsort="nimi", sortorder=[] ) {
  let kopioJoukkueet = Array.from(data.joukkueet);

  // Tällä funktiolla suoritetaan mainsortin kriteerin mukainen järjestys joukkeille. Funktio ottaa huomioon, onko järjestysehto
  // sarja, jolloin pitää mennä yksi taso syvemmälle järjestysmerkkijonoa etsiessä. Jos järjestysehtona on numero, niin
  // niiden erotus lasketaan järjestyksen määrittämiseksi. Muuten järjestetään joukkueet normaalisti.
  function nimicompare(a, b, sortParam=mainsort) {
    if (sortParam=="sarja") {
      let tulos = a[sortParam]["nimi"].localeCompare(b[sortParam]["nimi"], 'fi', {sensitivity: 'base'});
      if ( tulos) {
        return tulos;
      }
      return -1;
    }
    if (sortParam=="matka" || sortParam=="pisteet") {
      return a[sortParam]-b[sortParam];
    }
    let tulosKaksi = a[sortParam].localeCompare(b[sortParam], 'fi', {sensitivity: 'base'});
    if ( tulosKaksi) {
      return tulosKaksi;
    }
  }


  // Tällä funktiolla järjestetään joukkueiden leimaustavat, etsimällä niiden id:eitten perusteella täsmäävät merkkijonot
  // alkuperäisestä datasta.
  function numeroCompare(a, b) {
    let tulos = data.leimaustavat[a].localeCompare(data.leimaustavat[b], 'fi', {sensitivity: 'base'});
    if (tulos) {
      return tulos;
    }
    if (tulos == 0) {
      return 0;
    }
    return -1;
  }

  // Tällä funktiolla järjestetetään joukkueiden jäsenet
  function toinenCompare(a, b) {
  let tulos = a.localeCompare(b, 'fi', {sensitivity: 'base'});
    if ( tulos) {
      return tulos;
    }
    return -1;
  }

  for (let i=0; i< data.joukkueet.length; i++) {
    kopioJoukkueet[i].leimaustapa = Array.from(data.joukkueet[i].leimaustapa).sort(numeroCompare);
  }

  for (let i=0; i< data.joukkueet.length; i++) {
    kopioJoukkueet[i].jasenet = Array.from(data.joukkueet[i].jasenet).sort(toinenCompare);
  }

  kopioJoukkueet.sort(nimicompare);
  
  console.log("jarjestaJoukkueet", kopioJoukkueet);
  return kopioJoukkueet;
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

