const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win )||0;
  let total = Number( req.query.total )||0;;
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  let judgement = '';
  if(hand==cpu){
    judgement='あいこ';
  }
  else if((hand=='グー'&&cpu=='チョキ')||
          (hand=='チョキ'&&cpu=='パー')||
          (hand=='パー'&&cpu=='グー')
        ){
          judgement='勝ち';
          win += 1;
  }
  else {
    judgement='負け';
  }
 
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/date", (req, res) => {
  let date1 = req.query.date1;
  let date2 = req.query.date2;
  let date10 = new Date(date1);
  let date20 = new Date(date2);
  let diffTime = date20 - date10;
  let diffDays = diffTime / (1000 * 60 * 60 * 24);

 
  res.render("date", {date1: date1, date2: date2, diffDays: diffDays});
});

app.get("/quiz", (req, res) => {
  const correctAnswer = 3776;
  const inputAnswer = req.query.answer;
  if (!inputAnswer){
    return res.render("quiz", {
      message: null
    });
  }
  const isCorrect = inputAnswer ===String(correctAnswer);
  const message = isCorrect ? "正解！" : "不正解！";

  res.render("quiz", {message: message});
});

app.get("/bmi", (req, res) => {
  const weight = parseFloat(req.query.weight);
  const height = parseFloat(req.query.height);
  const bmi = weight / ((height/100)*(height/100));
  const cutbmi = Math.round(bmi*100)/100;
  res.render("bmi", {bmi: cutbmi});
})
app.listen(8080, () => console.log("Example app listening on port 8080!"));
