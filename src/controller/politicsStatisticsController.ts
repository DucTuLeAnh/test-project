import { Request, Response } from 'express';
import { aggregateStatistics } from '../service/politicsStatisticsAggregator';
import { fetchPoliticsStatistics } from '../service/politicsStatisticsFetcher';

export function listStatistics(req: Request, res: Response) {
    fetchPoliticsStatistics(toUrlStringArray(req))
        .then(results => {
            res.status(200).send(JSON.stringify(aggregateStatistics(results)))
        })
        .catch(error => {
            console.error(error)
            // send nully response on error as stated in the requirements
            res.status(200).send(JSON.stringify(aggregateStatistics([])))
        });
};


function toUrlStringArray(req: Request): Array<string> {
    const values = req.query.url
    if (Array.isArray(values)) {
        return values.map(value => value.toString())
    }
    return values? [values.toString()] : []
}


