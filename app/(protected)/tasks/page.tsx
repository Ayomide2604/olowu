"use client";

import {
  useEffect,
  useState,
} from "react";


import TaskHeader from "@/components/tasks/TaskHeader";
import TaskSummary from "@/components/tasks/TaskSummary";
import TaskFilters from "@/components/tasks/TaskFilters";
import TaskList from "@/components/tasks/TaskList";
import TaskModal from "@/components/tasks/TaskModal";
import DeleteTakModal from "@/components/tasks/DeleteTakModal";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import CardSkeleton from "@/components/ui/CardSkeleton";

import { useAuth } from "@/context/AuthProvider";


import {
  getTasks,
  createTask,
  updateTask,
  deleteTask as removeTask,
  assignUsersToTask,
  updateTaskAssignments,
} from "@/lib/supabase/tasks";




export type Task = {

  id: string;

  task: string;

  date: string;

  time: string;


  assignedUsers: {

    id: string;

    first_name: string;

    last_name: string;

    avatar_url?: string | null;

  }[];


  completed: boolean;

  createdAt: string;

};







const filters = [
  "All",
  "Today",
  "Upcoming",
  "Completed",
];






export default function TasksPage() {

  const { user } = useAuth();


  const [tasks, setTasks] =
    useState<Task[]>([]);



  const [loading, setLoading] =
    useState(true);



  const [activeFilter, setActiveFilter] =
    useState("All");



  const [showTaskModal, setShowTaskModal] =
    useState(false);



  const [editingTask, setEditingTask] =
    useState<Task | null>(null);



  const [
    showDeleteModal,
    setShowDeleteModal
  ] = useState(false);



  const [
    taskToDelete,
    setTaskToDelete
  ] = useState<string | null>(null);






  useEffect(() => {

    loadTasks();

  }, []);






  async function loadTasks() {


    const data =
      await getTasks();


    setTasks(
      data.map((item: any) => ({
        id: item.id,
        task: item.title,
        date: item.due_date,
        time: item.due_time,
        assignedUsers:
          item.task_assignments?.map(
            (assignment: any) =>
              assignment.profiles
          )
          ?? [],
        completed: item.completed,
        createdAt: item.created_at,
      }))
    );



    setLoading(false);


  }





  const filteredTasks =
    tasks.filter((task) => {

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const [year, month, day] = task.date.split("-").map(Number);
      const taskDate = new Date(year, month - 1, day);

      switch (activeFilter) {

        case "All":
          return !task.completed;

        case "Today":
          return (
            taskDate.getFullYear() === today.getFullYear() &&
            taskDate.getMonth() === today.getMonth() &&
            taskDate.getDate() === today.getDate()
          );

        case "Upcoming":
          return !task.completed && taskDate > today;

        case "Completed":
          return task.completed;

        default:
          return true;

      }


    });





  async function saveTask(data: {

    task: string;

    date: string;

    time: string;

    assignedUsers: string[];

  }) {





    if (editingTask) {



      await updateTask(

        editingTask.id,

        {

          title: data.task,

          due_date: data.date,

          due_time: data.time,

        }

      );




      await updateTaskAssignments(
        editingTask.id,
        data.assignedUsers
      );




    }

    else {



      const newTask =
        await createTask({

          title: data.task,

          due_date: data.date,

          due_time: data.time,

          completed: false,

        });




      await assignUsersToTask(

        newTask.id,

        data.assignedUsers

      );


    }




    await loadTasks();


    setEditingTask(null);

    setShowTaskModal(false);


  }





  async function deleteTask(id: string) {

    setTaskToDelete(id);

    setShowDeleteModal(true);

  }





  async function confirmDelete() {

    if (taskToDelete) {

      await removeTask(taskToDelete);

      await loadTasks();

    }


    setShowDeleteModal(false);


    setTaskToDelete(null);


  }





  async function toggleTask(id: string) {

    const task =
      tasks.find(
        (item) => item.id === id
      );


    if (!task) return;




    await updateTask(

      id,

      {

        completed:
          !task.completed,

      }

    );




    await loadTasks();


  }





  return (
    <>
      <div
        className="
px-5
py-6
space-y-7
"
      >



        <TaskHeader

          onAdd={() => setShowTaskModal(true)}

        />




        <TaskSummary

          myTasks={
            tasks.filter(
              (task) =>
                !task.completed &&
                task.assignedUsers.some(
                  (assignedUser) => assignedUser.id === user?.id
                )
            ).length
          }

          total={tasks.length}

          completed={
            tasks.filter(
              (task) =>
                task.completed
            ).length
          }

          remaining={
            tasks.filter(
              (task) =>
                !task.completed
            ).length
          }

        />




        <TaskFilters

          filters={filters}

          activeFilter={activeFilter}

          onChange={setActiveFilter}

        />





        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <TaskList


            tasks={filteredTasks}



            onEditAction={(task) => {

              setEditingTask(task);

              setShowTaskModal(true);

            }}



            onDeleteAction={deleteTask}



            onToggleAction={toggleTask}



          />
        )}






        {showTaskModal && (
          <TaskModal


            task={editingTask}


            onCloseAction={() => {

              setShowTaskModal(false);

              setEditingTask(null);

            }}



            onSaveAction={saveTask}



          />

        )}




        {showDeleteModal && (
          <DeleteTakModal


            onClose={() => {

              setShowDeleteModal(false);

              setTaskToDelete(null);

            }}



            onDelete={confirmDelete}



          />
        )}

      </div>

      <LoadingOverlay isLoading={loading} message="Loading tasks..." />
    </>
  );
}