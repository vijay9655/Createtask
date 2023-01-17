const Timetosec=(time)=>{

  return time.format('HH:MM:ss').split(':').reverse().reduce((prev, curr, i) => prev + curr*Math.pow(60, i), 0)
    
    

}
export default Timetosec;