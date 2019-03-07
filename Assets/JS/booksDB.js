
var subscriberObj=
[
			{
				'name':'chetan Bhagat',
				'phonenumber':'125'
			},
			{
				'name':'Khaled Hosseni',
				'phonenumber':'400'
			},
			{
				'name':'Marley tim',
				'phonenumber':'600'
			},
			{
				'name':'Rhonda Bryne',
				'phonenumber':'800'
			},
			{
				'name':'Adil',
				'phonenumber':'125'
			},
			{
				'name':'Khaled Hosseni',
				'phonenumber':'400'
			},
			{
				'name':'Marley tim',
				'phonenumber':'600'
			},
			{
				'name':'Raj Udha',
				'phonenumber':'800'
			},
			
];
var recordLimitPerPage=5;
window.onload=createSubscriberTable();

function calculateTotalPages(totalRecords) 
{
	var totalPages=1;
	if(totalRecords>recordLimitPerPage)//if object has more than 5 records apply pagination
	{
		totalPages=totalRecords/recordLimitPerPage;//calculate no of pages
		if((totalPages.toString()).indexOf(".")==-1)//if there is no  decimal return as it is
		{
			return totalPages;
		}
		else{
			totalPages=Math.ceil(totalPages);
			return totalPages;
		}
	}
}
function showRelatedRecords(className) 
{
	console.log("showRelatedRecords");
	var pgNum=className.split('pg');//classnmae=pg1/pg2etc
	var rowsToShow=$('#tblBody tr.'+className).removeClass('hideit');
	var rowsToHide=$('#tblBody tr:not(.'+className+')').addClass('hideit');

	var removeActive=$('#paginationUL li.page-item.active').removeClass('active');//remove active class from other pg numb
	var addActive=$('#paginationUL li.page-item.page'+pgNum[1]).addClass('active');//add active class for current other pg numb
	console.log("show:/n"+rowsToShow+"/n Hide:/n"+rowsToHide);
}
function createPaginationUL(classNameTr,page) 
{
	console.log("createPaginationUL Func:/n");
	var liStructure=" ";
	if(page==1)//when page=1 add active class(by defaut)
			{
				console.log('in'+page);
				liStructure+="<li class='page-item active page"+page+"'>"
		  			  		+"<a onclick=showRelatedRecords('"+classNameTr+"') class='page-link'>"+page+"</a></li>";
			}
			else
			{
				console.log('in'+page);
				liStructure+="<li class='page-item page"+page+"'>"
		  			  		+"<a onclick=showRelatedRecords('"+classNameTr+"') class='page-link'>"+page+"</a></li>";
			}
	return liStructure;
}
/****Create table structure of subscribers from object******/
function createSubscriberTable(currentPage)
{
	//console.log("createSubscriberTable");
	var subscriberTableStructure="",n=p="";
	var totalRecords=subscriberObj.length;
	var totalPages=1;
	var lastFetchedRecordID=0, liStructure="";
	var classNameTr="";
	 
	 totalPages= calculateTotalPages(totalRecords);
	console.log("total records:"+totalRecords+"\nper page:"+recordLimitPerPage+"\ntotalPages:"+totalPages);
	
	for(var page=1; page<=totalPages;page++)//loop thru no of pages 
	{

		classNameTr="pg"+page.toString();
		if(totalPages>1)//show pagination nav when pages >1, else dont show(by default hidden)
		{
			liStructure+=createPaginationUL(classNameTr,page);

			var ul = document.getElementById("paginationUL");
			ul.innerHTML=liStructure;
			document.getElementById('paginationNAV').classList.remove('hideit');
		}/*if(totalPages>1) ENDS*/
		
		/*+++++++++++fetch 5 records per page+++++++++++*/
		for(var i=lastFetchedRecordID; i<lastFetchedRecordID+recordLimitPerPage; i++)//per page 5 records are fetched
		{
			if(subscriberObj[i]!= undefined)//when object records are over break the loop
			{
				n=subscriberObj[i]['name'];
				p=subscriberObj[i]['phonenumber'];
				if(page==1)
				{
					subscriberTableStructure+="<tr class='"+classNameTr+"'>"
									+"<td>"+(i+1)+"</td>"
							  		+"<td>"+n+"</td>"
								  	+"<td>"+p+"</td>"
								  	+"<td>"
								  	/*+"<button id=editbtn_"+i+" class='btn editBtn '"
								  	+"data-toggle='modal'"
								 	+"data-target='#editModal'><i class='fa fa-edit'></i></button>"*/
								  	+"<button id=deletebtn_"+i+" class='btn deleteBtn' data-toggle='modal' data-target='#deleteModal'><i class='fa fa-trash'></i></button></td>";
								  	+"</tr>";
				}
				else
				{
					subscriberTableStructure+="<tr class='hideit "+classNameTr+"'>"
									+"<td>"+(i+1)+"</td>"
							  		+"<td>"+n+"</td>"
								  	+"<td>"+p+"</td>"
								  	+"<td>"
								  	/*+"<button id=editbtn_"+i+" class='btn editBtn '"
								  	+"data-toggle='modal'"
								 	+"data-target='#editModal'><i class='fa fa-edit'></i></button>"*/
								  	+"<button id=deletebtn_"+i+" class='btn deleteBtn' data-toggle='modal' data-target='#deleteModal'><i class='fa fa-trash'></i></button></td>";
								  	+"</tr>";
				}
			}/*if undefined ends here*/
			else
			{
				break;
			}
		}//inner for ends here
		lastFetchedRecordID= i;	
		document.getElementById('tblBody').innerHTML=subscriberTableStructure;	
		
	}//for loop pages ends here
	/*****logic to stay on sam epage even after saving dialog box details***/
	if(currentPage!=undefined)
	{
		console.log("current page not undefined")
	$('li.page-item[class*=page'+currentPage+']').addClass('active');
	console.log("added active class to currentpage\n")
	showRelatedRecords('pg'+currentPage);
	}
		//return false;
}/*function create subcriber ends here*/

