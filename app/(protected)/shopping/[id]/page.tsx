"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowLeft,
  Plus,
  MoreVertical,
} from "lucide-react";

import Link from "next/link";

import {
  useParams
} from "next/navigation";


import {
  getShoppingItems,
  getShoppingList,
  addShoppingItem,
  updateShoppingItem,
  deleteShoppingItem,
} from "@/lib/supabase/shopping";



import ShoppingItems from "@/components/shopping/ShoppingItems";
import AddItemModal from "@/components/shopping/AddItemModal";
import EditItemModal from "@/components/shopping/EditItemModal";
import DeleteItemModal from "@/components/shopping/DeleteItemModal";
import EditListModal from "@/components/shopping/EditListModal";




export type ShoppingItem = {

  id: string;

  title: string;

  quantity: string;

  completed: boolean;

  createdAt: string;

};






export default function ShoppingDetailPage() {


  const params = useParams();


  const listId =
    params.id as string;





  const [listName, setListName] =
    useState("");



  const [items, setItems] =
    useState<ShoppingItem[]>([]);



  const [showAdd, setShowAdd] =
    useState(false);



  const [showEditList, setShowEditList] =
    useState(false);



  const [editingItem, setEditingItem] =
    useState<ShoppingItem | null>(null);

  const [deletingItem, setDeletingItem] =
    useState<ShoppingItem | null>(null);






  useEffect(() => {

    loadItems();

  }, []);






  async function loadItems() {


    const data =
      await getShoppingItems(listId);



    setItems(

      data.map((item: any) => ({

        id: item.id,

        title: item.title,

        quantity: item.quantity,

        completed: item.completed,

        createdAt: item.created_at,

      }))

    );

    const listData = await getShoppingList(listId);
    if (listData) {
      setListName(listData.name);
    }


  }







  const sortedItems =
    useMemo(() => {


      return [...items].sort((a, b) => {


        if (a.completed !== b.completed) {

          return Number(a.completed)
            -
            Number(b.completed);

        }



        return (

          new Date(b.createdAt).getTime()

          -

          new Date(a.createdAt).getTime()

        );


      });


    }, [items]);









  async function addItem(data: {
    title: string;
    quantity: string;
  }) {
    await addShoppingItem({
      list_id: listId,
      title: data.title,
      quantity: data.quantity,
    });



    await loadItems();


    setShowAdd(false);

  }








  async function toggleItem(id: string) {


    const item =
      items.find(
        item => item.id === id
      );


    if (!item)
      return;




    await updateShoppingItem(

      id,

      {
        completed:
          !item.completed
      }

    );



    await loadItems();


  }







  async function handleDelete(id: string) {
    await deleteShoppingItem(id);
    await loadItems();
    setDeletingItem(null);
  }

  function confirmDelete(id: string) {
    const item = items.find(item => item.id === id);
    if (item) {
      setDeletingItem(item);
    }
  }








  async function updateItem(
    updated: ShoppingItem
  ) {


    await updateShoppingItem(

      updated.id,

      {

        title: updated.title,

        quantity: updated.quantity,

      }

    );


    await loadItems();


    setEditingItem(null);


  }









  return (

    <div
      className="
px-5
py-6
space-y-7
"
    >


      <section
        className="
flex
items-center
justify-between
"
      >


        <div
          className="
flex
items-center
gap-3
"
        >

          <Link href="/shopping">

            <ArrowLeft />

          </Link>


          <div>

            <h1
              className="
text-2xl
font-bold
"
            >
              {listName}
            </h1>


            <p
              className="
text-sm
text-gray-500
"
            >

              {items.length} {items.length === 1 ? "item" : "items"}

            </p>


          </div>


        </div>




        <button
          onClick={() => setShowEditList(true)}
        >

          <MoreVertical />

        </button>



      </section>







      <button

        onClick={() => setShowAdd(true)}

        className="
flex
w-full
items-center
justify-center
gap-2
rounded-2xl
border
border-dashed
border-purple-300
bg-purple-50
py-3
font-medium
text-purple-700
"

      >

        <Plus size={18} />

        Add Item

      </button>








      <ShoppingItems

        items={sortedItems}

        onToggle={toggleItem}

        onEdit={setEditingItem}

        onDelete={confirmDelete}

      />









      <button

        onClick={() => setShowAdd(true)}

        className="
fixed
bottom-8
right-6
w-14
h-14
rounded-full
bg-purple-600
text-white
flex
items-center
justify-center
shadow-xl
"

      >

        <Plus />

      </button>







      {
        showAdd &&

        <AddItemModal

          onClose={() => setShowAdd(false)}

          onItemAdd={addItem}

        />

      }







      {
        editingItem &&

        <EditItemModal

          item={editingItem}

          onClose={() => setEditingItem(null)}

          onSaveAction={updateItem}

        />

      }



      {
        deletingItem &&

        <DeleteItemModal

          itemTitle={deletingItem.title}

          onClose={() => setDeletingItem(null)}

          onDelete={() => handleDelete(deletingItem.id)}

        />

      }







      {
        showEditList &&

        <EditListModal

          name={listName}

          onClose={() => setShowEditList(false)}

          onSave={(value) => {

            setListName(value);

            setShowEditList(false);

          }}

        />

      }



    </div>

  );


}