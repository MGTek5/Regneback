const COLLECTION_NAME = "users";

async function up(db) {
  await db.collection(COLLECTION_NAME).updateMany({}, { $set: { profileGif: null } });
};

async function down(db) {
  await db.collection(COLLECTION_NAME).updateMany({}, { $unset: { profileGif: 1 } });
};

module.exports = { up, down };