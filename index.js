layui.use('element', () => { var element = layui.element });

var btnTypes = [], dataTypes = [];

$(document).ready(() => {
    $("#chart").css({
        'width': document.documentElement.clientWidth - 245,
        'height': document.documentElement.clientHeight - 130
    })
    typeBtnFun();
    dataBtnFun();
})

function typeBtnFun() {
    $("#btnType button").click(function (e) {
        if (e.target.className === "layui-btn layui-btn-primary") {
            this.className = "layui-btn";
            btnTypes.push(e.target.dataset.type);
        } else {
            this.className = "layui-btn layui-btn-primary";
            btnTypes.splice(btnTypes.indexOf(e.target.dataset.type), 1);
        }
    })
}

function dataBtnFun() {
    $("#dataType button").click(function (e) {
        if (e.target.className === "layui-btn layui-btn-sm layui-btn-primary") {
            this.className = "layui-btn layui-btn-sm";
            dataTypes.push(e.target.dataset.type);
        } else {
            this.className = "layui-btn layui-btn-sm layui-btn-primary";
            dataTypes.splice(dataTypes.indexOf(e.target.dataset.type), 1);
        }
    })
}

function getData() {
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1/data/getData.php",
        data: {},
        dataType: "json",
        success: function (data) {
            console.log(data[0]);
            transformData(data[0]);
        }
    });
}

function transformData(data) {
    var xData = [], res = [];
    data.forEach(element => {
        res.push(element["小学专任教师数量"]);
        xData.push(element["年份"]);
    });
    chart(xData, res);
}

function chart(xData, data) {
    var myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    var option = {
        tooltip: {},
        legend: { data: ['云南'] },
        xAxis: { data: xData },
        yAxis: {},
        series: [{
            name: '普通小学专任教师数量',
            type: 'line',
            data: data
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}