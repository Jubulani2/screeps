
var roleRepairer = {
    
        /** @param {Creep} creep **/
        run: function(creep) {
            if (creep.carry.energy == 0) {
                creep.memory.repairing = false;
            }
    
            if(creep.memory.repairing && creep.carry.energy == 0) {
                creep.memory.repairing = false;
                creep.say('Harvest');
            }
            if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
                creep.memory.repairing = true;
                creep.say('Repairing');
            }
            if(creep.memory.repairing) {
                var targets = _.filter(creep.room.find(FIND_STRUCTURES), (struct) => struct.hits < struct.hitsMax);
                if(targets.length) {
                    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else {
                    creep.moveTo(Game.spawns['Spawn1']);
                }
            }
            else {
                var sources = creep.room.find(FIND_SOURCES);
                if (creep.id == '59ab0491914ad16d03244493') {
                    if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                } else {
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
        }
    };
    
    module.exports = roleRepairer;