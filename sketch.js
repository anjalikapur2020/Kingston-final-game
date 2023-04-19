var splashScreen
var gameState = "wait"
var playbutton, infobutton
var fish1rightimg, fish1leftimg, fish2leftimg, fish2rightimg
var playerfish, playerfishleftimg, playerfishrightimg, playerfishupimg, playerfishdownimg
var foodcount = 0
var enemycount = 0
// var playerLife=(windowWidth/4)
var playerLife = 50
var level2, level2pop, enemyGroup3, enemyGroup4, level3pop
var bgimg, randx, net, netimg,enemyGroup6,netGroup,enemyGroup1,enemyGroup2,fish1lefttimg
var count = 50
var count2, count3,foodGroup1,foodGroup2,enemygroup5,enemyGroup7,enemyGroup8,bgimg3
var timeleft = 60


function preload() {
    splashScreen = loadImage("FishQuestTitleScreen.gif")
    level1bgimg = loadImage("level1bg.gif")
    bgimg = loadImage("bg2.gif")
    bgimg3 = loadImage("level3.gif")

    // foodImages
    fish1rightimg = loadImage("fish1.gif")
    fish1lefttimg = loadImage("fish1left.gif")

    fish2rightimg = loadImage("fishright.gif")
    // fish2lefttimg = loadImage("fish.gif")

    // enemy images
    crabimg = loadImage("crab.gif")
    badfishimg = loadImage("badfish.gif")
    badfishupimg = loadImage("badfishup.gif")

    // playerfish left and right
    playerfishleftimg = loadImage("playerleft.gif")
    playerfishrightimg = loadImage("playerright.gif")
    playerfishupimg = loadImage("up.gif")
    playerfishdownimg = loadImage("down.gif")


    netimg = loadImage("net.gif")


// load sounds
level1bgmusic=loadSound("sound/bgl2.mp3")
level2bgmusic=loadSound("sound/bgl2.mp3")
level3bgmusic=loadSound("sound/bgl3.mp3")
foodeatmusic=loadSound("sound/foodeat.mp3")
enemyeatmusic=loadSound("sound/enemyeat.mp3")



}

function setup() {
    createCanvas(windowWidth, windowHeight)
    // playerLife=(width/4)
    count2 = width / 4
    count3 = width / 4


    playbutton = createImg("play1.png")
    playbutton.position(width / 2 + 100, height - height / 4.5)
    playbutton.size(200, 200)
    playbutton.hide()



    infobutton = createImg("redhow.png")
    infobutton.position(width / 2 - 200, height - height / 4.5)
    infobutton.size(200, 200)
    infobutton.hide()


    // playerfish Sprite

    playerfish = createSprite(50, height - 100)
    playerfish.scale = 0.15
    playerfish.addImage("right", playerfishrightimg)
    playerfish.addImage("left", playerfishleftimg)
    playerfish.addImage("up", playerfishupimg)
    playerfish.addImage("down", playerfishdownimg)
    playerfish.visible = false
    // playerfish.debug=true
    playerfish.setCollider("rectangle", 0, 0, 20, 20)







    // groups

    foodGroup1 = new Group()
    foodGroup2 = new Group()
    enemyGroup1 = new Group()
    enemyGroup2 = new Group()
    enemyGroup3 = new Group()
    enemyGroup4 = new Group()
    enemyGroup5 = new Group()
    enemyGroup6 = new Group()
    enemyGroup7 = new Group()
    enemyGroup8 = new Group()
    netGroup = new Group()

 
}

