//以下可根据需求自行修改
var appname = "今日校园";
var loading=5000;  //等待问卷加载的时间，视手机性能可自行延长或缩短
var province = "省";  //引号内填入省市区，要与软件显示一致
var city = "市";
var district = "区";
var temperature = "体温";  //引号内填入体温
var i = 14;  //需使用布局范围分析中的depth数值，更换手机后数值会改变，故需要配合autojs自行填入
             //只需分析选项前的圆圈即可
var b = 1;   //填表成功则微信通知，值为1开启，0关闭
var r = http.get("https:xxxxxxx");   //填入server醤的地址

//以下请勿随意改动
var choice=className("android.view.View").depth(i);

auto.waitFor();
launchApp(appname);   //启动今日校园
toast("正在启动今日校园");
sleep(2000);
function Do(name)
{
    while(!click(name));
    sleep(800);
}
function Fill()
{
    Do("消息");
    Do("辅导员通知");
    Do("未填写 >");
    toast("等待问卷加载");
    sleep(loading);
    toast("即将填写第1题");
    choice.findOnce(4).click(); //此为第一个否选项，更换手机后数值可能会改变，两个手机一个是2一个是4
                                //若数值为2脚本可执行，此后每一个选项加1。若数值为4脚本可执行，此后每一个选项加2。未发现其他规律，只能自己尝试和手动数数了。
    toast("即将填写第8题");
    choice.findOnce(18).click();  //若上方的4改为2，此项18需改为9，此后两项类推
    Do("点击加载更多");
    toast("即将填写今日所在省市");
    text("请选择省或海外").findOnce(0).click();  
    Do(province);
    Do("确认");
    Do("请选择市或洲");
    Do(city);
    Do("确认");
    Do("请选择区/县或者国家");
    Do(district);
    Do("确认");
    toast("即将填写第12题");
    choice.findOnce(26).click(); //同上一条注释
    Do("点击加载更多");
    toast("即将填写体温");
    className("android.widget.EditText").findOnce(4).setText(temperature);
    choice.findOnce(44).click(); //同上一条注释
    toast("填写完成，即将提交");
    Do("提交给辅导员");
    Do("提交");
    }
Fill();  //脚本执行
toast("填写成功，推送通知");
sleep("1000");
if(b=1){
  console.show();
  log("code = "+r.statusCode);
  log("html = "+r.body.string());
}
toast("正在退出");
back();back();back();back();  //关闭今日校园
exit();
