function getDataAboutVote() {
    var idStructure = window.location.href.split('?')[1];
    var priceRequest = new XMLHttpRequest();
    priceRequest.open("GET", "/voting/" + idStructure, true);   //Указываем адрес GET-запроса
    priceRequest.onload = function (item){             //Функция которая отправляет запрос на сервер для получения всех студентов
        var values = JSON.parse(this.responseText);
        document.getElementById('name').innerHTML = values['name'];
    };
    priceRequest.send(null);
    get(idStructure);
}

function get(idStructure) {
    var priceRequest = new XMLHttpRequest();
    priceRequest.open("GET", "/voting/" + idStructure + "/votes", true);   //Указываем адрес GET-запроса
    priceRequest.onload = function (){             //Функция которая отправляет запрос на сервер для получения всех студентов
        var parsedItem = JSON.parse(this.responseText);
        var itemsTable = document.getElementById('all-items-voting'); //получаем элемент по Id
        itemsTable.innerHTML = '';      //очищаем таблицу от устаревших данных
        parsedItem._embedded.vote.forEach(function(item)  {
            console.log(item);
            var itemNameElement = document.createElement('td'); //создаем элемент ячейку с названием для таблицы
            itemNameElement.innerHTML =  item['name'] ;     //внедряем название предмета, полученное с сервера
            var itemPriceElement = document.createElement('td');
            itemPriceElement.innerHTML = item['count'];
            var operations = document.createElement('td');
            operations.innerHTML =
                ' <button class="btn btn-primary btn-xs" onclick="addVoteItem(\'' + item['name'] + '\')">Голосовать </button> ';
            var elementRow = document.createElement('tr'); /// /создаем строку таблицы
            elementRow.appendChild(itemNameElement);      //помещаем обе ячейки в строку
            elementRow.appendChild(itemPriceElement);
            elementRow.appendChild(operations);
            itemsTable.appendChild(elementRow);           //помещаем строку в таблицу
        });
        $('table').filterTable({minRows: 0});
        $("#all-items-table").tablesorter();
    };
    priceRequest.send(null);
}

function addVoteItem(name) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/vote/search/addPoint?name=" + name.replace(" ", "%20")
    });
    location.reload();
}


$(document).ready(function() {
    getDataAboutVote();
});

