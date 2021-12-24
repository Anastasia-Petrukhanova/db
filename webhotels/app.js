//ѕолучаем модуль 
const express = require("express");
//создаем приложение
const app = express();
//устанавливаем обработчик дл€ маршрута "/"
app.get("/", function (request, response) {
    response.end("Hello from Express");
});
//начинаем прослушивать порт 3000
app.listen(3000);