function draw() {

    if (gameState == "wait") {
        if(!level1bgmusic.isPlaying()){
            level1bgmusic.play()
        }
        background(splashScreen)
        infobutton.show()
        playbutton.show()
        // homebutton.hide()
        playerfish.visible = false


    }

    playbutton.mousePressed(() => {
        gameState = "play"
    })

    infobutton.mousePressed(() => {
        gameState = "info"
        // homebutton.show()
        about()
    })



    if (gameState === "play") {
        background(level1bgimg)
        if(!level1bgmusic.isPlaying()){
            level1bgmusic.play()
        }
        spawnFood()
        // spawnEnemy()
        playerfish.visible = true
        if (playerLife >= width / 4) {
            level2pop()
            foodGroup1.destroyEach()
            foodGroup2.destroyEach()
            enemyGroup1.destroyEach()
            enemyGroup2.destroyEach()
            // background(bgimg)

        }

        // showLife()

        playbutton.hide()
        infobutton.hide()

        if (playerfish.x > width) {
            playerfish.x = 50
            playerfish.changeImage("right")
        }

        if (playerfish.x < 0) {
            playerfish.x = width - 50
            playerfish.changeImage("left")
        }


        foodGroup1.overlap(playerfish, growbig1)
        foodGroup2.overlap(playerfish, growbig2)


    }

    if (gameState === "level2") {
        background(bgimg)
        if(!level2bgmusic.isPlaying()){
            level2bgmusic.play()
        }
        spawnEnemy()

        enemyGroup1.overlap(playerfish, lifecounter1l2)
        enemyGroup2.overlap(playerfish, lifecounter2)
        enemyGroup3.overlap(playerfish, lifecounter3)
        enemyGroup4.overlap(playerfish, lifecounter4)

        // enemyGroup5.overlap(playerfish, lifecounter5)
        // enemyGroup6.overlap(playerfish, lifecounter6)
        // enemyGroup7.overlap(playerfish, lifecounter7)
        // enemyGroup8.overlap(playerfish, lifecounter8)

        push();
        // image(lifeImage, width / 2 - 130, height - player.positionY - 400, 20, 20);
        fill("white");
        rect(width - width / 3.5, 10, width / 4, 20);
        fill("cyan");
        rect(width - width / 3.5, 10, count2, 20);
        noStroke();
        pop();

        setInterval(timer(), 1000)

        if (count2 <= 5 || timeleft <= 0 && gameState != win) {
            count2 = 0
            GameOver()
        }

        if (!count2 <= 5 && playerfish.x >= width + 10 && !timeleft <= 0) {
            playerfish.x = 50
            playerfish.visible = false
            level3pop()
            enemyGroup1.destroyEach()
            enemyGroup2.destroyEach()
            enemyGroup3.destroyEach()
            enemyGroup4.destroyEach()
            // enemyGroup5.destroyEach()
            // enemyGroup6.destroyEach()
            // enemyGroup7.destroyEach()
            // enemyGroup8.destroyEach()
        }

    }



    if (gameState === "level3") {
        background(bgimg3)
        if(!level3bgmusic.isPlaying()){
            level3bgmusic.play()
        }
        playerfish.visible = true
        spawnEnemy3()
        spawnNet()


        enemyGroup1.overlap(playerfish, lifecounter1l3)
        enemyGroup2.overlap(playerfish, lifecounter2l3)
        enemyGroup3.overlap(playerfish, lifecounter3l3)
        enemyGroup4.overlap(playerfish, lifecounter4l3)

        enemyGroup5.overlap(playerfish, lifecounter5l3)
        enemyGroup6.overlap(playerfish, lifecounter6l3)
        enemyGroup7.overlap(playerfish, lifecounter7l3)
        enemyGroup8.overlap(playerfish, lifecounter8l3)
        netGroup.overlap(playerfish, lifecounternet)


        push();
        // image(lifeImage, width / 2 - 130, height - player.positionY - 400, 20, 20);
        fill("white");
        rect(width - width / 3.5, 10, width / 4, 20);
        fill("cyan");
        rect(width - width / 3.5, 10, count3, 20);
        noStroke();
        pop();

        setInterval(timer(), 1000)
        if (count3 <= 5 || timeleft <= 0) {
            GameOver()
        }

        if (!count3 <= 5 && playerfish.x >= width + 10 && !timeleft <= 0) {
            win()
            // count3=0
            enemyGroup1.destroyEach()
            enemyGroup2.destroyEach()
            enemyGroup3.destroyEach()
            enemyGroup4.destroyEach()
            enemyGroup5.destroyEach()
            enemyGroup6.destroyEach()
            enemyGroup7.destroyEach()
            enemyGroup8.destroyEach()
            netGroup.destroyEach()
        }

    }



    if (gameState === "info") {
        // background(255,0,0)
        playbutton.hide()
        infobutton.hide()
        // homebutton.show()
    }





    drawSprites()

    if (gameState == "play") {
        push();
        // image(lifeImage, width / 2 - 130, height - player.positionY - 400, 20, 20);
        fill("white");
        rect(width - width / 3.5, 10, width / 4, 20);
        fill("#f50057");
        rect(width - width / 3.5, 10, playerLife, 20);
        noStroke();
        pop();
    }
}

