import express from 'express'
import { Express } from 'express';
import {listStatistics} from './controller/politicsStatisticsController'

const app:Express = express()
const port:number = 5000

app.get('/evaluation', listStatistics)

app.listen(port, () => console.log(`Running on port ${port}`))