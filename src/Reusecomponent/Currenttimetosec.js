import React from 'react'

function Currenttimetosec(time) {
   return time.split(':').reverse().reduce((prev, curr, i) => prev + curr*Math.pow(60, i), 0)

}

export default Currenttimetosec