var http = require('http');
const app = require('express')();
const MongoClient = require('mongodb').MongoClient;
const leven = require('leven');

//mongo db connection 
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser: true });

let db;
let collection;

client.connect(function (err) {
  console.log("MONGO BAGLANDI");
  db = client.db("tryone"); //mongodb tarafındaki db adı
});
//dondurulecek array tanımlamaları
var arr = new Array();
var sonuc = new Array();
// ./murat seklindeki get istegine cevap donduren fonksiyon.28.satırın sonundaki <=1 kısmı 1 farklı olan kelimeleri gösterir
app.get('/:query', (req, res) => {
 db.collection('isimler').find().project({ "_id": 0,"name":1 }).toArray(function (err, result) {
    if (!err) {
     arr=result;
	for(var i=0;i<arr.length;i++){
		if(leven(req.params.query,arr[i].name)<=1){
			sonuc.push(arr[i].name);
		}
	}
	res.send(sonuc)
	sonuc.length=0;//arrayı temizleyerek sonraki istekte birikmesini engelleme
    } else { res.json({ "hata": err }) }
 
});
});

// ./murat seklindeki get istegine cevap donduren fonksiyon.28.satırın sonundaki <=2 kısmı 2 farklı olan kelimeleri gösterir

app.get('/2/:query', (req, res) => {
 db.collection('isimler').find().project({ "_id": 0,"name":1 }).toArray(function (err, result) {
    if (!err) {
     arr=result;
	for(var i=0;i<arr.length;i++){
		if(leven(req.params.query,arr[i].name)<=2){
			sonuc.push(arr[i].name);
		}
	}
	res.send(sonuc)
	sonuc.length=0; //arrayı temizleyerek sonraki istekte birikmesini engelleme
    } else { res.json({ "hata": err }) }
 
});
});
module.exports = app;
var server = http.createServer(app);
app.listen(3000);