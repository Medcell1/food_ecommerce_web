import { User } from "@/pages/signup";
import React, { useEffect, useState } from "react";
import DropdownComponent from "../dropdowncomponent";
import { useRouter } from "next/router";
import createAxiosInstance from "@/axiosConfig";
import { Toast } from "@/constants/toastConfig";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import { useMenuContext } from "@/context/menucontext";

export interface Menu {
  _id: string;
  name: string;
  price: string;
  image: string;
  available: boolean;
  measure: string;
  createdBy: User | null;
}

const MenuFormModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const {action} = router.query;
  const axiosInstance = createAxiosInstance(router);
  const [isLoading, setisLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [measure, setMeasure] = useState("");
  const { isModify, selectedMenu , setIsModify, updateMenu} = useMenuContext();
  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    if(action ===  "new") {
      setName("");
      setPrice("");
      setMeasure("");
      setImageFile(null);
      setIsModify(false);
      updateMenu(null);
    }
  }, [action]);
  useEffect(() => {
    if (isModify) {
      setName(selectedMenu?.name!);
      setMeasure(selectedMenu?.measure!);
      setPrice(String(selectedMenu?.price ?? "")); // Convert to string
    }
  }, [isModify]);
  const wasChanged = () => {
    if(name !== selectedMenu?.name || price !== selectedMenu?.price || measure !== selectedMenu?.measure || imageFile !== null) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }
  useEffect(()=>{
    wasChanged();
  }, [name, price, imageFile, measure]);
  useEffect(() => {
    if (!isOpen) {
      setIsModify(false); // Reset isModify when the modal closes
    }
  }, [isOpen, setIsModify]);
  const Measures = [
    "Scoop",
    "Plate",
    "Cup",
    "Bowl",
    "Piece",
    "Slice",
    "Gram",
    "Kilogram",
    "Milliliter",
    "Liter",
    "Ounce",
    "Pound",
  ];
  const MAX_FILE_SIZE_MB = 1;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setisLoading(true);
      if (!isModify && (!imageFile || imageFile.size > MAX_FILE_SIZE_MB * 1024 * 1024)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Image size exceeds ${MAX_FILE_SIZE_MB}MB`,
        });
        return;
      }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("measure", measure);
      if (imageFile) {
        formData.append("file", imageFile!);
      }
      if (
        name.trim() === "" ||
        price.trim() === "" ||
        (!isModify && !imageFile) ||
        measure.trim() === ""
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "All Fields Are Required!",
        });
        return;
      }
      let response;
      if (!isModify) {
        response = await axiosInstance.post("/menu", formData);
      } else {
        if (!isChanged) {
          Toast.fire({
            icon: "error",
            title: "No Field was Changed",
          });
          return;
        }
        response = await axiosInstance.put(`/menu/${selectedMenu?._id}`, formData);
      }
      onClose();
      Toast.fire({
        icon: "success",
        title: `Menu ${isModify ? "Edited" : "Added"} Successfully`,
      });
      
    } catch (error) {
      console.log(`Menu create error==>${error}`);
    } finally {
      setisLoading(false);
    }
  };
  

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg md:w-[60vw] lg:w-[30%] xl:w-[30%]">
        <h2 className="text-xl font-semibold mb-6">Add New Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md"
            />
          </div>
          <div className="flex space-x-10">
            <div className="flex-1">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md"
              />
            </div>
            <div className="flex-1">
              <DropdownComponent
                input={{
                  id: "measure",
                  label: "Measure",
                  placeholder: "Select",
                  type: "select",
                }}
                value={measure}
                selectList={Measures.map((measure) => ({
                  _id: measure,
                  label: measure,
                }))}
                handleSelect={(e: any) => setMeasure(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
             
              onChange={(e) =>
                setImageFile(e.target.files ? e.target.files[0] : null)
              }
              className="mt-1 p-2 block w-full border-gray-300 rounded-md"
            />
            <small className="text-gray-500">
              {isModify
                ? "Leave empty to keep the current image"
                : ""}
            </small>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
            >
              {!isLoading ? `Submit` : <ClipLoader size={15} />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuFormModal;
