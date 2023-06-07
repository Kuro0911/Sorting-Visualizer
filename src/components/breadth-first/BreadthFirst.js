import React, { useEffect, useState } from "react";
import ArrayBar from "../array-bar/Array-bar";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useStateValue } from "../../contexts/StateProvider";
import { actionTypes } from "../../contexts/reducer";
import Tooltip from "@mui/material/Tooltip";

import {
  getArray,
  getRndInteger,
  marks,
  sleep,
} from "../../data/Utilfunctions";
import {
  AboutWrapper,
  Container,
  SlideWrap,
  TopWrap,
} from "../../../styles/global.style";
import PropTypes from "prop-types";
import { Navbar } from "../Navbar/Navbar";
import { Button, IconButton } from "@mui/material";
import TimeComp from "../time-comp/TimeComp";
import { MyCb } from "../CodeBlock/CodeBlock";
import Node from "../node/Node";
import BreadthFirstWrapper from "./BreadthFirst.style";

export const BreadthFirst = () => {
  const [graph, setGraph] = useState(Array(144).fill(0));
  const [disable, setDisable] = useState(false);
  const [valueTime, setValueTime] = useState(30);

  let st = 0,
    ed = 143;
  const codeString = `#include <bits/stdc++.h>
using namespace std;

const int N = 1e5 + 2;
bool vis[N];
vector<int> adj[N];

int main()
{
    memset(vis, 0, sizeof(vis));
    int m;
    cin >> m;
    int x, y;
    for (int i = 0; i < m - 1; i++)
    {
        cin >> x >> y;
        adj[x].push_back(y);
        adj[y].push_back(x);
    }
    queue<int> q;
    q.push(1);
    vis[1] = true;
    while (!q.empty())
    {
        int node = q.front();

        q.pop();
        cout << node << " ";

        vector<int>::iterator it;
        for (it = adj[node].begin(); it != adj[node].end(); it++)
        {
            if (!vis[*it])
            {
                vis[*it] = 1;
                q.push(*it);
            }
        }
    }
    return 0;
}
 `;
  function constructPath(parent, start, end) {
    const path = [];
    let current = end;

    while (current !== -1) {
      path.unshift(current);
      current = parent[current];
    }

    return path;
  }
  const bfs = async (start, end, numRows, numColumns) => {
    function getIndex(row, col) {
      return row * numColumns + col;
    }
    const nodes = document.getElementsByClassName("node");
    const q = [];
    const parent = new Array(numRows * numColumns).fill(-1);
    let vis = new Array(graph.length).fill(false);
    q.push(start);
    vis[start] = true;
    while (q.length > 0) {
      const curr = q.shift();
      if (curr === end) {
        let temp = constructPath(parent, start, end);
        for (let i = 0; i < temp.length - 1; i++) {
          nodes[temp[i]].style.backgroundColor = "#ff8f00";
          await sleep(valueTime * 7);
        }
        return true;
      }
      if (curr != 0) {
        nodes[curr].style.backgroundColor = "#58c7f3";
      }

      const row = Math.floor(curr / numColumns);
      const col = curr % numColumns;
      await sleep(valueTime * 7);

      const moves = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];

      for (const [dx, dy] of moves) {
        const nextRow = row + dx;
        const nextCol = col + dy;
        if (
          nextRow >= 0 &&
          nextRow < numRows &&
          nextCol >= 0 &&
          nextCol < numColumns &&
          !vis[getIndex(nextRow, nextCol)] &&
          graph[getIndex(nextRow, nextCol)] === 0
        ) {
          const next = getIndex(nextRow, nextCol);
          q.push(next);
          vis[next] = true;
          parent[next] = curr;
        }
      }
    }
    return false;
  };
  const doSearch = () => {
    setDisable(true);
    bfs(st, ed, 8, 18);
    setDisable(false);
  };
  const handleReset = async () => {
    let temp = Array(144).fill(0);
    const nodes = document.getElementsByClassName("node");
    for (let i = 0; i < temp.length; i++) {
      nodes[i].style.backgroundColor = "#e779c1";
      await sleep(valueTime * 0.5);
    }
    for (let i = 0; i < temp.length; i++) {
      nodes[i].style.backgroundColor = "white";
    }
    nodes[st].style.backgroundColor = "#ff8f00";
    nodes[ed].style.backgroundColor = "#7fff00";
    setGraph(temp);
  };
  const handleChange = (l, t) => {
    setValueTime(t);
  };
  const addWall = (idx) => {
    if (disable === true) {
      return;
    }
    if (idx == st || idx == ed) {
      return;
    }
    let temp = graph;
    const nodes = document.getElementsByClassName("node");
    if (temp[idx] == 0) {
      nodes[idx].style.backgroundColor = "#f3cc30";
      temp[idx] = -1;
    } else {
      nodes[idx].style.backgroundColor = "white";
      temp[idx] = 0;
    }
    setGraph(temp);
  };
  return (
    <BreadthFirstWrapper>
      <Navbar handleChange={handleChange} title={"Breadth-first search"} />
      <Container>
        <div className="up">
          <div className="left">
            <Tooltip title="target" arrow>
              <div className="square green" />
            </Tooltip>
            <Tooltip title="walls" arrow>
              <div className="square yellow" />
            </Tooltip>
            <Tooltip title="visited" arrow>
              <div className="square blue" />
            </Tooltip>
            <Tooltip title="start" arrow>
              <div className="square orange" />
            </Tooltip>
          </div>
          <div className="right">
            <IconButton
              aria-label="pause"
              className="icon"
              sx={{
                color: "#f3cc30",
              }}
            >
              <RestartAltIcon />
            </IconButton>
            <IconButton
              aria-label="sort"
              onClick={doSearch}
              sx={{
                color: "#f3cc30",
              }}
              className="icon"
            >
              <PlayArrowIcon />
            </IconButton>
            <IconButton
              aria-label="shuffle"
              onClick={handleReset}
              className="icon"
              sx={{
                color: "#f3cc30",
              }}
            >
              <ShuffleIcon />
            </IconButton>
          </div>
        </div>
        <div className="down-graph">
          <div className="down-graph-container">
            {graph.map((ele, idx) => (
              <button onClick={() => addWall(idx)} style={{ all: "unset" }}>
                <Node key={idx} st={st} ed={ed} idx={idx} />
              </button>
            ))}
          </div>
        </div>
      </Container>
      <AboutWrapper>
        <h1 style={{ color: "#e779c1", fontSize: "3rem", marginBottom: "1em" }}>
          About
        </h1>
        <div className="about-container">
          <MyCb code={codeString} language="cpp" height={"70"} />
          <div className="right">
            <div className="textCont">
              <p>
                The <span>Breadth-first search</span>
                (BFS) is an algorithm for searching a tree data structure for a
                node that satisfies a given property. It starts at the tree root
                and explores all nodes at the present depth prior to moving on
                to the nodes at the next depth level. Extra memory, usually a
                queue, is needed to keep track of the child nodes that were
                encountered but not yet explored. For example, in a chess
                endgame a chess engine may build the game tree from the current
                position by applying all possible moves, and use breadth-first
                search to find a win position for white. Implicit trees (such as
                game trees or other problem-solving trees) may be of infinite
                size; breadth-first search is guaranteed to find a solution
                node[1] if one exists.
              </p>
              <p>
                <h2 className="head">Approach</h2>A boolean visited array is
                used to mark the visited vertices. For simplicity, it is assumed
                that all vertices are reachable from the starting vertex. BFS
                uses a queue data structure for traversal.
                <ul>
                  <li>Consider the graph you want to navigate.</li>
                  <li>
                    Select any vertex in your graph (say v1), from which you
                    want to traverse the graph.
                  </li>
                  <li>
                    Utilize the following two data structures for traversing the
                    graph:
                    <ul>
                      <li>Visited array (size of the graph)</li>
                      <li>Queue data structure</li>
                    </ul>
                  </li>
                  <li>
                    Add the starting vertex to the visited array, and afterward,
                    add v1's adjacent vertices to the queue data structure.
                  </li>
                  <li>
                    Now, using the FIFO concept:
                    <ul>
                      <li>Remove the first element from the queue.</li>
                      <li>Put the removed element into the visited array.</li>
                      <li>
                        Add the adjacent vertices of the removed element to the
                        queue.
                      </li>
                      <li>
                        Repeat these steps until the queue is not empty and no
                        vertex is left to be visited.
                      </li>
                    </ul>
                  </li>
                </ul>
              </p>
            </div>
            <TimeComp worst={"O(V + E)"} avg={"O(V + E)"} best={"Ω(1)"} />
          </div>
        </div>
      </AboutWrapper>
    </BreadthFirstWrapper>
  );
};
