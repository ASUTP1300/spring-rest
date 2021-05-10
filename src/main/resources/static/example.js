

a = function (){
    const v = $("<div id='rrr' name = 'www'></div>");
        v.attr('id', '666');
        console.log(v.attr('id'));
        console.log(v.attr('name'));
}

a()



    fetch("/admin2").then(
        res=>{
        res.json().then(
            data=>{
                console.log(data);
              // if (data.length > 0) {
              //     var temp = "";

              //     data.forEach((u) => {
              //         temp += "<tr>";
              //         temp += "<td>" + u.firstName + "</td>";
              //     })
              //     $(document).getElementsById("data").innerHTML = temp;
              // }
            }
        )
    }
);

