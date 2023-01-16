/* eslint-disable */
const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();
// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// exports.getAverages = functions.firestore.document('recon/{entryId}')
//     .onCreate((snap, context) => {
//         const data = snap.data().original;

//         let sortedList = {};
//         let avg = {};

//         data.map(entry => {
//             if (!sortedList[entry.team]) {
//                 sortedList[entry.team] = [entry];
//                 avg[entry.team] = {};
//                 return;
//             }

//             sortedList[entry.team].push(entry);
//         })

//         Object.keys(sortedList).map(team => {
//             sortedList[team].map(entry => {
//                 reconfig['data'].map(field => {
//                     if (field.name === 'team' || field.name === 'match') return;
//                     switch (field.type) {
//                         case 'number':
//                             if (!avg[team][field.name]) {
//                                 avg[team][field.name] = entry[field.name] / sortedList[team].length;
//                                 return;
//                             }
//                             avg[team][field.name] += entry[field.name] / sortedList[team].length;
//                             return;
//                         case 'select':
//                             const mappedOptions = field.options.reduce((acc, _, i) => {
//                                 acc[field.options[i]] = i;
//                                 return acc;
//                             }, {});

//                             if (!avg[team][field.name]) {
//                                 avg[team][field.name] = mappedOptions[entry[field.name]] / sortedList[team].length;
//                                 return;
//                             }
//                             avg[team][field.name] += mappedOptions[entry[field.name]] / sortedList[team].length;
//                             return;
//                         default:
//                             return;
//                     }
//                 })
//             })


//         })
//     });
