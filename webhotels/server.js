//Получаем модуль
const express = require("express");
//создаем приложение
const app = express();
app.use(express.static('images'));

//const helmet = require('helmet')
//app.use(helmet.frameguard({ action: 'deny' }));
//const { auth } = require('express-openid-connect');
//require('dotenv').config();

//const config = {
//    authRequired: false,
//    auth0Logout: true,
//    secret: process.env.SECRET,
//    baseURL: process.env.BASEURL,
//    clientID: process.env.clientID,
//    issuerBaseURL: process.env.ISSUER
//};

//app.use(auth(config));

const jsonParser = express.json();

var Connection = require('tedious').Connection;
//var Request = require('tedious').Request;
//var TYPES = require('tedious').TYPES;
var configdb = {
    server: 'DESKTOP-UVAF9LC',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'st077348', //update me
            password: 'fju9520tvao5s00'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        database: 'for_project',  //update me
        rowCollectionOnRequestCompletion: true,
        rowCollectionOnDone: true
    }
};

var connection = new Connection(configdb);
connection.on('connect', function (err) {
    if (err) {
        stConnect = "Ошибка подключения:" + err;
        connected = false;
    } else {
        stConnect = "Успешно подключились.";
        connected = true;
        console.log("connect");
    }
});


connection.connect();

var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

function beginTransaction() {
    connection.beginTransaction((err) => {
        if (err) {
            // If error in begin transaction, roll back!
            rollbackTransaction(err);
        } else {
            console.log('beginTransaction() done');
            // If no error, commit transaction!
            commitTransaction();
        }
    });
}
function rollbackTransaction(err) {
    console.log('transaction err: ', err);
    connection.rollbackTransaction((err) => {
        if (err) {
            console.log('transaction rollback error: ', err);
        }
    });
}
function commitTransaction() {
    connection.commitTransaction((err) => {
        if (err) {
            console.log('commit transaction err: ', err);
        }
        console.log('commitTransaction() done!');
        console.log('DONE!');
    });
}

///+
function InsertUser(loginUser, passUser, mailU, phoneU, iU, fU, oU) {
    sql = "INSERT INTO Client (familia, name, patronymic, mail, phone, login, password) VALUES (@fam, @name, @pat, @mail, @phone, @log, @pas)";
    request = new Request(sql, function (err, rowCount) {
        if (err) {
            console.log(err);
        } else {
            beginTransaction();
        }

    });
    request.addParameter('fam', TYPES.NVarChar, fU);
    request.addParameter('name', TYPES.NVarChar, iU);
    request.addParameter('pat', TYPES.NVarChar, oU);
    request.addParameter('mail', TYPES.NVarChar, mailU);
    request.addParameter('phone', TYPES.NVarChar, phoneU);
    request.addParameter('log', TYPES.NVarChar, loginUser);
    request.addParameter('pas', TYPES.NVarChar, passUser);
    connection.execSql(request);
}

{/*function InsertHistory (idBook) {
    sql3 = "INSERT INTO History_opr (id_book, id_employee, status, time) VALUES (@idBook, nuul, N'Ожидается подтверждение', getdate())";
    request3 = new Request(sql1, function (err, rowCount) {
        if (err) {
            console.log(err);
        } else {
            beginTransaction();
        }
    });
    request3.addParameter('idBook', TYPES.UniqueIdentifier, idBook);
    connection.execSql(request3);
}*/}

///?????????
function InsertBook(User, Room, Start, End) {
    sql1 = "INSERT INTO Book (id_client, id_room, [start], [end]) VALUES (@idClient, @idRoom, @dStart, @dEnd)";
    request1 = new Request(sql1, function (err, rowCount) {
        if (err) {
            console.log(err);
        } else {
            beginTransaction();
        }
    });
    request1.addParameter('idClient', TYPES.UniqueIdentifier, User);
    request1.addParameter('idRoom', TYPES.Int, Room);
    request1.addParameter('dStart', TYPES.Date, Start);
    request1.addParameter('dEnd', TYPES.Date, End);
    console.log(sql1);
    {/*request1.on('doneInProc', function (rowCount, more, rows) {
        var idBook = "";
        sql2 = "select Book.id_key from Book where Book.start = '";
        sql2 += Start;
        sql2 += "' and Book.end = '";
        sql2 += End;
        sql2 += "' and Book.id_client like '";
        sql2 += User;
        sql2 += "and Book.id_room like '";
        sql2 += Room;
        sql2 += "'";
        request2 = new Request(sql2, function (err) {
            if (err) {
                console.log(err);
            }
        });
        var result = "";
        var Resrows = [];
        request2.on('row', function (columns) {
            console.log('row');
            columns.forEach(function (column) {
                if (column.value === null) {
                    console.log('NULL');
                } else {
                    result += column.value + " ";
                    idBook = column.value;
                }
            });
            console.log(result);
            result = "";
        });
        request2.on('doneInProc', function (rowCount, more, rows) {
            console.log(rowCount + ' rows returned');
            console.log(rows);
            sql3 = "INSERT INTO History_opr (id_book, id_employee, status, [time]) VALUES (@idBook, null, N'Ожидается подтверждение', getdate())";
            request3 = new Request(sql1, function (err, rowCount) {
                if (err) {
                    console.log(err);
                } else {
                    beginTransaction();
                }
            });
            request3.addParameter('idBook', TYPES.UniqueIdentifier, idBook);
            connection.execSql(request3);
            Resrows = rows.slice;
            console.log(' rows returned');
            console.log(Resrows);
            //response.render("ltnomer", { noms: rows });;
        });
        console.log("req2")
        connection.execSql(request2);
    });*/}
    //console.log("req3")
    connection.execSql(request1);

    {/*var idBook = "";
    sql2 = "select Book.id_key from Book where Book.start = '";
    sql2 += Start;
    sql2 += "' and Book.end = '";
    sql2 += End;
    sql2 += "' and Book.id_client like '";
    sql2 += User;
    sql2 += "and Book.id_room like '";
    sql2 += Room;
    sql2 += "'";
    request2 = new Request(sql2, function (err) {
        if (err) {
            console.log(err);
        }
    });
    var result = "";
    var Resrows = [];
    request2.on('row', function (columns) {
        console.log('row');
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + " ";
                idBook = column.value;
            }
        });
        console.log(result);
        result = "";
    });
    request2.on('doneInProc', function (rowCount, more, rows) {
        console.log(rowCount + ' rows returned');
        console.log(rows);
        Resrows = rows.slice;
        console.log(' rows returned');
        console.log(Resrows);
        //response.render("ltnomer", { noms: rows });;
    });

    connection.execSql(request2);*/}

    {/*sql3 = "INSERT INTO History_opr (id_book, id_employee, status, time) VALUES (@idBook, nuul, N'Ожидается подтверждение', getdate())";
    request3 = new Request(sql1, function (err, rowCount) {
        if (err) {
            console.log(err);
        } else {
            beginTransaction();
        }
    });
    request3.addParameter('idBook', TYPES.UniqueIdentifier, idBook);
    connection.execSql(request3);*/}
}

app.set("view engine","pug");
///+
app.post("/user", jsonParser, function (request, response) {
    console.log(request.body);
    if (!request.body) return response.sendStatus(400);
    response.json(request.body);
});

//let arRoom = [{
//    filtr: 1, id: 1, number: 125, cost: 20000, capacity: 2, status: 'Доступна', id_hotel: 1, photo: 'nom1.png',
//    utug: 1, safe: 1, tv: 0, posuda: 1, fen: 0, wifi: 0, holod: 0, condi: 0, lamp: 1, thain: 0
//},
//{
//    filtr: 1, id: 2, number: 14, cost: 20000, capacity: 1, status: 'Доступна', id_hotel: 1, photo: 'nom2.png',
//    utug: 0, safe: 0, tv: 0, posuda: 1, fen: 0, wifi: 0, holod: 0, condi: 0, lamp: 1, thain: 1
//},
//{
//    filtr: 1, id: 3, number: 234, cost: 30000, capacity: 2, status: 'Доступна', id_hotel: 1, photo: 'nom3.png',
//    utug: 1, safe: 1, tv: 0, posuda: 1, fen: 0, wifi: 1, holod: 0, condi: 0, lamp: 0, thain: 0
//},
//{
//    filtr: 1, id: 4, number: 65, cost: 15000, capacity: 1, status: 'Доступна', id_hotel: 1, photo: 'nom4.png',
//    utug: 0, safe: 1, tv: 0, posuda: 1, fen: 0, wifi: 0, holod: 0, condi: 1, lamp: 0, thain: 0
//},
//{
//    filtr: 1, id: 5, number: 75, cost: 60000, capacity: 2, status: 'Доступна', id_hotel: 1, photo: 'nom5.png',
//    utug: 1, safe: 1, tv: 1, posuda: 1, fen: 0, wifi: 0, holod: 1, condi: 0, lamp: 1, thain: 1
//},
//{
//    filtr: 1, id: 6, number: 33, cost: 20000, capacity: 2, status: 'На ремонте', id_hotel: 1, photo: 'nom6.png',
//    utug: 0, safe: 0, tv: 0, posuda: 1, fen: 1, wifi: 1, holod: 0, condi: 1, lamp: 0, thain: 1
//},
//{
//    filtr: 1, id: 7, number: 777, cost: 30000, capacity: 3, status: 'Доступна', id_hotel: 1, photo: 'nom7.png',
//    utug: 0, safe: 1, tv: 1, posuda: 1, fen: 0, wifi: 0, holod: 1, condi: 1, lamp: 1, thain: 0
//},
//{
//    filtr: 1, id: 8, number: 666, cost: 25000, capacity: 2, status: 'Доступна', id_hotel: 1, photo: 'nom8.png',
//    utug: 0, safe: 0, tv: 1, posuda: 1, fen: 1, wifi: 0, holod: 0, condi: 0, lamp: 0, thain: 1
//},
//{
//    filtr: 1, id: 9, number: 13, cost: 20000, capacity: 2, status: 'Доступна', id_hotel: 1, photo: 'nom9.png',
//    utug: 0, safe: 1, tv: 0, posuda: 1, fen: 1, wifi: 1, holod: 1, condi: 0, lamp: 0, thain: 0
//},
//{
//    filtr: 1, id: 10, number: 24, cost: 10000, capacity: 2, status: 'На ремонте', id_hotel: 1, photo: 'nom10.png',
//    utug: 0, safe: 0, tv: 1, posuda: 1, fen: 0, wifi: 0, holod: 1, condi: 1, lamp: 0, thain: 0
//},
//{
//    filtr: 1, id: 11, number: 356, cost: 50000, capacity: 3, status: 'Доступна', id_hotel: 1, photo: 'nom11.png',
//    utug: 0, safe: 0, tv: 1, posuda: 1, fen: 1, wifi: 1, holod: 0, condi: 0, lamp: 0, thain: 0
//},
//{
//    filtr: 1, id: 12, number: 155, cost: 70000, capacity: 4, status: 'Доступна', id_hotel: 1, photo: 'nom12.png',
//    utug: 1, safe: 0, tv: 0, posuda: 1, fen: 1, wifi: 1, holod: 1, condi: 0, lamp: 0, thain: 12
//    }];