function timer() {
    timeleft -= 0.03
    left = Math.round(timeleft)
    textSize(40)
    fill(0)
    stroke("red")
    strokeWeight(2)
    text("Suvival Time : " + left, width / 2 - 100, 50)

    return timeleft;
}

function about() {
    swal({
        title: "This is how to play the GAME",
        imageUrl: "about.png",
        imageSize: "500x500",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'OK',
    },

        function (isConfirm) {
            gameState = "wait"
        });
}

function spawnFood() {

    if (frameCount % 150 == 0) {
        rand1y = Math.round(random(20, height - 20))
        rand2y = Math.round(random(20, height - 20))
        rand = Math.round(random(1, 2))

        fish1 = createSprite(width, rand1y)
        fish1.addImage(fish1lefttimg)
        fish1.velocityX = -4
        fish1.scale = 0.65

        fish2 = createSprite(0, rand2y)
        fish2.addImage(fish2rightimg)
        fish2.velocityX = 4
        fish2.scale = 0.65

        foodGroup1.add(fish1)
        foodGroup2.add(fish2)


    }

}


function spawnEnemy() {
    if (frameCount % 60 == 0) {
        rand1y = Math.round(random(20, height - 20))
        rand2y = Math.round(random(20, height - 20))
        rand1x = Math.round(random(20, width - 20))
        rand2x = Math.round(random(20, width - 20))
        rand3y = Math.round(random(20, height - 20))
        rand4y = Math.round(random(20, height - 20))
        rand3x = Math.round(random(20, width - 20))
        rand4x = Math.round(random(20, width - 20))


        enemy1 = createSprite(width, rand1y)
        enemy1.velocityX = -7
        enemy1.addImage(badfishimg)
        enemy1.scale = 0.65


        enemy2 = createSprite(0, rand2y)
        enemy2.velocityX = 7
        enemy2.addImage(crabimg)
        enemy2.scale = 0.65

        enemy3 = createSprite(rand1x, height)
        enemy3.velocityY = -7
        enemy3.addImage(badfishupimg)
        enemy3.scale = 0.65


        enemy4 = createSprite(rand2x, 0)
        enemy4.velocityY = 7
        enemy4.addImage(crabimg)
        enemy4.scale = 0.65


        // enemy5 = createSprite(width, rand3y)
        // enemy5.velocityX = -7
        // enemy5.addImage(badfishimg)
        // enemy5.scale = 0.65


        // enemy6 = createSprite(0, rand4y)
        // enemy6.velocityX = 7
        // enemy6.addImage(crabimg)
        // enemy6.scale = 0.65

        // enemy7 = createSprite(rand3x, height)
        // enemy7.velocityY = -7
        // enemy7.addImage(badfishupimg)
        // enemy7.scale = 0.65


        // enemy8 = createSprite(rand4x, 0)
        // enemy8.velocityY = 7
        // enemy8.addImage(crabimg)
        // enemy8.scale = 0.65


        enemyGroup1.add(enemy1)
        enemyGroup2.add(enemy2)
        enemyGroup3.add(enemy3)
        enemyGroup4.add(enemy4)
        // enemyGroup5.add(enemy5)
        // enemyGroup6.add(enemy6)
        // enemyGroup7.add(enemy7)
        // enemyGroup8.add(enemy8)


    }
}

