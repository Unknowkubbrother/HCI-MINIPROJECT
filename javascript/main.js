// --| 🐌	@ Unknowkubbrohter DEV 
// -- | github : https://github.com/Unknowkubbrother	
// -- | วันที่สร้าง 2024-03-11
// @copyRight 2024 by Unknowkubbrother DEV (ณัฐชานน ทรัพย์มีชัย)

const margin = { top: 10, right: 10, bottom: 130, left: 100 };

var i = 0;

const app = Vue.createApp({
  data() {
    return {
      data: {
        years: [],
      },
      selectedYear: null,
      width: 700 - margin.left - margin.right,
      height: 500 - margin.top - margin.bottom,
      textX: "No. of volumes",
      textY: "Approximate sales in million(s)",
      d3maxW: 0,
      d3minW: 0,
      d3maxH: 0,
      d3minH: 0,
      loopYear: false,
      DataInhtml: {
        title: "HCI-MINIPROJECT",
        Name: "ณัฐชานน ทรัพย์มีชัย",
        StudentID: "6604062636151",
        text_detail: "โครงการนี้เป็นสำหรับหลักสูตร Human-Computer Interaction (HCI) ของ คณะวิทยาศาสตร์ประยุกต์ สาขา วิทยาการคอมพิวเตอร์และเทคโนโลยี มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ โปรเจ็กต์นี้เกี่ยวกับการสร้างแสดงภาพข้อมูลโดยใช้ D3.js และ ผู้ใช้ได้ใช้ Vue.js เป็นเครื่องมือช่วยในการเขียน ข้อมูลที่ใช้เกี่ยวกับซีรีส์มังงะ ตั้งแต่ปี 1952 - 2019 รวมถึงชื่อซีรีย์มังงะ ผู้แต่ง ผู้จัดพิมพ์ ข้อมูลประชากร จำนวนเล่ม ปีที่ตีพิมพ์ ปีสิ้นสุด ยอดขายโดยประมาณในหน่วยล้าน และ ยอดขายเฉลี่ยต่อเล่มในหน่วยล้าน <span class ='text-sky-500'>กราฟนี้แสดงเป็นแผนภูมิกระจาย แกน x แสดงถึงจำนวนเล่ม และ แกน y แสดงถึง ยอดขายโดยประมาณในหน่วยล้าน แล้วจะได้ยอดขายเฉลี่ยต่อเล่มในหน่วยล้าน ของซีรีส์มังงะเรื่องนั้นๆ สีของจุดแสดงถึงจำนวนเล่มและใช้สีแตกต่างกันจะได้มองเห็นถึงความแตกต่างของซีรีส์เรื่องนั้นๆ ขนาดของจุดแสดงถึงยอดขายโดยประมาณในหน่วยล้าน </span> ToolTip ถ้าผู้ใช้เอาเม้าส์ไปชี้จะแสดงรายละเอียดของซีรีส์มังงะเล่มนั้นๆ ผู้ใช้สามารถเลือกปีเพื่อดูข้อมูลของปีนั้นได้ ผู้ใช้ยังสามารถรีเซ็ตค่าเป็นค่าเริ่มต้นได้ และ ผู้ใช้ยังสามารถวนซ้ำปีต่างๆ เพื่อดูข้อมูลของแต่ละปีได้",
      },
      credit: "CopyRight 2024 by Unknowkubbrother DEV (ณัฐชานน ทรัพย์มีชัย)"
    };
  },
  methods: {
    ResetValues(){
      this.selectedYear = this.data.years[0];
      this.loopYear = false;
      i = 0;
      alert("The value has been reset.");
      console.log("Working ResetValues");
    },
    CountDownYear() {
      let len = this.data.years.length;
      this.selectedYear = this.data.years[i];
      i++;
      if(i == len){
        i = 0;
      }
      console.log("Working CountDownYear");
    },
    updateData() {
      d3.select("#chart-area").select("svg").remove(); // ลบ SVG เดิมทิ้ง
      d3.select("#chart-area").select(".tooltip").remove(); // ลบ tooltip เดิมทิ้ง

      const newSvg = d3
        .select("#chart-area")
        .append("svg")
        .attr("width", this.width + margin.left + margin.right)
        .attr("height", this.height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      d3.csv("../data/manga.csv").then((data) => {
        data.forEach((d) => {
          if (d["Published"] == this.selectedYear) {
            d.weight = Number(d[this.textX]);
            d.height = Number(d[this.textY]);
          }
        });
        // console.log("Working Changed Data");
        // console.log(this.loopYear);
        this.defaultData(data, newSvg);
      });
    },
    defaultData(data, svg) {
      const x = d3
        .scaleLinear()
        .domain([0, this.d3maxW])
        .range([0, this.width]);

      svg
        .append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .call(d3.axisBottom(x).ticks(8));

      svg
        .append("text")
        .attr("class", "x axis-label")
        .attr("text-anchor", "end")
        .attr("x", this.width - margin.right)
        .attr("y", this.height + 50)
        .text(this.textX)
        ;

      const y = d3
        .scaleLinear()
        .domain([0, this.d3maxH])
        .range([this.height, 0]);
      svg.append("g").call(d3.axisLeft(y).ticks(8));

      const z = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.height * 1.5)])
        .range([0, 50]);
      svg
        .append("text")
        .attr("class", "y axis-label")
        .attr("x", -(this.height / 2))
        .attr("y", -60)
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text(this.textY);

      let Tooltip = {
        myColor: d3
          .scaleOrdinal()
          .domain([
            d3.min(data, (d) => d.weight),
            d3.max(data, (d) => d.weight),
          ])
          .range(d3.schemeSet2),

        tooltip: d3
          .select("#chart-area")
          .append("div")
          .style("opacity", 0)
          .attr("class", "tooltip")
          .style("background-color", "black")
          .style("border-radius", "5px")
          .style("padding", "7px")
          .style("color", "white"),

        showTooltip: function (d) {
          Tooltip.tooltip.transition().duration(200);
          Tooltip.tooltip
            .style("opacity", 1)
            .html(
              "Manga series : " +
                d["Manga series"] +
                "<br>" +
                "Author(s) : " +
                d["Author(s)"] +
                "<br>" +
                "Publisher : " +
                d["Publisher"] +
                "<br>" +
                "Demographic : " +
                d["Demographic"] +
                "<br>" +
                "No. of volumes : " +
                d["No. of volumes"] +
                "<br>" +
                "Published : " +
                d["Published"] +
                "<br>" +
                "End : " +
                d["End"] +
                "<br>" +
                "Approximate sales in million(s) : " +
                d["Approximate sales in million(s)"] +
                "<br>" +
                "Average sales per volume in million(s) : " +
                d["Average sales per volume in million(s)"]
            )
            .style("left", d3.mouse(this)[0] + 30 + "px")
            .style("top", d3.mouse(this)[1] + 30 + "px")
            .style("z-index", "9999")
            .style("position", "absolute");
        },
        moveTooltip: function (d) {
          Tooltip.tooltip
            .style("left", d3.mouse(this)[0] + 30 + "px")
            .style("top", d3.mouse(this)[1] + 30 + "px");
        },
        hideTooltip: function (d) {
          Tooltip.tooltip.transition().duration(200).style("opacity", 0);
        },
      };


      // Add dots
      svg
        .append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(d.weight);
        })
        .attr("cy", function (d) {
          return y(d.height);
        })
        .attr("r", function (d) {
          return z(d.height);
        })
        .style("fill", function (d) {
          return Tooltip.myColor(d.weight);
        })
        .style("opacity", "0.7")
        .on("mouseover", Tooltip.showTooltip)
        .on("mousemove", Tooltip.moveTooltip)
        .on("mouseleave", Tooltip.hideTooltip);

      //legend
      const legend = svg
        .append("g")
        .attr("class", "legend")
        .attr("transform", "translate(520," + (this.height - 20) + ")");

      legend
        .selectAll("text")
        .data(this.selectedYear)
        .enter()
        .append("text")
        .attr("x", function (d, i) {
          return i * 15;
        })
        .attr("y", 0)
        .text(function (d) {
          return d;
        })
        .style("font-size", "20px")
        .style("font-size", "bold")
        .style("fill", "#009cff")
        .style("text-anchor", "middle");
    },
  },
  mounted() {
    const svg = d3
      .select("#chart-area")
      .append("svg")
      .attr("width", this.width + margin.left + margin.right)
      .attr("height", this.height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("../data/manga.csv").then((data) => {
      data.map((year) => {
        if (!this.data.years.includes(year["Published"])) {
          this.data.years.push(year["Published"]);
        }
      });


      this.data.years.sort();
      this.selectedYear = this.data.years[0];

      data.map((d) => {
        d.d3W = Number(d[this.textX]);
        d.d3H = Number(d[this.textY]);
      });
      this.d3maxW = d3.max(data, (d) => d.d3W);
      this.d3minW = d3.min(data, (d) => d.d3W);
      this.d3maxH = d3.max(data, (d) => d.d3H);
      this.d3minH = d3.min(data, (d) => d.d3H);
    });
    d3.interval(() => {
      if(this.loopYear){
        this.CountDownYear();
      }
      // console.log("Working Interval");
    }, 500);
    this.updateData();
  },

  watch: {
    selectedYear() {
      this.updateData();
    },
  },
});

app.mount("#app");
