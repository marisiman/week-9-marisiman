[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/jmQFTmFT)


<h1>WEEKLY ASSIGNMENT - WEEK 9</h1>


<div>
<h2>About Week-9</h2>

<p>1. Create table in MySQL based on the given requirements
</p>


    CREATE TABLE `pembeli` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(10) NOT NULL,
    `nomorhp` varchar(12) NOT NULL,
    `address` text NOT NULL,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



    CREATE TABLE `orderanss` (
    `id` int NOT NULL AUTO_INCREMENT,
    `user_id` int NOT NULL,
    `spice_name` text NOT NULL,
    `types` enum('cash','e-payment') NOT NULL,
    `amount_kg` double NOT NULL,
    `rupiah_id` int NOT NULL,
    PRIMARY KEY (`id`),
    KEY `orderanss_FK` (`user_id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

</br></br>

<p>2. Create a simple API Server using Node js, TypeScript, and Express that allows user to perform basic CRUD operation on product implementation.
</p>

 
    HTTP Method
    
    `POST`: Used for creating new assets.
    `GET`: Used for retrieving assets.
    `PUT`: Used for updating assets.
    `DELETE`: Used for deleting assets.
        

</div>

### ---

<div>
<h2>Add Tools</h2>

<h3>MySQL</h3>
<p>MySQL, which is read "MY-ES-KYOO-EL" is an open-source database management system that uses basic commands or a programming language in the form of a structured query language (SQL) which is quite popular in the world of technology. MySQL is useful as a database.</p>

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


`you can check here` :arrow_right: [assignment-week9](https://lucky-eel-panama-hat.cyclic.cloud)


</div>







---

<h5 style = "text-align : center">Thanks</h5></br>
<p style = "text-align : center"><i>`copyright 2023 by Iman`</i></p>