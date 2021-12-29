const COLLECTION_NAME = "users";

async function up(db) {
  await db.collection(COLLECTION_NAME).updateMany({}, { $set: { deactivated: false } });
};

async function down(db) {
  await db.collection(COLLECTION_NAME).updateMany({}, { $unset: { deactivated: 0 } });
};

module.exports = { up, down };