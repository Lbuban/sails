(function(){
  console.log("Js is working!");

  $(function(){
    let api = "http://localhost:1337/dog"

    $.get(api, function(data){
    let dogs = data;
    console.log(data)
    for(let i = 0; i < dogs.length; i++){
            $("#tableBody").append(`
          <tr>
            <td>
              ${dogs[i].dogBreed}
            </td>
            <td>
              ${dogs[i].size}
            </td>
            <td>
              ${dogs[i].favoriteActivities}
            </td>
            <td>
              ${dogs[i].about}
            </td>
            <td>
              ${dogs[i].activityLevel}
            </td>
            <td>
              ${dogs[i].breedTemperament}
            </td>
          </tr>
          `)
  } //closes $.get function

}) //closes main $ function
})() //closes main function

})()//closes self-invoking function
