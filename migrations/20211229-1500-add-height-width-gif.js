const COLLECTION_NAME = "messages";

async function up(db) {
  await db.collection(COLLECTION_NAME).updateMany({}, { $set: { height: 0, width: 0 } });
};

async function down(db) {
  await db.collection(COLLECTION_NAME).updateMany({}, { $unset: { height: 1, width: 1 } });
};

module.exports = { up, down };