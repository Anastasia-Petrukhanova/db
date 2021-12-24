FROM node:12

# Папка приложения
#ARG APP_DIR=server
RUN mkdir -p /urs/webhotel
WORKDIR /urs/webhotel

# Установка зависимостей
COPY package*.json ./
RUN npm install
# Для использования в продакшне
# RUN npm install --production

# Копирование файлов проекта
COPY . /urs/webhotel

# Уведомление о порте, который будет прослушивать работающее приложение
EXPOSE 3000

# Запуск проекта
CMD ["npm", "start"]