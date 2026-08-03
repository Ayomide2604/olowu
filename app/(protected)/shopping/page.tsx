"use client";

import {
  useEffect,
  useState,
} from "react";

import ShoppingHeader from "@/components/shopping/ShoppingHeader";
import ShoppingLists from "@/components/shopping/ShoppingLists";
import CreateListModal from "@/components/shopping/CreateListModal";
import DeleteConfirmModal from "@/components/shopping/DeleteConfirmModal";
import EditListModal from "@/components/shopping/EditListModal";

import {
  getShoppingLists,
  createShoppingList,
  updateShoppingList,
  deleteShoppingList,
} from "@/lib/supabase/shopping";

import {
  useAuth
} from "@/context/AuthProvider";


export type ShoppingList = {

  id: string;

  title: string;

  items: number;

  remaining: number;

  updated: string;

};





export default function ShoppingPage() {


  const {
    user
  } = useAuth();



  const [
    shoppingLists,
    setShoppingLists
  ] = useState<ShoppingList[]>([]);



  const [
    loading,
    setLoading
  ] = useState(true);



  const [
    showCreate,
    setShowCreate
  ] = useState(false);



  const [
    editingList,
    setEditingList
  ] = useState<ShoppingList | null>(null);



  const [
    deletingList,
    setDeletingList
  ] = useState<ShoppingList | null>(null);





  useEffect(() => {

    loadLists();

  }, []);







  async function loadLists() {


    const data =
      await getShoppingLists();



    const formatted =
      data.map((list: any) => ({

        id: list.id,

        title: list.name,

        items:
          list.shopping_items?.length ?? 0,


        remaining:
          list.shopping_items
            ?.filter(
              (item: any) =>
                !item.completed
            )
            .length ?? 0,


        updated:
          new Date(
            list.updated_at
          )
            .toLocaleDateString(),

      }));



    setShoppingLists(formatted);


    setLoading(false);


  }









  async function createList(
    name: string
  ) {


    if (!user) return;



    await createShoppingList(

      name,

      user.id

    );



    await loadLists();


    setShowCreate(false);


  }









  async function updateList(
    id: string,
    name: string
  ) {


    await updateShoppingList(

      id,

      name

    );


    await loadLists();


    setEditingList(null);


  }









  async function deleteList() {


    if (!deletingList)
      return;



    await deleteShoppingList(

      deletingList.id

    );


    await loadLists();



    setDeletingList(null);


  }








  if (loading) {

    return (

      <div className="px-5 py-6">

        Loading shopping lists...

      </div>

    );

  }








  return (

    <div
      className="
      px-5
      py-6
      space-y-7
      "
    >


      <ShoppingHeader

        onAdd={() =>
          setShowCreate(true)
        }

      />





      <ShoppingLists

        lists={shoppingLists}

        onEdit={(list) =>
          setEditingList(list)
        }


        onDelete={(list) =>
          setDeletingList(list)
        }

      />







      {
        showCreate &&

        <CreateListModal

          onClose={() =>
            setShowCreate(false)
          }


          onCreate={createList}

        />

      }








      {
        editingList &&

        <EditListModal

          name={
            editingList.title
          }


          onClose={() =>
            setEditingList(null)
          }


          onSave={(name) => {

            updateList(
              editingList.id,
              name
            );

          }}

        />

      }








      {
        deletingList &&

        <DeleteConfirmModal

          listName={
            deletingList.title
          }


          onClose={() =>
            setDeletingList(null)
          }


          onDelete={deleteList}

        />

      }




    </div>

  );

}