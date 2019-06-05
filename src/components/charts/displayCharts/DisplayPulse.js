import React,{Component} from 'react'
import CanvasJSReact from '../../../assets/canvasjs.react'
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

let dataPoints =[];
class DisplayPulse extends Component {

    componentDidMount(){
        const pulseList = this.props.pulseList;
        const chart = this.chart;
        pulseList.forEach(function(pulse){
            console.log(new Date(pulse.timeStamp));
            dataPoints.push({
                x: new Date(pulse.timeStamp),
                y: parseInt(pulse.value)
            });
        });

        console.log(dataPoints);
        chart.render();
    }

    render() {
        const options = {
            theme: "light2",
            title: {
                text: "Pulse"
            },
            axisY: {
                title: "Pulse values",
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

export default DisplayPulse