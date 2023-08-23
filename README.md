[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/jmQFTmFT)


<h1>WEEKLY ASSIGNMENT - WEEK 9</h1>


<div>
<h2>About Week-9</h2>

<p>1. Create table in MySQL based on the given requirements
</p>


    -- railway.users definition

    CREATE TABLE `users` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,
    `name` text NOT NULL,
    `nomorPhone` text NOT NULL,
    `address` text NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `id` (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--

    -- railway.transactions definition

    CREATE TABLE `transactions` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,
    `user_id` int NOT NULL,
    `type` text NOT NULL,
    `amount` double NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `id` (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

</br></br>

<p>2. Create a simple API Server using Node js, TypeScript, and Express that allows user to perform basic CRUD operation on product implementation.
</p>

 
    HTTP Method
    
    `POST`: Used for creating new assets.
    `GET`: Used for retrieving assets.
    `PUT`: Used for updating assets.
    `DELETE`: Used for deleting assets.
--    

- GET All : "https://rich-cap-toad.cyclic.cloud/users/"

        "SELECT*FROM `railway`.users"


- GET by Id : "https://rich-cap-toad.cyclic.cloud/users/:id"

        SELECT 
                u.name , 
                u.address ,
                sum(case when o.type = 'income' then o.amount else -o.amount end) 
                as balance,
                sum(case when o.type ='expense' then o.amount else 0 end) as expense
        FROM 
                railway.users as u 
                left join railway.transactions as o on u.id = o.user_id 
        WHERE
                u.id = ?
                GROUP BY u.id;


- POST : "https://rich-cap-toad.cyclic.cloud/users/"

        INSERT INTO railway.users
        (id, name, nomorPhone, address)
        VALUES(?, ?, ?, ?);


- POST : "https://rich-cap-toad.cyclic.cloud/transactions/"

        INSERT INTO railway.transactions
        (user_id, type, amount)
        VALUES(?, ?, ?);


- PUT : "https://rich-cap-toad.cyclic.cloud/transactions/:id"

        UPDATE railway.transactions
        SET user_id=?, type=?, amount=?, 
        WHERE id=? ;

- DELETE : "https://rich-cap-toad.cyclic.cloud/transactions/:id"

        DELETE FROM railway.transactions
        WHERE id=? ;    



</div>

### ---

<div>
<h2>Add Tools</h2>

<h3>MySQL</h3>
<p>MySQL, which is read "MY-ES-KYOO-EL" is an open-source database management system that uses basic commands or a programming language in the form of a structured query language (SQL) which is quite popular in the world of technology. MySQL is useful as a database.</p>

<h3>Railway</h3>
<p>Media for build database from MySQL to useful server deploy a database.</p>

<h3>Typescript / JavaScript / ExpressJs</h3>
<p>If you are here I am assuming you already know what expressJs, javascript, node, and typescript are. I am also assuming that you have node and npm installed. So I will not go in deep about that.</p>


<h3>Postman</h3>
<p>Postman is a computer device used by developers as a test application programming interface (API). Makes the developer's job easier by building, testing, and modifying APIs.
</p>

<h3>Cyclic</h3>
<p> Build something cool, learn how to start fresh or deploy an existing project with Cyclic.
</p>

</div>

[cyclic.sh](https://cyclic.sh/)



### ---
</div>
<h2>Deployment</H2>

<h3> Content Deploy Use Cyclic.</h3>
<p>The project has been successfully deployed using 
</p>


`you can check here` 

- :arrow_right: [assignment-week8](https://careful-leotard-moth.cyclic.cloud/spices/)
- :arrow_right: [assignment-week9](https://rich-cap-toad.cyclic.cloud/)


</div>







---

<h5 style = "text-align : center">Thanks</h5></br>
<p style = "text-align : center"><i>`copyright 2023 by Iman`</i></p>
