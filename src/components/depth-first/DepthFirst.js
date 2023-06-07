import React, { useEffect, useState } from "react";
import ArrayBar from "../array-bar/Array-bar";
import DepthFirstWrapper from "./DepthFirst.style";
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

export const DepthFirst = () => {
  const [graph, setGraph] = useState(Array(144).fill(0));
  const [disable, setDisable] = useState(false);
  const [valueTime, setValueTime] = useState(30);
  const numRows = 9;
  const numColumns = 16;

  let st = 0,
    ed = 143;
  const codeString = `#include <bits/stdc++.h>
using namespace std;

const int N = 1e5 + 2;
bool vis[N];
vector<int> adj[N];

void dfs(int node)
{
    vis[node] = true;
    cout << node << " ";
    vector<int>::iterator it;
    for (it = adj[node].begin(); it != adj[node].end(); it++)
    {
        if (!vis[*it])
        {
            dfs(*it);
        }
    }
}
int main()
{
    memset(vis, false, sizeof(vis));
    int n, m;
    cin >> n >> m;
    int x, y;
    for (int i = 0; i < m; i++)
    {
        cin >> x >> y;
        adj[x].push_back(y);
        adj[y].push_back(x);
    }
    dfs(1);

    return 0;
}
  `;
  const dfs = async (vis, curr) => {
    console.log(curr);
    const nodes = document.getElementsByClassName("node");
    if (curr === ed) {
      return true;
    }
    const row = Math.floor(curr / numColumns);
    const col = curr % numColumns;
    vis[curr] = true;
    if (curr != 0) {
      nodes[curr].style.backgroundColor = "#58c7f3";
    }

    await sleep(valueTime * 7);
    const moves = [
      [1, 0],
      [0, 1],
      [0, -1],
      [-1, 0],
    ];
    for (const [dx, dy] of moves) {
      const nextRow = row + dx;
      const nextCol = col + dy;
      const next = nextRow * numColumns + nextCol;
      if (
        nextRow >= 0 &&
        nextRow < numRows &&
        nextCol >= 0 &&
        nextCol < numColumns &&
        !vis[next] &&
        graph[next] === 0
      ) {
        const foundPath = await dfs(vis, next);
        if (foundPath === true) {
          return true;
        }
      }
    }
    vis[curr] = false;
    nodes[curr].style.backgroundColor = "white";
    if (curr === 0) {
      nodes[curr].style.backgroundColor = "red";
    }
    return false;
  };
  const doSearch = () => {
    setDisable(true);
    let visited = new Array(graph.length).fill(false);
    dfs(visited, 0);
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
    <DepthFirstWrapper>
      <Navbar handleChange={handleChange} title={"Depth First Search"} />
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
          <MyCb code={codeString} language="cpp" height={"60"} />
          <div className="right">
            <div className="textCont">
              <p>
                The <span>Depth-first search</span>
                (DFS) is an algorithm for traversing or searching tree or graph
                data structures. The algorithm starts at the root node
                (selecting some arbitrary node as the root node in the case of a
                graph) and explores as far as possible along each branch before
                backtracking. Extra memory, usually a stack, is needed to keep
                track of the nodes discovered so far along a specified branch
                which helps in backtracking of the graph.
              </p>
              <p>
                <h2 className="head">Approach</h2>A standard DFS implementation
                puts each vertex of the graph into one of two categories:
                <ul>
                  <li>Visited</li>
                  <li>Not Visited</li>
                </ul>
                The purpose of the algorithm is to mark each vertex as visited
                while avoiding cycles. The DFS algorithm works as follows:
                <ol>
                  <li>
                    Start by putting any one of the graph's vertices on top of a
                    stack.
                  </li>
                  <li>
                    Take the top item of the stack and add it to the visited
                    list.
                  </li>
                  <li>
                    Create a list of that vertex's adjacent nodes. Add the ones
                    which aren't in the visited list to the top of the stack.
                  </li>
                  <li>
                    Keep repeating steps 2 and 3 until the stack is empty.
                  </li>
                </ol>
              </p>
            </div>
            <TimeComp worst={"O(V + E)"} avg={"O(V + E)"} best={"Ω(1)"} />
          </div>
        </div>
      </AboutWrapper>
    </DepthFirstWrapper>
  );
};
