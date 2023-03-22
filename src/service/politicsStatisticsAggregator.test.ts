import { aggregateStatistics } from './politicsStatisticsAggregator';
import { PoliticsStatisticsAggregation } from "../models/politicsStatisticsAggregation";
import { PoliticsStatistics } from "../models/politicsStatistics";

describe('correct aggregation', () => {
    test('determines mostSpeeches correctly', () => {

        const testdata: Array<PoliticsStatistics> = [
            {
                speaker: "Ben",
                topic: "Something",
                date: new Date(2017, 2, 7),
                words: 2
            },

            {
                speaker: "Ben",
                topic: "Something",
                date: new Date(2017, 3, 7),
                words: 100
            },

            {
                speaker: "Ben",
                topic: "Something",
                date: new Date(2017, 4, 7),
                words: 100
            },

            {
                speaker: "Hans",
                topic: "Something",
                date: new Date(2017, 3, 7),
                words: 102
            },

            {
                speaker: "Hans",
                topic: "Something",
                date: new Date(2017, 3, 7),
                words: 102
            }

        ]
        const result: PoliticsStatisticsAggregation = aggregateStatistics(testdata)
        expect(result.mostSpeeches).toBe("Ben");
    });

    test('returns null mostSpeeches when ambiguous', () => {

        const testdata: Array<PoliticsStatistics> = [
            {
                speaker: "Ben",
                topic: "Something",
                date: new Date(2017, 2, 7),
                words: 2
            },

            {
                speaker: "Ben",
                topic: "Something",
                date: new Date(2017, 3, 7),
                words: 100
            },

            {
                speaker: "Hans",
                topic: "Something",
                date: new Date(2017, 3, 7),
                words: 102
            },

            {
                speaker: "Hans",
                topic: "Something",
                date: new Date(2017, 3, 7),
                words: 102
            }

        ]
        const result: PoliticsStatisticsAggregation = aggregateStatistics(testdata)
        expect(result.mostSpeeches).toBe(null);
    });

    test('returns null mostSpeeches when no speaker given', () => {

        const testdata: Array<PoliticsStatistics> = [
            {
                speaker: null,
                topic: "Something",
                date: new Date(2017, 2, 7),
                words: 2
            },

            {
                speaker: null,
                topic: "Something",
                date: new Date(2017, 3, 7),
                words: 100
            }
        ]
        const result: PoliticsStatisticsAggregation = aggregateStatistics(testdata)
        expect(result.mostSpeeches).toBe(null);
    });



    test('determines mostSecurity correctly', () => {

        const testdata: Array<PoliticsStatistics> = [
            {
                speaker: "Frank",
                topic: "Internal Security",
                date: new Date(2017, 2, 7),
                words: 2
            },

            {
                speaker: "Frank",
                topic: "Internal Security",
                date: new Date(2017, 3, 7),
                words: 100
            },

            {
                speaker: "Frank",
                topic: "SomethingElse",
                date: new Date(2017, 4, 7),
                words: 100
            },

            {
                speaker: "Hans",
                topic: "Internal Security",
                date: new Date(2017, 3, 7),
                words: 102
            },

            {
                speaker: "Hans",
                topic: "SomethingElse",
                date: new Date(2017, 3, 7),
                words: 102
            }

        ]
        const result: PoliticsStatisticsAggregation = aggregateStatistics(testdata)
        expect(result.mostSecurity).toBe("Frank");
    });

    test('returns null mostSecurity when ambiguous', () => {

        const testdata: Array<PoliticsStatistics> = [
            {
                speaker: "Frank",
                topic: "Something",
                date: new Date(2017, 2, 7),
                words: 2
            },

            {
                speaker: "Frank",
                topic: "Something",
                date: new Date(2017, 3, 7),
                words: 100
            },

            {
                speaker: "Hans",
                topic: "Something",
                date: new Date(2017, 3, 7),
                words: 102
            },

            {
                speaker: "Hans",
                topic: "Something",
                date: new Date(2017, 3, 7),
                words: 102
            }

        ]
        const result: PoliticsStatisticsAggregation = aggregateStatistics(testdata)
        expect(result.mostSecurity).toBe(null);
    });


    test('returns null mostSecurity when no speaker given', () => {

        const testdata: Array<PoliticsStatistics> = [
            {
                speaker: null,
                topic: "Something",
                date: new Date(2017, 2, 7),
                words: 2
            },

            {
                speaker: null,
                topic: "Something",
                date: new Date(2017, 3, 7),
                words: 100
            }
        ]
        const result: PoliticsStatisticsAggregation = aggregateStatistics(testdata)
        expect(result.mostSecurity).toBe(null);
    });

    test('returns null mostSecurity when no topic "Internal Security" given', () => {

        const testdata: Array<PoliticsStatistics> = [
            {
                speaker: "Hans",
                topic: "Nothing",
                date: new Date(2017, 2, 7),
                words: 2
            },

            {
                speaker: "Hans",
                topic: "Nothing",
                date: new Date(2017, 3, 7),
                words: 100
            }
        ]
        const result: PoliticsStatisticsAggregation = aggregateStatistics(testdata)
        expect(result.mostSecurity).toBe(null);
    });

    test('determines leastWordy correctly', () => {

        const testdata: Array<PoliticsStatistics> = [
            {
                speaker: "Ron",
                topic: "Something",
                date: new Date(2017, 2, 7),
                words: 2
            },

            {
                speaker: "Ron",
                topic: "Something",
                date: new Date(2017, 3, 7),
                words: 100
            },

            {
                speaker: "Ron",
                topic: "SomethingElse",
                date: new Date(2017, 4, 7),
                words: 100
            },

            {
                speaker: "Joe",
                topic: "Something",
                date: new Date(2017, 3, 7),
                words: 1020
            },

            {
                speaker: "Joe",
                topic: "SomethingElse",
                date: new Date(2017, 3, 7),
                words: 102
            }

        ]
        const result: PoliticsStatisticsAggregation = aggregateStatistics(testdata)
        expect(result.leastWordy).toBe("Ron");
    });

    test('returns null leastWordy when ambiguous', () => {

        const testdata: Array<PoliticsStatistics> = [
            {
                speaker: "Hank",
                topic: "Something",
                date: new Date(2017, 2, 7),
                words: 2
            },

            {
                speaker: "Hank",
                topic: "Something",
                date: new Date(2017, 3, 7),
                words: 100
            },

            {
                speaker: "John",
                topic: "Else",
                date: new Date(2017, 3, 7),
                words: 50 
            },

            {
                speaker: "John",
                topic: "Else",
                date: new Date(2017, 3, 7),
                words: 52
            }

        ]
        const result: PoliticsStatisticsAggregation = aggregateStatistics(testdata)
        expect(result.mostSpeeches).toBe(null);
    });

    test('returns null leastWordy when no speaker given', () => {

        const testdata: Array<PoliticsStatistics> = [
            {
                speaker: null,
                topic: "Something",
                date: new Date(2017, 2, 7),
                words: 2
            },

            {
                speaker: null,
                topic: "Something",
                date: new Date(2017, 3, 7),
                words: 100
            }
        ]
        const result: PoliticsStatisticsAggregation = aggregateStatistics(testdata)
        expect(result.leastWordy).toBe(null);
    });
});