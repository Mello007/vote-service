
function addNewVoting() {
    var data = $('#name').val();
    var votesFromDocument = document.getElementById('parent').getElementsByTagName('input');
    var votesForServer = {};
    var json = {};
    json['name'] = data;
    for (var i = 0; i < votesFromDocument.length; i++) {
        votesForServer[i] = votesFromDocument[i].value;
    }
    json['votes'] = votesForServer;
    $.ajax({
        type: "POST",
        url: "/voting/add",
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(json)
    });
    // location.reload();
}


function deleteVoting(name) {
    $.ajax({
        type: "GET",
        url: "/voting/search/deleteByName?name=" + name.replace("/ /g", "%20"),
        contentType: "application/json",
        dataType: 'json'
    });

    location.reload();
}

function deleteAll() {
    $.ajax({
        type: 'GET',
        url: "/voting/search/deleteAll/"
    });
    location.reload();
}

function createLink(serverLink) {
    
}


$(function(){
    $('button').on('click', function(){
        var textBox = document.createElement("input");
        textBox.setAttribute("type", "text");
        textBox.setAttribute("class", "form-control");
        $('#parent').append(textBox);
    });
});




$(document).ready(function() {
    var priceRequest = new XMLHttpRequest();
    priceRequest.open("GET", "/voting/", true);   //Указываем адрес GET-запроса
    priceRequest.onload = function (){             //Функция которая отправляет запрос на сервер для получения всех студентов
        var parsedItem = JSON.parse(this.responseText);
        var itemsTable = document.getElementById('all-items'); //получаем элемент по Id
        itemsTable.innerHTML = '';      //очищаем таблицу от устаревших данных
        parsedItem._embedded.voting.forEach(function(item)  {
            var itemNameElement = document.createElement('td'); //создаем элемент ячейку с названием для таблицы
            itemNameElement.innerHTML =  item['name'] ;     //внедряем название предмета, полученное с сервера
            var itemPriceElement = document.createElement('td');
            itemPriceElement.innerHTML = item['_links']['self']['href'];
            var operations = document.createElement('td');
            operations.innerHTML =
                ' <button class="btn btn-primary btn-xs" onclick="openStructure(\'' + item['id'] + '\')">Статистика </button> ' +
                '<button class="btn btn-primary btn-xs" onclick="deleteVoting(\'' + item['name'] + '\')">Удалить</button>'+
                '<button class="btn btn-primary btn-xs" onclick="deleteVoting(\'' + item['name'] + '\')">Закрыть голосование</button>';
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
});


