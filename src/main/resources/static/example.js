
a = function (){
    const v = $("<div id='rrr' name = 'www'></div>");
        v.attr('id', '666');
        console.log(v.attr('id'));
        console.log(v.attr('name'));
}

a()





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


fetch("/admin2").then(
    res => {
        res.json().then(
            data => {
                console.log(data);
                if (data.length > 0) {
                    let temp = "";
                    data.forEach((u) => {
                            temp += "<tr>";
                            temp += "<td>" + u.id + "</td>";
                            temp += "<td>" + u.firstName + "</td>";
                            temp += "<td>" + u.lastName + "</td>";
                            temp += "<td>" + u.email + "</td>";
                            temp += "<td>" + u.roleNames.map(function(name) {
                                return  " " + name.substring(5);
                            })
                                +  "</td>";

                            temp += "<td>" + `<a  class='btn btn-info eBtn' id='butn' onclick= 'editUser(${u.id})'>Edit</a>` + "</td>";
                            temp += "<td>" + '<a  class="btn btn-danger delBtn" id="butn2">Delete</a>' + "</td></tr>";
                    })
                    document.getElementById("data").innerHTML = temp;
                }
            }
        )
    }
);


function editUser(id){
    fetch("/admin2/" + id).then(
            res =>{
                res.json().then(
                    data =>{
                        alert(data);
                        $('.myForm1 #id').val(data.id);
                        $('.myForm1 #firstName').val(data.firstName);
                        $('.myForm1 #lastName').val(data.lastName);
                        $('.myForm1 #email').val(data.email);
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




$('document').ready(function () {

    /*
     Функция на событие: пользователей нажал кнопку "EDIT"
    */

    const button = $("#butn");
    bu

    $('.table .eBtn').on('click', function (event) {

        event.preventDefault();

        var href = $(this).attr('href');
        $.get(href, function (user, status) {
            $('.myForm1 #id').val(user.id);
            $('.myForm1 #firstName').val(user.firstName);
            $('.myForm1 #lastName').val(user.lastName);
            $('.myForm1 #email').val(user.email);

            $.each(user.roles, function (index, value) {
                var role = value.role.substring(5);
                $('.myForm1 #listRolesResponse option:contains("' + role + '")').prop('selected', true);
            })
        });

        $('.myForm1 #EditModal').modal();
    });
});
/*
 Функция на событие: пользователей ввел данные о новом ЮЗЕРЕ нажал кнопку "SUBMIT"
*/

//$(function (){
//    $('#formToCreateUser').on('click', function (event) {
//        var data = $('#formToCreateUser').serializeArray();
//        console.log(data);
//    //кнопка SUBMIT
//   //$("#formToCreateUser input").each(function (){
//
//   //    let key = $(this).attr('name');
//   //    let value = $(this).attr()
//
//   //}
//    });

//})
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






$('document').ready(function () {
    const button = $("#btnCreate")
    button.click(
        function () {
            // let user = ;

            // let user = {
            //     firstName: 'John',
            // };
            let dest = {};
            $("#formToCreateUser")
                .serializeArray()
                .map(input => dest[input.name] = input.value);
                alert(dest);
                postData("/admin2/save", dest);

        })
});

