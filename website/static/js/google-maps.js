let map;
let historical;
let activities;
let landscapes;
let shops;

var markersArray = [];

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { PinElement } = await google.maps.importLibrary("marker");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    historical = true;
    activities = true;
    landscapes = true;
    shops = true;

    map = new Map(document.getElementById("map"), {
        mapId: '3ce978e4be4750bd',
        center: { lat: 44.244629, lng: 4.197286 },
        zoom: 9,
    });

    const pinSettings = new PinElement({
        borderColor: "#000000",
        glyphColor: "#000000",
        background: "#fed136",
        scale: 1.15,
    })

    const MasDeBarras = new AdvancedMarkerElement({
        position: { lat: 44.245287, lng: 4.196951 },
        map,
        title: "Mas de Barras",
        content: pinSettings.element,
    });

    const infowindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);

    const input = document.getElementById("pac-input");
    const autocomplete = new google.maps.places.Autocomplete(input, {
        fields: ["place_id", "geometry", "formatted_address", "name"],
    });

    autocomplete.bindTo("bounds", map);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    const infowindowContent = document.getElementById("infowindow-content");

    infowindow.setContent(infowindowContent);

    const marker = new google.maps.Marker({ map: map });

    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });
    autocomplete.addListener("place_changed", () => {
        infowindow.close();

        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
            return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        // Set the position of the marker using the place ID and location.
        // @ts-ignore This should be in @typings/googlemaps.
        marker.setPlace({
            placeId: place.place_id,
            location: place.geometry.location,
        });
        marker.setVisible(true);
            infowindowContent.children.namedItem("place-name").textContent = place.name;
            infowindowContent.children.namedItem("place-id").textContent = place.place_id;
            infowindowContent.children.namedItem("place-address").textContent = place.formatted_address;
            infowindow.open(map, marker);
        });
}

function addHistorical() {
    clearOverlays();

    map.setCenter({lat: 44.133675, lng: 4.520904});
    map.setZoom(9.5);

    const ChateauDeMontalet = {
        placeId: "ChIJRfV96E5ZtBIRrd2P-sMjUuY",
        fields: ["name", "formatted_address", "geometry"],
    };
    const Montclus = {
        placeId: "ChIJoUAp-hOrtRIRN5TuqkO5zvU",
        fields: ["name", "formatted_address", "geometry"],
    };
    const Barjac = {
        placeId: "ChIJsy8fkIhVtBIR0EZrFiGIBwQ",
        fields: ["name", "formatted_address", "geometry"],
    };
    const Lussan = {
        placeId: "ChIJYfDnBW9NtBIRUEN1K3-SSW0",
        fields: ["name", "formatted_address", "geometry"],
    };
    const LabastideDeVirac = {
        placeId: "ChIJfWz59LMBtRIR8I7ry688CQQ",
        fields: ["name", "formatted_address", "geometry"],
    };
    const SainteMartinDArdeche = {
        placeId: "ChIJjyOmEfintRIRgIXry688CQQ",
        fields: ["name", "formatted_address", "geometry"],
    };
    const Orange = {
        placeId: "ChIJ4bzudbOQtRIR-oFFhNWKHa0",
        fields: ["name", "formatted_address", "geometry"],
    };
    const PontDuGard = {
        placeId: "ChIJ1QTnSMLItRIR4uqG8xlzsSY",
        fields: ["name", "formatted_address", "geometry"],
    };
    const Nimes = {
        placeId: "ChIJOVPo1gsttBIRAwwgn08TiN4",
        fields: ["name", "formatted_address", "geometry"],
    };
    const Avignon = {
        placeId: "ChIJB528OYfrtRIRNnsd-m6bQuY",
        fields: ["name", "formatted_address", "geometry"],
    };
    const Uzes = {
        placeId: "ChIJZ7QNZ0C1tRIR8DNrFiGIBwQ",
        fields: ["name", "formatted_address", "geometry"],
    };

    cha = addMarker(ChateauDeMontalet, "12th century castle, partly ruined with staterooms now restored.", "https://clnunez13.wordpress.com");
    addMarker(Montclus, "Montclus is a tiny beautiful village and great place for walkers.", "https://www.francethisway.com/places/montclus.php");
    addMarker(Barjac, "Lovely old village.", "https://www.francethisway.com/places/barjac.php");
    addMarker(Lussan, "Village of character with 2 ruined castles.", "https://www.francethisway.com/places/lussan.php");
    addMarker(LabastideDeVirac, "Chateau des Roure, medieval castle with living museum.", "www.chateaudesroure.com");
    addMarker(SainteMartinDArdeche, "Like the Pont D’Arc in miniature.", "https://www.francethisway.com/places/a/saint-martin-d-ardeche-ardeche.php");
    addMarker(Orange, "Spectacular Roman amphitheater – UNESCO World Heritage Site", "https://www.francethisway.com/places/orange.php");
    addMarker(PontDuGard, "UNESCO World Heritage Site and perhaps one of the most famous roman aqueducts in the world.", "https://pontdugard.fr/en");
    addMarker(Nimes, "Important outpost of the Roman empire, many well preserved Roman monuments including an Amphitheatre.", "https://www.francethisway.com/places/nimes.php");
    addMarker(Avignon, "UNESCO World Heritage Site – Palais des Papes and the famous bridge and walled city.", "https://www.avignon-et-provence.com/en/tourism-provence/avignon");
    addMarker(Uzes, "Commune in the Gard department in the Occitanie region", "https://www.france-voyage.com/tourism/uzes-1420.html");

}

