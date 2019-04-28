


function PriorityQueue () {
    this._nodes = []; //Массив графов
  
    this.enqueue = function (priority, key) {
      this._nodes.push({key: key, priority: priority });
      this.sort();
    };
    this.dequeue = function () {
      return this._nodes.shift().key;
    };
    this.sort = function () {
      this._nodes.sort(function (a, b) {
        return a.priority - b.priority;
      });
    };
    this.isEmpty = function () {
      return !this._nodes.length;
    };
  }
  
  /**
   * Pathfinding starts here
   */

export default class Graph {
    constructor(obj = {}) {
        this.vertices = {};
        Object.entries(obj).forEach(([key, relatedNodes]) => {
            this.addVertex(key, relatedNodes)
        });
    }

    addVertex(name, edges) {
      this.vertices[name] = edges;
    }
  
    shortestPath(start, finish) {
      var nodes = new PriorityQueue(),
          distances = {},
          previous = {},
          path = [],
          smallest, vertex, neighbor, alt;
  
      for(vertex in this.vertices) {
        if(vertex === start) {
          distances[vertex] = 0;
          nodes.enqueue(0, vertex);
        }
        else {
          distances[vertex] = Infinity;
          nodes.enqueue(Infinity, vertex);
        }
        previous[vertex] = null;
      }
  
      while(!nodes.isEmpty()) {
        smallest = nodes.dequeue();
        console.log(smallest);
        if(smallest === finish) {
          path = [];
  
          while(previous[smallest]) {
            path.push(smallest);
            smallest = previous[smallest];
          }
  
          break;
        }
  
        if(!smallest || distances[smallest] === Infinity){
          continue;
        }
  
        for(neighbor in this.vertices[smallest]) {
          alt = distances[smallest] + this.vertices[smallest][neighbor];
  
          if(alt < distances[neighbor]) {
            distances[neighbor] = alt;
            previous[neighbor] = smallest;
  
            nodes.enqueue(alt, neighbor);
          }
        }
      }
  
      return path;
    }
}
let graph = new Graph();
  
  var g = new Graph();
  /* 
  g.addVertex('A', {B: 7, C: 8});
  g.addVertex('B', {A: 7, F: 2});
  g.addVertex('C', {A: 8, F: 6, G: 4});
  g.addVertex('D', {F: 8});
  g.addVertex('E', {H: 1});
  g.addVertex('F', {B: 2, C: 6, D: 8, G: 9, H: 3});
  g.addVertex('G', {C: 4, F: 9});
  g.addVertex('H', {E: 1, F: 3});
 */
    g.addVertex(1, {2: 7, 3: 9, 6: 14});
    g.addVertex(2, {1: 7, 3: 10, 4: 15});
    g.addVertex(3, {1: 9, 2: 10, 4: 11, 6: 2});
    g.addVertex(4, {2: 15, 3: 11, 5: 6});
    g.addVertex(5, {4: 6, 6: 9});
    g.addVertex (6, {1: 14, 3: 2, 5: 9});
  
  // Log test, with the addition of reversing the path and prepending the first node so it's more readable
  console.log(g);
  console.log(g.shortestPath('1', '2').concat(['1']).reverse());

  // ["A", "B", "D", "A"]
  