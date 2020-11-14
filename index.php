<?php
//Andrew Murphy afm9yy
//Salwa Malik sm5zx
//David Yoon djy6cg

require('connectdb.php');
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>coffee.io | Welcome</title>
        <link rel="stylesheet" href="static/style.css">
    </head>
    <body>
        <header>
            <div class="container">
               <div id="branding">
                <a href="index.php"><img src="static/img/mug.png" title="Home" alt="mug clicked takes you to home page"></a>
               </div>
               <nav>
                   <u1>
                    <li><a href="signup.html">Sign Up</a></li>
                    <li><a href="login.php">Login</a></li>
                    <li><a href="static/../about.html">About</a></li>
                   </u1>
               </nav>
            </div>
        </header>

        <section id="showcase">
            <div class="container">
                <h1>coffee.io</h1>
                <p>Get Coffee Delivered!</p>
            </div>
        </section>

        <section id="boxes">
            <div class="container">
                <div class="box">
                    <a href="find.html"><img src="static/img/store.png" title="Locating a Coffee Shop" alt="coffee shop clicked takes you to locating page"></a>
                    <h3>Find a Coffee Shop</h3>
                </div> 
                <div class="box">
                    <a href="order.html"><img src="static/img/cafe.png" title="Order" alt="menu clicked takes you to order page"></a>
                    <h3>Order From Menu</h3>
                </div>
                <div class="box">
                    <a href="receive.html"><img src="static/img/foodtruck.png" title="Receive" alt="truck clicked takes you to receive page"></a>
                    <h3>Receive Your Items</h3>
                </div>
        </section>
        <footer>
            <p>coffee.io, Copyright &copy; 2020</p>
        </footer>
    </body>
</html>