//let arOrdet = [{ nomer: 1, dorder: "21.12.2021", idclient: 1, dstart: "03.01.2022", dend: "07.01.2022", romm: arRoom[0] }];

const urlencodedParser = express.urlencoded({ extended: false });

//устанавливаем обработчик для маршрута "/"
app.get("/", function (request, response) {
    response.render("index2");
});

///+
app.get("/logotype.pug", function (request, response) {
    response.render("logotype", { conn: stConnect });
});

var tUser = 0; /////////////////////////////
var idUser = "";
var dStart;
var dEnd;
///+
app.get("/menu.pug", function (request, response) {
    response.render("menu", { typeUser: tUser });
});

///+
app.get("/notehotel.pug", function (request, response) {
    response.render("notehotel");;
});

///+
app.get("/Nomers.pug", function (request, response) {
    response.render("Nomers");;
});

///+
app.get("/flnomer.pug", function (request, response) {
    response.render("flnomer");;
});

////+
app.get("/ltnomer.pug", function (request, response) {
    //for (var i = 0; i < arRoom.length; i++) {
    //    arRoom[i].filtr = 1;
    //}
    request = new Request("SELECT Room.id, Room.number, Room.photo, Room.capacity, string_agg(CONCAT(Extra.name, ''), ', ') as extra, Room.cost FROM Room inner join Room_Extra on Room.id = Room_Extra.id_room inner join Extra on Extra.id = Room_Extra.id_extra group by Room.id, Room.number, Room.photo, Room.capacity, Room.cost", function (err) {
        if (err) {
            console.log(err);
        }
    });
    var result = "";
    var Resrows = [];
    request.on('row', function (columns) {
        console.log('row');
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + " ";
            }
        });
        console.log(result);
        result = "";
    });
    request.on('doneInProc', function (rowCount, more, rows) {
        console.log(rowCount + ' rows returned');
        console.log(rows);
        Resrows = rows.slice;
        console.log(' rows returned');
        console.log(Resrows);
        response.render("ltnomer", { noms: rows });;
    });
    connection.execSql(request);
});

///+
app.get("/myorders.pug", function (request, response) {
    response.render("myorders");;
});

///+
app.get("/flmyorder.pug", function (request, response) {
    response.render("flmyorder");;
});

