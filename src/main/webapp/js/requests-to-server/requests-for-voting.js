
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
    location.reload();
}

function viewStatistics(pathToServer) {
    $('#stat').modal();
    var requestToServer = new XMLHttpRequest();
    requestToServer.open("GET", pathToServer, true);   //Указываем адрес GET-запроса
    requestToServer.onload = function (){             //Функция которая отправляет запрос на сервер для получения всех студентов
        var parsedItem = JSON.parse(this.responseText);
        var itemsTable = document.getElementById('all-elements-view'); //получаем элемент по Id
        itemsTable.innerHTML = '';      //очищаем таблицу от устаревших данных
        parsedItem._embedded.vote.forEach(function(item)  {
            console.log(item);
            var name = document.createElement('td'); //создаем элемент ячейку с названием для таблицы
            name.innerHTML =  item['name'] ;     //внедряем название предмета, полученное с сервера
            var count = document.createElement('td');
            count.innerHTML = item['count'];
            var elementRow = document.createElement('tr'); /// /создаем строку таблицы
            elementRow.appendChild(name);      //помещаем обе ячейки в строку
            elementRow.appendChild(count);
            itemsTable.appendChild(elementRow);           //помещаем строку в таблицу
        });
        $('table').filterTable({minRows: 0});
        $("#view-table").tablesorter();
    };
    requestToServer.send(null);
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

function setStatusClose(name) {
    $.ajax({
        type: 'GET',
        url: "/voting/search/setStatusClose?name=" + name.replace(" ", "%20")
    });
    location.reload();
}


function setStatusOpen(name) {
    $.ajax({
        type: 'GET',
        url: "/voting/search/setStatusOpen?name=" + name.replace(" ", "%20")
    });
    location.reload();
}

function createLink(path) {
    path = path.replace("voting/", "voting.html?");
    return path;
}

$(function(){
    $('#adding').on('click', function(){
        var textBox = document.createElement("input");
        textBox.setAttribute("type", "text");
        textBox.setAttribute("class", "form-control");
        $('#parent').append(textBox);
    });
});


$(document).ready(function() {
    var requestToServer = new XMLHttpRequest();
    requestToServer.open("GET", "/voting/", true);
    requestToServer.onload = function (){
        var parsedItem = JSON.parse(this.responseText);
        var itemsTable = document.getElementById('all-items');
        itemsTable.innerHTML = '';
        parsedItem._embedded.voting.forEach(function(item)  {
            var status = item['status'];
            var name = document.createElement('td');
            name.innerHTML =  item['name'] ;
            var linkForVote = document.createElement('td');
            linkForVote.innerHTML = '<a href=' + createLink(item['_links']['self']['href']) + '\>Ссылка на голосование</a>';
            var statusHtml = document.createElement('td');
            var operations = document.createElement('td');
            if (status == false){
                statusHtml.innerHTML = "Закрыто";
                operations.innerHTML =
                    '<div class="buttons"><button class="btn btn-primary btn-xs" onclick="viewStatistics(\'' + item['_links']['votes']['href'] + '\')">Статистика </button>' +
                    '<button class="btn btn-primary btn-xs" onclick="deleteVoting(\'' + item['name'] + '\')">Удалить</button>'+
                    '<button class="btn btn-primary btn-xs" onclick="setStatusOpen(\'' + item['name'] + '\')">Открыть голосование</button> </div>';
            } else {
                statusHtml.innerHTML = "Открыто";
                operations.innerHTML =
                    '<div class="buttons"><button class="btn btn-primary btn-xs" onclick="viewStatistics(\'' + item['_links']['votes']['href'] + '\')">Статистика </button>' +
                    '<button class="btn btn-primary btn-xs" onclick="deleteVoting(\'' + item['name'] + '\')">Удалить</button>'+
                    '<button class="btn btn-primary btn-xs" onclick="setStatusClose(\'' + item['name'] + '\')">Закрыть голосование</button> </div>';
            }
            var elementRow = document.createElement('tr');
            elementRow.appendChild(name);
            elementRow.appendChild(linkForVote);
            elementRow.appendChild(statusHtml);
            elementRow.appendChild(operations);
            itemsTable.appendChild(elementRow);
        });
        $('table').filterTable({minRows: 0});
        $("#all-items-table").tablesorter();
    };
    requestToServer.send(null);
});





