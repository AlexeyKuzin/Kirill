import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Graph from './Dejcsra.js';
import Dracula from 'graphdracula';
import { connect } from 'tls';

var RenderGraph = Dracula.Graph
var Renderer = Dracula.Renderer.Raphael
var Layout = Dracula.Layout.Spring

// var graph = new Graph()

// graph.addEdge('Banana', 'Apple')
// graph.addEdge('Apple', 'Kiwi')
// graph.addEdge('Apple', 'Dragonfruit')
// graph.addEdge('Dragonfruit', 'Banana')
// graph.addEdge('Kiwi', 'Banana')

// var layout = new Layout(graph)
// var renderer = new Renderer('#canvas', graph, 400, 600)
// renderer.draw()




//******************************************ПРИМЕР*****************************************************************/

//------------------------------------Здесь будем загружать данные для JSON------------------------------------------

//Это графы  
const gr = {
        "A": {"B": 7, "C": 9, "F": 14},
        "B": {"A": 7, "C": 10, "D": 15},
        "C": {"A": 9, "B": 10, "D": 11, "F": 2},
        "D": {"B": 15, "C": 11, "E": 6},
        "E": {"D": 6, "F": 9},
        "F": {"A": 14, "C": 2, "E": 9}
    };

//Здесь мы записываем данные в JSON
const toJS = JSON.stringify(gr);

//--------------------Здесь будем загружать данные из JSON-------------------------------------------------------------
// eslint-disable-next-line
const fromJSON = JSON.parse(toJS);
let GR = new Graph(fromJSON);
let renderGR = new RenderGraph();
Object.entries(fromJSON).forEach(([key, relatedNodes]) => {
    Object.keys(relatedNodes).forEach((relatedNode) => renderGR.addEdge(key, relatedNode));
});

var layout = new Layout(renderGR);
var renderer = new Renderer('#canvas', renderGR, 600, 400);
renderer.draw();
// const GR = fromJSON;
console.log(GR);
// let t = typeof GR;


//------------------Здесь мы задаем 2 кнопки (начальная точка маршрута и конечная точка маршрута------------------------
//Зададим выпадающий список (значения - номера графов)
let k = Object.keys(GR.vertices);

let kays = k.map((l) => <option>{l}</option>)

//зададим стартовые точки пока просто в виде переменных
let finishPoint = k[k.length-1]
//Теперь попробуем сделать их в виде классов




//---------------------Это наша печочница-----------------------------------------------------------------------------

//Теперь задача вытащить данные вместе с ключами:
//начнем с первого списка попробуем получить значения:
let map1 = new Map(Object.entries(GR));
console.log((map1))

let startPoint = 'A';
let endPoint = 'A';
let shortestPath;
let totalWeight;

function calcShortPath() {
    // debugger;
    shortestPath = [startPoint, ...GR.shortestPath(startPoint, endPoint).reverse()];
    totalWeight = shortestPath.reduce((acc, node, index, arr) => {
        let to = arr[index + 1] ? arr[index + 1] : '';
        if (to) {
            return acc + GR.vertices[node][to];
        }
        return acc;
    }, 0);

    document.getElementById('shortestPath').innerText = `Shortest Path: ${shortestPath.join(',')}`;
    document.getElementById('totalWeight').innerText = `Total Weight: ${totalWeight}`;
    console.log(shortestPath);
    console.log(totalWeight);
}


//Классовый компонент выбор стартовой точи
class SetStartPoint extends React.Component {
  constructor(props) {
    super(props)
  }

render() {
  return(
  <div>
    <h3>Стартовая точка</h3>

    <select onChange={e => {startPoint = e.target.value; calcShortPath();}}>{kays}</select>
  </div>
  )
}
}
//Классовый компонент выбор финишной точки
class SetFinishPoint extends React.Component {
  constructor(props) {
    super(props)
  }
render() {
  return(
  <div>
    <h3>Финишная точка</h3>
    <select onChange={e => {endPoint = e.target.value; calcShortPath();}}>{kays}</select>
  </div>
  )
}
}
//--------------------------------------Здесь будем писать сам алгоритм дейкстры----------------------------------------


//-----------------------------------Здесь будем писать код для рендеринга-----------------------------------------------
class Nodes extends Component {
  render() {
    return(
      <div className = 'Test'>
      <div className = "Noddes">
      <h1><strong>Здесь будет интерактивная картинка с графами</strong></h1>
      </div>
      <div className = "Panell">
      <h2>Интерфейс</h2>
      <h3>Назначьте стартовую точку </h3>
      <SetStartPoint />
      <SetFinishPoint />
      </div>
      </div>
      );
  }
}
export default Nodes;


class Interface {
    failExams() {

    }

    passExams() {
        console.log("passed good");
    }
}

class Student extends Interface {
    passExams() {
        console.log("passed excelent!");
    }
}

let st = new Student();
st.failExams()