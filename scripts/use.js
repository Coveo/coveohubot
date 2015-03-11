// Description:
//   hubot sends an attack from you to another person
//   output is always the same from the same input
//
// Commands:
//   !use <atk> <target> - Attack <target> with <atk>
//
// Author:
//   guisim
//   pastjean

var _effectivenessReduce = function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a}

module.exports = function(robot){
  robot.hear(/^!use (.*)/,function(msg){
    var what = msg.match[1];
    var splitted = what.split(" ")
    if(splitted.length < 2){
      msg.send("Must specify an attack and a target\n>!use attack target");
      return;
    }

    var target = splitted[1]
    var atk = splitted[0]

    var textToSend = msg.message.user.name + " used " + atk + " on " + target + "! ";

    var hash = textToSend.split("").reduce(_effectivenessReduce,0); ;
    var super_effective = (hash % 7 === 0); // Use 3 so super effective is less frequent than not very effective

    if(super_effective){
      textToSend += "\nIt's super effective :collision:";
    }else{
      textToSend += "\nIt's not very effective... :zzz:";
    }

    msg.send(textToSend);
  });
}
