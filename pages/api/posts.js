import { db } from "@/lib/firebase/admin";

export default async function handler(req, res) {
  // db
  let docs;
  const data = await db
    .collection("posts")
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      var _temp = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        _temp.push({ ...doc.data(), id: doc.id });
      });
      docs = _temp;
    });

  res.status(200).json(docs);
}
