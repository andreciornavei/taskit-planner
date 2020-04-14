import React, { useRef, useContext } from "react";
import { useDrop } from "react-dnd";
import { Link } from "react-router-dom";

import PanelContext from "../../pages/Panel/context";
import GridTask from "./../GridTask";

import { FiPlus } from "react-icons/fi";
import { Container } from "./styles";

export default function GridCell({ cell, tasks }) {
  const ref = useRef();
  const { move } = useContext(PanelContext);

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item, monitor) {

      if(tasks.length > 0){
        return;
      }

      const draggedCell = item.cell;
      const targetCell = cell;

      const draggedIndex = item.index;
      const targetIndex = 0;

      if (draggedCell === targetCell) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      move(draggedCell, targetCell, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.cell = targetCell;
    },
  });

  dropRef(ref);

  return (
    <Container ref={ref}>
      <header>
        <label>Cell({cell})</label>
        <Link to={`/tasks/${cell}`}>
          <FiPlus />
        </Link>
      </header>
      {tasks.map((task, index) => {
        return (
          <GridTask
            key={`task_${index}`}
            cell={cell}
            index={index}
            data={task}
          />
        );
      })}
    </Container>
  );
}
