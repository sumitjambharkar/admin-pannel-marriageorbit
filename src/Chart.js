import React from 'react';
import BarChart from 'react-bar-chart';
 
const data = [
  {text: 'Man', value: 500,color:"red"}, 
  {text: 'Woman', value: 100,color:"red"} 
];
 
const margin = {top: 20, right: 20, bottom: 30, left: 40};

    const Chart = () => {

      return (
        <div style={{width: '50%'}}> 
                <BarChart style={{color:"red"}} ylabel='Quantity'
                  width={200}
                  height={500}
                  margin={margin}
                  data={data}/>
            </div>
      )
    }
    
export default Chart
