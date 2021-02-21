import {
    roads,
} from "./roads.js";

ymaps.ready(init);

function init() {
    const myMap = new ymaps.Map("map", {
        center: [54, 37.5],
        zoom: 8,
    });

    for (let i = 0; i < roads.length; i += 1) {
        // coordinates district road date_final_repair long name
        // Название,Протяжённость,Фактическая дата окончания ремонта дороги,Дорога,Район,Координаты
        let mapPoint = new ymaps.Placemark(JSON.parse(roads[i].coordinates)[0][0], {
            balloonContent: `<h5>${roads[i].name}</h5>Протяжённость: ${roads[i].long}<br>Фактическая дата окончания ремонта дороги: ${roads[i].date_final_repair}<br>Дорога: ${roads[i].road}<br>Район: ${roads[i].district}`,
            hintContent: roads[i].name,
        }, {
            preset: 'twirl#workshopIcon',
        });

        let mapLine = new ymaps.GeoObject({
            geometry: {
                type: "LineString",
                coordinates: JSON.parse(roads[i].coordinates)[0],
            },
            properties: {
                hintContent: roads[i].name,
            }
        }, {
            draggable: false,
            strokeColor: "#2ecc71",
            strokeWidth: 4,
        });

        mapPoint.events
            .add('mouseenter', function(e) {
                myMap.geoObjects
                    .add(mapLine)
            })
            .add('mouseleave', function(e) {
              console.log(myMap.geoObjects);
                myMap.geoObjects
                    .remove(mapLine)
            });

        myMap.geoObjects
            .add(mapPoint);
    }

    myMap.controls
        .add('zoomControl', {
            left: 5,
            top: 5
        })
        .add('mapTools', {
            left: 35,
            top: 5
        });
}
