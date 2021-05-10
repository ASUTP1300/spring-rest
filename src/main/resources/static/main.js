

$('document').ready(function () {

    /*
     Функция на событие: пользователей нажал кнопку "EDIT"
    */
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

    /*
     Функция на событие: пользователей нажал кнопку "DELETE"
    */
    $('.table .delBtn').on('click', function (event) {
        event.preventDefault();
        var href = $(this).attr('href');
        $.get(href, function (user, status) {
            $('.myForm2 input').attr('readonly', 'readonly');
            $('.myForm2 select').attr('readonly', 'readonly');
            $('.myForm2 #id').val(user.id);
            $('.myForm2 #firstName').val(user.firstName);
            $('.myForm2 #lastName').val(user.lastName);
            $('.myForm2 #email').val(user.email);
            //$('.myForm2 #password').val(user.password);
            $.each(user.roles, function (index, value) {
                var role = value.role.substring(5);
                $('.myForm2 #listRolesResponse2 option:contains("' + role + '")').prop('selected', true);
            })
        });

        $('.myForm2 #delModal').modal();
    })

});