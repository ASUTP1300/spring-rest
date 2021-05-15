

function role(roleArray){
  return  roleArray.forEach( (u2)=>{
        var role = u2.substring(5);
        let role2 = "";
        role2 += role2 + role;
    })
}

function getAllRoles(){
    let roles;
    fetch("admin2/roles").then(
        res => {
            res.json().then(
                data =>{
                    console.log(data);
                    roles = data;
                })

        }
    )

    return roles;

}

getAllRoles();

 f = function updateTable() {
    fetch("/admin2").then(
        res => {
            res.json().then(
                data => {
                    console.log(data);
                    if (data.length > 0) {
                        let temp = "";
                        data.forEach((u) => {
                            temp += `<tr id= 'tr${u.id}' >`;
                            temp += `<td id='id${u.id}'>` + u.id + "</td>";
                            temp += `<td id='firstName${u.id}'>` + u.firstName + "</td>";
                            temp += `<td id='lastName${u.id}'>` + u.lastName + "</td>";
                            temp += `<td id='email${u.id}'>` + u.email + "</td>";
                            temp += `<td id='roles${u.id}' >` + u.roleNames.map(function(name) {
                                return  " " + name.substring(5);}) +  "</td>";

                            temp += "<td>" + `<a  class='btn btn-info eBtn' id='butn' onclick= 'editUser(${u.id})'>Edit</a>` + "</td>";
                            temp += "<td>" + '<a  class="btn btn-danger delBtn" id="butn2">Delete</a>' + "</td></tr>";
                        })
                        document.getElementById("data").innerHTML = temp;
                    }
                }
            )
        }
    );

}

f()

function editUser(id){
    fetch("/admin2/" + id).then(
            res =>{
                res.json().then(
                    data =>{
                        $('.myForm1 #id').val(data.id);
                        $('.myForm1 #firstName').val(data.firstName);
                        $('.myForm1 #lastName').val(data.lastName);
                        $('.myForm1 #email').val(data.email);
                        $('.myForm1 #password').val(data.password).hide();
                        $('.myForm1 #listRolesResponse').val(getAllRoles());
                        $.each(data.roleNames, function (index, value) {
                                var role = value.substring(5);
                                $('.myForm1 #listRolesResponse option:contains("' + role + '")').prop('selected', true);
                        })
                        $('.myForm1 #EditModal').modal();

                    }

                )

            }

        )
}


async function postData(url, data) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
       // mode: 'cors', // no-cors, *cors, same-origin
     //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
       // credentials: 'same-origin', // include, *same-origin, omit

        body: JSON.stringify(data),// body data type must match "Content-Type" header
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
       // redirect: 'follow', // manual, *follow, error
       // referrerPolicy: 'no-referrer', // no-referrer, *client

    });
   const  json = await response.json();
   console.log('Успех:', JSON.stringify(json));// parses JSON response into native JavaScript objects
}


async function putData(url, data) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit

        body: JSON.stringify(data),// body data type must match "Content-Type" header
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'no-referrer', // no-referrer, *client

    });
    const  json = await response.json();
    console.log('Успех:', JSON.stringify(json));// parses JSON response into native JavaScript objects
}


function editTable(JSON){
    let  ID = JSON.id;
    $(`#id${JSON.id}`).text(`${JSON.id}`);
    $(`#firstName${JSON.id}`).text(JSON.id);
    $(`#lastName${JSON.id}`).text(JSON.lastName);
    $(`#email${JSON.id}`).text(JSON.email);
    $(`#password${JSON.id}`).text(JSON.password);
    $(`#listRolesResponse${JSON.id}`).text(JSON.listRolesResponse);

   // $('#data').children(`[id = JSON.id]`).find("#firstName').text(JSON.firstName);
   // console.log( $('#data').children([id = `${JSON.id}`]).find('#firstName'));
    }

 function addRoles(){
  $('#select1') .empty();
  let roles = getAllRoles();
  $.each(roles, function (i, p) {
      $(`#select1`).append($('<option></option>')).val(p).html()

  })

 }


$(".myForm1 select option").val(getAllRoles());
$(".myForm2 option:selected").val(getAllRoles());

$('document').ready(function () {
    const button = $("#btnCreate")
    button.click(
        function () {

            let dest = {};
            $("#formToCreateUser")
                .serializeArray()
                .map(input => dest[input.name] = input.value);
                alert(dest);
                postData("/admin2/save", dest);

        })
});

$('document2').ready(function () {
    const button = $("#saveEdit")
    button.click(
        function () {
            // let user = ;

            // let user = {
            //     firstName: 'John',
            // };
            let dest = {};
            $("#formToEdit")
                .serializeArray()
                .map(input => dest[input.name] = input.value);
            console.log(dest);
            editTable(dest);
           // putData("/admin2/save", dest);
            $(".myForm1").modal("hide");

        })
});
