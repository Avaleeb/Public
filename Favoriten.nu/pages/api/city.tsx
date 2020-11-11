import {NextApiRequest, NextApiResponse} from 'next';
import { collections, init } from '../../lib/db/mongo';

type Data = {
    _id: string,
    name: string,
    key: string,
}

export default async (req: NextApiRequest, res: NextApiResponse<[Data]>) => {
    await init();

    const {cityCollection} = collections();
    let data = (await ( await cityCollection.find({})).toArray());
    console.log(data);
    res.status(200).json(data);

};