///+
app.get("/ltmyorders.pug", function (request, response) {
    //const nomid = request.params.id;
    sql = "select (convert(nvarchar, [Book].[start]) + ' - ' + convert(nvarchar, [Book].[end])), [History_opr].[status], [Room].[number]\n" +
        "from [Book]\n" +
        "\tinner join [History_opr] on [Book].[id_key] = [History_opr].[id_book]\n" +
        "\tinner join [Room] on [Room].[id] = [Book].[id_room]\n" +
        "\tinner join [Client] on [Client].[id_key] = [Book].[id_client]\n" +
        "where [Client].id_key like '";
    sql += idUser;
    sql += "'";
    request = new Request(sql, function (err) {
        //request = new Request("SELECT Room.id, Room.number, Room.photo, Room.capacity, string_agg(CONCAT(Extra.name, ''), ', ') as extra, Room.cost FROM Room inner join Room_Extra on Room.id = Room_Extra.id_room inner join Extra on Extra.id = Room_Extra.id_extra group by Room.id, Room.number, Room.photo, Room.capacity, Room.cost", function (err) {
        if (err) {
            console.log(err);
        }
    });
    var result = "";
    var Resrows = [];
    request.on('row', function (columns) {
        console.log('row');
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + " ";
            }
        });
        console.log(result);
        result = "";
    });
    request.on('doneInProc', function (rowCount, more, rows) {
        console.log(rowCount + ' rows returned');
        console.log(rows);
        Resrows = rows.slice;
        console.log(' rows returned');
        console.log(Resrows);
        response.render("ltmyorders", { noms: rows });;
    });
    connection.execSql(request);

    //response.render("ltmyorders");;
});


///???
app.get("/creatoredr.pug", function (request, response) {
    response.render("creatoredr");;
});

///???
app.get("/flcreatorder.pug", function (request, response) {
    response.render("flcreatorder");;
});

///+
app.post("/addbron/:id", urlencodedParser, function (request, response) {
    const nomid = request.params.id;
    sql = "select Room.capacity, Room.cost, string_agg(CONCAT(Extra.name, ''), ', ') from Room inner join Room_Extra on Room.id = Room_Extra.id_room inner join Extra on Extra.id = Room_Extra.id_extra where Room.id = ";
    sql += nomid;
    sql += " group by Room.capacity, Room.cost"
    request = new Request(sql, function (err) {
    //request = new Request("SELECT Room.id, Room.number, Room.photo, Room.capacity, string_agg(CONCAT(Extra.name, ''), ', ') as extra, Room.cost FROM Room inner join Room_Extra on Room.id = Room_Extra.id_room inner join Extra on Extra.id = Room_Extra.id_extra group by Room.id, Room.number, Room.photo, Room.capacity, Room.cost", function (err) {
        if (err) {
            console.log(err);
        }
    });
    var result = "";
    var Resrows = [];
    request.on('row', function (columns) {
        console.log('row');
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + " ";
            }
        });
        console.log(result);
        result = "";
    });
    request.on('doneInProc', function (rowCount, more, rows) {
        console.log(rowCount + ' rows returned');
        console.log(rows);
        Resrows = rows.slice;
        console.log(' rows returned');
        console.log(Resrows);
        response.render("neworder", { dStart, dEnd, noms: rows, idnom: nomid });;
    });
    connection.execSql(request);

    //response.render("neworder",{ idnom: nomid, noms: rows });
});

////??????
app.post("/commBron", urlencodedParser, function (request, response) {
    InsertBook(idUser, request.body.idNom, dStart, dEnd);
    response.end('Бронирование отправлено!')
});

