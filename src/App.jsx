import React, { useState } from "react";
import SocialMediaLinks from "./SocialMediaLinks"; 
import "./App.css";

function App() {
  const [socialMediaData, setSocialMediaData] = useState([
    {
      id: 1,
      platform: "facebook",
      url: "https://www.facebook.com/username1",
    },
    {
      id: 2,
      platform: "twitter",
      url: "https://www.twitter.com/username2",
    },
    {
      id: 3,
      platform: "instagram",
      url: "https://www.instagram.com/username3",
    },
    {
      id: 4,
      platform: "linkedin",
      url: "https://www.linkedin.com/username4",
    },
    {
      id: 5,
      platform: "github",
      url: "https://www.github.com/username5",
    },
    {
      id: 6,
      platform: "youtube",
      url: "https://www.youtube.com/username6",
    },
    {
      id: 7,
      platform: "tiktok",
      url: "https://www.tiktok.com/username7",
    },
    {
      id: 8,
      platform: "whatsapp",
      url: "https://www.whatsapp.com/username8",
    },
    {
      id: 9,
      platform: "behance",
      url: "https://www.behance.com/username9",
    },
    {
      id: 10,
      platform: "snapchat",
      url: "https://www.snapchat.com/username10",
    },
    {
      id: 11,
      platform: "dribbble",
      url: "https://www.dribbble.com/username10",
    },
  ]);

  const handleEditClick = (updatedItem) => {
    const updatedData = socialMediaData.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setSocialMediaData(updatedData);
  };

  const handleDeleteClick = (itemId) => {
    const updatedData = socialMediaData.filter((item) => item.id !== itemId);
    setSocialMediaData(updatedData);
  };

  const handleAddClick = (newItem) => {
    setSocialMediaData([...socialMediaData, newItem]);
  };

  return (
    <div>
      <h1 className="mb-5">Edit social handles</h1>
      <SocialMediaLinks
        socialMediaData={socialMediaData}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        onAddClick={handleAddClick}
      />
    </div>
  );
}

export default App;
