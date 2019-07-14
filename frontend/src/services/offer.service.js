'use strict';
import httpService from './http.service';
import axios from 'axios';

export default {
    query,
    add,
    update,
    remove,
    getById,
    getRelatedPhotos
}

function query() {
    return httpService.get(_getUrl())
}

function add(offer) {
    return httpService.post(_getUrl(), offer)
}

function update(offer) {
    return httpService.put(_getUrl(offer._id), offer)
}

function remove(_id) {
    return httpService.delete(_getUrl(_id))
}

function getById(_id) {
    console.log('get by id url:', _getUrl(_id));
    return httpService.get(_getUrl(_id))
}

function _getUrl(id = '') {
    return `offer/${id}`
}

async function getRelatedPhotos(searchTerm) {
    try {
        const res = await axios.get(`https://api.unsplash.com/search/photos?per_page=3&query=${searchTerm}&client_id=288fe127f571edeade19b623a9f4984d9341ea0fc8106452b64347c9203243f4`)
        console.log(res.data.results[0].urls.small)
        return res.data.results.map(img => img.urls.small)
    } catch (err) {
        console.log(err)
    }
}

// var offers = createOffers()

// function createOffers() {
//     return [createOffer("ofrId1","Learn Photography",
//      "Will teach you basic photography in no time.",
//      ["https://picsum.photos/200", "https://picsum.photos/200"],
//      ["Photography", "Art"],
//      ["Positive Attitude"],
//      'Five Hours',
//      ["Handling a DSLR Camera", "Shutter", "Aperture"],
//      "Arts",
//      4,
//      [, , , , , , , , , , , , , , , ,],
//      "usrId1",
//     "Harding Holden",
//     "HardingH11",
//     "https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg",
//     "059-284-3326",
//     ["FaceToFace"]
//      ),
//      createOffer("ofrId2","Meditation Technique",
//      "Learned it in india, how to become more aware of yourself and other people. it changed my life and i want to pass it on...",
//      ["http://www.powerthoughtsmeditationclub.com/wp-content/uploads/2010/09/bigstock-Meditating-47886218-1024x683.jpg"],
//      ["Mindfulness", "Wellness"],
//      ["Positive Attitude"],
//      'Six Hours',
//      ["Short explanation of meditation", "Teaching of technique"],
//      "Personal Development",
//      4,
//      [, , , , , ,  , , ,],
//      "usrId2",
//     "Jay Mirchaet",
//     "Jay4life",
//     "https://www.picmonkey.com/blog/wp-content/uploads/2016/11/1-intro-photo-final.jpg",
//     "049-24-3316",
//     ["FaceToFace", "Phone"]
//      ), 
//     createOffer("ofrId3", "Guide you through creating a fb ad",
//     "It looks complicated but i'll make it simple for you and you'll have an up and running ad in 15m.",
//     ['https://scontent.ftlv1-1.fna.fbcdn.net/v/t1.0-9/61795832_2289081734470980_1220615154174001152_n.jpg?_nc_cat=1&_nc_oc=AQmQKn-Wz5pXFElvkRY-nSwLsF30JKilUAqTAZQLiRQracF29YvbX64NDcKVzG-Ghjo&_nc_ht=scontent.ftlv1-1.fna&oh=f9a3d22cfd17128507ddbf9a293f2f6e&oe=5DB10145'],
//     ['marketing', 'facebook', 'social', 'ad'],
//     ['Laptop'],
//     '30 mins',
//     ['Facebook Marketing Intro', 'SEO optimization', 'Keyword selection technique'],
//     'Business and Marketing',
//     2.8,
//     ['Was Very Good', 'Meh', 'Amazing'],
//     'usrId2',
//     "Jay Mirchaet",
//     "Jay4life",
//     "https://www.picmonkey.com/blog/wp-content/uploads/2016/11/1-intro-photo-final.jpg",
//     "049-24-3316",
//     ["Skype", "Phone"]
//     )]
// }

// function createOffer(_id, title, description,imgs,tags, requirements,duration, whatsIncluded, category, stars,comments,userId, name,userName, userImg,phone,type) {
//     return {
//         _id,
//         createdAt: Date.now(),
//         title,
//         description,
//         imgs,
//         tags,
//         requirements,
//         duration,
//         whatsIncluded,
//         category,
//         stars,
//         comments,
//         createdBy: {
//           userId,
//           name,
//           userName,
//           userImg,
//           phone,
//         },
//         wishers: ["5d288a712dd8ae6773cea540", "5d288a7128027b89c061a995"],
//         reviews: [
//           "5d288a7172bb30cc8495ceea",
//           "5d288a71aae2bac14155b96a",
//           "5d288a71cc26081ac0d79ad7"
//         ],
//         leveledUp: [
//           "5d288a717820979d1f4148d5",
//           "5d288a71313311147d69067f",
//           "5d288a710750473f7e029ea3",
//           "5d288a7191f5a14804351d59",
//           "5d288a71bf5716b128dfce52",
//           "5d288a7177f7f9b9f7091aa1"
//         ],
//         type,
//         location: {
//           address: "Ahad Ha'Am 34-38, Tel Aviv",
//           coords: {
//             lat: 33.7731,
//             lng: 32.2582
//           }
//         },

//     }
// }

// function query(filter) {
//   console.log(filter)
//     if (filter.userName) return offers.filter(offer => offer.createdBy.userName === filter.userName)
//     return offers
// }

// function getById(id) {
//     return offers.find(offer => offer._id === id)
// }

// // Local Functions
// function _makeId(length = 5)
// {
//     var text = "";
//     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//     for(var i=0; i < length; i++)
//     {
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }

//     return text;
// }

// WORKING WITH BACKEND: