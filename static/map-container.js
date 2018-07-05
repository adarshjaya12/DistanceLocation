function renderMap()
{
    if(window.google != undefined)
    {
        var map = new google.maps.Map(document.getElementById("map"), {
            zoom: 3,
            center: { lat: 0, lng: -180 },
            mapTypeId: 'terrain'
        });

        var circle = {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: 'red',
            fillOpacity: .4,
            scale: 2,
            strokeColor: 'white',
            strokeWeight: 0.1
        };

        var coordinateList = window.coordinateList;
        var marker, i;

        for (i = 0; i < coordinateList.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(coordinateList[i].lat, coordinateList[i].long),
                map: map,
                icon: circle
            });

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(coordinateList[i].lat);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    }
}