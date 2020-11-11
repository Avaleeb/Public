import { init, collections } from '../../lib/db/mongo';

export default async (req, res) => {
  if (req.method === 'POST') {
    await init();
    const { newPotentialCustomer } = collections();
    const result = await newPotentialCustomer.insertOne({
      email: req.body.email,
    });
    res.status(200).json(result);
  } else {
    res.status(404).json({ err: 'Use Post' });
  }
};
