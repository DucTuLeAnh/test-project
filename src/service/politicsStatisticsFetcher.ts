import { PoliticsStatistics } from "../models/politicsStatistics";
import axios from 'axios'
import csv from 'csvtojson';

export async function fetchPoliticsStatistics(urls: Array<string>): Promise<Array<PoliticsStatistics>> {
    let result: Array<PoliticsStatistics> = []

    for (const url of urls) {
        const response = await axios.get(url);
        const jsonArray: Array<PoliticsStatistics> = await csv({
            checkType: true
        }).fromString(response.data);
        result = result.concat(jsonArray);
    }

    return result;
}

