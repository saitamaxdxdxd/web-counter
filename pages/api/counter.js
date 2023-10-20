import clientPromise from "../../lib/mongodb";

const ID_COUNTER = "652f4634101a70b4a1707978";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("counter");

        const data = await db
            .collection("counter")
            .find({ "_id": ID_COUNTER })
            .toArray();

        const value = data[0].counter % 351;

        await db
            .collection("counter")
            .updateOne({ "_id": ID_COUNTER }, { $set: { counter: value + 1 } });

        res.json({ counter: value });


    }
    catch (e) {
        console.error(e);
    }
};