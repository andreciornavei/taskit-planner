import React, { useRef, useContext } from 'react';

import { useDrag, useDrop } from 'react-dnd';

import PanelContext from '../../pages/Panel/context';

import { FiX, FiEdit2 } from 'react-icons/fi'

import { Link } from "react-router-dom";

import { Container } from './styles';

export default function GridTask({ cell, index, data }) {
  const ref = useRef();
  const { move, remove, commit } = useContext(PanelContext);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, cell },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const didDrop = monitor.didDrop()
      if (didDrop) {
        commit()
      }
    }
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      
      const draggedCell = item.cell;
      const targetCell = cell;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex && draggedCell === targetCell) {
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

      move(draggedCell, targetCell, draggedIndex, targetIndex, );

      item.index = targetIndex;
      item.cell = targetCell;
    }
  })

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <p>{data.title}</p>
      <span>
        <Link to={`/tasks/${cell}/${index}`}><FiEdit2/></Link>      
        <button onClick={() => remove(cell,index)}><FiX/></button>      
      </span>
    </Container>
  );
}