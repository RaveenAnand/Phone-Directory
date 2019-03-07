angular
.module('myApp', [])
.controller('MyCtrl', function ($scope) 
	{
		$scope.users=[
		{'Name':'Raveen Anand',
		 'Gender':'Female',
		 'DOB':'17/09/90'
		}
		];

	})