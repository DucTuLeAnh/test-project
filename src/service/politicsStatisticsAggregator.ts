import { PoliticsStatisticsAggregation } from "../models/politicsStatisticsAggregation";
import { PoliticsStatistics } from "../models/politicsStatistics";

export function aggregateStatistics(statistics: Array<PoliticsStatistics>): PoliticsStatisticsAggregation {
    return { mostSpeeches: getMostSpeeches(statistics), mostSecurity: getMostSecurity(statistics), leastWordy: getLeastWordy(statistics) }
};


function getMostSpeeches(statistics: Array<PoliticsStatistics>): string | null {
    const speechCount: Map<string, number> = getPoliticianSpeechCount(statistics)
    return getKeyWithUnambiguousMaxValue(speechCount);
}

function getMostSecurity(statistics: Array<PoliticsStatistics>): string | null {
    const filteredByTopicSecurity = statistics.filter((statistics: PoliticsStatistics) => statistics.topic === "Internal Security")
    const speechCount: Map<string, number> = getPoliticianSpeechCount(filteredByTopicSecurity)
    return getKeyWithUnambiguousMaxValue(speechCount);
}

function getLeastWordy(statistics: Array<PoliticsStatistics>): string | null {
    const wordCount: Map<string, number> = getPoliticianWordCount(statistics)
    return getKeyWithUnambiguousMinValue(wordCount);
}

function getPoliticianWordCount(statistics: Array<PoliticsStatistics>): Map<string, number>{
    return statistics.reduce((accumulator: Map<string, number>, statistics: PoliticsStatistics) => {

        const politicianName = statistics.speaker

        if (statistics.words && politicianName && accumulator.has(politicianName)) {
            accumulator.set(politicianName, accumulator.get(politicianName) + statistics.words)
        }
        else if (statistics.words && politicianName) {
            accumulator.set(politicianName, statistics.words)
        }
        return accumulator

    }, new Map<string, number>())

}

function getPoliticianSpeechCount(statistics: Array<PoliticsStatistics>): Map<string, number>{
    return statistics.reduce((accumulator: Map<string, number>, statistics: PoliticsStatistics) => {

        const politicianName = statistics.speaker

        if (politicianName && accumulator.has(politicianName)) {
            accumulator.set(politicianName, accumulator.get(politicianName) + 1)
        }
        else if (politicianName) {
            accumulator.set(politicianName, 1)
        }
        return accumulator

    }, new Map<string, number>())

}

function getKeyWithUnambiguousMaxValue(countMap: Map<string, number>): string | null {
    const maxVal = Array.from(countMap.values()).reduce((max:number, current:number) => {
        if(!max){
            return current
        }
        return max > current ? max : current
    }, null)
    const keysWithMax = Array.from(countMap.entries()).filter(entry => entry[1] === maxVal).map(entry => entry[0])
    // only 1 value allowed
    return keysWithMax.length === 1? keysWithMax[0] : null
}

function getKeyWithUnambiguousMinValue(countMap: Map<string, number>): string | null {
    const minVal = Array.from(countMap.values()).reduce((min:number, current:number) => {
        if(!min){
            return current
        }
        return min < current ? min : current
    }, null)
    const keysWithMin = Array.from(countMap.entries()).filter(entry => entry[1] === minVal).map(entry => entry[0])
    // only 1 value allowed
    return keysWithMin.length === 1? keysWithMin[0] : null
}