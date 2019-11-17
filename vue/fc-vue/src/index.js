/**
 * 
 * 
 * @param {*} options
 */

 function Vue(options){
   this._init(options)
 }

 Vue.prototype = {
   constructor:Vue,
   ...require('./instance/init'),
   
 }

 module.exports = Vue