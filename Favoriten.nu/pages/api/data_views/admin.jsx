import { init, collections } from '../../../lib/db/mongo';

export default async (req, res) => {
  if (req.method === 'GET') {
    await init();
    const { newPotentialPlace } = collections();
    const result = await newPotentialPlace.find({
      processed: {
        $ne: true,
      },
    }).limit(20).toArray();
    res.status(200).json(result);
  } else {
    res.status(404).json({ err: 'Use Post' });
  }
};
