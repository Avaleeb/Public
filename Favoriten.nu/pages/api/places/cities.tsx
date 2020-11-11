import {NextApiRequest, NextApiResponse} from 'next';
import {collections, init} from '../../../lib/db/mongo';

type City = {
    name: string,
    key: string
    image: string,
    count: string,
}

export default async (req: NextApiRequest, res: NextApiResponse<City[]>) => {
    await init();
    const {placeCollection} = collections();

    const placeData = (await (await placeCollection.aggregate([
        {$project: {city: {$arrayElemAt: [{$split: ["$google_data.formatted.secondary_text", ", "]}, -2]}}}, {
            $group: {
                _id: "$city",
                count: {$sum: 1}
            }
        }, {$sort: {count: -1, _id: 1}}])
    ).map((c: any) => ({
        name: c._id,
        count: c.count,
    })).toArray());

    res.status(200).json(placeData.map((p: any) =>
    {p.key = p.name.toLowerCase();
    p.image= null;
    return p;}));

}