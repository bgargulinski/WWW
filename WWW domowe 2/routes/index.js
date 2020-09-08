var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db');
var ses = new sqlite3.Database('sessions')

class Zadanie {
  tresc;
  odpowiedzA;
  odpowiedzB;
  odpowiedzC;
  odpowiedzD;
  prawidlowa;
  karaZaZla;
  czyRozwiazane;
  czasPoswiecony;

  constructor(tresc, odpowiedzA, odpowiedzB, odpowiedzC,
              odpowiedzD, prawidlowa, karaZaZla) {
    this.tresc = tresc;
    this.odpowiedzA = odpowiedzA;
    this.odpowiedzB = odpowiedzB;
    this.odpowiedzC = odpowiedzC;
    this.odpowiedzD = odpowiedzD;
    this.prawidlowa = prawidlowa;
    this.karaZaZla = karaZaZla;
    this.czyRozwiazane = false;
    this.czasPoswiecony = 0;
  }
}

class Quiz {
  zadania;
  obecnyCzas;
  obecneZadanie;
  liczbaRozwiazanych;
  czyRozwiazny;
  ID;
  start;

  constructor(zadania, ID) {
    this.zadania = zadania;
    this.obecneZadanie = 1;
    this.obecnyCzas = 0;
    this.czyRozwiazny = false;
    this.liczbaRozwiazanych = 0;
    this.ID = ID;
    let date = new Date();
    this.start = 60 * date.getMinutes() + date.getSeconds();
  }
}

const myQuery = function (db, sql, params) {
  return new Promise(function (resolve, reject) {
    db.all(sql, params, function (error, rows) {
      if (error)
        reject(error);
      else
        resolve(rows);
    });
  });
};

const myRun = function (db, sql) {
  return new Promise(function (resolve, reject) {
    db.run(sql, function (error) {
      if (error)
        reject(error);
      else
        resolve();
    });
  });
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { login: req.session.login, message: req.query.message });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  if(req.session.login !== undefined) {
    res.redirect('/?message=log out first')
    return
  }
  res.render('login', { login: req.session.login })
});

/* GET logout page. */
router.get('/logout', function(req, res, next) {
  if(req.session.login === undefined) {
    res.redirect('/?message=log in first')
    return
  }
  res.render('logout', { login: req.session.login })
});

/* GET repass page. */
router.get('/repass', function(req, res, next) {
  if(req.session.login === undefined) {
    res.redirect('/?message=log in first')
    return
  }
  res.render('repass', { login: req.session.login })
});

/* GET quizy page */
router.get('/quizy', async function(req, res, next) {
  if(req.session.login === undefined) {
    res.redirect('/?message=log in first')
    return
  }
  const login = req.session.login
  const quizy = await getQuizy()
  res.render('quizy', { quizy: quizy, login: login })
});

/* GET quiz page */
router.get('/quiz', async function(req, res, next) {
  const id = req.query.id
  if(req.session.login === undefined) {
    res.redirect('/?message=log in first')
    return
  }
  const row = await getQuizInfo(id)
  res.render('quiz', { id: id, title: row[0].title, intro: row[0].intro})
})

/* GET pytanie page */
router.get('/pytanie', async function(req, res, next) {
  const id = req.query.id
  if(req.session.login === undefined) {
    res.redirect('/?message=log in first')
    return
  }
  let login = req.session.login
  if(await checkIfTaken(id, login))
    res.redirect('/?message=quiz has been already taken');
  res.render('pytanie', { id: id })
})

/* GET wyniki page */
router.get('/wyniki', async function(req, res, next) {
  const id = req.query.id
  if(req.session.login === undefined) {
    res.redirect('/?message=log in first')
    return
  }
  let login = req.session.login
  if(!(await checkIfTaken(id, login)))
    res.redirect('/?message=quiz has not been taken yet');
  res.render('wyniki', { id: id })
})

/* POST login page. */
router.post('/login', function(req, res) {
  let login = req.body.login
  let password = req.body.password
  validateUser(login, password).then(r => {
    req.session.regenerate(function (err) {
      req.session.login = login
      req.session.password = password
      res.redirect('/');
    })}).catch(err => {
      res.redirect('/?message=failed authorization')
  })
});

/* POST logout page. */
router.post('/logout', function(req, res) {
  delete(req.session.login)
  delete(req.session.password)
  req.session.regenerate(function(err) {
    res.redirect('/')
  })
});

/* POST repass page. */
router.post('/repass', function(req, res) {
  let password = req.body.password
  let login = req.session.login
  changePassword(login, password).then(() => {
    req.session.regenerate(function(err) {
      res.redirect('/')
    })
  }).catch(err => {
    res.redirect('/?message=error while changing password')
  })
});