function spawnEnemy3() {
    if (frameCount % 60 == 0) {
        rand1y = Math.round(random(20, height - 20))
        rand2y = Math.round(random(20, height - 20))
        rand1x = Math.round(random(20, width - 20))
        rand2x = Math.round(random(20, width - 20))
        rand3y = Math.round(random(20, height - 20))
        rand4y = Math.round(random(20, height - 20))
        rand3x = Math.round(random(20, width - 20))
        rand4x = Math.round(random(20, width - 20))


        enemy1 = createSprite(width, rand1y)
        enemy1.velocityX = -7
        enemy1.addImage(badfishimg)
        enemy1.scale = 0.65


        enemy2 = createSprite(0, rand2y)
        enemy2.velocityX = 7
        enemy2.addImage(crabimg)
        enemy2.scale = 0.65

        enemy3 = createSprite(rand1x, height)
        enemy3.velocityY = -7
        enemy3.addImage(badfishupimg)
        enemy3.scale = 0.65


        enemy4 = createSprite(rand2x, 0)
        enemy4.velocityY = 7
        enemy4.addImage(crabimg)
        enemy4.scale = 0.65


        enemy5 = createSprite(width, rand3y)
        enemy5.velocityX = -7
        enemy5.addImage(badfishimg)
        enemy5.scale = 0.65


        enemy6 = createSprite(0, rand4y)
        enemy6.velocityX = 7
        enemy6.addImage(crabimg)
        enemy6.scale = 0.65

        enemy7 = createSprite(rand3x, height)
        enemy7.velocityY = -7
        enemy7.addImage(badfishupimg)
        enemy7.scale = 0.65


        enemy8 = createSprite(rand4x, 0)
        enemy8.velocityY = 7
        enemy8.addImage(crabimg)
        enemy8.scale = 0.65


        enemyGroup1.add(enemy1)
        enemyGroup2.add(enemy2)
        enemyGroup3.add(enemy3)
        enemyGroup4.add(enemy4)
        enemyGroup5.add(enemy5)
        enemyGroup6.add(enemy6)
        enemyGroup7.add(enemy7)
        enemyGroup8.add(enemy8)


    }
}


function spawnNet() {
    if (frameCount % 60 == 0) {
        randx = Math.round(random(50, width - 50))
        net = createSprite(randx, -50)
        net.addImage(netimg)
        net.velocityY = 3
        net.scale = 0.75
        netGroup.add(net)

    }
}




function keyPressed() {
    if (gameState == "play" || gameState == "level2" || gameState == "level3") {


        if (keyCode == DOWN_ARROW) {
            playerfish.velocityX = 0
            playerfish.velocityY = 5
            playerfish.changeImage("down", playerfishdownimg)
        }

        if (keyCode == UP_ARROW) {
            playerfish.velocityX = 0
            playerfish.velocityY = -5
            playerfish.changeImage("up", playerfishupimg)

        }
        if (keyCode == LEFT_ARROW) {
            playerfish.velocityX = -5
            playerfish.velocityY = 0
            playerfish.changeImage("left", playerfishleftimg)

        }

        if (keyCode == RIGHT_ARROW) {
            playerfish.velocityX = 5
            playerfish.velocityY = 0
            playerfish.changeImage("right", playerfishrightimg)

        }


    }
}

function keyReleased() {
    if (gameState == "play" || gameState == "level2" || gameState == "level3") {


        if (keyCode == DOWN_ARROW) {
            playerfish.velocityX = 0
            playerfish.velocityY = 0
            // playerfish.changeImage("down",playerfishdownimg)
        }

        if (keyCode == UP_ARROW) {
            playerfish.velocityX = 0
            playerfish.velocityY = 0
            // playerfish.changeImage("up",playerfishupimg)

        }
        if (keyCode == LEFT_ARROW) {
            playerfish.velocityX = 0
            playerfish.velocityY = 0
            // playerfish.changeImage("left",playerfishleftimg)

        }

        if (keyCode == RIGHT_ARROW) {
            playerfish.velocityX = 0
            playerfish.velocityY = 0
            // playerfish.changeImage("right",playerfishrightimg)

        }


    }
}

function growbig1() {
    foodeatmusic.play()
    fish1.remove()
    playerLife += 10
    playerfish.scale += 0.002
}

