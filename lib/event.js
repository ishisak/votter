'use strict';

/**
 * Template for holding event data
 * @class EventTemplate
 * @constructor
 * @typedef{{
 *   eventId:string,
 *   eventName:number
 *   eventDetail:string
 *   owner:string
 *   password:string
 *   candidates:object
 * }}
 */
var EventTemplate = function(){
    this.eventName = null;
    this.eventDetail = null;
    this.owner = null;
    this.password = null;
    this.candidates = {
        "candidateId" : null,
        "candidateName" : null,
        "reason" : null
    };
};

/**
 * Template for someone's ballot
 * @class BallotTemplate
 * @constructor
 * @typedef{{
 *   eventId:string,
 *   userName:string,
 *   candidateId:number,
 *   comment:number
 * }}
 */
var BallotTemplate = function(){
    this.eventId = null;
    this.userName = null;
    this.candidateId = null;
    this.comment = null;
};

module.exports = {
    EventTemplate  : EventTemplate,
    BallotTemplate : BallotTemplate
};
