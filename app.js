const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'mysql',
    user: 'root',
    password: 'pw',
    database:'test_db'
};
const mysql = require('mysql')

app.get('/', (req,res) => {
    
    //open the db connection
    const connection = mysql.createConnection(config)

    //check if the table already exists. if not, create it.
    const tableCreationSql = `
    CREATE TABLE IF NOT EXISTS people (
        id SERIAL, 
        name VARCHAR(100) NOT NULL, 
        PRIMARY KEY (id)
    );`
    connection.query(tableCreationSql)


    //insert a new item with the name "Test Bruno YYYY-MM-DD hh:mm:ss"
    const newPersonSql = 'INSERT INTO people(name) values("Bruno Gemelli - ' + new Date() + ' ")'
    connection.query(newPersonSql)

    
    //select the current data from the db table
    const getPeopleSql = 'SELECT * FROM people'
    connection.query(getPeopleSql, function (err, result, fields) {
        if (err) throw err;

        let resultHtml = '<h1>Full Cycle Rocks!</h1>'
        
        if (result.length == 0) {
            resultHtml += '<p>The table is empty.</p>'
        } else {
            resultHtml += '<table>'
            result.forEach(function(personData) {
                resultHtml += '<tr><td>' + personData.id + '</td><td>' + personData.name + '</td></tr>'
            })   
            resultHtml += '</table>'
        }

        //close the db connection
        connection.end()

        //return the response (final HTML)
        res.send(resultHtml)
    });
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})