////////////MEDIUM MODE//////////////////////////////////////////////////////////////////////////////

(function(){
    $(function(){

    function getDogs(){
      $.get("http:localhost:1337/dog", function(dogs){
        //console.log(dogs)
        //clear out existing tableBody
        $("#tableBody").empty()
        //loop over dogs we get from the API and add to tbody with id of tableBody
        for(let i=0; i <dogs.length; i++) {
        $("#tableBody").append(`
          <tr>
            <td>${dogs[i].dogBreed}</td>
            <td>${dogs[i].size}</td>
            <td>${dogs[i].favoriteActivities}</td>
            <td>${dogs[i].activityLevel}</td>
            <td>${dogs[i].about}</td>
            <td>${dogs[i].breedTemperament}</td>
            <td><button data-recordid=${dogs[i].id}class="btn btn-danger deleteButton">Delete Record</button></td>
          </tr>
        `)
        }
    }
    getDogs();

    })
    $("#tableBody").on("click", ".deleteButton", function(){
      let recordid = $(this).data("recordid")
      $.ajax({ //use AJAX because the old way doesn't work with delete.
        url: "http:localhost:1337/student" + recordid,
        method: "DELETE",
        success: function(data){

          getDogs();
          alert("shit be gone yo");
        }
      })

    })


    })
})()
