function getDataAboutVote() {
    var idStructure = window.location.href.split('?')[1];
    var requestToServer = new XMLHttpRequest();
    var status;
    requestToServer.open("GET", "/voting/" + idStructure, true);   //Указываем адрес GET-запроса
    requestToServer.onload = function (item){
        var values = JSON.parse(this.responseText);
        status = values['status'];
        if (status) {
            document.getElementById('name').innerHTML = values['name'];
            getDataFromServer(idStructure);
        } else {
            document.getElementById('name').innerHTML = 'Голосование закрыто!!!';
        }
    };
    requestToServer.send(null);
}

function getDataFromServer(idStructure) {
    var requestToServer = new XMLHttpRequest();
    requestToServer.open("GET", "/voting/" + idStructure + "/votes", true);   //Указываем адрес GET-запроса
    requestToServer.onload = function (){             //Функция которая отправляет запрос на сервер для получения всех студентов
        var parsedItem = JSON.parse(this.responseText);
        var itemsTable = document.getElementById('all-items-voting'); //получаем элемент по Id
        itemsTable.innerHTML = '';      //очищаем таблицу от устаревших данных
        parsedItem._embedded.vote.forEach(function(item)  {
            var name = document.createElement('td'); //создаем элемент ячейку с названием для таблицы
            name.innerHTML =  item['name'] ;     //внедряем название предмета, полученное с сервера
            var count = document.createElement('td');
            count.innerHTML = item['count'];
            var operations = document.createElement('td');
            operations.innerHTML =
                ' <button class="btn btn-primary btn-xs" onclick="addVoteItem(\'' + item['name'] + '\')">Голосовать </button> ';
            var elementRow = document.createElement('tr'); /// /создаем строку таблицы
            elementRow.appendChild(name);      //помещаем обе ячейки в строку
            elementRow.appendChild(count);
            elementRow.appendChild(operations);
            itemsTable.appendChild(elementRow);           //помещаем строку в таблицу
        });
        $('table').filterTable({minRows: 0});
        $("#all-items-table").tablesorter();
    };
    requestToServer.send(null);
}

function addVoteItem(name) {
    $.ajax({
        type: "GET",
        url: "/vote/search/addPoint?name=" + name.replace(" ", "%20")
    });
    location.reload();
}


$(document).ready(function() {
    getDataAboutVote();
});