/* POST pytanie page. */
router.post('/pytanie', async function(req, res) {
  let id = req.query.id
  if(req.session.login === undefined) {
    res.redirect('/?message=log in first')
    return
  }
  let login = req.session.login
  if(await checkIfTaken(id, login))
    res.send();
  const questions = await getQuestions(id)
  const zadania = []
  for (const x of questions) {
    zadania.push(new Zadanie(x.content, x.a, x.b, x.c, x.d, x.correct, x.penalty))
  }
  const quiz = new Quiz(zadania, id)
  res.send({quiz})
});

/* POST podsumowanie page. */
router.post('/podsumowanie', async function(req, res) {
  let id = req.body.id
  if(req.session.login === undefined) {
    res.redirect('/?message=log in first')
    return
  }
  let login = req.session.login
  if(await checkIfTaken(id, login))
    res.send();
  let date = new Date()
  let finish = 60 * date.getMinutes() + date.getSeconds()
  await saveResults(id, login, finish, req.body);
  res.send();
});

/* POST podsumowanie page. */
router.post('/wyniki', async function(req, res) {
  let id = req.query.id
  if(req.session.login === undefined) {
    res.redirect('/?message=log in first')
    return
  }
  let login = req.session.login
  const results = await getResults(id)
  const correct = await getCorrect(id)
  const mine = await getUserAnswers(id, login)
  const avg = await getAverage(id)
  res.send({ results: results, correct: correct, mine: mine, avg: avg });
});

const validateUser = async (login, password) => {
  if(login === undefined || password === undefined || login === "")
    throw new Error()
  const users = await myQuery(db, 'SELECT * FROM users WHERE login="'+login+'"')
  if (users.length === 0) { // brak użytkownika o danym loginie, tworzymy nowego
    await myRun(db, 'INSERT INTO users VALUES("' + login + '", "' + password + '")')
  } else {
    if(users[0].password !== password)
      throw new Error()
  }
}

const changePassword = async (login, password) => {
  if(login === undefined || password === undefined || login === "")
    throw new Error()
  await myRun(db, 'UPDATE users SET password="'+password+'" WHERE login ="'+login+'"');
  const sessions = await myQuery(ses,'SELECT * FROM sessions')
  for (const x of sessions) {
    let y = JSON.parse(x.sess)
    if(y.login === login) {
      await myRun(ses, 'DELETE FROM sessions WHERE sid="'+x.sid+'"');
    }
  }
}

const getQuizy = async () => {
  return await myQuery(db, 'SELECT id, title FROM quizy')
}

const getQuizInfo = async (id) => {
  return await myQuery(db, 'SELECT title, intro FROM quizy WHERE id="'+id+'"')
}

const getQuestions = async (id) => {
  return await myQuery(db, 'SELECT * FROM questions WHERE idQuiz="'+id+'"')
}

const getResults = async (id) => {
  return await myQuery(db, 'SELECT login, result FROM full WHERE idQuiz='+id)
}

const getCorrect = async (id) => {
  return await myQuery(db, 'SELECT content, correct FROM questions WHERE idQuiz='+id)
}

const getUserAnswers = async (id, login) => {
  return await myQuery(db, 'SELECT content, response, seconds, penalty, good FROM results WHERE idQuiz='+
      id +' AND login="'+login+'"')
}

const getAverage = async (id) => {
  return await myQuery(db, 'SELECT MAX(content) AS content, AVG(seconds) AS avg ' +
      'FROM results ' +
      'WHERE idQuiz='+ id + ' ' +
      'AND good="true" ' +
      'GROUP BY content'
  )
}

const saveResults = async (id, login, finish, data) => {
  let time = (finish - data.start)
  let odpowiedzi = data.odpowiedzi
  let result = 0
  for(let i=0;i<odpowiedzi.length;i++) {
    let str = odpowiedzi[i].procent
    str = str.substring(0, str.length - 1);
    odpowiedzi[i].time = parseFloat(str) * time / 100
    let info = (await myQuery(db, 'SELECT correct, penalty FROM questions WHERE content="' +
        odpowiedzi[i].tresc + '"'))[0]
    let good = odpowiedzi[i].odpowiedz == info.correct
    let penalty = good ? 0 : info.penalty
    result += parseFloat(penalty) + parseFloat(odpowiedzi[i].time)
    await myRun(db, 'INSERT INTO results VALUES("' + id + '", "' + login + '", "' +
        odpowiedzi[i].tresc + '", "' + odpowiedzi[i].odpowiedz + '" , "' +
        odpowiedzi[i].time + '" , "' + penalty + '" , "' + good +'")')
  }
  await myRun(db, 'INSERT INTO full VALUES(' + id + ', "' + login + '", "' + result + '")')
}

const checkIfTaken = async (id, login) => {
  return (await myQuery(db, 'SELECT * FROM full WHERE idQuiz="'+id+'" AND login="'+login+'"')).length > 0
}

module.exports = router;
