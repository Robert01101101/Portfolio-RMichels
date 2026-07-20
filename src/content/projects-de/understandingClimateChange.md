---
slug: "understandingClimateChange"
name:
  en: "Understanding Climate Change"
  de: "Understanding Climate Change"
projectType:
  en: "D3.js Website"
  de: "D3.js Website"
year: "2018"
inDevelopment: false
roles: ["d3js", "front-end"]
description:
  en: "A website that uses D3.js to visually analyze climate change data. Data visualizations include line charts and stacked area charts of global climate change data, as well as a detailed choropleth map and other visualizations of Canadian weather data."
  de: "Eine Website, die D3.js nutzt, um Klimawandeldaten visuell zu analysieren."
links:
  - label: "View Project"
    url: "http://understandingclimatechange.rmichels.com/ccImpacts.html"
order: 13
---

<section class="sectionText">
    
    <h2>Die Aufgabe</h2>
    <p>As an exercise of interactive data visualization techniques, we planned to comprehensively visualize climate change data. Our goal was to condense complex datasets into simple charts that communicate the mechanics, origins und local impact of climate change in Canada. To entice users, we would develop simple interactions such as pop-up tooltips, as well as complex interactions such as brushing, changing representations und animation.</p>
  </section>

  
  <section class="sectionMedia">
    <div class="mediaColumn">
      <figure onclick="viewImage(this)">
        <img src="/assets/img/understandingClimateChange/lqip/chart1.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="/assets/img/understandingClimateChange/lqip/chart2.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="/assets/img/understandingClimateChange/lqip/chart3.jpg">
      </figure>
    </div>
  </section>

  
  <section class="sectionText">
    <h2>Das Ergebnis</h2>
    <h3>Understanding Climate Change</h3>
    <p>Features four color-coded line charts of global CO2 emissions und atmospheric concentration, as well as a stacked area chart of CO2 emissions by region.</p>
    
    <h3>Understanding Climate Change Impact</h3>
    <p>With the choropleth map of Canada und its provinces und territories, users can explore Canadian weather data, including temperature und precipitation, by year, month und province. There is also a spider chart of the global temperature anomaly over time. Both charts can be dynamically queried und animated.</p>

    <h3>Climate Change Impact Summary</h3>
    <p>The climate change summary charts aim to show a correlation, or lack thereof, of CO2 emissions und weather anomalies. There are four line plots of mean Canadian weather temperature, precipitation und their anomalies, grouped with a line plot of global CO2 emissions. </p>
  </section>

  
  <section class="sectionMedia">
    <div class="mediaColumn">
      <figure onclick="viewImage(this)" id="chart4">
        <img src="/assets/img/understandingClimateChange/lqip/chart4.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="/assets/img/understandingClimateChange/lqip/chart5.jpg">
      </figure>
    </div>
  </section>

  
  <section class="sectionText">
    <h2>Prozess</h2>
    <p>We entwickelt the project in a team of two, over the course of two months und it was our first experience with D3.js. Early on, we defined two central questions that we would attempt to answer with the project:</p>
    <ol>
      <li>What are the contributing factors to climate change?</li>
      <li>Since climate impacts weather, are there indications of Canadian weather behaving abnormally?</li>
    </ol>
    <p>After defining these questions, we set out to find relevant data. Most data needed to be cleaned for outliers und bad data. The most complex dataset was that of Canadian weather data, as we needed to manually merge multiple large datasets, clean und sort the data und calculate monthly und annual averages.</p>
    <p>The final phase of project development involved developing the D3.js driven visualizations und assembling the final website, which also doubles as a project report. Most charts, including the line charts und stacked area chart, were fairly straightforward to implement. By far the most complex chart was the choropleth map of Canadian weather data. While the visual mapping of data to geography und color was challenging, the outcome was worth it. The resulting map provides an enticing und interactive way to quickly browse through a large dataset of Canadian weather data und make local as well as federal-level observations.</p>
  </section>

  
  <section class="sectionMedia">
    <div class="mediaColumn">
      <figure onclick="viewImage(this)">
        <img src="/assets/img/understandingClimateChange/lqip/chart6.jpg">
      </figure>
    </div>
  </section>

  
  <section class="sectionText">
    <h2>Der Code</h2>
    <p>The project is entwickelt with HTML, CSS und JS, where we employ the data-driven visualization library <a href="https://d3js.org/" target="_blank">D3.js</a>. Implementing all the visualizations was very challenging, as D3 was new to us. Particularly the use of the chain syntax was cumbersome in the beginning. The general workflow consists of loading data, selecting DOM elements und inserting SVG elements with certain attributes mapped to the data. In the excerpt below, the <a  href="#chart4">Canadian Weather Data Chart</a> is rendered in <code>drawMap()</code>, with the color of each province mapped to temperature or percipitation data depending on the user's inputs. The excerpt also includes mouse hover interactions for the individual provinces starting at line 58, where the province is visually highlighted und data in the legend is updated by calling <code>updateDataData()</code>, which isn't show in the example.</p>
  </section>

  
  <section class="sectionMedia">
    <script src="https://gist.github.com/robert-michels/fea50c19b3bcdff1b1ee446cad3a8028.js"></script>
  </section>
