import {NextApiRequest, NextApiResponse} from 'next';
import { collections, init } from '../../../lib/db/mongo';

const defaultLimit: number = 12;
type Data = {
    _id: string,
    name: string,
    key: string,
    city: string,
};

type Place = {
    emailContact: string
    placeID: string,
    imageURL: string,
    giftCardURL: string,
    name: string,
    city: string,
    address: string,
}

export default async (req: NextApiRequest, res: NextApiResponse<{suggestedPlaces: Place[], moreAvailable: boolean}>) => {
    const {neighborhood, offset, limit} = req.query;
    const offsetInt = parseInt(offset.toString(), 10);
    const limitInt : number = limit ? parseInt(limit.toString(), 10) : defaultLimit;

    await init();
    const {placeCollection} = collections();

    let placeData = (await ( await placeCollection.find({"google_data.formatted.secondary_text": { $regex: neighborhood, $options: 'i'}})
            .skip(offsetInt)
            .limit(limitInt)
    ).toArray());

    const data = {
        suggestedPlaces: placeData.map((p: any) => ({
            name: p.google_data.formatted.main_text,
            giftCardURL: p.gift_card_url,
            placeID: p._id,
            emailContact: p.email,
            address: p.google_data.formatted.secondary_text,
        })),
        moreAvailable: placeData.length >= 9,
    };
    res.status(200).json(data);
}