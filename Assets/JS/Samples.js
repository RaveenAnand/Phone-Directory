angular
.module("myApp",['ngRoute'])//we need to specify that our module depends on ngRoute module to be able to use it.
.controller('myController', function($scope) 
{
	$scope.booksObj=
	[
			{
				Title:'2 States',
				Author:'chetan Bhagat',
				Edition:'2017',
				Price:'125'
			},
			{
				Title:'Kite Runner',
				Author:'Khaled Hosseni',
				Edition:'2015',
				Price:'400'
			},
			{
				'Title':'Gone Girl',
				'Author':'Marley tim',
				'Edition':'2000',
				'Price':'600'
			},
			{
				'Title':'The Secret',
				'Author':'Rhonda Bryne',
				'Edition':'1',
				'Price':'800'
			},
			{
				'Title':'Zumba',
				'Author':'Adil',
				'Edition':'2017',
				'Price':'125'
			}
	];//end of array of books objects

	$scope.sortTableBy=function(th){
		$scope.tableHeader=th;
		console.log(th);
	}
	$scope.addBooks=function()
	{
		if($scope.bookForm.$valid)
		{
			$scope.booksObj.push(
				{
					'Title':$scope.title,
					'Author':$scope.author,
					'Edition':$scope.edition,
					'Price':$scope.price
				}
			);//push ends
		}//if ends
	}//function
});
