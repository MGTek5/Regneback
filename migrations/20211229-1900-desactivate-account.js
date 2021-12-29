const COLLECTION_NAME = "users";

async function up(db) {
  await db.collection(COLLECTION_NAME).updateMany({}, { $set: { desactivated: false } });
};

async function down(db) {
  await db.collection(COLLECTION_NAME).updateMany({}, { $unset: { desactivated: 0 } });
};

module.exports = { up, down };