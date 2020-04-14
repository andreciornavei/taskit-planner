# taskit-planner

A Task Planner with state sync in real-time! 🚀

![](https://github.com/andreciornavei/images/blob/master/taskitplanner.gif?raw=true)

## Overview

Tasktit Planner is a simple planner board to manage your tasks, it was made with _ReactJS_ and _Electron_.

It was created for the purpose of managing tasks in an offline environment with a JSON file that is automatically synchronized with the state of the application. The application is easily integrated with any system that can manipulate the JSON file that mirrors the data in real time to the planner board.

## ✨ Features

 * Dynamic grid manipulation
 * Row and Column title updatable
 * Drop row or column grid
 * Create, Remove and Update tasks
 * Multiple tasks per cell
 * Draggable tasks on planner

## 🚀 Super Feature 

 * Sync data in real-time between planner and JSON file

## Installation

You must have to use yarn, it is used on package scripts.

So if you do not have it yet follow this link: https://classic.yarnpkg.com/en/docs/install

Then:

```bash
$ git clone https://github.com/andreciornavei/taskit-planner.git

$ yarn

$ yarn electron
```


## Build

The build script will generate a _build_  folder for react bundle and will generate a _dist_ folder to release executables.

```bash
$ yarn electron-build
```

## License

[MIT](LICENSE)

MIT License

Copyright (c) 2020 André Ciornavei

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