///+
app.post("/bookFind", urlencodedParser, function (request, response) {
    dStart = request.body.Start;
    dEnd = request.body.End;

    sql = "select [Room].[id], [Room].[number], [Room].[photo], [Room].[capacity], string_agg(CONCAT([Extra].[name], ''), ', '), [Room].[cost], max('addbron/'+CONVERT(varchar, Room.id))\n" +
        "from [Room] \n" +
        "\tinner join [Room_Extra] on [Room].[id] = [Room_Extra].[id_room]\n" +
        "\tinner join [Extra] on [Extra].[id] = [Room_Extra].[id_extra]\n" +
        "where [Room].[capacity] like '%";
    sql += request.body.Cap;
    sql += "%'\n" +
        "\tand [Room].[cost] <= "
    sql += request.body.Cost;
    sql += "\n" +
        "\tand [Room].[id] not in (\n" +
        "\t\tselect [Room].[id]\n" +
        "\t\tfrom [Room]\n" +
        "\t\t\tinner join [Book] on [Room].[id] = [Book].[id_room]\n" +
        "\t\t\tinner join [History_opr] on [Book].[id_key] = [History_opr].[id_book]\n" +
        "\t\twhere \n" +
        "\t\t\t(([Book].[start] >= '";
    sql += request.body.Start;
    sql += "' and [Book].[end] >= '";
    sql += request.body.End;
    sql += "' and [Book].[start] <= '";
    sql += request.body.End;
    sql += "')\n" +
        "\t\t\tor ([Book].[start] <= '";
    sql += request.body.Start;
    sql += "' and [Book].[start] <= '";
    sql += request.body.End;
    sql += "' and [Book].[end] >= '";
    sql += request.body.End;
    sql += "' and [Book].[end] >= '";
    sql += request.body.Start;
    sql += "')\n" +
        "\t\t\tor ([Book].[start] <= '";
    sql += request.body.Start;
    sql += "' and [Book].[end] >= '";
    sql += request.body.Start;
    sql += "' and [Book].[end] <= '";
    sql += request.body.End;
    sql += "')\n" +
        "\t\t\tor ([Book].[start] >= '";
    sql += request.body.Start;
    sql += "' and [Book].[end] <= '";
    sql += request.body.End;
    sql += "'))\n" +
        "\t\t\tand [Room].[id] not in (\n" +
        "\t\t\t\tselect [Room].[id]\n" +
        "\t\t\t\tfrom [Room]\n" +
        "\t\t\t\t\tinner join [Book] on [Room].[id] = [Book].[id_room]\n" +
        "\t\t\t\t\tinner join [History_opr] on [Book].[id_key] = [History_opr].[id_book]\n" +
        "\t\t\t\twhere [History_opr].[status] like 'Бронирование отменено'))\n" +
        "group by [Room].[number], [Room].[capacity], [Room].[cost], [Room].[photo], [Room].[id] ";
    console.log(sql);
    count = 0;
    if (request.body.aUtug == 1) {
        if (count == 0) {
            sql += "having "
        }
        if (count > 0) {
            sql += 'and '
        }
        sql += "string_agg(CONCAT([Extra].[name], ''), ', ') like '%утюг%' "
        count += 1;
    }
    if (request.body.aSafe == 1) {
        if (count == 0) {
            sql += "having "
        }
        if (count > 0) {
            sql += 'and '
        }
        sql += "string_agg(CONCAT([Extra].[name], ''), ', ') like '%сейф%' "
        count += 1;
    }
    if (request.body.aTV == 1) {
        if (count == 0) {
            sql += "having "
        }
        if (count > 0) {
            sql += 'and '
        }
        sql += "string_agg(CONCAT([Extra].[name], ''), ', ') like '%телевизор%' "
        count += 1;
    }
    if (request.body.aPosuda == 1) {
        if (count == 0) {
            sql += "having "
        }
        if (count > 0) {
            sql += 'and '
        }
        sql += "string_agg(CONCAT([Extra].[name], ''), ', ') like '%посуда%' "
        count += 1;
    }
    if (request.body.aFen == 1) {
        if (count == 0) {
            sql += "having "
        }
        if (count > 0) {
            sql += 'and '
        }
        sql += "string_agg(CONCAT([Extra].[name], ''), ', ') like '%фен%' "
        count += 1;
    }
    if (request.body.aWiFi == 1) {
        if (count == 0) {
            sql += "having "
        }
        if (count > 0) {
            sql += 'and  '
        }
        sql += "string_agg(CONCAT([Extra].[name], ''), ', ') like '%Wi-Fi%' "
        count += 1;
    }
    if (request.body.aKholod == 1) {
        if (count == 0) {
            sql += "having "
        }
        if (count > 0) {
            sql += 'and '
        }
        sql += "string_agg(CONCAT([Extra].[name], ''), ', ') like '%холодильник%' "
        count += 1;
    }
    if (request.body.aKond == 1) {
        if (count == 0) {
            sql += "having "
        }
        if (count > 0) {
            sql += 'and '
        }
        sql += "string_agg(CONCAT([Extra].[name], ''), ', ') like '%кондиционер%' "
        count += 1;
    }
    if (request.body.aLamp == 1) {
        if (count == 0) {
            sql += "having "
        }
        if (count > 0) {
            sql += 'and '
        }
        sql += "string_agg(CONCAT([Extra].[name], ''), ', ') like '%настольная лампа%' "
        count += 1;
    }
    if (request.body.aChay == 1) {
        if (count == 0) {
            sql += "having "
        }
        if (count > 0) {
            sql += 'and'
        }
        sql += "string_agg(CONCAT([Extra].[name], ''), ', ') like '%электрочайник%' "
        count += 1;
    }
    console.log(sql);

    request = new Request(sql, function (err) {
        if (err) {
            console.log(err);
        }
    });
    var result = "";
    var Resrows = [];
    request.on('row', function (columns) {
        console.log('row');
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + " ";
            }
        });
        console.log(result);
        result = "";
    });
    request.on('doneInProc', function (rowCount, more, rows) {
        console.log(rowCount + ' rows returned');
        console.log(rows);
        Resrows = rows.slice;
        console.log(' rows returned');
        console.log(Resrows);
        response.render("ltcreatorder", { noms: rows });;
    });
    //console.log(rows);
    connection.execSql(request);
});

