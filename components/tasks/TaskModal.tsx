"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  X,
} from "lucide-react";

import {
  getProfiles,
} from "@/lib/supabase/profiles";


type Profile = {
  id: string;

  first_name: string;

  last_name: string;

  avatar_url?: string | null;
};


type Task = {

  id: string;

  task: string;

  date: string;

  time: string;

  assignedUsers?: Profile[];

  completed: boolean;

  createdAt: string;

};



type Props = {

  task?: Task | null;

  onCloseAction: () => void;

  onSaveAction: (data: {

    task: string;

    date: string;

    time: string;

    assignedUsers: string[];

  }) => void;

};



export default function TaskModal({

  task,

  onCloseAction,

  onSaveAction,

}: Props) {



  const [title, setTitle] =
    useState(task?.task ?? "");



  const [date, setDate] =
    useState(task?.date ?? "");



  const [time, setTime] =
    useState(task?.time ?? "");



  const [profiles, setProfiles] =
    useState<Profile[]>([]);



  const [assignedUsers, setAssignedUsers] =
    useState<string[]>(

      task?.assignedUsers?.map(
        user => user.id
      ) ?? []

    );





  useEffect(() => {


    document.body.style.overflow = "hidden";


    async function load() {

      const data =
        await getProfiles();


      setProfiles(data ?? []);

    }


    load();



    return () => {

      document.body.style.overflow = "auto";

    };


  }, []);




  useEffect(() => {
    setTitle(task?.task ?? "");
    setDate(task?.date ?? "");
    setTime(task?.time ?? "");
    setAssignedUsers(
      task?.assignedUsers?.map(user => user.id) ?? []
    );
  }, [task]);






  function toggleUser(id: string) {


    setAssignedUsers(prev =>

      prev.includes(id)

        ?

        prev.filter(
          userId => userId !== id
        )

        :

        [
          ...prev,
          id
        ]

    );


  }





  function handleSave() {


    if (!title.trim()) return;


    onSaveAction({

      task: title.trim(),

      date,

      time,

      assignedUsers,

    });


  }





  return (

    <div
      className="
fixed
inset-0
z-50
bg-black/40
flex
items-center
justify-center
px-5
"
    >


      <div
        className="
relative
w-full
max-w-md
rounded-3xl
bg-white
p-6
shadow-xl
"
      >


        <button

          onClick={onCloseAction}

          className="
absolute
right-5
top-5
w-9
h-9
rounded-full
flex
items-center
justify-center
hover:bg-gray-100
"

        >

          <X size={20} />

        </button>



        <h2
          className="
text-xl
font-bold
"
        >

          {
            task
              ?
              "Edit Task"
              :
              "Create Task"
          }

        </h2>



        <div
          className="
mt-6
space-y-4
"
        >


          <div>

            <label className="text-sm font-medium">

              Task

            </label>


            <input

              value={title}

              onChange={
                (e) => setTitle(e.target.value)
              }

              className="
mt-2
w-full
rounded-2xl
border
px-4
py-3
"

            />

          </div>





          <div>

            <label className="text-sm font-medium">

              Due Date

            </label>


            <input

              type="date"

              value={date}

              onChange={
                (e) => setDate(e.target.value)
              }

              className="
mt-2
w-full
rounded-2xl
border
px-4
py-3
"

            />


          </div>






          <div>

            <label className="text-sm font-medium">

              Due Time

            </label>


            <input

              type="time"

              value={time}

              onChange={
                (e) => setTime(e.target.value)
              }

              className="
mt-2
w-full
rounded-2xl
border
px-4
py-3
"

            />


          </div>






          <div>


            <label className="text-sm font-medium">

              Assign To

            </label>



            <div
              className="
mt-3
space-y-2
"
            >


              {
                profiles.map(profile => {


                  const selected =
                    assignedUsers.includes(profile.id);



                  return (

                    <button

                      key={profile.id}

                      type="button"

                      onClick={() => toggleUser(profile.id)}

                      className={`
w-full
flex
items-center
gap-3
rounded-2xl
border
p-3

${selected

                          ?

                          "bg-purple-100 border-purple-500"

                          :

                          "bg-white"

                        }

`}

                    >


                      <div
                        className="
w-10
h-10
rounded-full
bg-purple-200
flex
items-center
justify-center
font-semibold
"
                      >

                        {
                          profile.first_name.charAt(0)
                        }

                      </div>



                      <div>

                        <p className="font-medium">

                          {profile.first_name}

                          {" "}

                          {profile.last_name}

                        </p>

                      </div>


                    </button>

                  )


                })

              }


            </div>


          </div>







          <button

            onClick={handleSave}

            disabled={!title.trim()}

            className="
w-full
rounded-2xl
bg-purple-600
py-3
text-white
font-medium
disabled:opacity-40
"

          >

            {
              task
                ?
                "Save Changes"
                :
                "Create Task"
            }

          </button>



          <button

            onClick={onCloseAction}

            className="
w-full
rounded-2xl
bg-gray-100
py-3
font-medium
"

          >

            Cancel

          </button>



        </div>


      </div>


    </div>


  );


}