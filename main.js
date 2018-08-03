$(document).ready(()=>
{   

    $('#searchByTitle').click((event)=>      
    {
  	 event.preventDefault();           
  	 $('#inputTitleYear').val("");     //it clears the previous inputs in all the input boxes except the one in this box.
  	 $('#inputYear').val("");
  	 $('#inputId').val("");
  	 let title=$('#inputTitle').val();
  	 getInfo(title);
    });

    $('#searchByTitleYear').click((event)=>
    {
  	 event.preventDefault(); 
  	 $('#inputTitle').val("");
  	 $('#inputId').val("");
  	 let title=$('#inputTitleYear').val();
  	 let year=$('#inputYear').val();
  	 getInfo(title,year);
    });
    
    $('#searchById').click((event)=>
    {
  	 event.preventDefault(); 
  	 $('#inputTitle').val("");
  	 $('#inputTitleYear').val("");
  	 $('#inputYear').val("");
  	 let id=$('#inputId').val();
  	 getInfo(id);
    });

    $('.scroll-button').click(()=>{                        //scroll-button at the end
	    $('#searchMenu').css('padding-top','0.03rem');
    })
})
   

let getInfo =(...input)=>           //use of rest parameters to get the input in the form of an array 
{    
   let address="";
   let flag=0;

	if(input[1]== undefined && input[2]== undefined && input[0] != "")  //if there is only one valid input
	{
		let result=check(input[0]);       //check() function is defined at the end of this file.
		
		if(Number.isNaN(result) == true){
            console.log("The input is only a title");
            flag++;
            address=`http://www.omdbapi.com/?t=${input[0]}&apikey=9c71e39f`
		}
		else{
			console.log("The input is an id");
			flag++;
			address=`http://www.omdbapi.com/?i=${input[0]}&apikey=9c71e39f`
		}
	} 
	else if(input[0] == "" || input[1] == "")   //vacant input array
	{
		$(".warning").html(`Enter a valid Title or an Id or you can only fill the "Title" and "Year" field with valid values to commence your search.`);
		$(".warning").css('color','white');
		$("#movieInfo").css('display','none');
	}    
	else{                                         //if there are two inputs in the input array
		flag++
		address=`http://www.omdbapi.com/?t=${input[0]}&y=${input[1]}&apikey=9c71e39f`;
		console.log("Input is a title with year")
	} 

	if(flag != 0)   //if there is a valid input
	{                                 
	   $.ajax
	   ({
		    type: 'GET',
            async:true,
		    dataType:'json',
		    url:address,
		    success: (data)=>
                    {
                       console.log(data);
                       if(data.Response=="False")     //if movie/series not found
                       {
         	              $('.loader').css('display','none');
			              $('.limage').css('display','none');
         	              $(".warning").html("No movie found or may be a spelling mistake, try again!")
                        }       
                        else
                        {
                          $('#movieInfo').css('display','block');
                        }
                        if(data.Poster !== "N/A" && data.Poster !== null && data.Poster !== undefined)
                        {
                            $('#movieImage').attr('src',`${data.Poster}`);
                        }
                        else
                        {
         	               $('#movieImage').attr('src','NoImage.jpg');
                        }

                        $('.title').html(`${data.Title}`)
                        $('.release').html(`${data.Released}`)
                        $('.year').html(`(${data.Year})`)
                        $('.runtime').html(`${data.Runtime}`)
                        $('.genre').html(`${data.Genre}`)
                        $('.type').html(`${data.Type}`)
                        $('.plot').html(`${data.Plot}`); 
                        $('.id').html(`${data.imdbID}`);
                        $('.imdb-rating').html(`${data.imdbRating}`);
                        $('.imdb-votes').html(`${data.imdbVotes}`);

                        if(data.Ratings[1]!==undefined)
                        {
                          $('.rt-value').html(`${data.Ratings[1].Value}`);
                          $('.rt-value').append(`<i class="fas fa-thumbs-up rt-icon ml-1"></i>`);
                        }
                        else
                        {
         	               $('.rt-value').html(`N/A`);
         	               $('.rt-value').append(`<i class="fas fa-thumbs-up rt-icon ml-1"></i>`)
                        }
                        if(data.Ratings[2]!==undefined)
                        {
                           $('.mc-value').html(`${data.Ratings[2].Value}`);
                           $('.mc-value').append(`<i class="fas fa-heart mc-icon ml-1"></i>`)
                        }
                        else
                        {
         	               $('.mc-value').html(`N/A`);
         	               $('.mc-value').append(`<i class="fas fa-heart mc-icon ml-1"></i>`)
                        }
                       if(data.Rated !== undefined && data.Rated !== null)
                        {
                            $('.rated').html(`${data.Rated}`);
                        }
                        else
                        {
         	                $('.rated').html(`N/A`);
                        }
                        if(data.Actors !== undefined && data.Actors !== null)
                        {	
                            $('.actors').html(`${data.Actors}.`);  
                        }
                        else
                        {
         	                $('.actors').html(`N/A`);
                        }
                        if(data.Director !== undefined && data.Director !== null)
                        { 
                            $('.director').html(`${data.Director}.`);
                        }
                        else
                        {
         	                $('.director').html(`N/A`);
                        }
                        
                        if(data.Writer !== undefined && data.Writer !== null)
                        {
                            $('.writers').html(`${data.Writer}.`);
                        }
                        else
                        {
         	                $('.writers').html(`N/A`);
                        }
                        if(data.Production !== undefined && data.Production !== null)
                        {
                            $('.production').html(`${data.Production}.`);
                        }
                        else
                        {
         	                $('.production').html(`N/A`);
                        }
                        if(data.Awards !== undefined && data.Awards !== null)
                        {
                           $('.awards').html(`${data.Awards}`);
                        }
                        else
                        {
                            $('.awards').html(`N/A`);  	
                        }
                        if(data.BoxOffice !== undefined && data.BoxOffice !== null)
                        {
                            $('.box-office').html(`${data.BoxOffice}`);
                        }
                        else
                        {
         	               $('.box-office').html(`N/A`);
                        }
                        if(data.Language !== undefined && data.Language !== null)
                        {
         	                $('.language').html(`${data.Language}.`);
                        }	
                        else
                        {
         	                $('.language').html(`N/A`);
                        }
                        if(data.Country !== undefined && data.Country !== null)
                        {
                            $('.country').html(`${data.Country}.`);
                        }
                        else
                        {
         	                $('.country').html(`N/A`)
                        }
                        if(data.Website !== undefined && data.Website !== null && data.Website != "N/A")
                        {
                            $('.website').html(`<a href="${data.Website}" target="_blank">${data.Website}</a>`);
                        }
                        else
                        {
         	                 $('.website').html(`Not Available.`);
                        }
                        if(data.DVD !== undefined && data.DVD !== null)
                        {	
                            $('.dvd').html(`${data.DVD}.`);
                        }
                        else
                        {
         	                $('.dvd').html(`N/A`);
                        }
                        if(data.Type == "series")      //for displaying seasons of a tv series
                        {  
         	                $('.optional').css('display','inline');
                            $('.seasons').html(`${data.totalSeasons}.`);
                        }
                        else
                        {
         	                $('.optional').css('display','none');
                        }
                    },

         timeout : 6000,
		 error:(data)=>
		       {
			        alert('Request timed out or there were problems retrieving the desired information, try again');
		       },
		beforeSend :()=>
		            {
		            	$('.quote').css('display','none')
			           $('#movieInfo').css('display','none');
			           $('.loader').show();
			           $('.limage').show();
			           $('.warning').html("");
		            },
		complete :()=>
		           {
			          $('.loader').css('display','none');
			          $('.limage').css('display','none');
		            }
	    })
    }
    else{
    	console.log("Try again with a valid input")
    }
}
let check= (anyString)=>{                       /*the id string begins with a character but has a "number" in the 2nd index.
                                                 the "title" string cant have a number in the 2nd index of the string.
                                                 this function distinguish between a "title" input and an "id" input by
                                                 using substring(2) method */ 
	let integerInInput = anyString.substring(2);
	return parseInt(integerInInput,10);
}