///+
app.post("/nomerfind", urlencodedParser, function (request, response) {

    sql = "select [Room].[id], [Room].[number], [Room].[photo], [Room].[capacity] , string_agg(CONCAT([Extra].[name], ''), ', '), [Room].[cost]\n" +
        "from [Room] \n" +
        "\tinner join [Hotel] on [Hotel].[id] = [Room].[id_hotel]\n" +
        "\tinner join [Room_Extra] on [Room].[id] = [Room_Extra].[id_room]\n" +
        "\tinner join [Extra] on [Extra].[id] = [Room_Extra].[id_extra]\n" +
        "where [Room].[capacity] like '%";
    sql += request.body.cntMest;
    sql += "%'\n" +
        "\tand [Room].[cost] <= "
    sql += request.body.Price;
    sql += "group by [Room].[number], [Room].[capacity], [Room].[cost], [Room].[photo], [Room].[id] ";
    count = 0;
    if (request.body.aUtug == 1) {
        if (count == 0) {
            sql += "having "
        }
        if (count > 0) {
            sql += 'and '
        }
        sql += "string_agg(CONCAT([Extra].[name], ''), ', ') like '%утюг%' "
        count += 1;
    }
    if (request.body.aSafe == 1) {
        if (count == 0) {
            sql += "having "
        }
        if (count > 0) {
            sql += 'and '
        }
        sql += "string_agg(CONCAT([Extra].[name], ''), ', ') like '%сейф%' "
        count += 1;
    }
    if (request.body.aTV == 1) {
        if (count == 0) {
            sql += "having "
        }
        if (count > 0) {
            sql += 'and '
        }
        sql += "string_agg(CONCAT([Extra].[name], ''), ', ') like '%телевизор%' "
        count += 1;
    }
    if (request.body.aPosuda == 1) {
        if (count == 0) {
            sql += "having "
        }
        if (count > 0) {
            sql += 'and '
        }
        sql += "string_agg(CONCAT([Extra].[name], ''), ', ') like '%посуда%' "
        count += 1;
    }
    if (request.body.aFen == 1) {
        if (count == 0) {
            sql += "having "
        }
        if (count > 0) {
            sql += 'and '
        }
        sql += "string_agg(CONCAT([Extra].[name], ''), ', ') like '%фен%' "
        count += 1;
    }
    if (request.body.aWiFi == 1) {
        if (count == 0) {
            sql += "having "
        }
        if (count > 0) {
            sql += 'and '
        }
        sql += "string_agg(CONCAT([Extra].[name], ''), ', ') like '%Wi-Fi%' "
        count += 1;
    }
    if (request.body.aKholod == 1) {
        if (count == 0) {
            sql += "having "
        }
        if (count > 0) {
            sql += 'and '
        }
        sql += "string_agg(CONCAT([Extra].[name], ''), ', ') like '%холодильник%' "
        count += 1;
    }
    if (request.body.aKond == 1) {
        if (count == 0) {
            sql += "having "
        }
        if (count > 0) {
            sql += 'and '
        }
        sql += "string_agg(CONCAT([Extra].[name], ''), ', ') like '%кондиционер%' "
        count += 1;
    }
    if (request.body.aLamp == 1) {
        if (count == 0) {
            sql += "having "
        }
        if (count > 0) {
            sql += 'and '
        }
        sql += "string_agg(CONCAT([Extra].[name], ''), ', ') like '%настольная лампа%' "
        count += 1;
    }
    if (request.body.aChay == 1) {
        if (count == 0) {
            sql += "having "
        }
        if (count > 0) {
            sql += 'and '
        }
        sql += "string_agg(CONCAT([Extra].[name], ''), ', ') like '%электрочайник%' "
        count += 1;
    }

    request = new Request(sql, function (err) {
        if (err) {
            console.log(err);
        }
    });
    var result = "";
    var Resrows = [];
    request.on('row', function (columns) {
        console.log('row');
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + " ";
            }
        });
        console.log(result);
        result = "";
    });
    request.on('doneInProc', function (rowCount, more, rows) {
        console.log(rowCount + ' rows returned');
        console.log(rows);
        Resrows = rows.slice;
        console.log(' rows returned');
        console.log(Resrows);
        response.render("ltnomer", { noms: rows });;
    });
    //console.log(rows);
    connection.execSql(request);
});

///+
app.get("/ltcreatorder.pug", function (request, response) {
    //sql = ""+"";
    request = new Request("SELECT Room.id, Room.number, Room.photo, Room.capacity, string_agg(CONCAT(Extra.name, ''), ', ') as extra, Room.cost, ('addbron/'+CONVERT(varchar, Room.id)) as faddbron FROM Room inner join Room_Extra on Room.id = Room_Extra.id_room inner join Extra on Extra.id = Room_Extra.id_extra group by Room.id, Room.number, Room.photo, Room.capacity, Room.cost", function (err) {
        if (err) {
            console.log(err);
        }
    });
    var result = "";
    var Resrows = [];
    request.on('row', function (columns) {
        console.log('row');
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + " ";
            }
        });
        console.log(result);
        result = "";
    });
    request.on('doneInProc', function (rowCount, more, rows) {
        console.log(rowCount + ' rows returned');
        console.log(rows);
        Resrows = rows.slice;
        console.log(' rows returned');
        console.log(Resrows);
        response.render("ltcreatorder", { noms: rows });;
    });
    connection.execSql(request);
});


