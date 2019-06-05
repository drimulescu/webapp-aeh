import React,{Component} from 'react'
import CanvasJSReact from '../../../assets/canvasjs.react'
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

let dataPoints =[];
class DisplayEKG extends Component {

    componentDidMount(){
        const ekgList = this.props.ekgList;
        const chart = this.chart;
        ekgList.forEach(function(ekg){
            console.log(new Date(ekg.timeStamp));
           dataPoints.push({
               x: new Date(ekg.timeStamp),
               y: parseInt(ekg.value)
           });
        });

        console.log(dataPoints);
        chart.render();
    }

    render() {
        const options = {
            theme: "light2",
            title: {
                text: "EKG"
            },
            axisY: {
                title: "EKG values",
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

export default DisplayEKG