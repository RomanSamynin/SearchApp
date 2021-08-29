const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const db = require('./db');

const PORT = 5000

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {

    try {
        const conn = await mysql.createConnection(db);
        let data = []

        const [rows_1] = await conn.execute("SELECT * FROM nomenclatures_table_1")
        data.push(rows_1)

        const [rows_2] = await conn.execute("SELECT * FROM nomenclatures_table_2")
        data.push(rows_2)

        const [rows_3] = await conn.execute("SELECT * FROM nomenclatures_table_3")
        data.push(rows_3)

        return res.send(data)
        conn.end()

    } catch (e) {
        res.status(500).json(e)
    }
})


app.post('/', async(req, res) => {
    try {
        const conn = await mysql.createConnection(db);
        let {table_1, table_2, table_3} = req.body

        if (!table_1 && !table_2 && !table_3) {
            let [dataSelect] = await conn.execute("SELECT * FROM nomenclaturestest")
            res.json(dataSelect)
            conn.end()
        }

        if (table_1 && table_2 && table_3) {
            const myQuery = `SELECT * FROM nomenclaturestest WHERE CHANNELS  = '${table_1},${table_2},${table_3}'`;
            const myQueryTwo = `SELECT * FROM nomenclaturestest WHERE CHANNELS  = '${table_1},${table_2}'`;

            let [dataSelect] = await conn.execute(myQuery)
            let [dataSelectTwo] = await conn.execute(myQueryTwo)

            let dataAll = [...dataSelect,...dataSelectTwo] 

            res.json(dataAll)
            conn.end()
        }

        if (table_1 && table_2 && !table_3) {
            const myQueryTwo = `SELECT * FROM nomenclaturestest WHERE CHANNELS  = '${table_1},${table_2}'`;
            let [dataSelectTwo] = await conn.execute(myQueryTwo)
  
            res.json(dataSelectTwo)
            conn.end()
        }

    } catch (e) {
        res.status(500).json(e)
    }

})

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()