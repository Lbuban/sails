(function(){

    $(function(){

      $("#button").click(function(e){
        e.preventDefault()
        $.post("http://localhost:1337/dog", $("#form").serialize(), function(data){
          alert("data added")
        }) // closes $.post
      }) //closes .click
  }) //closes main function

})()//closes self-invoking function
