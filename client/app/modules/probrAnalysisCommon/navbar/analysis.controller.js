'use strict';

angular.module('probrAnalysisCommon')
    .controller('AnalysisNavbarCtrl', function ($scope, $location, Packet) {

        $scope.menu = [
            {
                'title': 'Utilization',
                'link': 'packets'
            },
            {
                'title': 'Location',
                'link': 'live'
            },
            {
                'title': 'Stats',
                'link': 'utilization'
            },
            {
                'title': 'Log',
                'link': 'heatmap'
            }
        ];

        $scope.selectedTag = null;

        Packet.query({distinct: 'tags'}, function (resultObj) {
            $scope.tags = resultObj;
        });

        $scope.selectTag = function (tag) {
            $scope.selectedTag = tag;
        }

        // DatePicker
        $scope.datePickerDate = {startDate: new Date().getTime(), endDate: new Date().getTime() - (1000 * 60 * 60 * 24)};
        $scope.$watchGroup(['datePickerDate','selectedTag'], function () {
            $location.search({
                tags: $scope.selectedTag,
                startTimestamp: $scope.datePickerDate.startDate.valueOf(),
                endTimestamp: $scope.datePickerDate.endDate.valueOf()
            });
        });


        $scope.isActive = function (route) {
            return route === $location.path();
        };

        $scope.isActiveRoot = function (route) {
            var subStr = $location.path().split("/")[1];
            return route.slice(0, subStr.length) == subStr;
        };

    });