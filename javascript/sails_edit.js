(function(){

  $(function(){

    //variable to hold current dog we have selected for edit
    $("#dialog").hide();

    let currentDog;

    //disable all input fields at first
    $("#form :input").prop("disabled", true);

    //put the get request in a function so it can be reused
    function fetchDogs(){
      //make request to get data from the api
      $.get("http://localhost:1337/dog", function(dogs){

        //clear out existing dog list
        $("#tableBody").empty()

        //loop over dogs we got back from the api and add to tbody with id of dogList
        for (let i = 0; i < dogs.length; i++) {
          $("#tableBody").append(`
            <tr class="tableRow">
              <td>${dogs[i].dogBreed}</td>
              <td>${dogs[i].size}</td>
              <td>${dogs[i].favoriteActivities}</td>
              <td>${dogs[i].activityLevel}</td>
              <td>${dogs[i].about}</td>
              <td>${dogs[i].breedTemperament}</td>
              <td><button data-recordid="${dogs[i].id}" class="btn btn-primary editButton">Edit Record</button></td>
            </tr>
          `)
        }

      })
    }

    //inital load of our dog data in our table
    fetchDogs();

    $("#tableBody").on("click", ".editButton", function(){

      //store current dog in variable for when we submit the form
      //we need this to know what dog we are updating
      //variable declared on line 5
      currentDog = $(this).data("recordid");

      $.get("http://localhost:1337/dog/" + currentDog, function(dog){

        //loop over the dog i got back from the api
        $.each(dog, function(key, val){
            //find the input field that matches the name of the key
            let el = $('[name="'+key+'"]');
            //find the type of field that we selected
            let type = el.attr('type');

            //based on the type choose how we set the value
            switch(type){
                case 'checkbox':
                    el.attr('checked', 'checked');
                    break;
                case 'radio':
                    el.filter('[value="'+val+'"]').attr('checked', 'checked');
                    break;
                default:
                    el.val(val);
            }
        });
      })

      //enable input fields after we fill out the form
      $("#form :input").prop("disabled", false);

      $("#dialog").dialog({
        width: 1000,
        title: "Edit dog",
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          Submit: function() {
            updateDog();
            $( this ).dialog( "close" );
          }
        }
      });
    })

    //when the submit button on the form is clicked lets prevent the default behavior
    //we want to stop the form from submitting and reloading the page
    function updateDog(){
      $.ajax({
        url: "http://localhost:1337/dog/" + currentDog,
        data: $("#form").serialize(),
        method: "PUT",
        success: function(data){

          //reload dog table on success
          fetchDogs();

          //disable form fields again
          $("#form:input").prop("disabled", true);

          //reset form back to empty fields
          $("#form")[0].reset()

        }
      })
    }
  })

})()
