(function(){
  console.log("Js is working!");


  $(function(){
      let api = "http://localhost:1337/dog"

      function getDogs(){
      $.get(api, function(data){
        $("#tableBody").empty()
        let dogs = data;
        console.log(data)

        for(let i = 0; i < dogs.length; i++){
                $("#tableBody").append(`
              <tr class="tableRow">
                <td>${dogs[i].dogBreed}</td>
                <td>${dogs[i].size}</td>
                <td>${dogs[i].favoriteActivities}</td>
                <td>${dogs[i].about}</td>
                <td>${dogs[i].activityLevel}</td>
                <td>${dogs[i].breedTemperament}</td>
                <td>
                  <button class="button btn btn-danger"  data-recordid="${dogs[i].id}">Delete</button>
                </td>
              </tr>
              `)
            } //closes for loop
      }) //closes $.get function
      }
      getDogs()

    $("#tableBody").on("click", ".button", function(){
      console.log($(this).data("recordid"));
      $.ajax({
          url: 'http://localhost:1337/dog/' + $(this).data("recordid"),
          type: 'DELETE',
          success: function(result) {
            console.log("deleted")

            getDogs()

          }//closes result
        })//closes Ajax

    }); //closes click function //closes main $ function

//Add a record ----------------------------------------------------------------------------------------

  })//$function

})() //closes self-invoking function
