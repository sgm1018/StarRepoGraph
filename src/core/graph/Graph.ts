import { createChart } from "lightweight-charts";
import { D3Node } from 'd3-node';
import type { UserData } from "../interfaces/UserData";

export class Graph{

    public static generateLineChart(user: UserData, data: Record<string, number>): string {
        const d3n = new D3Node();
        const margin = { top: 20, right: 20, bottom: 40, left: 60 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;
        const avatarImage = user.User['avatar_url'];
    
        const svg = d3n.createSVG(width + margin.left + margin.right, height + margin.top + margin.bottom);
    
        // Formatear etiquetas para el eje X
        let labels = Object.keys(data).map(dateStr => {
            const date = new Date(dateStr);
            return `${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate()}`;
        });
        let values = Object.values(data);
    
        // Reducir la cantidad de etiquetas si son muchas
        if (labels.length > 10) {
            const step = Math.ceil(labels.length / 10);
            labels = labels.filter((_, i) => i % step === 0);
            values = values.filter((_, i) => i % step === 0);
        }
    
        // Escalas
        const x = d3n.d3.scalePoint()
            .domain(labels)
            .range([0, width]);
    
        const y = d3n.d3.scaleLinear()
            .domain([0, Math.max(...values)])
            .nice()
            .range([height, 0]);
    
        // Definir línea y área suavizada
        const line = d3n.d3.line<number>()
            .x((_, i) => x(labels[i])!)
            .y(d => y(d))
            .curve(d3n.d3.curveMonotoneX);
    
        const area = d3n.d3.area<number>()
            .x((_, i) => x(labels[i])!)
            .y0(height)
            .y1(d => y(d))
            .curve(d3n.d3.curveMonotoneX);
    
        // Gradiente para el área debajo de la línea
        const defs = svg.append('defs');
        const gradient = defs.append('linearGradient')
            .attr('id', 'area-gradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '0%')
            .attr('y2', '100%');
    
        gradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', '#4CAF50')
            .attr('stop-opacity', 0.5);
    
        gradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', '#4CAF50')
            .attr('stop-opacity', 0);
    
        // Crear grupo para el gráfico
        const chart = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
        // Ejes y líneas de la cuadrícula
        chart.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3n.d3.axisBottom(x).tickSize(-height).tickPadding(10))
            .selectAll('text')
            .attr('transform', 'rotate(-30)')
            .style('text-anchor', 'end');
    
        chart.append('g')
            .call(d3n.d3.axisLeft(y).ticks(10).tickSize(-width).tickPadding(10));
    
        // Personalizar las líneas de la cuadrícula
        chart.selectAll('.tick line')
            .style('stroke', 'gray')
            .style('stroke-opacity', 0.3) // Reduce la opacidad
            .style('stroke-dasharray', '4,2'); // Hace que las líneas sean discontinuas
    
        // Área debajo de la línea
        chart.append('path')
            .datum(values)
            .attr('fill', 'url(#area-gradient)')
            .attr('d', area);
    
        // Línea principal
        chart.append('path')
            .datum(values)
            .attr('fill', 'none')
            .attr('stroke', '#4CAF50')
            .attr('stroke-width', 2)
            .attr('d', line);
    
        // Puntos en la línea
        chart.selectAll('.dot')
            .data(values)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('cx', (_, i) => x(labels[i])!)
            .attr('cy', d => y(d))
            .attr('r', 4)
            .attr('fill', '#4CAF50')
            .attr('stroke', 'white')
            .attr('stroke-width', 1);
    
        return d3n.svgString();
    }
    

    public static createGraph(data: any): any {
        const chartContainer = document.createElement('div');
        chartContainer.id = 'tradingview-chart';
        document.body.appendChild(chartContainer);

        const chart = createChart(chartContainer, {
            width: 800,
            height: 500,
            layout: {
              background: {
                color: "#fff",
              },
              textColor: "#333",
            },
            grid: {
              vertLines: {
                color: "#eee",
              },
              horzLines: {
                color: "#eee",
              },
            },
          });

        const lineSeries = chart.addLineSeries();
        lineSeries.setData(data);

        return chart;

    }


}