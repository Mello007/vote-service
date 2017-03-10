function getDataAboutVote() {
    var idStructure = window.location.href.split('?')[1];
    var priceRequest = new XMLHttpRequest();
    priceRequest.open("GET", "/voting/" + idStructure, true);   //Указываем адрес GET-запроса
    priceRequest.onload = function (item){             //Функция которая отправляет запрос на сервер для получения всех студентов
        var values = JSON.parse(this.responseText);
        document.getElementById('name').innerHTML = values['name'];
        var votes = values['votes'];
        var table = document.getElementById('all-items-voting');
        votes.forEach(function (vote) {
            var itemNameElement = document.createElement('td'); //создаем элемент ячейку с названием для таблицы
            itemNameElement.innerHTML =  vote['name'] ;     //внедряем название предмета, полученное с сервера
            var itemPriceElement = document.createElement('td');
            itemPriceElement.innerHTML = vote['count'];
            var operations = document.createElement('td');
            operations.innerHTML =
                '<button class="btn btn-primary btn-xs" onclick="deleteVoting(\'' + item['name'] + '\')">Голосовать</button>';
            var elementRow = document.createElement('tr');
            elementRow.appendChild(itemNameElement);    
            elementRow.appendChild(itemPriceElement);
            elementRow.appendChild(operations);
            table.appendChild(elementRow);
        });
    };
    priceRequest.send(null);
}

function addVoteItem(name) {
    $.ajax({
        type: "POST",
        url: "/vote/add",
        contentType: "application/json",
        dataType: 'json',
        data: name
    });
}


$(document).ready(function() {
    getDataAboutVote();

});

