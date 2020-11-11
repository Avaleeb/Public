import {NextApiRequest, NextApiResponse} from 'next';
import { collections, init } from '../../lib/db/mongo';

type Data = {
    _id: string,
    name: string,
    url: string,
    city: string,
}

export default async (req: NextApiRequest, res: NextApiResponse<[Data]>) => {
    await init();

    const {placeCollection} = collections();
    let data = (await ( await placeCollection.find({})).toArray());
    console.log(data);
    res.status(200).json(data);

};

