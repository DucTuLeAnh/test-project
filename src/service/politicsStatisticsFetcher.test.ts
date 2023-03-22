import { PoliticsStatistics } from "../models/politicsStatistics";
import { fetchPoliticsStatistics } from "./politicsStatisticsFetcher";
import axios from 'axios'
import {stringify} from 'csv-stringify/sync';


jest.mock('axios')

describe('check fetcher', () => {
    test('that queried csv is converted into proper data structure', async() => {

        const expectedCsvData = [
            { speaker: 'John Doe', topic: "Topic1", date: '2022-01-01', words: 100 },
            { speaker: 'Jane Doe', topic: "Topic2", date: '2022-01-02', words: 101 },
        ];

        const mockResponse = { data: stringify(expectedCsvData, {header: true})};

        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(mockResponse)

        const result: Array<PoliticsStatistics> = await fetchPoliticsStatistics(["http://myurl"])
        

        expect(result).toEqual([
            { speaker: 'John Doe', topic: "Topic1", date: '2022-01-01', words: 100 },
            { speaker: 'Jane Doe', topic: "Topic2", date: '2022-01-02', words: 101 },
        ]);
    });

});