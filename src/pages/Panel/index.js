import React, { useState, useEffect } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { Button } from "react-bootstrap";
import isObject from "isobject";
import produce from "immer";

import Task from "./../Task";
import PanelContext from "./context";
import toWord from "../../utils/toWord";
import Header from "./../../components/Header";
import GridCell from "../../components/GridCell";

import {
  Container,
  Grid,
  GridScope,
  GridContent,
  GridRight,
  GridBottom,
  InputHeader,
} from "./styles";

const Panel = () => {
  const [enableCommit, setEnableCommit] = useState(false);
  const [grid, setGrid] = useState(undefined);

  function move(fromCell, toCell, from, to) {
    setGrid(
      produce(grid, (draft) => {
        if (!draft.data.hasOwnProperty(toCell)) {
          draft.data[toCell] = [];
        }
        const dragged = draft.data[fromCell][from];
        draft.data[fromCell].splice(from, 1);
        draft.data[toCell].splice(to, 0, dragged);
        if (draft.data[fromCell].length === 0) {
          delete draft.data[fromCell];
        }
      })
    );
  }

  function commit() {
    setEnableCommit(true);
  }

  function getData(cell, index) {
    if (
      grid && 
      grid.hasOwnProperty("data") &&
      grid.data.hasOwnProperty(cell) &&
      grid.data[cell].length > index
    ) {
      return grid.data[cell][index];
    }
    return null;
  }

  function remove(cell, index) {
    commit();
    setGrid(
      produce(grid, (draft) => {
        draft.data[cell].splice(index, 1);
        if (draft.data[cell].length === 0) {
          delete draft.data[cell];
        }
      })
    );
  }

  function addTask(cell, task, index) {
    setGrid(
      produce(grid, (draft) => {
        if (!draft.data.hasOwnProperty(cell)) {
          draft.data[cell] = [];
        }
        if(index){
          draft.data[cell][index] = task;
        }else{
          draft.data[cell].push(task);
        }
      })
    );
    commit();
  }

  const updateTitleRow = (row, title) => {
    setGrid(
      produce(grid, (draft) => {
        if (title.length > 0 && !draft.title_row) {
          draft.title_row = {};
        }
        if (title.length === 0 && draft.title_row.hasOwnProperty(row)) {
          delete draft.title_row[row];
        } else {
          draft.title_row[row] = title;
        }
        if (
          draft.title_row !== undefined &&
          Object.keys(draft.title_row).length === 0
        ) {
          delete draft.title_row;
        }
      })
    );
    commit();
  };

  const updateTitleColumn = (column, title) => {
    setGrid(
      produce(grid, (draft) => {
        if (title.length > 0 && !draft.title_column) {
          draft.title_column = {};
        }
        if (title.length === 0 && draft.title_column.hasOwnProperty(column)) {
          delete draft.title_column[column];
        } else {
          draft.title_column[column] = title;
        }
        if (
          draft.title_column !== undefined &&
          Object.keys(draft.title_column).length === 0
        ) {
          delete draft.title_column;
        }
      })
    );
    commit();
  };

  const addColumn = () => {
    commit();
    setGrid(
      produce(grid, (draft) => {
        draft.cols += 1;
      })
    );
  };

  const addRow = () => {
    commit();
    setGrid(
      produce(grid, (draft) => {
        draft.rows += 1;
      })
    );
  };

  const removeColumn = (column) => {
    setGrid(
      produce(grid, (draft) => {
        //move all next columns to one index before
        for (let j = column; j < draft.cols; j++) {
          let currentColumn = toWord(j);
          let nextColumn = toWord(j + 1);
          for (let i = 1; i <= draft.rows; i++) {
            let currentCell = `${currentColumn}${i}`;
            let nextCell = `${nextColumn}${i}`;
            if (draft.data.hasOwnProperty(nextCell)) {
              draft.data[currentCell] = draft.data[nextCell];
            } else if (draft.data.hasOwnProperty(currentCell)) {
              delete draft.data[currentCell];
            }
          }
        }
        //remove the last column
        let columWord = toWord(draft.cols);
        for (let i = 1; i <= draft.rows; i++) {
          let cell = `${columWord}${i}`;
          if (draft.data.hasOwnProperty(cell)) {
            delete draft.data[cell];
          }
        }
        if (draft.hasOwnProperty("title_column")) {
          //move all next title columns to one index before
          for (let j = column; j < draft.cols; j++) {
            let currentColumn = toWord(j);
            let nextColumn = toWord(j + 1);
            if (draft.title_column.hasOwnProperty(nextColumn)) {
              draft.title_column[currentColumn] =
                draft.title_column[nextColumn];
            } else if (draft.title_column.hasOwnProperty(currentColumn)) {
              window.ipcRenderer.send(
                "log",
                `CURRENT COLUMN DELETE ${currentColumn}`
              );
              delete draft.title_column[currentColumn];
            }
          }
          //remove the last title column
          if (draft.title_column.hasOwnProperty(columWord)) {
            delete draft.title_column[columWord];
          }
          if (
            draft.title_column &&
            Object.keys(draft.title_column).length === 0
          ) {
            delete draft.title_column;
          }
        }
        //decrease column count
        draft.cols -= 1;
      })
    );
    commit();
  };

  const removeRow = (row) => {
    setGrid(
      produce(grid, (draft) => {
        //move all next rows to one index before
        for (let j = row; j < draft.rows; j++) {
          let currentRow = j;
          let nextRow = j + 1;
          for (let i = 1; i <= draft.cols; i++) {
            let currentCell = `${toWord(i)}${currentRow}`;
            let nextCell = `${toWord(i)}${nextRow}`;
            if (draft.data.hasOwnProperty(nextCell)) {
              draft.data[currentCell] = draft.data[nextCell];
            } else if (draft.data.hasOwnProperty(currentCell)) {
              delete draft.data[currentCell];
            }
          }
        }
        //remove the last row
        for (let i = 1; i <= draft.cols; i++) {
          let cell = `${toWord(i)}${draft.rows}`;
          if (draft.data.hasOwnProperty(cell)) {
            delete draft.data[cell];
          }
        }

        if (draft.hasOwnProperty("title_row")) {
          //move all next title rows to one index before
          for (let j = row; j < draft.rows; j++) {
            let currentRow = j;
            let nextRow = j + 1;
            if (draft.title_row.hasOwnProperty(nextRow)) {
              draft.title_row[currentRow] = draft.title_row[nextRow];
            } else if (draft.title_row.hasOwnProperty(currentRow)) {
              delete draft.title_row[currentRow];
            }
          }
          //remove the last title column
          if (draft.title_row.hasOwnProperty(draft.rows)) {
            delete draft.title_row[draft.rows];
          }
          if (draft.title_row && Object.keys(draft.title_row).length === 0) {
            delete draft.title_row;
          }
        }
        //decrese row count
        draft.rows -= 1;
      })
    );
    commit();
  };

  const contentChange = (e, fileContent) => {
    const newGrid = JSON.parse(fileContent);
    if (isObject(newGrid)) {
      setGrid(newGrid);
    } else {
      resetGrid();
    }
  };

  const onContentLoaded = (e, content) => {
    if (content) {
      const newGrid = JSON.parse(content);
      if (isObject(newGrid)) {
        setGrid(newGrid);
      } else {
        resetGrid();
      }
    } else {
      resetGrid();
    }
  };

  const resetGrid = () => {
    setGrid({
      rows: 1,
      cols: 0,
      data: {},
    });
  };

  useEffect(() => {
    window.ipcRenderer.send("startListen");
    window.ipcRenderer.on("contentChange", contentChange);
    window.ipcRenderer.send("loadData");
    window.ipcRenderer.on("onContentLoaded", onContentLoaded);
  }, []);

  useEffect(() => {
    if (enableCommit) {
      window.ipcRenderer.send("saveData", JSON.stringify(grid));
      setEnableCommit(false);
    }
  }, [enableCommit]);

  return (
    <PanelContext.Provider value={{ grid, move, remove, commit, addTask, getData }}>
      <Header />
      <Container>
        <Grid>
          <GridScope>
            <GridContent>
              {grid && grid.rows === 1 && grid.cols === 0 && (
                <div className="px-5 py-4 border bg-white text-gray fs-12 ff-montserrat-semibold mt-1">
                  Add a new cell to start
                </div>
              )}
              {grid && grid.cols > 0 && (
                <>
                  <table>
                    <thead>
                      <th>&nbsp;</th>
                      {Array(grid.cols)
                        .fill(1)
                        .map((entryY, y) => (
                          <th>
                            <header>
                              <label>Column({toWord(y + 1)})</label>
                              <button onClick={() => removeColumn(y + 1)}>
                                <FiTrash2 />
                              </button>
                            </header>
                            <InputHeader
                              type="text"
                              placeholder="Your column name"
                              value={
                                grid.title_column &&
                                grid.title_column[toWord(y + 1)]
                                  ? grid.title_column[toWord(y + 1)]
                                  : ""
                              }
                              onChange={(e) =>
                                updateTitleColumn(toWord(y + 1), e.target.value)
                              }
                            />
                          </th>
                        ))}
                    </thead>
                    <tbody>
                      {Array(grid.rows)
                        .fill(1)
                        .map((entryX, x) => (
                          <tr>
                            <th>
                              <header>
                                <label>Row({x + 1})</label>
                                <button onClick={() => removeRow(x + 1)}>
                                  <FiTrash2 />
                                </button>
                              </header>
                              <InputHeader
                                type="text"
                                placeholder="Your row name"
                                value={
                                  grid.title_row && grid.title_row[x + 1]
                                    ? grid.title_row[x + 1]
                                    : ""
                                }
                                onChange={(e) =>
                                  updateTitleRow(x + 1, e.target.value)
                                }
                              />
                            </th>
                            {Array(grid.cols)
                              .fill(1)
                              .map((entryY, y) => {
                                let cell = `${toWord(y + 1)}${x + 1}`;
                                return (
                                  <GridCell
                                    cell={cell}
                                    tasks={
                                      grid.data.hasOwnProperty(cell)
                                        ? grid.data[cell]
                                        : []
                                    }
                                  />
                                );
                              })}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <GridBottom>
                    <Button
                      variant="secondary"
                      className="ff-montserrat-bold"
                      onClick={addRow}
                    >
                      <FiPlus /> Row
                    </Button>
                  </GridBottom>
                </>
              )}
            </GridContent>
            <GridRight>
              <Button
                variant="secondary"
                className="ff-montserrat-bold"
                onClick={addColumn}
              >
                <FiPlus /> Col
              </Button>
            </GridRight>
          </GridScope>
        </Grid>
      </Container>
      <Switch>
        <Route path={`/tasks/:cell/:index?`} component={Task} />
      </Switch>
    </PanelContext.Provider>
  );
};

export default withRouter(Panel);