function addActivities() {
    clearOverlays();

    map.setCenter({ lat: 44.244629, lng: 4.197286 });
    map.setZoom(9.7);

    const LesChevauxDuCantaure = {
        placeId: "ChIJzSTxgthbtBIRf84cyF11AHE",
        fields: ["name", "formatted_address", "geometry"],
    };
    const CapCanoe = {
        placeId: "ChIJC-g2UJJZtBIRCnaJka67SUs",
        fields: ["name", "formatted_address", "geometry"],
    };
    const AcrobrancheIndyParc = {
        placeId: "ChIJZfw0KUX-tBIRw5oV25QAfMI",
        fields: ["name", "formatted_address", "geometry"],
    };
    const VallonPontDArc = {
        placeId: "ChIJVZNCsPX9tBIRgrGltYohwLA",
        fields: ["name", "formatted_address", "geometry"],
    };
    const DinopediaParc = {
        placeId: "ChIJKUIHCtpmtBIRZ56YHMVcrcI",
        fields: ["name", "formatted_address", "geometry"],
    };
    const Villefort = {
        placeId: "ChIJRwPtIAmPtBIRlShSGGkqQQo",
        fields: ["name", "formatted_address", "geometry"],
    };
    const Prehistorama = {
        placeId: "ChIJ75pARqxdtBIRNHJ_5hcCwrI",
        fields: ["name", "formatted_address", "geometry"],
    };
    const MuseumHarribo = {
        placeId: "ChIJCTkOP5PKtRIRiohvwIvjiHQ",
        fields: ["name", "formatted_address", "geometry"],
    };

    addMarker(LesChevauxDuCantaure, "Horse riding.", "https://www.leschevauxducantaure.com");
    addMarker(CapCanoe, "Canoe Hire", "https://capcanoe.fr");
    addMarker(AcrobrancheIndyParc, "Treetop rope adventure park.", "https://www.indy-parc.com");
    addMarker(VallonPontDArc, "Starting point for many companies offering canoeing adventures", "https://www.france-voyage.com/cities-towns/vallon-pont-d-arc-29653.htm");
    addMarker(DinopediaParc, "Dinosaur Park", "www.dinopedia-parc.fr");
    addMarker(Villefort, "Lake with Climbing, Caving and Watersports", "www.grandeurnature.48.com https://www.france-voyage.com/cities-towns/villefort-16898.htm");
    addMarker(Prehistorama, "Prehistoric era museum.", "http://www.prehistorama.com");
    addMarker(MuseumHarribo, "Museum about the Harribo sweets.", "l.musee@haribo.com");
}

