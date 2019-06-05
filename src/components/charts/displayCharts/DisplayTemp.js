import React,{Component} from 'react'
import CanvasJSReact from '../../../assets/canvasjs.react'
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

let dataPoints =[];
class DisplayTemp extends Component {

    componentDidMount(){
        const tempList = this.props.tempList;
        const chart = this.chart;
        tempList.forEach(function(temp){
            console.log(new Date(temp.timeStamp));
            dataPoints.push({
                x: new Date(temp.timeStamp),
                y: parseInt(temp.value)
            });
        });

        console.log(dataPoints);
        chart.render();
    }

    render() {
        const options = {
            theme: "light2",
            title: {
                text: "Temperature"
            },
            axisY: {
                title: "Temp values",
                includeZero: false
            },
            data: [{
                type: "line",
                xValueFormatString: "DD MMM YYYY HH:mm:ss",
                yValueFormatString: "#,##0",
                dataPoints: dataPoints
            }]
        };

        return (
            <div>
                <CanvasJSChart options = {options} onRef={ref => this.chart = ref}/>
            </div>
        );
    }
}

export default DisplayTemp