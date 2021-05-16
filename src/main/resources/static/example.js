



f3();

async function f3(){
    let url = "admin2/roles";
    let response = await fetch(url);
    var options = await response.json();
    console.log(options);
    $('select*').empty();
    $.each(options, function(i, p) {
        role = p.role;
        $("select*").append($('<option></option>').val(role.substring(5)).html(role.substring(5)));
    });

}



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
                            temp += "<td>" + `<a  class='btn btn-info eBtn' id='butn1' onclick= 'editUser(${u.id})'>Edit</a>` + "</td>";
                            temp += "<td>" + '<a  class="btn btn-danger delBtn" id="butn2">Delete</a>' + "</td></tr>";
                        })
                        document.getElementById("data").innerHTML = temp;
                    }
                }
            )
        }
    );
}

f();

function editUser(id) {
    fetch("/admin2/" + id).then(
        res => {
            res.json().then(
                data => {
                    $('.myForm1 #id').val(data.id);
                    $('.myForm1 #firstName').val(data.firstName);
                    $('.myForm1 #lastName').val(data.lastName);
                    $('.myForm1 #email').val(data.email);
                    $('.myForm1 #password').val(data.password).hide();
                    $.each(data.roleNames, function (index, value) {
                        var role = value.substring(5);
                        $('.myForm1 #roles option:contains("' + role + '")').prop('selected', true);
                    })
                    $('.myForm1 #EditModal').modal();
                }
            )
        }
    )
}

/*
 Функция на событие - пользователей нажал кнопку "Add new user""
*/
$('#butnCreate').on('click',function (){
    let arr = $("#formToCreateUser ").serializeArray();
    let user = add(arr);
    let userJSON = getUserJSON(user);
    addRowToTable(userJSON);

    //Отправка на сервер
   // postData("/admin2/save",userJSON)
})


/*
 Функция на событие - пользователей нажал кнопку "SAVE" в модальном окне Edit"
*/
$('#butnSaveEdit').on('click',function (){
    let arr = $("#formToEdit ").serializeArray();
    let user = add(arr);
    let userJSON = getUserJSON(user);

    editTable(userJSON);

    //Отправка на сервер
    putData("/admin2/update",userJSON)
})


$('#butnCloseEdit').on('click',function (){
    $('#roles option').prop('selected', false);

});




async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    });
   const  json = response.text();
   console.log('Успех:', JSON.stringify(json));
}


async function putData(url, data) {
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),// body data type must match "Content-Type" header
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const  json = response.text();
    console.log('Успех:', JSON.stringify(json));// parses JSON response into native JavaScript objects
}



function addRowToTable(u){
    let temp = "";
    var d = document;
       // tbody = document.getElementById("data")
        var tbody = d.getElementById('tableUsers').getElementsByTagName('TBODY')[0];
          temp += `<tr id= 'tr${u.id}' >`;
          temp += `<td id='id${u.id}'>` + u.id + "</td>";
          temp += `<td id='firstName${u.id}'>` + u.firstName + "</td>";
          temp += `<td id='lastName${u.id}'>` + u.lastName + "</td>";
          temp += `<td id='email${u.id}'>` + u.email + "</td>";
          temp += `<td id='roles${u.id}' >` + u.roles +  "</td>";
          temp += "<td>" + `<a  class='btn btn-info eBtn' id='butn1' onclick= 'editUser(${u.id})'>Edit</a>` + "</td>";
          temp += "<td>" + '<a  class="btn btn-danger delBtn" id="butn2">Delete</a>' + "</td></tr>";
       // tbody.append(temp);


        //Создаем строку таблицы и добавляем ее
        var row = d.createElement("TR");

        tbody.appendChild(row);

        row.innerHTML =temp
}











function editTable(JSON){
    let  ID = JSON.id;
    $(`#id${JSON.id}`).text(`${JSON.id}`);
    $(`#firstName${JSON.id}`).text(JSON.id);
    $(`#lastName${JSON.id}`).text(JSON.lastName);
    $(`#email${JSON.id}`).text(JSON.email);
    $(`#password${JSON.id}`).text(JSON.password);
    $(`#roles${JSON.id}`).text(JSON.roles);
}



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
    const button = $("#closeEdit")
    button.click(
        function () {
            $('#roles option').prop('selected', false);
        })
});


/*$('document3').ready(function () {
    const button = $("#saveEdit")
    button.click(

        function () {




             let user = {

                 firstName: 'John',
                 roles: ["ADMIN", "USER"],

             };
            let dest = {};
         //  var m = $("#formToEdit ").serializeArray();
            var result = { };


         //  $.each($("#formToEdit ").serializeArray(), function() {
         //      result[this.name] = this.value;
         //  });

         //  console.log(result);

            let arr = $("#formToEdit ").serializeArray();
          // let newArr = arr.reduce((acc, curr) => {
          //     if(acc.some(obj => obj.name === curr.name)) {
          //         acc.forEach(obj => {
          //             if(obj.name === curr.name) {
          //                 obj.value = [obj.value , curr.value];
          //             }
          //         });
          //     } else {
          //         acc.push(curr);
          //     }
          //     return acc;
          // }, []);

          //  console.log(newArr);




            console.log(result);
            console.log(user);
            editTable(dest);

            result = add(arr);

            let user2 = {
                id: result.id,
                firstName: result.firstName,
                lastName: result.lastName,
                email : result.email,
                password : result.password,
                roles: result.roles,
            };


            putData("/admin2/update",user2);



            $(".myForm1").modal("hide");

        })









});*/

function add( result) {
    let arr2 = [];
    $.each(result, function () {
        if (this.name === 'roles') {
            arr2.push(this.value);
            result[this.name] = arr2;
        } else {
            result[this.name] = this.value;
        }
    });
    return result;
}

function getUserJSON(user){
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email : user.email,
        password : user.password,
        roles: user.roles,
    };
}
function countRows(){
    document.getElementById("data").innerHTML = temp;
    let tabl = document.getElementById("tableUsers");
    alert(tabl.rows.length);
}

