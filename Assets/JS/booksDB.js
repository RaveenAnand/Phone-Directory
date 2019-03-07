
var subscriberObj=
[
			{
				'name':'chetan Bhagat',
				'phonenumber':'2525457852'
			},
			{
				'name':'Marley tim',
				'phonenumber':'2546892145'
			},
            {
				'name':'raveen',
				'phonenumber':'9833698965'
			}
			
];
var recordLimitPerPage=5;
window.onload=createSubscriberTable();

/****Create table structure of subscribers from object******/
function createSubscriberTable()
{
	var subscriberTableStructure="",n=p="";
	var totalRecords=subscriberObj.length;
	var lastFetchedRecordID=0, liStructure="";
	var classNameTr="";
    if(totalRecords==0){
        subscriberTableStructure="<div id='msg'>No Records. Please add Subscribers.</div>";
        document.getElementById('tblBody').innerHTML=subscriberTableStructure;	
    }
    else{
        subscriberTableStructure="";
       for(var i=0; i<totalRecords; i++)
		{
			if(subscriberObj[i]!= undefined)//when object records are over break the loop
			{
				n=subscriberObj[i]['name'];
				p=subscriberObj[i]['phonenumber'];
				
					subscriberTableStructure+="<tr class=''>"
									+"<td>"+(i+1)+"</td>"
							  		+"<td>"+n+"</td>"
								  	+"<td>"+p+"</td>"
								  	+"<td>"
								  	/*+"<button id=editbtn_"+i+" class='btn editBtn '"
								  	+"data-toggle='modal'"
								 	+"data-target='#editModal'><i class='fa fa-edit'></i></button>"*/
								  	+"<button id=deletebtn_"+i+" class='btn deleteBtn' data-toggle='modal' data-target='#deleteModal'><i class='fa fa-trash'></i></button></td>";
								  	+"</tr>";
			}/*if undefined ends here*/
			else
			{
				break;
			}
		}//inner for ends here 
        document.getElementById('tblBody').innerHTML=subscriberTableStructure;	
    }
		
    lastFetchedRecordID= i;	
    //document.getElementById('tblBody').innerHTML=subscriberTableStructure;	

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
		 	var tableRef=document.getElementById('tblBody');
			var rowCount=tableRef.rows.length;//calculate no of rows
			var newRow="";
			var newSubscriber={
					'name':SubscriberName,
					'phonenumber':SubscriberNumber
					}
			subscriberObj.push(newSubscriber);
			
			var newRowCount=rowCount+1;//index to add new row
	
        if(newRowCount==1){
        document.getElementById('tblBody').innerHTML="";
        }
	//newRowStructure+=		  	
	$('#subscribersTable').append("<tr class=''>"
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
