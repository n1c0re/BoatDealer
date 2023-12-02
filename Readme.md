В /server/index.js добавить ссылку на БД(У меня была elephantsql.com(PostgreSQL))
ссылка там выглядит так postgres://ryybxvwa:plLNzVAXdkNrdAsorzJ5aWNOCaDF31g_@snuffleupagus.db.elephantsql.com/ryybxvwa

Потом одним терминалом зайти в /client
Написать npm i, после установки npm run dev

Другим терминалом в /server
Написать npm i, после установки npx nodemon server.js
Иногда сервер может крашнуться или просто бд тупить, тогда просто ctrl+s в server.js


В BD.txt запросы для настройки БД

Из пользователей будет 
логин - admin, пароль - admin
        user1           user1
        seller1         seller1