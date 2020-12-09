module.exports = (element, settings) => {
   const callendar = require('./src/callendar')
   if(!element) {
       console.error('not a valid container')
       return 
   }
   if(!settings) {
       settings = []
   }
   
   new callendar(element, settings)
}
