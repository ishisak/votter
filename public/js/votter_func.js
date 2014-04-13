'use strict';

function alertLink(url,message){
	if(confirm(message)){
		location.href = url;
	}
}

// custom validator
var app = angular.module('myApp', []);

app.directive('match', function() {
    return {
        require: '?ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                ctrl.$setValidity('match', viewValue === attrs.match);
            });
        }
    };
});