/***add subscriber to table on submit button click****/
function addSubscriber()
{
	var newRowStructure="";
	var onlyNumbers=false;
	var regEx=/^[0-9]*$/;//only numbers allowed

	var elemSubscriberName=document.getElementById('inputSubscriberName');
	var elemSubscriberNumber=document.getElementById('inputSubscriberNumber');
	var SubscriberName=elemSubscriberName.value;
	var SubscriberNumber=elemSubscriberNumber.value;

	var n=validateFormInputs(elemSubscriberName,SubscriberName);
	var p=validateFormInputs(elemSubscriberNumber,SubscriberNumber);
    onlyNumbers=validateRegEx(elemSubscriberNumber,SubscriberNumber,regEx);
	
 	if(n&&p&&onlyNumbers==true)
 	{
 		//try
 		//{
 			var newPageLength;
		 	var tableRef=document.getElementById('tblBody');
			var rowCount=tableRef.rows.length;//calculate no of rows
			var oldPageLength=$("#paginationUL li").length;//fetch no of pages existing
			
			var newRow="";
			var newSubscriber={
					'name':SubscriberName,
					'phonenumber':SubscriberNumber
					}
			subscriberObj.push(newSubscriber);
			
			var newRowCount=rowCount+1;//index to add new row
			newPageLength=totalPages=calculateTotalPages(newRowCount);
	
			if(newPageLength!=oldPageLength)
			{//if the new item exeeds max limit of 5 records for last page ADD  new page
				var classNameTr='pg'+newPageLength.toString();
				var liStructure="";
				liStructure=createPaginationUL(classNameTr,newPageLength);
				$("#paginationUL").append(""+liStructure);//appen new page number to pagination NAV
			}
	//}
	/*catch(err)
	{
		alert(err.message);
	}*/
	
	//newRowStructure+=
	showRelatedRecords('pg'+totalPages)	;			  	
	$('#subscribersTable').append("<tr class='pg"+totalPages+"'>"
						+"<td>"+newRowCount+"</td>"
				  		+"<td>"+SubscriberName+"</td>"
					  	+"<td>"+SubscriberNumber+"</td>"
					  	+"<td>"
					  	/*+"<button id=editbtn_"+(newRowCount-1)+" class='btn editBtn'"
					  	+"data-toggle='modal'"
					 	+"data-target='#editModal'><i class='fa fa-edit'></i></button>"*/
					  	+"<button id=deletebtn_"+(newRowCount-1)+" class='btn deleteBtn' data-toggle='modal' data-target='#deleteModal'><i class='fa fa-trash'></i>"
					  	+"</button></td>"
					  	+"</tr>");
	//tableRef.insertRow(totalRecords);//fetches the last index to append row
	//newRow.innerHTML=newRowStructure;//appends new book record to table
 	}
	return false;
}

/**required field validation**/
function validateFormInputs(element,value)
{
	var flag=false;
	if(value==""|| value==undefined || value==null || value.length===0)
	{
		element.classList.add('is-invalid');
		element.nextElementSibling.innerHTML="Cannot be left blank";
		element.nextElementSibling.setAttribute('style', 'display:block !important');
		//element.nextElementSibling.style.display="block";//in The DOM structure error msg div is next sibling of input field
		flag=false;
	}
	else
	{
		element.classList.remove('is-invalid');
		element.nextElementSibling.style.display="none";
		flag=true;
	}
	return flag;
}

function validateRegEx(element, value, regex)
{
	var result=false;
		var test=regex.test(value);//check for all numbers only
		if(test)
		{
			element.classList.remove('is-invalid');
			element.nextElementSibling.style.display="none";
			result=true;
		}
		else
		{
			element.classList.add('is-invalid');
			element.nextElementSibling.innerHTML="Please Enter Numbers only";
			element.nextElementSibling.style.display="block";
			result=false;
		}
		return result;
}

