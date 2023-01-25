import React from "react";

import { Todo } from "../../model";
import TodoCard from "../todoCard/TodoCard";
import { Droppable } from "react-beautiful-dnd";
import "./TodoList.scss";

interface Props {
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
	completedTodos: Todo[];
	setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
	todos,
	setTodos,
	completedTodos,
	setCompletedTodos,
}) => {
	return (
		<div className="container">
			<Droppable droppableId="ActiveList">
				{(provided, snapshot) => (
					<div
						className={`todos ${
							snapshot.isDraggingOver ? "dragactive" : ""
						}`}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						<span className="todos__heading">Active Tasks</span>
						{todos?.map((todo, index) => (
							<TodoCard
								index={index}
								key={todo.id}
								todo={todo}
								todos={todos}
								setTodos={setTodos}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			<Droppable droppableId="CompletedList">
				{(provided, snapshot) => (
					<div
						className={`todos remove ${
							snapshot.isDraggingOver ? "dragcomplete" : ""
						}`}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						<span className="todos__heading">Completed Tasks</span>
						{completedTodos.map((todo, index) => (
							<TodoCard
								index={index}
								key={todo.id}
								todo={todo}
								todos={completedTodos}
								setTodos={setCompletedTodos}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default TodoList;
