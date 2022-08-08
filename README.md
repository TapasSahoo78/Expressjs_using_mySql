# Expressjs_using_mySql

1. CREATE DATABASE node_restapi;

2. CREATE TABLE `items` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);
  
ALTER TABLE `items`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
  
  
3. INSERT INTO `items` (`id`, `title`, `body`) VALUES
(1, 'Title 1', 'Body 1'),
(2, 'Title 2', 'Body 2'),
(3, 'Title 3', 'Body 3'),
(4, 'Title 4', 'Body 4');

4. Create node app :

mkdir my-app

cd my-app

npm init

5.Install express mysql :
npm install --save express mysql

6.Create app.js file:
app.js --
write your cod.......


7.node app.js
8.Now, Go to your web browser, type the given URL and check it's working:
http://localhost:3000



9. Run Api :::
a. Method:GET
URL: http://localhost:3000/api/items

b.Method:GET
URL: http://localhost:3000/api/items/{id}

c.Method:POST
URL: http://localhost:3000/api/items
Data: 
{
	"title": "node js title",
	"body": "node js body"
}

d.Method:PUT
URL: http://localhost:3000/api/items/{id}
Data: 
{
	"title": "node js title",
	"body": "node js body"
}

e.Method:DELETE
URL: http://localhost:3000/api/items/{id}




<!-- User Section -->
1. CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
  
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

2. localhost:3000 : Fillup form...
Got body: [Object: null prototype] { first_name: 'Hardik', last_name: 'Savani', email: 'itsolutionstuff@gmail.com' }



3. // http://localhost:3000/users

{
  "status": 200,
  "error": null,
  "response": [
    {
      "id": 1,
      "first_name": "Tapas",
      "last_name": "Sahoo",
      "email": "tapas@admin.com"
    }
  ]
}
