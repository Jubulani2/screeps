// Version 1.1

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

function defaultDict() {
    this.get = function (key) {
        if (this.hasOwnProperty(key)) {
            return key;
        } else {
            return 0;
        }
    }
}

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

    if(harvesters.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'harvester'});
        //console.log('Spawning new harvester: ' + newName);
    }
    
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    
    if (upgraders.length < 4) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, {role: 'upgrader'});
        //console.log('Spawning new upgrader: ' + newName);
    }
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if (builders.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY, CARRY, WORK, WORK, MOVE, MOVE], undefined, {role: 'builder'});
        //console.log('Spawning new builder: ' + newName);
    }
    
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    if (repairers.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY, CARRY, WORK, WORK, MOVE, MOVE], undefined, {role: 'repairer'});
        //console.log('Spawning new repairer: ' + newName);
    }
    
    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    var ddict = new defaultDict();
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
            ddict['H'] += 1;
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
            ddict['U'] += 1;
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
            ddict['B'] += 1;
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
            ddict['R'] += 1;
        }
    }

    if (ddict.get('H') < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    } else if (ddict.get('U') < 4) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    } else if (ddict.get('B') < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY, CARRY, WORK, WORK, MOVE, MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    } else if (ddict.get('R') < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY, CARRY, WORK, WORK, MOVE, MOVE], undefined, {role: 'repairer'});
        console.log('Spawning new repairer: ' + newName);
    }
}
