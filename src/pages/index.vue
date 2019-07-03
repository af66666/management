<template>
  <div class="boxer">
    <div class="header">centby.com</div>
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple">总</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">月</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">周</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">收入</div></el-col>
    </el-row>
    <v-chart :options="themonth"/>
    <el-row :gutter="20">
      <el-col :span="12"><v-chart :options="thebar"/></el-col>
      <el-col :span="12"><v-chart :options="theline"/></el-col>
    </el-row>


  </div>
</template>

<script>
  import ECharts from 'vue-echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/polar'

    export default {
      name: "tables",
      components: {
        'v-chart': ECharts
      },
      data () {
        return {
          theline: null,
          thebar: null,
          themonth: null
        }
      },
      mounted: function () {
        this.initBar()
        this.initLine()
        this.initMonth()
      },
      methods: {
        initBar() {
          //this.axios.get('/url').then((data) => {this.polar={}}
          let data_title = ['个人医疗花费', '同族群医疗花费'];
          let cities = ['1年', '2年', '3年', '4年', '5年', '6年', '7年', '8年', '9年', '10年'];
          let param_a = [111112,111113,111114,111115,111116,111117,111118,111119,111110,11111];
          let param_c = [511111,411111,311111,211111,111111,611111,911111,811111,911111,711111];
          let obj = {
            m10: {
              compare_yearsfee: '9'
            }
          };
          this.thebar = {
            legend: {
              show: true,
              data: data_title,
              textStyle:{
                color: '#333'
              },
              top: 2,
              left: 10
            },
            tooltip: {
              trigger: 'axis',
              formatter: (obj.m10.compare_yearsfee == '')? '{b}<br />{a0}:{c0}元' : '{b}<br />{a0}:{c0}元<br />{a1}:{c1}元'
            },
            grid: {
              top: 56,
              left: 18,
              right: 26,
              bottom: 6,
              containLabel: true
            },
            color: ['#0f0', '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
            xAxis: {
              type: 'category',
              data: cities,
              boundaryGap: true,//两边留白
              splitLine: {
                show: false, //隐藏分割线
                lineStyle: {
                  color: '#ddd',
                  type: 'solid'
                },
                //interval: 3,
              },
              axisLine: {
                lineStyle: {
                  color: '#ddd',
                },
              },
              axisTick: {
                show: false,
              },
              axisLabel: { //轴线刻度设置
                //interval: 1,
                formatter: '{value}',
                color: '#E6E8EB'
              },
            },
            yAxis: [{
              type: 'value',
              axisLabel: {
                formatter: '{value}',
                margin: 15,
                color: '#E6E8EB'
              },
              name: '￥        ',
              nameGap: 6,
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#ddd',
                  type: 'solid'
                }
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#ddd'
                },
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                formatter: '{value}',
                margin: 15,
                color: '#E6E8EB'
              }
            }],
            series: [{
              name: '个人医疗花费',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: '#6D92EE',
//							shadowColor : 'rgba(0,0,0,0.5)',
//							shadowBlur: 8,
//							shadowOffsetX: 8,
//							shadowOffsetY: 10,
                  barBorderRadius: [5, 5, 0, 0]
                },
              },
//					itemStyle: {
//						normal: {
//							color: '#1586ec'
//						}
//					},
              data: param_a,
              //legendHoverLink: false,
              // emphasis: {
              //   itemStyle: {
              //     color: '#6D92EE'
              //   }
              // }
            }, {
              name: '同族群医疗花费',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: '#E6E8EB',
                  barBorderRadius: [5, 5, 0, 0]
                },
              },
              data: param_c,
              //legendHoverLink: false,
              barCategoryGap:'50%',
              // emphasis: {
              //   itemStyle: {
              //     color: '#E6E8EB'
              //   }
              // }
            }],
            animationDuration: 2000,
            silent: true
          }

        },
        initLine (){
          var obj = {
            m01: {
              "lift_rates":[80.6,80.3,80,79.7,79.3,79,78.6,78.1,77.7,77.3,76.8,76.3,75.7,75.2,74.6,74.1,73.5,72.8,72.2,71.5,70.8,70.1,69.3,68.4,67.6,66.6,65.7,64.4,63.1,61.8,60.4,58.8,57.2,55.4,53.5,51.3,48.8,46.2,43.5,40.7,37.7,34.7,31.7,28.9,26.1,23.3,20.5,18.1,15.7,13.5,11.3,9.6,7.9,6.3,5,3.9,3,2.3],
              "lost_ability":23.93,
              "pre_rem":30.11,
              "heal_rates":[75.1,74.6,73.9,73.3,72.7,72,71.4,70.7,69.9,69.2,68.4,67.7,66.9,66,65.1,64.3,63.4,62.5,61.5,60.5,59.5,58.5,57.5,56.3,55.2,54,52.8,51.4,49.9,48.4,46.9,45.3,43.6,41.9,40.1,38.1,35.9,33.7,31.5,29.2,26.8,24.6,22.4,20.3,18.3,16.2,14.2,12.5,10.8,9.3,7.8,6.5,5.4,4.3,3.4,2.7,2.1,1.6],
              "lift_fee":196719,
              "rates_ages":[42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99],
              "pre_lift":71.11,
              "lost_heal_ratio":["7.3","7.6","8.3","8.7","9.1","9.7","10.1","10.5","11.2","11.7","12.3","12.7","13.2","13.9","14.6","15.2","15.9","16.5","17.4","18.2","19.0","19.8","20.5","21.5","22.5","23.3","24.4","25.3","26.5","27.7","28.8","29.8","31.2","32.2","33.4","34.6","35.9","37.1","38.1","39.4","40.7","41.1","41.5","42.4","42.6","43.8","44.4","44.8","45.4","45.2","44.9","47.7","46.3","46.5","47.1","44.4","42.9","43.8"]
            }
          };
          var n = Math.ceil(obj.m01.pre_lift);
          var tmp_a = parseInt(n) - parseInt(obj.m01.rates_ages[0]) + 1;
          var age = (obj.m01.rates_ages).slice(0,tmp_a);
          var survival = (obj.m01.lift_rates).slice(0,tmp_a);
          var disability = (obj.m01.lost_heal_ratio).slice(0,tmp_a);
          this.theline = {
            legend: {
              data: ['健康率', '失能率'],
              textStyle: {
                color: '#000'
              },
              top: 0,
              right: 12,
            },
            tooltip: {
              trigger: 'axis',
              formatter: '{b}岁<br />{a0}:{c0}%<br />{a1}:{c1}%'
            },
            grid: {
              top: 46,
              left: 8,
              right: 22,
              bottom: 10,
              containLabel: true,
            },
            color: ['#0f0', '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
            //				toolbox: {
            //					feature: {
            //						saveAsImage: {}
            //					}
            //				},
            xAxis: {
              type: 'category',
              data: age,
              boundaryGap: false,
              splitLine: {
                show: true, //隐藏分割线
                lineStyle: {
                  color: '#f5f5f5',
                  type: 'solid'
                },
                //interval: 3,
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#a9a8a8',
                },
              },
              axisTick: {
                show: false
              },
              axisLabel: { //轴线刻度设置
                //interval:6,
                formatter: '{value}岁',
              },
            },
            yAxis: [{
              type: 'value',
              min: 0,
              max: 100,
              axisLabel: {
                color: '#a9a8a8',
                formatter: '{value}%'
              },
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#f5f5f5'
                },
              },
              interval: 25,
              splitLine: {
                show: false,
                lineStyle: {
                  color: '#ddd',
                  type: 'solid'
                }
              }
            },{
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#f5f5f5',
                  type: 'solid'
                }
              }
            }],
            series: [{
              name: '健康率',
              type: 'line',
              lineStyle: {
                normal: {
                  width: 3,
                  color: '#6293f5',
                  shadowColor : 'rgba(0,0,0,0.5)',
                  shadowBlur: 8,
                  shadowOffsetX: 8,
                  shadowOffsetY: 10
                },
              },
              itemStyle: {
                normal: {
                  color: '#6293f5'
                }
              },
              data: survival,
              showSymbol: false
            }, {
              name: '失能率',
              type: 'line',
              lineStyle: {
                normal: {
                  width: 3,
                  color: '#f5495b',
                  shadowColor: 'rgba(0,0,0,0.5)',
                  shadowBlur: 8,
                  shadowOffsetX: 8,
                  shadowOffsetY: 10
                },
              },
              itemStyle: {
                normal: {
                  color: '#f5495b'
                }
              },
              data: disability,
              showSymbol: false
            }]
          }
        },
        initMonth(){
          this.themonth = {
            tooltip: {
              trigger: 'axis'
            },
            grid: {
              top: '3%',
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              boundaryGap: false,
              data: ['1号', '2号', '3号', '4号', '5号', '6号', '7号', '8号', '9号', '10号',
                '11号', '12号', '13号', '14号', '15号', '16号', '17号', '18号', '19号', '20号',
                '21号', '22号', '23号', '24号', '25号', '26号', '27号', '28号', '29号', '30号', '31号'
              ]
            }],
            yAxis: [{
              type: 'value'
            }],
            textStyle: {
              color: '#838FA1'
            },
            series: [{
              name: '新增用户',
              type: 'line',
              stack: '总量',
              areaStyle: {
                normal: {}
              },
              data: [120675, 118962, 101754, 114865, 119076, 111752, 123965, 120363, 113435, 112065,
                125042, 120278, 138703, 136790, 135708, 150287, 163187, 150569, 157826, 182633,
                199375, 195334, 205617, 220527, 234721, 240938, 239065, 263334, 285365, 302602, 361553
              ],
              itemStyle: {
                normal: {
                  color: '#1cabdb',
                  borderColor: '#1cabdb',
                  borderWidth: '2',
                  borderType: 'solid',
                  opacity: '1'
                },
                emphasis: {

                }
              }
            }]
          }
        }
      },
    }
</script>

<style scoped lang="scss">
  .boxer {
    .header{
      margin-bottom: 20px;
      padding: 20px;
      background-color: #eef1f6;
    }
    .echarts {
      margin-bottom: 10px;
      width: 100%;
      height: 300px;
      background-color: #fff;
    }
  }

  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    padding: 20px;
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
