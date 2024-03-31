let username = "";
let purpose = "";
let audio = null;
let songNum = 0;
let prizeNum = 0;
let prizeList = [0, 1000, 2000, 3000, 6000, 9000, 12000, 17000, 27000];
let songList = ["修炼爱情", "光年之外", "北京北京", "告白气球", "因为爱情", "大鱼", "平凡之路", "感恩的心", "我的歌声里", "晴天", "月亮之上", "江南", "致青春", "See You Again", "Love Story"];
let shuffled = songList
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
let success = true;

function submitDialogue(btn) {
    input = document.getElementById("name");
    line = document.getElementById("line");
    if (username == "") {
        username = input.value;
        line.innerHTML = username + "，欢迎来到开门大吉！这次不远万里来到我们节目组，也是非常的不容易。<br>如果能成功赢到奖金，有什么想要做的事吗？";
        input.value = "";
        input.placeholder = "请输入你的想法";
        input.style.width = "70%";
    } else {
        purpose = input.value;
        line.innerHTML = purpose + "，多么有意义的事情。祝你挑战成功！<br> 如果准备好的话，请你打开音量键，按下红色按钮。"
        btn.remove();
        input.remove();
        document.getElementById("play-button").disabled = false;
        document.getElementById("submit").disabled = false;
        songNum++;
    }
}

function playSong() {
    songName = shuffled[songNum-1];
    audio = new Audio('./Audio/' + songName + '.mp3');
    audio.play();
}

function submitAnswer() {
    line = document.getElementById("line");
    document.getElementById("play-button").disabled = true;
    document.getElementById("submit").disabled = true;

    if (audio != null) {
        audio.pause();
    }
    audio = new Audio('./Audio/开门大吉.mp3');
    audio.play();
    delay = 800;

    setTimeout(() => {
        line.innerHTML = "开...";
        setTimeout(() => {
            line.innerHTML = "开...门...";
            setTimeout(() => {
                line.innerHTML = "开...门...大...";
                setTimeout(() => {
                    line.innerHTML = "开...门...大...吉！";
                    setTimeout(() => {
                        checkAnswer();
                    }, delay + 500);
                }, delay);
            }, delay);
        }, delay);
    }, delay);
}

function checkAnswer() {
    songName = shuffled[songNum-1];
    input = document.getElementById("text-box");
    line = document.getElementById("line");
    document.getElementById("submit").disabled = false;

    if (input.value == shuffled[songNum-1]) {
        input.style.color = "#38d818";
        prizeNum = prizeList[songNum];
        document.getElementById("prize").innerHTML = prizeNum;
        document.getElementById("help").style.display = "block";
        audio.pause();
        audio = new Audio('./Audio/' + songName + '.mp3');
        audio.play();
        
        if (songNum == 8) {
            document.getElementById("submit").disabled = true;
            line.innerHTML = "太厉害了，" + username + "！你今天连续答对了八道题！<br>恭喜你成功赢得挑战！（台下欢呼！）";
            setTimeout(checkout, 4000);
        } else {
            document.getElementById("submit").innerHTML = "继续挑战";
            document.getElementById("submit").onclick = resume;
            line.innerHTML = "恭喜你，" + username + "，回答正确！你还要继续挑战吗！<br>（台下起哄：挑战！挑战！挑战！）";
        }
    } else {
        input.style.color = "#dc3a3a";
        input.value = input.value + "（正确答案：" + shuffled[songNum-1] + "）";
        prizeNum = 0;
        line.innerHTML = username + "这次没能完成" + purpose + "的愿望也是十分的遗憾。 <br> 让我们祝他（她）在日后的生活中一切好运！";
        audio.pause();
        audio = new Audio('./Audio/Eliminated.mp3');
        audio.play();
        setTimeout(checkout, 4000);
        success = false;
        songNum--;
    }
}

function resume() {
    songNum++;
    audio.pause();
    document.getElementById("play-button").disabled = false;
    input = document.getElementById("text-box");
    line = document.getElementById("line");
    input.value = "";
    input.style.color = "#000000";
    line.innerHTML = username + "，请听题...";

    document.getElementById("submit").innerHTML = "开门大吉！";
    document.getElementById("submit").onclick = submitAnswer;
}

function checkout() {
    document.getElementById("dialogue").remove();
    document.getElementById("answer").remove();
    document.getElementById("select").remove();

    document.getElementById("score").style.height = "80%";
    document.getElementById("score").style.width = "100%";
    title = document.getElementById("title");
    title.innerHTML = "亲爱的" + username + "：";

    prize = document.getElementById("prize");
    prize.innerHTML = "游戏奖金：" + prizeNum;
    prize.style.marginTop = "20%";
    level = prize.cloneNode(true);
    title.after(level);
    level.innerHTML = "通过关卡：" + songNum;
    level.style.marginTop = "20%";
    level.style.marginBottom = "20%";

    replay = document.getElementById("play-button");
    replay.innerHTML = "&#8635;";
    replay.style.backgroundColor = "#fff";
    replay.style.fontSize = "20pt";
    replay.disabled = false;
    replay.onclick = function () { window.location.reload(); };

    if (success) {
        audio.pause();
        audio = new Audio('./Audio/Promoted.mp3');
        audio.play();
    }
}