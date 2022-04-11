var cities = [
              {
                  place : 'Amritsar',
                  desc : 'Golden Temple, Jallianwala Bagh, Wagah Border',
                  lat : 31.633980,
                  long : 74.872261
              },
              {
                  place : 'Chandigarh',
                  desc : 'Rock Garden, Sukhna Lake, Zakir Hussain Rose Garden, International Dolls Museum, Pinjore Garden',
                  lat : 30.741482,
                  long : 76.768066
              },
              {
                  place : ' Ludhiana',
                  desc : 'Maharaja Ranjit Singh War Museum, Museum of Rural Life, Phillaur Fort, Museum of Rural Life',
                  lat : 30.900965,
                  long : 75.857277
              },
              {
                place : ' Pathankot',
                desc : 'Nurpur Fort, Mukteshwar Temple, Kathgarh Temple, Shahpurkandi Fort, Ranjit Sagar Dam',
                lat : 32.265942,
                long : 75.646873
            }                    
          ];

          //Angular App Module and Controller
          var mapApp = angular.module('mapApp', []);
          mapApp.controller('MapController', function ($scope) {
              
              var mapOptions = {
                  zoom: 4,
                  center: new google.maps.LatLng(25,80),
                  mapTypeId: google.maps.MapTypeId.ROADMAP
              }

              $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

              $scope.markers = [];
              
              var infoWindow = new google.maps.InfoWindow();
              
              var createMarker = function (info){
                  
                  var marker = new google.maps.Marker({
                      map: $scope.map,
                      position: new google.maps.LatLng(info.lat, info.long),
                      title: info.place
                  });
                  marker.content = '<div class="infoWindowContent">' + info.desc + '<br />' + info.lat + ' E,' + info.long +  ' N, </div>';
                  
                  google.maps.event.addListener(marker, 'click', function(){
                      infoWindow.setContent('<h2>' + marker.title + '</h2>' + 
                        marker.content);
                      infoWindow.open($scope.map, marker);
                  });
                  
                  $scope.markers.push(marker);
                  
              }  
              
              for (i = 0; i < cities.length; i++){
                  createMarker(cities[i]);
              }

              $scope.openInfoWindow = function(e, selectedMarker){
                  e.preventDefault();
                  google.maps.event.trigger(selectedMarker, 'click');
              }

          });