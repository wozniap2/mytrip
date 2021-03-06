(function () {
    'use strict';

    angular.module('mytrip.trip')
        .factory('ReportRemoteService', ['$q', '$http','ModalService', function ($q, $http, $scope,modalService) {
            var HOST = 'http://40.69.212.228';
            return {
                uploadGpx: function(file,id) {
                    //dopisać
                },

                getTrips: function () {
                    var url = HOST + '/trips';
                    return $http.get(url);
                },
                getTrip: function (tripId) {
                    var url = HOST + '/trips/' + tripId;
                    return $http.get(url);
                },
                removeTrip: function (tripId) {
                    var url = HOST + '/trips/' + tripId;

                    return $http.delete(url)
                        .success(function () {
                        console.log("Id: " + tripId + ' trip has been removed.');
                        alert("Id: " + tripId + ' trip has been removed.');
                    })
                        .error(function (data, status, header, config) {
                            console.log("Data: " + data +
                                "\n\n\n\nstatus: " + status +
                                "\n\n\n\nheaders: " + header +
                                "\n\n\n\nconfig: " + config);
                            alert("Unable to remove trip - Id: " + tripId);
                        });
                },
                editTrip: function(editedTrip) {
                    var url = HOST + '/trips/'+ editedTrip.id +'/';
                    var postData = {
                        name: editedTrip.name,
                        description: editedTrip.description,
                        points: editedTrip.points,
                        media: [],
                        startDate: editedTrip.startDate,
                        endDate: editedTrip.endDate
                    };
                    return $http.put(url,postData);
                },
                editPoints: function(trip) {
                    var url = HOST + '/trips/'+trip.id +'/';
                    var postData = {
                        name: trip.name,
                        description: trip.description,
                        points: trip.points,
                        media: [],
                        startDate: trip.startDate,
                        endDate: trip.endDate,
                    };
                    return $http.put(url,postData);
                },
                postTrip: function(trip) {
                    var url = HOST + '/trips/';
                    trip = angular.extend(trip, {points: [], media: []});
                    return $http.post(url, trip)
                        .success(function (data,status,headers) {
                            //modalService.confirmation('','Wycieczka dodana pomyślnie!','sm');
                            console.log('Sukces!');
                        })
                        .error(function (data, status, header, config) {
                            console.log("Data: " + data +
                                "\n\n\n\nstatus: " + status +
                                "\n\n\n\nheaders: " + header +
                                "\n\n\n\nconfig: " + config);
                        });
                },
                uploadFile: function(uploadData) {
                    var url = HOST + '/media/';
                    return $http.put(url, uploadData)
                        .success(function (data, status, headers) {
                            modalService.confirmation('','Zdjęcie dodane pomyślnie!','sm');
                            console.log('Sukces!');
                            alert("Sukces!");
                        })
                        .error(function (data, status, header, config) {
                            console.log("Data: " + data +
                                "\n\n\n\nstatus: " + status +
                                "\n\n\n\nheaders: " + header +
                                "\n\n\n\nconfig: " + config);
                        });
                }
            };
        }]);
})();

