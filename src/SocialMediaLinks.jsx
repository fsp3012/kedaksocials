import React, { useState } from "react";
import { SocialIcon } from "react-social-icons";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

function DeleteConfirmationModal({ isOpen, onCancel, onConfirm }) {
  const modalClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center z-50"
    : "hidden";

  return (
    <div className={modalClasses}>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete this item?</p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-400 text-gray-800 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function SocialMediaLinks({
  socialMediaData,
  onEditClick,
  onDeleteClick,
  onAddClick,
}) {
  const [newPlatform, setNewPlatform] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleAddClick = () => {
    const newSocialMedia = {
      id: uuidv4(),
      platform: newPlatform,
      url: newUrl,
    };

    if (newPlatform && newUrl) {
      onAddClick(newSocialMedia);
      setNewPlatform("");
      setNewUrl("");
    }
  };

  const handleEditClick = (item) => {
    setIsEditModalOpen(true);
    setEditItem(item);
  };

  const handleSaveEdit = () => {
    if (editItem && editItem.id && newPlatform && newUrl) {
      const updatedItem = {
        ...editItem,
        platform: newPlatform,
        url: newUrl,
      };

      onEditClick(updatedItem);
      setNewPlatform("");
      setNewUrl("");
      setIsEditModalOpen(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditItem(null);
    setNewPlatform("");
    setNewUrl("");
  };

  const handleDeleteClick = (item) => {
    setIsDeleteModalOpen(true);
    setItemToDelete(item);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      onDeleteClick(itemToDelete.id);
    }
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  return (
    <div className="social-media-links flex flex-col gap-5">
      {socialMediaData.map((item) => (
        <div
          key={item.id}
          className="social-media-item flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <SocialIcon url={item.url} style={{ width: 40, height: 40 }} />
            <p className="capitalize">{item.platform}</p>
          </div>
          <div className="flex gap-2 md:gap-4">
            <button onClick={() => handleEditClick(item)}>
              <FontAwesomeIcon icon={faPen} style={{ color: "#161717" }} />
            </button>
            <button onClick={() => handleDeleteClick(item)}>
              <FontAwesomeIcon icon={faTrash} style={{ color: "#000000" }} />
            </button>
          </div>
        </div>
      ))}
      <div className="add-social-media-form mt-4">
        <input
          type="text"
          placeholder="Platform (e.g., Facebook)"
          value={newPlatform}
          onChange={(e) => setNewPlatform(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="URL (e.g., https://www.facebook.com/username)"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleAddClick}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-2">
              Edit Social Media Link
            </h2>
            <input
              type="text"
              placeholder="Platform"
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              placeholder="URL"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={handleSaveEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SocialMediaLinks;
