document.body.onload = function () {

    f3();
    updateTable();
    logInUser();
};


async function f3() {
    let url = "api/roles";
    let response = await fetch(url);
    var options = await response.json();
    console.log(options);
    $('select*').empty();
    $.each(options, function (i, p) {
        role = p.role;
        $("select*").append($('<option></option>').val(role.substring(5)).html(role.substring(5)));
    });

}


function updateTable() {
    fetch("/api").then(
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
                            temp += `<td id='roles${u.id}' >` + u.roleNames.map(function (name) {
                                return " " + name.substring(5);
                            }) + "</td>";
                            temp += "<td>" +
                                `<a  class='btn btn-info eBtn' id='butn1' onclick= 'editUser(${u.id})'>Edit</a>`
                                + "</td>";
                            temp += "<td>" +
                                `<a  class='btn btn-danger delBtn' id='butn2' onclick= 'deleteUser(${u.id})'>Delete</a>`
                                + "</td></tr>";
                        })

                        document.getElementById("data").innerHTML = temp;
                    }
                }
            )
        }
    );
}

function logInUser() {
    fetch("api/auth").then(
        res => {
            res.json().then(
                data => {
                    console.log(data);
                    let roles = data.roleNames.map(function (name) {
                        return " " + name.substring(5);
                    })
                    $('#header').text(data.email + ' with role ' + `${roles}`);
                }
            )
        }
    );
}


function updateUserTable() {
    fetch("/user").then(
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
                            temp += `<td id='roles${u.id}' >` + u.roleNames.map(function (name) {
                                return " " + name.substring(5);
                            }) + "</td>";

                        })
                        document.getElementById("data2").innerHTML = temp;
                    }
                }
            )
        }
    );
}


function editUser(id) {
    fetch("/api/" + id).then(
        res => {
            res.json().then(
                data => {
                    $('.myForm1 #id').val(data.id);
                    $('.myForm1 #firstName').val(data.firstName);
                    $('.myForm1 #lastName').val(data.lastName);
                    $('.myForm1 #email').val(data.email);
                    $('.myForm1 #password').val(data.password);
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


function deleteUser(id) {
    fetch("/api/" + id).then(
        res => {
            res.json().then(
                data => {
                    $('.myForm2 input').attr('readonly', 'readonly');
                    $('.myForm2 select').attr('readonly', 'readonly');
                    $('.myForm2 #id').val(data.id);
                    $('.myForm2 #firstName').val(data.firstName);
                    $('.myForm2 #lastName').val(data.lastName);
                    $('.myForm2 #email').val(data.email);
                    $('.myForm2 #password').val(data.password).hide();
                    $.each(data.roleNames, function (index, value) {
                        var role = value.substring(5);
                        $('.myForm2 #roles option:contains("' + role + '")').prop('selected', true);
                    })
                    $('.myForm2 #delModal').modal();
                }
            )
        }
    )
}

/*
 Функция на событие - пользователей нажал кнопку "DELETE"
*/
$('#butnDel').on('click', function () {
    let arr = $("#formToDelete ").serializeArray();
    let user = add(arr);
    let userJSON = getUserJSON(user);

    //Отправка на сервер
    delData("/api/delete", userJSON);

    //Обновление таблицы
    updateTable();

    //Очистка формы
    $('#formToDelete').trigger('reset');

})


/*
 Функция на событие - пользователей нажал кнопку "Add new user""
*/
$('#butnCreate').on('click', function () {
    let arr = $("#formToCreateUser ").serializeArray();
    let user = add(arr);
    let userJSON = getUserJSON(user);

    //Отправка на сервер
    postData("/api/save", userJSON);

    //Обновление таблицы
    updateTable();

    //Очистка формы
    $('#formToCreateUser').trigger('reset');
})


/*
 Функция на событие - пользователей нажал кнопку "SAVE" в модальном окне Edit"
*/
$('#butnSaveEdit').on('click', function () {
    let arr = $("#formToEdit ").serializeArray();
    let user = add(arr);
    let userJSON = getUserJSON(user);
    editTable(userJSON);

    //Отправка на сервер
   const cur = putData("/api/update", userJSON);
   console.log(cur);

})


$('#butnCloseEdit').on('click', function () {
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
    const json = await response.json();
    console.log(json);
    console.log('Успех:', JSON.stringify(json));
    return JSON.stringify(json);
}


async function putData(url, data) {
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),// body data type must match "Content-Type" header
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const json = response.json();
    console.log('Успех:', JSON.stringify(json));// parses JSON response into native JavaScript objects
}

async function delData(url, data) {
    const response = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(data),// body data type must match "Content-Type" header
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const json = response.text();
    console.log('Успех:', JSON.stringify(json));// parses JSON response into native JavaScript objects
}

function addRowToTable(u) {
    let temp = "";
    var d = document;
    // tbody = document.getElementById("data")
    var tbody = d.getElementById('tableUsers').getElementsByTagName('TBODY')[0];
    temp += `<td id='id${u.id}'>` + u.id + "</td>";
    temp += `<td id='firstName${u.id}'>` + u.firstName + "</td>";
    temp += `<td id='lastName${u.id}'>` + u.lastName + "</td>";
    temp += `<td id='email${u.id}'>` + u.email + "</td>";
    temp += `<td id='roles${u.id}' >` + u.roles + "</td>";
    temp += "<td>" + `<a  class='btn btn-info eBtn' id='butn1' onclick= 'editUser(${u.id})'>Edit</a>` + "</td>";
    temp += "<td>" + '<a  class="btn btn-danger delBtn" id="butn2">Delete</a>';

    //Создаем строку таблицы и добавляем ее
    var row = d.createElement("TR");
    row.attr('id', `'tr${u.id}'`)

    tbody.appendChild(row);

    row.innerHTML = temp
}


function editTable(JSON) {
    let ID = JSON.id;
    $(`#id${JSON.id}`).text(`${JSON.id}`);
    $(`#firstName${JSON.id}`).text(JSON.firstName);
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
            postData("/api/save", dest);
        })
});

$('document2').ready(function () {
    const button = $("#closeEdit")
    button.click(
        function () {
            $('#roles option').prop('selected', false);
        })
});


function add(result) {
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

function getUserJSON(user) {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        roles: user.roles,
    };
}



