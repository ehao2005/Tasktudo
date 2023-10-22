var coins = 1
accessoryPrice = 5
ownsAccessory = false
accessoryOn = false;
amtFood = 0
isDead = false;
hunger = 12
interval = 720000;

function getTime() {
    var time = prompt("How fast do you want Tasktudo's hunger to increase (in milliseconds)?");
    interval = time;
}

//setInterval(checkHunger(), 720000)
getTime()
setInterval(checkHunger, interval)

function checkHunger() {
    if (hunger > 0) {
        hunger--;
        for (let i = hunger; i < 12; i++) {
            document.getElementById(i).style.visibility = "hidden";
        }
        checkifDead()
    }
}

function setCoins(coinsNew) {
    coins = coinsNew;
    if (coins != 1) {
        document.getElementById("coinsNo").innerHTML = coins + " COINS";
    }
    if (coins == 1) {
        document.getElementById("coinsNo").innerHTML = coins + " COIN";
    }
    if (coins < 1) {
        document.getElementById("buyFoodBTN").style.class = "button disabled";
    }
    if (coins >= accessoryPrice) {
        document.getElementById("buyAccessBTN").style.class = "button"
    }
}

function setFood(foodNew) {
    amtFood = foodNew;
    document.getElementById("foodNo").innerHTML = amtFood + " FOOD";
    if (amtFood > 0) {
        document.getElementById("feedBTN").style.class = "button";
    }
}

function taskCompleted() {
    setCoins(coins+1)
}

function purchaseAccessory() {
    if (coins >= accessoryPrice) {
        setCoins(coins - accessoryPrice)
        ownsAccessory = true
    }
}

function purchaseFood() {
    if (coins > 0) {
        setCoins(coins-1)
        setFood(amtFood+1);
    }
}

function feed() {
    if (amtFood > 0 && !isDead) {
        setFood(amtFood-1);
        hunger = hunger + 4;
        jump();
    }
    if (hunger > 12) {
        hunger = 12;
    }
    for (let i = 0; i < hunger; i++) {
        document.getElementById(i).style.visibility = "visible";
    }
}

function putOnAccessory() {
    if (ownsAccessory && !isDead) {
        document.getElementById("turtyImg").src = "aliveTasktudoWithAccessory.png";
        accessoryOn = true;
    }
    if (isDead && ownsAccessory) {
        document.getElementById("turtyImg").src = "deadTasktudoWithAccessory.png";
        accessoryOn = true;
    }
}

function checkifDead() {
    if (hunger == 0 && !accessoryOn) {
        document.getElementById("turtyImg").src = "DeadTestudoResizedTrue.png";
        isDead = true;
    }
    if (hunger == 0 && accessoryOn) {
        document.getElementById("turtyImg").src = "deadTasktudoWithAccessory.png";
        isDead = true;
    }
}

function addTasks() { 
    var numTasks = prompt("How many tasks do you have to do?");
    const taskList = []
    for(let i = 0; i < parseInt(numTasks); i++){
        var taskName = prompt("Name a task: ");
        taskList[i] = taskName;
        var btn = document.createElement("button");
        btn.id = i; 
        btn.className = "buttontasks";
        const element = document.getElementsByClassName("buttontasks");
        btn.addEventListener('click', completeTask)
        var t = document.createTextNode(taskList[i]);
        btn.appendChild(t);
        document.getElementById("taskBTNList").appendChild(btn);
    }
} 

function completeTask() {
    this.innerHTML="Complete";
    this.style.display = "none";
    setCoins(coins+1)
    document.getElementById("pText").innerHTML = "Great! Complete Another Task!";
}

function jump() {
    var pos = 0;
    timer = setInterval(function() {
        pos++;
        document.getElementById("turtyImg").style.top = pos+"px";
        if(pos > 30) clearInterval(timer);
        },
        20
    );
    timer = setInterval(function() {
        pos++;
        document.getElementById("turtyImg").style.bottom = pos+"px";
        if(pos > 30) clearInterval(timer);
        },
        20
    );
}
