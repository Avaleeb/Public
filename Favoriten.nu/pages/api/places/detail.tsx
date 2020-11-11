import {NextApiRequest, NextApiResponse} from 'next';
import { collections, init } from '../../../lib/db/mongo';
// import { MongoClient } from 'mongodb';

const limit: number = 6;

type Place = {
    emailContact: string
    placeID: string,
    imageURL: string,
    giftCardURL: string,
    name: string,
    city: string,
    address: string,
}

const mapToPlace = (p: any) => ({
        name: p.google_data.formatted.main_text,
        giftCardURL: p.gift_card_url,
        placeID: p._id,
        emailContact: p.email,
    address: p.google_data.formatted.secondary_text,
    });

export default async (req: NextApiRequest, res: NextApiResponse/*<{place: Place, suggestedPlaces: Place[]}>*/) => {
    const {place_id} = req.query;

    await init();
    const {placeCollection} = collections();

    let placeData = await placeCollection.find({_id: place_id}).map(mapToPlace);

    // const place = mapToPlace(placeData);
    const data = {
        // place: place,
        place: await placeData.next(),
        suggestedPlaces: [],
    };
    res.status(200).json(data);

}


