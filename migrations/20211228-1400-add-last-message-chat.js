const COLLECTION_NAME = "chats";

async function up(db) {
  await db.collection(COLLECTION_NAME).updateMany({}, { $set: { lastMessage: 0 } });
};

async function down(db) {
  await db.collection(COLLECTION_NAME).updateMany({}, { $unset: { lastMessage: 1 } });
};

module.exports = { up, down };