import { NextApiRequest, NextApiResponse } from 'next';
import { collections, init } from '../../../../lib/db/mongo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { placeID } = req.query;
    await init();
    const { placeCollection } = collections();
    const result = await placeCollection.findOne({ _id: placeID });
    res.status(200).json(result);
  }
}