app.get("/doneorder.pug", function (request, response) {
    response.render("doneorder");;
});

app.post("/sign", urlencodedParser, function (request, response) {
    InsertUser(request.body.log, request.body.pass, request.body.mail, request.body.phone, request.body.i, request.body.f, request.body.o);
    response.end("Регистрация прошла успешно. Войдите для дальнейшей работы");
});

app.get("/fldoneorder.pug", function (request, response) {
    response.render("fldoneorder");;
});

app.get("/ltdoneorder.pug", function (request, response) {
    sql = "select (convert(nvarchar, [Book].[start]) + ' - ' + convert(nvarchar, [Book].[end])), [History_opr].[status], [Room].[number], [Client].[login]\n" +
        "from [Book]\n" +
        "\tinner join [History_opr] on [Book].[id_key] = [History_opr].[id_book]\n" +
        "\tinner join [Room] on [Room].[id] = [Book].[id_room]\n" +
        "\tinner join [Client] on [Client].[id_key] = [Book].[id_client]\n";
    request = new Request(sql, function (err) {
        //request = new Request("SELECT Room.id, Room.number, Room.photo, Room.capacity, string_agg(CONCAT(Extra.name, ''), ', ') as extra, Room.cost FROM Room inner join Room_Extra on Room.id = Room_Extra.id_room inner join Extra on Extra.id = Room_Extra.id_extra group by Room.id, Room.number, Room.photo, Room.capacity, Room.cost", function (err) {
        if (err) {
            console.log(err);
        }
    });
    var result = "";
    var Resrows = [];
    request.on('row', function (columns) {
        console.log('row');
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + " ";
            }
        });
        console.log(result);
        result = "";
    });
    request.on('doneInProc', function (rowCount, more, rows) {
        console.log(rowCount + ' rows returned');
        console.log(rows);
        Resrows = rows.slice;
        console.log(' rows returned');
        console.log(Resrows);
        response.render("ltdoneorder", { noms: rows });;
    });
    connection.execSql(request);
    //response.render("ltdoneorder");;
});

///+
app.post("/loginUser", urlencodedParser, function (request, response) {

    if (!request.body) return response.sendStatus(400);
    var vPass = request.body.passr.toString();
    //console.log(vPass);
    if (request.body.aEmployee == 1) {
        sql = "select Employee.password, Employee.id_key from Employee where Employee.login like '";
        sql += request.body.loginr;
       sql += "'";
        request = new Request(sql, function (err) {
            if (err) {
                console.log(err);
            }
        });
        var result = "";
        var pPass;
        var Resrows = [];
        request.on('row', function (columns) {
            console.log('row');
            columns.forEach(function (column) {
                //console.log(column.metadata.colName);
                if (column.value === null) {
                    console.log('NULL');
                } else {
                    if (column.metadata.colName === "password") {
                        pPass=column.value;
                    }
                    else {
                        idUser = column.value;
                    }
                    //result += column.value + " ";
                    //pPass=column.value;
                    console.log(idUser)
                }
            });
            //console.log(result);
            //console.log("!!!!!!!!!!!"+pPass);
            //result = "";
        });
        request.on('doneInProc', function (rowCount, more, rows) {
            console.log(rowCount + ' rows returned');
            console.log(rows);
            Resrows = rows.slice;
            console.log(' rows returned');
            console.log(Resrows);
            if (rowCount == 0)
           {
               response.end("Неверный логин/Пройдите регистрацию");
               idUser = "";
            } else {
                if (rowCount == 1) {
                   //console.log(rows[0]);
                   //console.log("???????????" + pPass + "?" + vPass);
                  if (pPass === vPass)
                  {
                      response.end("Успех");
                      tUser = 2;
                  } else {
                      response.end("Неверный пароль");
                      idUser = "";
                  }
                } else {
                    response.end("Неверный логин/пароль")
                }
            }
           //response.render("ltnomer", { noms: rows });;
        });
        connection.execSql(request);

    } else {
        sql = "select Client.password, Client.id_key from Client where Client.login like '";
        sql += request.body.loginr;
        sql += "'";
        request = new Request(sql, function (err) {
            if (err) {
                console.log(err);
            }
        });
        var result = "";
        var pPass;
        var Resrows = [];
        request.on('row', function (columns) {
            console.log('row');
            columns.forEach(function (column) {
                //console.log(column.metadata.colName);
                if (column.value === null) {
                    console.log('NULL');
                } else {
                    if (column.metadata.colName === "password") {
                        pPass=column.value;
                    } else {
                        idUser = column.value;
                    }
                    //result += column.value + " ";
                    //pPass=column.value;
                }
            });
            console.log(result);
            console.log(idUser)
            result = "";
        });
        request.on('doneInProc', function (rowCount, more, rows) {
            console.log(rowCount + ' rows returned');
            console.log(rows);
            Resrows = rows.slice;
            console.log(' rows returned');
            console.log(Resrows);
            if (rowCount == 0)
            {
                response.end("Неверный логин/Пройдите регистрацию");
                idUser = "";
            } else {
                if (rowCount == 1) {
                    console.log(vPass);
                    //console.log(rows[0,0].metadata.value);
                    if (pPass === vPass)
                    {
                        response.end("Успех");
                        tUser = 1;
                    } else {
                        response.end("Неверный пароль");
                        idUser = "";
                    }
                } else {
                    response.end("Неверный логин/пароль")
                }
            }
           //response.render("ltnomer", { noms: rows });;
        });
        connection.execSql(request);
      //console.log(vPass+' '+pPass);
      //if (vPass === pPass) {
        //response.end('Успешно вошли')
      //} else {
        //  response.end(':(');
      //}

    }
});

