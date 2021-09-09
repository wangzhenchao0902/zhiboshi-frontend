import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { queryWarranties } from '../api/warranty'
import { List, Form, Input, Button } from 'antd';
import 'antd/dist/antd.css'
import { Header, Footer, } from '../components/'
import { Row, Col, } from '../public/styled/styled'

const StyledContent = styled.main`
	width: 100%;
  background: url('/static/20210625/zhibao-banner.jpg') no-repeat;
  background-size: cover;
  background-position: center center;
`

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`

const FakeTitle = styled.div`
  text-align: center;
  letter-spacing: 1em;
  h2{ color: #ee7500; font-size: 32px; }
  h3{ color: #ee7500; font-size: 16px; }
`

const SelectForm = styled.div`
  width: 300px;
  margin: 30px auto;
  text-align: center;
  label{ display: none; color: #fff!important; }
  input{ color: #ee7500; background: transparent; border: none; border-bottom: 1px solid #666; text-align: center; box-shadow: none!important; }
  input:focus{ border: none; border-bottom: 1px solid #ee7500; box-shadow: none; }
`

const WarrantyList = styled.div`
  width: 600px;
  min-height: 200px;
  margin: 0 auto;
  text-align: center;
  color: #ee7500!important;
  div { color: #ee7500!important; }
`
const bodyList = [
  { id: 1, name: `前保险杠`, },
  { id: 2, name: `后保险杠`, },
  { id: 3, name: `引擎盖`, },
  { id: 4, name: `左前叶子板`, },
  { id: 5, name: `右前叶子板`, },
  { id: 6, name: `左侧车前门`, },
  { id: 7, name: `右侧车前门`, },
  { id: 8, name: `左后叶子板`, },
  { id: 9, name: `右后叶子板`, },
  { id: 10, name: `车后盖/车尾`, },
  { id: 11, name: `侧裙`, },
  { id: 12, name: `车顶`, },
]

const moList = [
  { id: 1, name: `金刚盾`, },
  { id: 2, name: `全能王`, },
  { id: 3, name: `仿生王`, },
  { id: 4, name: `哑光版`, },
]

const brandList = [
  { id: 1, name: `奥迪`, series: [
    { id: 101, name: `奥迪A6`, },
    { id: 102, name: `奥迪A7`, },
    { id: 103, name: `奥迪Q5`, },
    { id: 104, name: `奥迪Q3`, },
    { id: 105, name: `奥迪A3`, },
    { id: 106, name: `奥迪A4`, },
    { id: 107, name: `奥迪100`, },
    { id: 108, name: `奥迪200`, },
    { id: 109, name: `奥迪R8`, },
    { id: 110, name: `奥迪A5`, },
    { id: 111, name: `奥迪A1`, },
    { id: 112, name: `奥迪TT`, },
    { id: 113, name: `奥迪S8`, },
    { id: 114, name: `奥迪S5`, },
    { id: 115, name: `奥迪S6`, },
    { id: 116, name: `奥迪S4`, },
    { id: 117, name: `奥迪RS5`, },
    { id: 118, name: `奥迪RS7`, },
    { id: 119, name: `A6L`, },
    { id: 120, name: `奥迪Q5L`, },
    { id: 121, name: `奥迪A8`, },
    { id: 122, name: `奥迪Q2`, },
    { id: 123, name: `奥迪e-tron`, },
    { id: 124, name: `奥迪RS3`, },
    { id: 125, name: `奥迪RS4`, },
    { id: 126, name: `奥迪RS6`, },
    { id: 127, name: `奥迪S3`, },
    { id: 128, name: `奥迪S7`, },
    { id: 129, name: `奥迪Q8`, },
    { id: 130, name: `奥迪Q7`, },
  ], },
  { id: 2, name: `阿斯顿·马丁`, series: [
    { id: 201, name: `阿斯顿马丁DBS`, },
    { id: 202, name: `阿斯顿马丁DBX`, },
    { id: 203, name: `V12 Vantage S`, },
    { id: 204, name: `V8 Vantge`, },
    { id: 205, name: `V12 Vantge`, },
    { id: 206, name: `DB11`, },
  ], },
  { id: 3, name: `阿尔法`, series: [
    { id: 301, name: `极狐as`, },
  ], },
  { id: 4, name: `AC Schnitzer`, series: [
    { id: 401, name: `AC Schnitzer ACS5`, },
    { id: 402, name: `AC Schnitzer ACS7`, },
    { id: 403, name: `AC Schnitzer ACS6`, },
  ], },
  { id: 5, name: `阿尔法·罗密欧`, series: [
    { id: 501, name: `阿尔法罗密欧GT`, },
    { id: 502, name: `阿尔法罗密欧 166`, },
    { id: 503, name: `Giulia`, },
    { id: 504, name: `Stelvio`, },
  ], },
  { id: 6, name: `宾利`, series: [
    { id: 601, name: `欧陆`, },
    { id: 602, name: `慕尚`, },
    { id: 603, name: `添越`, },
    { id: 604, name: `飞驰`, },
  ], },
  { id: 7, name: `比亚迪`, series: [
    { id: 701, name: `F3`, },
    { id: 702, name: `唐新能源`, },
    { id: 703, name: `唐`, },
    { id: 704, name: `元新能源`, },
    { id: 705, name: `宋MAX新能源`, },
    { id: 706, name: `宋MAX`, },
    { id: 707, name: `宋新能源`, },
    { id: 708, name: `汉`, },
    { id: 709, name: `宋`, },
    { id: 710, name: `秦新能源`, },
    { id: 711, name: `秦`, },
  ], },
  { id: 8, name: `别克`, series: [
    { id: 801, name: `别克GL8`, },
    { id: 802, name: `别克GL6`, },
    { id: 803, name: `昂科旗`, },
    { id: 804, name: `昂科拉`, },
    { id: 805, name: `昂科威`, },
    { id: 806, name: `君越`, },
    { id: 807, name: `君威`, },
    { id: 808, name: `阅朗`, },
    { id: 809, name: `昂科威plus`, },
    { id: 810, name: `英朗`, },
    { id: 811, name: `威朗`, },
    { id: 812, name: `凯越`, },
  ], },
  { id: 9, name: `奔腾`, series: [
    { id: 901, name: `T55`, },
    { id: 902, name: `T33`, },
    { id: 903, name: `B50`, },
    { id: 904, name: `B30`, },
    { id: 905, name: `B70`, },
  ], },
  { id: 10, name: `保时捷`, series: [
    { id: 1001, name: `保时捷911`, },
    { id: 1002, name: `保时捷Panamera`, },
    { id: 1003, name: `保时捷918`, },
    { id: 1004, name: `保时捷Boxster`, },
    { id: 1005, name: `保时捷Cayman`, },
    { id: 1006, name: `保时捷Caynne`, },
    { id: 1007, name: `保时捷718`, },
    { id: 1008, name: `保时捷Macan`, },
    { id: 1009, name: `保时捷Taycan`, },
  ], },
  { id: 11, name: `标致`, series: [
    { id: 1101, name: `标致508`, },
    { id: 1102, name: `标致408`, },
  ], },
  { id: 12, name: `奔驰`, series: [
    { id: 1201, name: `奔驰E级`, },
    { id: 1202, name: `奔驰S级`, },
    { id: 1203, name: `奔驰A级`, },
    { id: 1204, name: `奔驰B级`, },
    { id: 1205, name: `奔驰R级`, },
    { id: 1206, name: `奔驰G级`, },
    { id: 1207, name: `CLA200`, },
    { id: 1208, name: `ML`, },
    { id: 1209, name: `奔驰C级`, },
    { id: 1210, name: `奔驰GLC`, },
    { id: 1211, name: `奔驰GLE`, },
    { id: 1212, name: `奔驰GLS`, },
    { id: 1213, name: `奔驰GLK`, },
    { id: 1214, name: `奔驰GLB`, },
    { id: 1215, name: `奔驰SLC`, },
    { id: 1216, name: `奔驰SLK`, },
    { id: 1217, name: `奔驰V级`, },
    { id: 1218, name: `奔驰AMG GT`, },
    { id: 1219, name: `奔驰GLA`, },
    { id: 1220, name: `迈巴赫`, },
  ], },
  { id: 13, name: `北京`, series: [
    { id: 1301, name: `BJ30`, },
    { id: 1302, name: `BJ20`, },
    { id: 1303, name: `BJ40`, },
    { id: 1304, name: `BJ90`, },
  ], },
  { id: 14, name: `巴博斯`, series: [
    { id: 1401, name: `巴博斯S级`, },
    { id: 1402, name: `巴博斯E级`, },
    { id: 1403, name: `巴博斯C级`, },
    { id: 1404, name: `巴博斯A级`, },
  ], },
  { id: 15, name: `宝马`, series: [
    { id: 1501, name: `宝马1系`, },
    { id: 1502, name: `宝马2系`, },
    { id: 1503, name: `宝马3系`, },
    { id: 1504, name: `宝马4系`, },
    { id: 1505, name: `宝马5系`, },
    { id: 1506, name: `宝马6系`, },
    { id: 1507, name: `宝马7系`, },
    { id: 1508, name: `宝马8系`, },
    { id: 1509, name: `宝马X1`, },
    { id: 1510, name: `宝马X2`, },
    { id: 1511, name: `宝马X3`, },
    { id: 1512, name: `宝马X4`, },
    { id: 1513, name: `宝马X5`, },
    { id: 1514, name: `宝马X7`, },
    { id: 1515, name: `宝马M2`, },
    { id: 1516, name: `宝马M3`, },
    { id: 1517, name: `宝马M4`, },
    { id: 1518, name: `宝马M5`, },
    { id: 1519, name: `宝马M6`, },
    { id: 1520, name: `宝马M8`, },
    { id: 1521, name: `IX3`, },
    { id: 1522, name: `GT`, },
    { id: 1523, name: `宝马X3 28im`, },
    { id: 1524, name: `宝马I3`, },
    { id: 1525, name: `宝马Z4`, },
    { id: 1526, name: `MINI`, },
    { id: 1527, name: `宝马X6`, },
  ], },
  { id: 16, name: `宝骏`, series: [
    { id: 1601, name: `530`, },
    { id: 1602, name: `730`, },
    { id: 1603, name: `310`, },
  ], },
  { id: 17, name: `宝沃`, series: [
    { id: 1701, name: `BX5`, },
    { id: 1702, name: `BX7`, },
    { id: 1703, name: `BX6`, },
    { id: 1704, name: `BXI7`, },
    { id: 1705, name: `BX3`, },
  ], },
  { id: 18, name: `本田`, series: [
    { id: 1801, name: `CRV`, },
    { id: 1802, name: `雅阁`, },
    { id: 1803, name: `杰德`, },
    { id: 1804, name: `缤智`, },
    { id: 1805, name: `LIFE`, },
    { id: 1806, name: `里程`, },
    { id: 1807, name: `INSIGHT`, },
    { id: 1808, name: `本田XR-V`, },
    { id: 1809, name: `本田CR-V`, },
    { id: 1810, name: `本田UR-V`, },
    { id: 1811, name: `艾力绅`, },
    { id: 1812, name: `奥德赛`, },
    { id: 1813, name: `冠道`, },
    { id: 1814, name: `皓影`, },
    { id: 1815, name: `凌派`, },
    { id: 1816, name: `飞度`, },
    { id: 1817, name: `INSPIRE`, },
    { id: 1818, name: `思域`, },
    { id: 1819, name: `享域`, },
  ], },
  { id: 19, name: `布加迪`, series: [
    { id: 1901, name: `Centodieci`, },
  ], },
  { id: 20, name: `长安`, series: [
    { id: 2001, name: `CS75`, },
    { id: 2002, name: `CS55`, },
    { id: 2003, name: `逸动`, },
    { id: 2004, name: `睿驰CC`, },
    { id: 2005, name: `CS35`, },
    { id: 2006, name: `逸动DT`, },
    { id: 2007, name: `CS95`, },
    { id: 2008, name: `CS15`, },
    { id: 2009, name: `悦翔`, },
    { id: 2010, name: `UNI-T`, },
    { id: 2011, name: `长安CS`, },
  ], },
  { id: 21, name: `长城`, series: [
    { id: 2101, name: `长城C30`, },
    { id: 2102, name: `长城C50`, },
    { id: 2103, name: `风骏5`, },
    { id: 2104, name: `长城C20R`, },
    { id: 2105, name: `酷熊`, },
    { id: 2106, name: `长城精灵`, },
    { id: 2107, name: `凌傲`, },
    { id: 2108, name: `风骏3`, },
    { id: 2109, name: `赛骏`, },
    { id: 2110, name: `长城炮`, },
  ], },
  { id: 22, name: `DS`, series: [
    { id: 2201, name: `DS 7`, },
    { id: 2202, name: `DS 5LS`, },
    { id: 2203, name: `DS6`, },
    { id: 2204, name: `DS 4S`, },
    { id: 2205, name: `DS 5`, },
    { id: 2206, name: `DS`, },
    { id: 2207, name: `DS7`, },
  ], },
  { id: 23, name: `道奇`, series: [
    { id: 2301, name: `酷威`, },
    { id: 2302, name: `酷威`, },
    { id: 2303, name: `挑战者`, },
    { id: 2304, name: `道奇RAM`, },
  ], },
  { id: 24, name: `东南`, series: [
    { id: 2401, name: `菱帅`, },
    { id: 2402, name: `DX5`, },
    { id: 2403, name: `DX3`, },
    { id: 2404, name: `DX7`, },
    { id: 2405, name: `DX3新能源`, },
    { id: 2406, name: `菱悦`, },
  ], },
  { id: 25, name: `东风`, series: [
    { id: 2501, name: `景逸X5`, },
    { id: 2502, name: `菱智`, },
    { id: 2503, name: `景逸 XL`, },
    { id: 2504, name: `景逸 LV`, },
    { id: 2505, name: `景逸SUV`, },
    { id: 2506, name: `风行CM7`, },
    { id: 2507, name: `风光`, },
    { id: 2508, name: `俊风`, },
    { id: 2509, name: `御风`, },
    { id: 2510, name: `东风小王子`, },
    { id: 2511, name: `桑蒂雅`, },
    { id: 2512, name: `D60`, },
    { id: 2513, name: `T90`, },
    { id: 2514, name: `T70`, },
    { id: 2515, name: `M50V`, },
    { id: 2516, name: `R50`, },
    { id: 2517, name: `T70X`, },
    { id: 2518, name: `D50`, },
    { id: 2519, name: `308`, },
    { id: 2520, name: `5008`, },
    { id: 2521, name: `4008`, },
    { id: 2522, name: `408`, },
    { id: 2523, name: `2008`, },
    { id: 2524, name: `3008`, },
    { id: 2525, name: `301`, },
    { id: 2526, name: `308S`, },
    { id: 2527, name: `尼桑楼兰`, },
    { id: 2528, name: `启辰`, },
  ], },
  { id: 26, name: `大众`, series: [
    { id: 2601, name: `迈腾`, },
    { id: 2602, name: `POLO`, },
    { id: 2603, name: `朗逸`, },
    { id: 2604, name: `探岳`, },
    { id: 2605, name: `朗行`, },
    { id: 2606, name: `途安`, },
    { id: 2607, name: `辉昂`, },
    { id: 2608, name: `速腾`, },
    { id: 2609, name: `捷达`, },
    { id: 2610, name: `宝来`, },
    { id: 2611, name: `大众CC`, },
    { id: 2612, name: `途锐`, },
    { id: 2613, name: `途昂`, },
    { id: 2614, name: `凌度`, },
    { id: 2615, name: `途观L`, },
    { id: 2616, name: `威然`, },
    { id: 2617, name: `揽境`, },
    { id: 2618, name: `ID4`, },
    { id: 2619, name: `高尔夫`, },
    { id: 2620, name: `途昂X`, },
    { id: 2621, name: `帕萨特`, },
    { id: 2622, name: `甲壳虫`, },
    { id: 2623, name: `途岳`, },
  ], },
  { id: 27, name: `法拉利`, series: [
    { id: 2701, name: `法拉利F8`, },
    { id: 2702, name: `Roma`, },
    { id: 2703, name: `Portofino`, },
    { id: 2704, name: `SF90`, },
    { id: 2705, name: `California T`, },
    { id: 2706, name: `法拉利812`, },
    { id: 2707, name: `法拉利488`, },
    { id: 2708, name: `法拉利458`, },
  ], },
  { id: 28, name: `菲亚特`, series: [
    { id: 2801, name: `朋多`, },
    { id: 2802, name: `领雅`, },
    { id: 2803, name: `博悦`, },
    { id: 2804, name: `菲亚特500`, },
    { id: 2805, name: `派朗`, },
    { id: 2806, name: `菲翔`, },
    { id: 2807, name: `致悦`, },
    { id: 2808, name: `菲跃`, },
  ], },
  { id: 29, name: `丰田`, series: [
    { id: 2901, name: `威驰`, },
    { id: 2902, name: `威尔法`, },
    { id: 2903, name: `埃尔法`, },
    { id: 2904, name: `普瑞维亚`, },
    { id: 2905, name: `丰田RAV4`, },
    { id: 2906, name: `丰田C-HR`, },
    { id: 2907, name: `普拉多`, },
    { id: 2908, name: `兰德酷路泽`, },
    { id: 2909, name: `塞纳`, },
    { id: 2910, name: `凯美瑞`, },
    { id: 2911, name: `雷凌`, },
    { id: 2912, name: `汉兰达`, },
    { id: 2913, name: `威兰达`, },
    { id: 2914, name: `皇冠`, },
    { id: 2915, name: `锐志`, },
    { id: 2916, name: `卡罗拉`, },
    { id: 2917, name: `亚洲龙`, },
    { id: 2918, name: `亚洲狮`, },
    { id: 2919, name: `致炫`, },
    { id: 2920, name: `致享`, },
    { id: 2921, name: `凌尚`, },
  ], },
  { id: 30, name: `福特`, series: [
    { id: 3001, name: `野马`, },
    { id: 3002, name: `领界`, },
    { id: 3003, name: `领裕`, },
    { id: 3004, name: `翼虎`, },
    { id: 3005, name: `锐界`, },
    { id: 3006, name: `锐际`, },
    { id: 3007, name: `嘉年华`, },
    { id: 3008, name: `途睿欧`, },
    { id: 3009, name: `麦柯斯`, },
    { id: 3010, name: `福特E350`, },
    { id: 3011, name: `探险者`, },
    { id: 3012, name: `撼路者`, },
    { id: 3013, name: `金牛座`, },
    { id: 3014, name: `福睿斯`, },
    { id: 3015, name: `蒙迪欧`, },
    { id: 3016, name: `福克斯`, },
    { id: 3017, name: `猛禽`, },
  ], },
  { id: 31, name: `高子`, series: [
    { id: 3101, name: `HiPhi X`, },
  ], },
  { id: 32, name: `观致`, series: [
    { id: 3201, name: `观致5`, },
    { id: 3202, name: `观致3`, },
    { id: 3203, name: `观至7`, },
  ], },
  { id: 33, name: `广汽`, series: [
    { id: 3301, name: `AION LX`, },
    { id: 3302, name: `AION V`, },
    { id: 3303, name: `AION S`, },
    { id: 3303, name: `传祺GE3`, },
    { id: 3303, name: `观至7`, },
    { id: 3303, name: `观至7`, },
    { id: 3303, name: `观至7`, },
    { id: 3303, name: `观至7`, },
    { id: 3303, name: `观至7`, },
  ], },
  { id: 34, name: `GMC`, series: [ ], },
  { id: 35, name: `红旗`, series: [ ], },
  { id: 36, name: `海马`, series: [ ], },
  { id: 37, name: `哈弗`, series: [ ], },
  { id: 38, name: `悍马`, series: [ ], },
  { id: 39, name: `吉利`, series: [ ], },
  { id: 40, name: `捷豹`, series: [ ], },
  { id: 41, name: `Jeep`, series: [ ], },
  { id: 42, name: `凯迪拉克`, series: [ ], },
  { id: 43, name: `克莱斯勒`, series: [ ], },
  { id: 44, name: `科尼塞克`, series: [ ], },
  { id: 45, name: `岚图`, series: [ ], },
  { id: 46, name: `理想`, series: [ ], },
  { id: 47, name: `雷克萨斯`, series: [ ], },
  { id: 48, name: `劳斯莱斯`, series: [ ], },
  { id: 49, name: `领克`, series: [ ], },
  { id: 50, name: `路特斯`, series: [ ], },
  { id: 51, name: `莲花`, series: [ ], },
  { id: 52, name: `林肯`, series: [ ], },
  { id: 53, name: `路虎`, series: [ ], },
  { id: 54, name: `猎豹`, series: [ ], },
  { id: 55, name: `雷诺`, series: [ ], },
  { id: 56, name: `陆风`, series: [ ], },
  { id: 57, name: `兰博基尼`, series: [ ], },
  { id: 58, name: `迈凯伦`, series: [ ], },
  { id: 59, name: `玛莎拉蒂`, series: [ ], },
  { id: 60, name: `迈巴赫`, series: [ ], },
  { id: 61, name: `MG`, series: [ ], },
  { id: 62, name: `MINI`, series: [ ], },
  { id: 63, name: `马自达`, series: [ ], },
  { id: 64, name: `纳智捷`, series: [ ], },
  { id: 65, name: `欧拉`, series: [ ], },
  { id: 66, name: `欧宝`, series: [ ], },
  { id: 67, name: `讴歌`, series: [ ], },
  { id: 68, name: `启辰`, series: [ ], },
  { id: 69, name: `奇瑞`, series: [ ], },
  { id: 70, name: `起亚`, series: [ ], },
  { id: 71, name: `荣威`, series: [ ], },
  { id: 72, name: `日产`, series: [ ], },
  { id: 73, name: `上汽大通`, series: [ ], },
  { id: 74, name: `上汽`, series: [ ], },
  { id: 75, name: `三菱`, series: [ ], },
  { id: 76, name: `斯柯达`, series: [ ], },
  { id: 77, name: `斯巴鲁`, series: [ ], },
  { id: 78, name: `TESLA`, series: [ ], },
  { id: 79, name: `腾势`, series: [ ], },
  { id: 80, name: `沃尔沃`, series: [ ], },
  { id: 81, name: `魏派`, series: [ ], },
  { id: 82, name: `WEY`, series: [ ], },
  { id: 83, name: `蔚来`, series: [ ], },
  { id: 84, name: `五十铃`, series: [ ], },
  { id: 85, name: `威马`, series: [ ], },
  { id: 86, name: `雪佛兰`, series: [ ], },
  { id: 87, name: `小鹏`, series: [ ], },
  { id: 88, name: `现代`, series: [ ], },
  { id: 89, name: `雪铁龙`, series: [ ], },
  { id: 90, name: `英菲尼迪`, series: [ ], },
  { id: 91, name: `野马汽车`, series: [ ], },
  { id: 92, name: `众泰`, series: [ ], },
  { id: 93, name: `中华`, series: [ ], },
]


const Offer: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(undefined);
  const [isWeb, setIsWeb] = useState(true);
  useEffect(() => {
    setIsWeb(window.innerWidth > 500);
  });
  const handleSearch = async () => {
    const fields = form.getFieldsValue();
    const res = await (await queryWarranties(fields.phone)).json();
    setData(res.data);
  }
  return (
    <React.Fragment>
      <Header noColorChange />
        <>
          {
            isWeb ? 
              <>
              <StyledContent>
                <StyledSection>
                  <FakeTitle style={{ marginTop: 40, }}>
                    <h2>报价查询</h2>
                    <h3>DRZ智博士您的第一款车衣</h3>
                  </FakeTitle>
                  <SelectForm>
                    <Form form={form}
                      onFinish={handleSearch}
                      layout="vertical">
                      <Form.Item rules={[{ required: true, message: '请输入手机号！' }]} name='phone' label="手机号" required tooltip="请先扫码商品二维码注册后查询">
                        <Input style={{ color: 'rgb(238, 117, 0)!important', }} placeholder="请输入手机号" />
                      </Form.Item>
                      <Form.Item style={{marginTop: 20, }}>
                        <Button type="primary" htmlType="submit" style={{ background: '#ee7500', borderColor: '#ee7500', padding: '0 2em', }}>查询</Button>
                      </Form.Item>
                    </Form>
                  </SelectForm>
                  <WarrantyList>
                    {data instanceof Array && data.length > 0 && (
                      <>
                        <List>
                          <List.Item>
                            <div style={{ width: 100, }}>姓名</div>
                            <div style={{ width: 100, }}>手机号</div>
                            <div style={{ width: 80, }}>质保时长</div>
                            <div style={{ flex: 1, }}>开始时间</div>
                            <div style={{ flex: 1, }}>结束时间</div>
                          </List.Item>
                          {data.map(item => (
                            <List.Item key={item.id}>
                              <div style={{ width: 100, }}>{item.name}</div>
                              <div style={{ width: 100, }}>{item.phone}</div>
                              <div style={{ width: 80, }}>{item.year}年</div>
                              <div style={{ flex: 1, }}>{item.start_at}</div>
                              <div style={{ flex: 1, }}>{item.end_at}</div>
                            </List.Item>
                          ))}
                        </List>
                        {data[0].complimentary === 1 && (
                          <>售后政策：质保期内 意外剐蹭局部免费补膜，总计不超15米 </>
                        )}
                        <><img src='/static/20210625/qa.png' style={{ width: 600, margin: '24px auto' }} /></>
                      </>
                    )}
                    {data instanceof Array && data.length === 0 && (
                      <>抱歉，未查到相关质保记录</>
                    )}
                    </WarrantyList>
                </StyledSection>
              </StyledContent>
              </>
            :
              <>
                <div style={{ lineHeight: 0, }}><img src='/static/m/m-banner-zhibao.jpg' style={{width: '100%', }} /></div>
                <SelectForm>
                  <Form form={form}
                    onFinish={handleSearch}
                    layout="vertical">
                    <Form.Item rules={[{ required: true, message: '请输入手机号！' }]} name='phone' label="手机号" required tooltip="请先扫码商品二维码注册后查询">
                      <Input style={{ color: 'rgb(238, 117, 0)!important', }} placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item style={{marginTop: 20, }}>
                      <Button type="primary" htmlType="submit" style={{ background: '#ee7500', borderColor: '#ee7500', padding: '0 2em', }}>查询</Button>
                    </Form.Item>
                  </Form>
                </SelectForm>
                <WarrantyList style={{ width: 'auto', padding: 20, fontSize: 12, lineHeight: 2.25, }}>
                  {data instanceof Array && data.length > 0 && (
                    <>
                      <Row style={{ whiteSpace: 'nowrap', textAlign: 'left', }}>
                        <Col>姓名：{data[0].name}</Col>
                        <Col style={{ flex: 1, margin: '0 20px', }}>手机号： {data[0].phone}</Col>
                        <Col>质保时长：{data[0].year}年</Col>
                      </Row>
                      <Row style={{textAlign: 'left', }}>开始时间： {data[0].start_at}</Row>
                      <Row style={{textAlign: 'left', }}>结束时间： {data[0].end_at}</Row>
                      {data[0].complimentary === 1 && (
                        <Row style={{textAlign: 'left', }}>售后政策：质保期内 意外剐蹭局部免费补膜，总计不超15米</Row>
                      )}
                      <><img src='/static/20210625/qa.png' style={{ width: '100%', margin: '24px auto' }} /></>
                    </>
                  )}
                  {data instanceof Array && data.length === 0 && (
                    <>抱歉，未查到相关质保记录</>
                  )}
                  </WarrantyList>
              </>
          }
      </>
      <Footer />
    </React.Fragment>
  )
}

export default Offer