function growbig2() {
    foodeatmusic.play()

    fish2.remove()
    playerLife += 10

    playerfish.scale += 0.002
}




function lifecounter1l2() {
    enemyeatmusic.play()
    enemy1.remove()
    count2 -= 10
    console.log("hitenemy1")

}
function lifecounter2() {
    enemyeatmusic.play()
    enemy2.remove()
    count -= 10
    console.log("hitenemy1")

}


function lifecounter3() {
    enemy3.remove()
    count2 -= 10
    console.log("hitenemy3")

}

function lifecounter4() {
    enemy4.remove()
    count2 -= 10
    console.log("hitenemy4")

}

// function lifecounter5() {
//     enemy5.remove()
//     count2 -= 10
//     console.log("hitenemy1")

// }

// function lifecounter6() {
//     enemy6.remove()
//     count2 -= 10
//     console.log("hitenemy2")
// }

// function lifecounter7() {
//     enemy7.remove()
//     count2 -= 10
//     console.log("hitenemy3")

// }

// function lifecounter8() {
//     enemy8.remove()
//     count2 -= 10
//     console.log("hitenemy4")

// }




// level 3
function lifecounter1l3() {
    enemyeatmusic.play()
    enemy1.remove()
    count3 -= 10
    console.log("hitenemy1")

}

function lifecounter2l3() {
    enemyeatmusic.play()
    enemy2.remove()
    count3 -= 10
    console.log("hitenemy2")
}

function lifecounter3l3() {
    enemy3.remove()
    count3 -= 10
    console.log("hitenemy3")

}

function lifecounter4l3() {
    enemy4.remove()
    count3 -= 10
    console.log("hitenemy4")

}

function lifecounter5l3() {
    enemy5.remove()
    count3 -= 10
    console.log("hitenemy1")

}

function lifecounter6l3() {
    enemy6.remove()
    count3 -= 10
    console.log("hitenemy2")
}

function lifecounter7l3() {
    enemy7.remove()
    count3 -= 10
    console.log("hitenemy3")

}

function lifecounter8l3() {
    enemy8.remove()
    count3 -= 10
    console.log("hitenemy4")

}


function lifecounternet() {
    // net.remove()
    count3 -= 10
    console.log("hitenemy1")

}


function level2pop() {
    level1bgmusic.stop()
    level2bgmusic.play()
    timeleft = 60
    playerfish.x = 50
    swal({
        title: "Your FISH is healthy Enough to Move to a SEA.",
        text: "Now, save your FISH from ENEMIES",
        textSize: 50,
        imageUrl: "pearl.gif",
        imageSize: "500x300",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'OK',
    },

        function () {
            gameState = "level2"
        });
}



function level3pop() {
    level2bgmusic.stop()
    level3bgmusic.play()
    timeleft = 60
    playerfish.x = 50
    enemyGroup1.destroyEach()
    enemyGroup2.destroyEach()
    enemyGroup3.destroyEach()
    enemyGroup4.destroyEach()
    enemyGroup5.destroyEach()
    enemyGroup6.destroyEach()
    enemyGroup7.destroyEach()
    enemyGroup8.destroyEach()
    gameState = "win"
    swal({
        title: "Your FISH is a fighter and a winner.",
        text: "Now, save your FISH from bigger and more dangerous ENEMIES",
        textSize: 50,
        imageUrl: "seahorse.gif",
        imageSize: "500x300",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'OK',
    },

        function () {
            gameState = "level3"
        });
}


function GameOver() {
    timeleft = 0
    count3=5
    swal({
        title: "YOU LOST IT !!",
        text: "TRY AGAIN ",
        textSize: 50,
        imageUrl: "crab.gif",
        imageSize: "500x300",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'OK',
    },

        function () {

            window.location.reload();
        });

}




function win() {

    swal({
        title: "YOU WON !!",
        text: "You ARE A ROCKER !!!!!",
        textSize: 50,
        imageUrl: "jellyfish.gif",
        imageSize: "500x300",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'OK',
    },

        function () {

            window.location.reload();
        });

}