/*$('#editModal').on('show.bs.modal', function (e) 
{
	var button,objID;
	var SubscriberNumber,SubscriberName;
	var regEx=/^[0-9]*$/;

   	button=e.relatedTarget ;
   	objID=(button.id).split('_')[1];//id of object to be shown
    
  		var editForm=document.getElementById("subscriberEditFrm");
		elemSubscriberName=editForm.elements["name"];
		elemSubscriberNumber=editForm.elements["phonenumber"];


		elemSubscriberName.value=subscriberObj[objID]['name'];
		elemSubscriberNumber.value=subscriberObj[objID]['phonenumber'];
	
	
	document.getElementById('saveModal').onclick=function()
	{
		var newSubscriberName,newSubscriberNumber;
		var t=a=p=e=false;

		elemSubscriberName=editForm.elements["name"];
		elemSubscriberNumber=editForm.elements["phonenumber"];
		
		newSubscriberName=elemSubscriberName.value;
		newSubscriberNumber=elemSubscriberNumber.value;
		
		n=validateFormInputs(elemSubscriberName,newSubscriberName);
		p=validateFormInputs(elemSubscriberNumber,newSubscriberNumber);
		var onlyNumbers=validateRegEx(elemSubscriberNumber,newSubscriberNumber,regEx);

		if(n&&p&&onlyNumbers==true)
		{
			subscriberObj[objID]['name']=newSubscriberName;
  			subscriberObj[objID]['phonenumber']=newSubscriberNumber;
  			var currentpage=$('li.page-item.active> a').text();
  			createSubscriberTable(currentpage);
  			$('#editModal').modal('hide');
		}
	}//onclick ends here
});*/

$('#deleteModal').on('show.bs.modal', function (e) {
	button=e.relatedTarget ;
   	objID=(button.id).split('_')[1];//id of object to be shown

   	document.getElementById('deleteButton').onclick=function()
   	{
   		subscriberObj.splice(objID,1);
   		console.log(subscriberObj.length);
   		var currentpage=$('li.page-item.active> a').text();
   		console.log($('#tblBody tr.pg'+currentpage).length);
   		if($('#tblBody tr.pg'+currentpage).length-1!=0)// if length is 1, it means only one item is left on this page
   			{		
   			 console.log('in if');//so channge the currentpage to previous one
   			 createSubscriberTable(currentpage);
   			}
   		else{
   			console.log('else');
   			createSubscriberTable(currentpage-1);
   		}
   		console.log($('#tblBody tr.pg'+currentpage).length);
   		$('#deleteModal').modal('hide');
   	}
   
});

/****using Array sort and split******/
function sortRows(col) 
{
	var colNumber=$(col).index();//get index of the column 
	$('#subscribersTable th span.sortIcon').hide();
	console.log(colNumber+",  "+$(col).attr('id'));
	colNumber++;
	var newRowStructure=[];
	var arrToSort=[];
	var temp; var rows="";
	var currentpage=$('li.page-item.active> a').text();//get current active page number

	/********Fetch records of the column to be sorted on the curent page**********/
	$("#subscribersTable tr.pg"+currentpage+" td:nth-child("+colNumber+")").each(function () 
	{
			///***push row structure along with the col details***///
			arrToSort.push([$(this).text().toUpperCase()+",,"+($(this).closest('tr')).html()]);//get the td values in an array
			$(this).parent('tr').replaceWith('<tr><td></td></tr>');
    });

	if($(col).hasClass('asc')){
		arrToSort.reverse();
		$(col).removeClass('asc');
		$(col).addClass('desc');
	}
	else{
		arrToSort.sort();
		$(col).removeClass('desc');
	$(col).addClass('asc');
	}
	
	/****split row structure in the sorted array*****/
	for (var i =0;i< arrToSort.length; i++) 
	{  
		temp=arrToSort[i].toString();
		newRowStructure.push("<tr class=pg"+currentpage+">"+temp.split(',,')[1]+"</tr>");
	}
	
	$('#tblBody').find('td:empty').each(function(index) {
		$(this).parent('tr').replaceWith(newRowStructure[index]);
	});
	$(col).find('span.sortIcon').show();//show arrow icon on the sort by header
	
}
/****using jquery sort method******/
function sortTable(col){
	$('#subscribersTable th span.sortIcon').hide();
	var f=1;
	if($(col).hasClass('asc'))
	{
		f=-1;
	}
	else{
		f=1;
	}
	var n=$(col).index();
	var currentpage=$('li.page-item.active> a').text();//get current active page number
	var rows = $("#subscribersTable tr.pg"+currentpage).get();

	rows.sort(function(a, b) {

		var A = getVal(a);
		var B = getVal(b);

		if(A < B) {
			$(col).removeClass('desc');
			$(col).addClass('asc');
			$(col).find('span.sortIcon').show();//show arrow icon on the sort by header
			return -1*f;
		}
		if(A > B) {
			$(col).removeClass('asc');
			$(col).addClass('desc');
			$(col).find('span.sortIcon').show();//show arrow icon on the sort by header
			return 1*f;
		}
		return 0;
	});

	function getVal(elm){
		var v = $(elm).children('td').eq(n).text().toUpperCase();
		if($.isNumeric(v)){
			v = parseInt(v,10);
		}
		return v;
	}

	$.each(rows, function(index, row) {
		$('#subscribersTable').children('tbody').append(row);
	});
}