// testData = function(){
//     test=[
//         "e22 e4",
//         "882 b 8",
//         "d8 to be 8",
//         "d2 to see one",
//         "822 bee tree",
//         "332 d4",
//         "f-22 f-35",
//         "d22 h6",
//         "82283",
//         "anyone to see one",
//         "882 east 7",
//         "d7 moves to p6",
//         "c82 pa",
//         "beat 7288",
//         "bah to a 7",
//         "v6 takes d5",
//         "e4 d5",
//         "d16 d4",
//         "c5 takes d for",
//         "83 takes before",
//         "a82 b 8th",
//         "h2 2nh3",
//         "92 f6",
//         "porn pussy 4",
//         "pontiac g6",
//         "porn tube teen sex",
//         "bishop to III",
//         "flight 237",
//         "queen tutitu",
//         "bishop 286",
//         "queen to see two",
//         "night to eat too",
//         "queen to age 4",
//         "porn pics g6",
//         "king louie 2",
//         "book to g1",
//         "look to g1",
//         "hook to g1",
//         "1 fisher to dc",
//         "fondue",
//         "voodoo"
//     ];
//     _.each(test,function(data){
//         console.log(data+"  ///  "+errorCheck(data));
//     });
//     return "done";
// }
// errorCheck = function(content) {;
//     content = content.trim();
//     Bic = [
//         //Remove Hyphens, for example "F-22 F-35" to "F22 F35", "d-22 H6" to "d22 H6"
//         [/-|_/g,""],
//         [/\b(\d)\d(\d\d)/g,"$1to$2"],
//         [/\b2(\w\d)/g,"to $1"],
//         [/(\w\d)2\b/g,"$1 to"]
//     ];
//     _.each(Bic,function(item){
//         content = content.replace(item[0],item[1]);
//     });
//     content = content.trim()
//         .toLowerCase()
//         .replace(/\s+/g, '');
//     Dic = [
//
//
//         //Replace initial 8 with an A, such as "882 B 8" to A82 B 8
//         [/^8/g, "a"],
//         //Replace an ending "A" with an "8". "c82 PA" -> "c82 P8".
//         [/a$/g,"8"],
//         //Must transform strings of the form E22 E4 to: E2 to E4.
//         [/(\w[1-8])\d/, "$1to"],
//
//
//         //Transform length 5 numbers into commands replacing 8s with As if they are at index 0 or 3. Such as,  82283 to "A22A3", then
//         [/8(\d)/g, "a$1"],//again
//
//         //Replace every "P" with a "B" where the "P" is in a position, such as "D7 moves to P6" becomes "D7 moves to B6".
//         [/p([1-8])(?!=.+[a-h]\d)/g,"b$1"],
//
//         //Replace every "V" with a "B". "V6 takes D5" -> "B6 takes D5".
//         [/v(\d)/g,"b$1"],
//         //Add "to" when there's only 2 words in the sentence, i.e. "E4 D5" -> "E4 to D5".
//         [/([a-h]\d)([a-h]\d)/,"$1to$2"],
//         //Replace an extra "6" with the word "takes", i.e. "D16 D4" -> "D1 takes D4".
//         [/(\w\d)6/g,"$1takes"],
//
//
//
//
//         //If the second to last char is 8, replace it
//         //with an A				-> Bh6 	Bishop 286
//         [/8(.)$/,"a$1"],
//         //last
//         [/([a-h]\d)\d/g,"$1"]
//     ];
//     _.each(Dic,function(item){
//         content = content.replace(item[0],item[1]);
//     });
//     return content;
// }
