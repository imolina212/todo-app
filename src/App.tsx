import React, { useState } from "react";

import { Todo } from "./model";
import TodoList from "./components/todoList/TodoList";
import InputField from "./components/inputField/InputField";
import { CiViewList } from "react-icons/ci";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.scss";

const App: React.FC = () => {
	const [todo, setTodo] = useState<string>("");
	const [todos, setTodos] = useState<Todo[]>([]);
	const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
	console.log(todo);

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();

		if (todo) {
			setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
			setTodo("");
		}
	};

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result;

		if (!destination) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		let add,
			active = todos,
			complete = completedTodos;

		if (source.droppableId === "ActiveList") {
			add = active[source.index];
			active.splice(source.index, 1);
		} else {
			add = complete[source.index];
			complete.splice(source.index, 1);
		}

		if (destination.droppableId === "ActiveList") {
			active.splice(destination.index, 0, add);
		} else {
			complete.splice(destination.index, 0, add);
		}

		setCompletedTodos(complete);
		setTodos(active);
	};

	return (
		<DragDropContext
			onDragEnd={(e) => {
				onDragEnd(e);
			}}
		>
			<div className="App">
				<span className="App__heading">
					<span className="App__logo">
						<CiViewList />
					</span>
					Todo List
				</span>
				<InputField
					todo={todo}
					setTodo={setTodo}
					handleAdd={handleAdd}
				/>
				<TodoList
					todos={todos}
					setTodos={setTodos}
					completedTodos={completedTodos}
					setCompletedTodos={setCompletedTodos}
				/>
			</div>
		</DragDropContext>
	);
};

export default App;
