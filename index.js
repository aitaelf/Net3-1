const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, (err, db) => {
	if(err) {
		console.log('Connection failed: ', err);
	} else {
		console.log('Connected: ', url);
		let collection = db.collection('test_collection');
		
		createUsers(collection)
			.then(collection => showUsers(collection))
			.then(collection => updateUsers(collection))
			.then(collection => showUsers(collection))
			.then(collection => remove(collection))
			.then(collection => showUsers(collection))
			.then(() => {closeDB(db)})
			.catch(err => console.error(err));
	}
});

function createUsers(collection) {
	var users = [
		{name: 'user1', age: '22'},
		{name: 'user2', age: '24'},
		{name: 'user3', age: '22'},
		{name: 'user4', age: '28'}
	];
	
	return new Promise((done, fail) => {
		
		collection.insert(users, (err, result) => {
			if (err) {
				fail(err);
			} else {
				done(collection);
			}
		});
	});
}

function showUsers(collection) {
	return new Promise((done, fail) => {
		collection.find().toArray((err, result) => {
			if (err) {
				fail(err);
			} else {
				console.log(result);
				console.log('-------------');
				done(collection);
			}
		});
	});
}

function updateUsers(collection) {
	return new Promise((done, fail) => {
		collection.updateMany({age: '22'}, {'$set': {name: 'user22'}}, (err, result) => {
			if (err) {
				fail(err);
			} else {
				done(collection);
			}
		});
	});
}

function remove(collection) {
	return new Promise((done, fail) => {
		collection.remove({name: 'user22'}, (err, result) => {
			if (err) {
				fail(err);
			} else {
				done(collection);
			}
		});
	});
}

function closeDB(db) {
	return new Promise((done, fail) => {
		db.close((err, result) => {
			if (err) {
				fail(err);
			} else {
				done(true);
			}
		});
	});
}