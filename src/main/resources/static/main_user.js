

function updateUserTable() {
    fetch("/user2").then(
        res => {
            res.json().then(
                data => {
                    console.log(data);
                        let temp = "";
                            temp += `<tr>`;
                            temp += `<td>` + data.id + "</td>";
                            temp += `<td>` + data.firstName + "</td>";
                            temp += `<td>` + data.lastName + "</td>";
                            temp += `<td>` + data.email + "</td>";
                            temp += `<td>` + data.roleNames.map(function(name) {
                                return  " " + name.substring(5);}) +  "</td>";
                        document.getElementById("data2").innerHTML = temp;
                        let roles = data.roleNames.map(function(name) {
                            return  " " + name.substring(5);})
                        $('#header').text(data.email + ' with role ' + `${roles}` );
                }
            )
        }
    );
}
;