app.get("/frmlogin.pug", function (request, response) {
//    console.log(request.oidc.isAuthenticated());
//    //res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    response.render("frmlogin");;
});

app.get("/frmregistr.pug", function (request, response) {
    response.render("frmregistr");;
});

app.get("/contacts.pug", function (request, response) {
    response.render("contacts");;
});

app.post("/findorder", urlencodedParser, function (request, response) {
    sql = "select (convert(nvarchar, [Book].[start]) + ' - ' + convert(nvarchar, [Book].[end])), [History_opr].[status], [Room].[number], [Client].[login]\n" +
        "from [Book]\n" +
        "\tinner join [History_opr] on [Book].[id_key] = [History_opr].[id_book]\n" +
        "\tinner join [Room] on [Room].[id] = [Book].[id_room]\n" +
        "\tinner join [Client] on [Client].[id_key] = [Book].[id_client]\n" +
        "where [Book].[start] >= '";
    sql += request.body.Dst;
    sql += "' and [Book].[end] <= '";
    sql += request.body.Den;
    sql += "'";
    console.log(sql);
    request = new Request(sql, function (err) {
        //request = new Request("SELECT Room.id, Room.number, Room.photo, Room.capacity, string_agg(CONCAT(Extra.name, ''), ', ') as extra, Room.cost FROM Room inner join Room_Extra on Room.id = Room_Extra.id_room inner join Extra on Extra.id = Room_Extra.id_extra group by Room.id, Room.number, Room.photo, Room.capacity, Room.cost", function (err) {
        if (err) {
            console.log(err);
        }
    });
    var result = "";
    var Resrows = [];
    request.on('row', function (columns) {
        console.log('row');
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + " ";
            }
        });
        console.log(result);
        result = "";
    });
    request.on('doneInProc', function (rowCount, more, rows) {
        console.log(rowCount + ' rows returned');
        console.log(rows);
        Resrows = rows.slice;
        console.log(' rows returned');
        console.log(Resrows);
        response.render("ltdoneorder", { noms: rows });;
    });
    connection.execSql(request);
});

app.post("/findmyorder", urlencodedParser, function (request, response) {
    sql = "select (convert(nvarchar, [Book].[start]) + ' - ' + convert(nvarchar, [Book].[end])), [History_opr].[status], [Room].[number]\n" +
        "from [Book]\n" +
        "\tinner join [History_opr] on [Book].[id_key] = [History_opr].[id_book]\n" +
        "\tinner join [Room] on [Room].[id] = [Book].[id_room]\n" +
        "\tinner join [Client] on [Client].[id_key] = [Book].[id_client]\n" +
        "where [Book].[start] >= '";
    sql += request.body.Dst;
    sql += "' and [Book].[end] <= '";
    sql += request.body.Den;
    sql += "' and [Client].[id_key] like '";
    sql += idUser;
    sql += "'";
    console.log(sql);
    request = new Request(sql, function (err) {
        //request = new Request("SELECT Room.id, Room.number, Room.photo, Room.capacity, string_agg(CONCAT(Extra.name, ''), ', ') as extra, Room.cost FROM Room inner join Room_Extra on Room.id = Room_Extra.id_room inner join Extra on Extra.id = Room_Extra.id_extra group by Room.id, Room.number, Room.photo, Room.capacity, Room.cost", function (err) {
        if (err) {
            console.log(err);
        }
    });
    var result = "";
    var Resrows = [];
    request.on('row', function (columns) {
        console.log('row');
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + " ";
            }
        });
        console.log(result);
        result = "";
    });
    request.on('doneInProc', function (rowCount, more, rows) {
        console.log(rowCount + ' rows returned');
        console.log(rows);
        Resrows = rows.slice;
        console.log(' rows returned');
        console.log(Resrows);
        response.render("ltmyorders", { noms: rows });;
    });
    connection.execSql(request);
})

//начинаем прослушивать порт 3000
app.listen(3000);