function addLandscapes() {
    clearOverlays();

    map.setCenter({ lat: 44.294175, lng: 4.287948 });
    map.setZoom(11);

    const AroundSainteAmbroix = {
        placeId: "ChIJl6dPpgpZtBIR1pExh5l7qW8",
        fields: ["name", "formatted_address", "geometry"],
    };
    const LesPetitesAiguieres = {
        placeId: "ChIJT7QzJiNQtBIRSaJlJOamln0",
        fields: ["name", "formatted_address", "geometry"],
    };
    const PontDArc = {
        placeId: "ChIJtSym8PIBtRIRTb7zGVPYPkw",
        fields: ["name", "formatted_address", "geometry"],
    };
    const GrotteDeLaCocaliere  = {
        placeId: "ChIJc6PlFrxYtBIR6Zj4Vz0iWKI",
        fields: ["name", "formatted_address", "geometry"],
    };
    const GrotteDeLaSalamandre = {
        placeId: "ChIJ-_v6CJlTtBIR-qTRHMESBhM",
        fields: ["name", "formatted_address", "geometry"],
    };

    addMarker(AroundSainteAmbroix, "Sainte Ambroix River Beach", "https://www.saint-ambroix.fr/decouvrir-bouger/situation-geographique/la-ceze");
    addMarker(LesPetitesAiguieres, "Water-carved rock formations, with beautiful blue pools and waterfalls.", "https://www.theadventuredogs.com/gard/les-petites-aiguieres-avec-son-chien/");
    addMarker(PontDArc, "A huge, natural rock arch on the Ardèche river.", "https://www.francethisway.com/places/pontdarc.php");
    addMarker(GrotteDeLaCocaliere, "One of France's greatest caves", "https://www.grotte-cocaliere.com/en/");
    addMarker(GrotteDeLaSalamandre, "A cave for the whole family decorated with the Crystal Giants.", "https://www.grottedelasalamandre.com/fr/");
}

function addShops() {
    clearOverlays();

    map.setCenter({ lat: 44.196733, lng: 4.147661 });
    map.setZoom(11.5);

    const Lidl = {
        placeId: "ChIJQRhYmZ1ZtBIRXPaiy2UpLt8",
        fields: ["name", "formatted_address", "geometry"],
    };
    const Intermarche = {
        placeId: "ChIJheTAfo9ZtBIRfFn1b57zs80",
        fields: ["name", "formatted_address", "geometry"],
    };
    const Market = {
        placeId: "ChIJiS1PRY5ZtBIRaGobkD0FsIg",
        fields: ["name", "formatted_address", "geometry"],
    };
    const Decathlon = {
        placeId: "ChIJw1-FHDdCtBIRZoc5BL_iwzQ",
        fields: ["name", "formatted_address", "geometry"],
    };


    addMarker(Lidl, "Supermarket.", "https://www.lidl.fr/");
    addMarker(Intermarche, "Supermarket with gas station and laundromat.", "https://www.intermarche.com/magasin?pdvref=10644&utm_source=gmb");
    addMarker(Market, "Discount supermarket.", "https://www.carrefour.fr/magasin/market-saint-ambroix");
    addMarker(Decathlon, "Sports shop.", "https://www.decathlon.fr/store-view/magasin-de-sports-al%C3%A8s-0070049800498");
}



function addMarker(request, description, link) {

    const infowindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);

    service.getDetails(request, (place, status) => {
    if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        place &&
        place.geometry &&
        place.geometry.location
        ) {
            const marker = new google.maps.Marker({
              map,
              position: place.geometry.location,
            });

            markersArray.push(marker);
            google.maps.event.addListener(marker, "click", () => {
                const content = document.createElement("div");
                const nameElement = document.createElement("h2");

                nameElement.textContent = place.name;
                content.appendChild(nameElement);

                const descriptionElement = document.createElement("p");

                descriptionElement.textContent = description;
                content.appendChild(descriptionElement);

                const linkElement = document.createElement("a");

                linkElement.textContent = link;
                linkElement.href = link;
                content.appendChild(linkElement);

                const placeAddressElement = document.createElement("p");

                placeAddressElement.textContent = place.formatted_address;
                content.appendChild(placeAddressElement);
                infowindow.setContent(content);
                infowindow.open(map, marker);
            });
        }
    });
}

function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
  }
  markersArray.length = 0;
}
