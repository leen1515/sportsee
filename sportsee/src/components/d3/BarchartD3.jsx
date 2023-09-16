import * as d3 from 'd3';
import { useEffect } from 'react';


function BarChartD3({ data }) {

    useEffect(() => {
        const minKilo = d3.min(data, (k) => k.kilogram);
        const maxKilo = d3.max(data, (k) => k.kilogram);
        const max = d3.max(data, (c) => c.calories);;
        const lastTenDays = data.slice(-10);
    
        const x = d3
            .scaleBand()
            .domain(data.map((d) => d.day))
            .range([0, 685])
            .paddingInner(0.95);
            
        const y = d3
            .scaleLinear()
            .domain([0, max])
            .range([140, 0]);

        const yKilo = d3
            .scaleLinear()
            .domain([minKilo, maxKilo]) 
            .range([140, 0]);

        const xAxis = d3.axisBottom(x)
        .tickSize(0)
        .tickValues(lastTenDays.map((d, i) => (d.day)));

        const yAxis = d3.axisRight(yKilo).ticks(3);

        const graphic = d3
            .select('svg')
            .append('g')
            .attr('width', 680)
            .attr('height', 150)
            .attr('transform', 'translate(50, 110)');

        const xGroup = graphic
            .append('g')
            .attr('transform', `translate(0, 139)`);

        const yGroup = graphic
            .append('g')
            .attr('transform', `translate(700, 0)`);
        const xGroupMiddle = graphic
            .append('g')
            .attr('transform', `translate(0, 70)`);

        const xGroupTop = graphic.append('g');
    


        xGroup
            .select('.domain')
            .attr('stroke', '#DEDEDE')
            .attr('stroke-width', 1);

        xGroup
            .selectAll('.tick text')
            .attr('transform', 'translate(0, 10)');

        yGroup.select('.domain').attr('stroke-width', 0);
        yGroup.selectAll('.tick text')
            .attr('transform', 'translate(20, 0)')

        xGroup.call(xAxis).style('font-size', '12px');
        xGroupTop.call(xAxis);
        xGroupMiddle.call(xAxis);

        xGroup
            .select('.domain')
            .attr('stroke', '#DEDEDE')
            .attr('stroke-width', 1);

        xGroupTop
            .select('.domain')
            .attr('stroke', '#DEDEDE')
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '2');

        xGroupMiddle
            .select('.domain')
            .attr('stroke', '#DEDEDE')
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '2');

        xGroup
            .selectAll('.tick text')
            .attr('transform', 'translate(0, 10)');

        xGroupMiddle.selectAll('.tick text').attr('opacity', '0');
        xGroupTop.selectAll('.tick text').attr('opacity', '0');

        yGroup.call(yAxis).style('font-size', '14px');

        yGroup.select('.domain').attr('stroke-width', 0);
        
        yGroup
            .selectAll('.tick text')
            .attr('transform', 'translate(20, 0)')

        const groupKilo = graphic
            .append('g')
            .attr('transform', `translate(-6, 0)`)
            .attr('width', 685)
            .attr('height', 140);

        const groupCalories = graphic
            .append('g')
            .attr('transform', `translate(6, 0)`);

        const rectKilo = groupKilo
            .selectAll('line')
            .data(data)
            .enter()
            .append('line')
            .attr('x1', (d) => x(d.day))
            .attr('x2', (d) => x(d.day))
            .attr('y2', '140')
            .attr('y1', '140')
            .attr('stroke', '#000')
            .attr('stroke-width', '8px')
            .attr('stroke-linecap', 'round');

        rectKilo
            .transition()
            .duration(600)
            .attr('y2', (d) => yKilo(d.kilogram));

        const rectCalories = groupCalories
            .selectAll('line')
            .data(data)
            .enter()
            .append('line')
            .attr('fill', '#E60000')
            .attr('x1',(d) => x(d.day))
            .attr('x2',(d) => x(d.day))
            .attr('y2', '140')
            .attr('y1', '140')
            .attr('stroke', '#E60000')
            .attr('stroke-width', '8px')
            .attr('stroke-linecap', 'round');

        rectCalories
            .transition()
            .duration(600)
            .attr('y1', (d) => y(d.calories));

        graphic
            .append('g')
            .append('rect')
            .attr('transform', `translate(-20, 140)`)
            .attr('width', 730)
            .attr('height', 5)
            .attr('fill', '#FBFBFB');

// Animation to the graphic to display an infosbulle with kg and calories
        const infosBulle = d3.select('body')
        .append('div')
        .attr('class', 'infosBulle')
        .style('position', 'absolute')
        .style('background-color', '#E60000')
        .style('color', 'white')
        .style('padding', '20px 5px')
        .style('font-size', '10px')
        .style('font-weight', 'normal')
        .style('text-align', 'center')
        .style('width', 'fit-content')
        .style('height', 'fit-content')
        .style('box-shadow', '0 0 5px #BDBDBD');

        const mouseover = function (event, d) {
        infosBulle
            .transition()
            .duration(100)
            .style('opacity', 1)
        infosBulle
            .html(d.kilogram + " kg  <br><br><br>" + d.calories + " Kcal ")
            .style('left', (event.x) + 'px')
            .style('top', (event.y) + 'px')
        };

        const mousemove = (event, d) =>{
        infosBulle
            .style('left', (event.x) + 'px')
            .style('top', (event.y) + 'px')
        };

        const mouseleave = (event, d) => {
        infosBulle
            .transition()
            .duration(2000)
            .delay(500)
            .style('opacity', 0)
        };

        rectCalories
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseleave', mouseleave)

        rectKilo
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseleave', mouseleave)

    }, [data]);
    return <></>;
}

export default BarChartD3;