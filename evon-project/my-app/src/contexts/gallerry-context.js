import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const GalleryContext = createContext();

const fakeData = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1650343808662-c05ae4a1c8b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    isFavorite: false,
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1650289649146-2afcd74fc432?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=683&q=80",
    isFavorite: false,
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    isFavorite: false,
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1650204870868-702e0162d0c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    isFavorite: false,
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1650284562135-acc9caf55e5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    isFavorite: false,
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1650299838813-b28de4d66c2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80",
    isFavorite: false,
  },
];

function GalleryProvider(props) {
  const { storedValue, setValue } = useLocalStorage("photos", fakeData);
  const { storedValue: storedCart, setValue: setStoredCart } = useLocalStorage(
    "cartItems",
    []
  );
  const [photos, setPhotos] = useState(storedValue);
  const [cartItems, setCartItems] = useState(storedCart);
  const [favoriteList, setFavoriteList] = useState([]);

  function toggleFavorite(photoId) {
    const updatedArray = photos.map((photo) => {
      if (photo.id === photoId) {
        return { ...photo, isFavorite: !photo.isFavorite };
      }
      return photo;
    });
    setPhotos(updatedArray);
    setValue(updatedArray);
  }

  function addToCart(newItem) {
    setCartItems((prevItems) => {
      const isExisted = prevItems.some((item) => item.id === newItem.id);
      if (isExisted) {
        setStoredCart([...prevItems]);
        return [...prevItems];
      }
      setStoredCart([...prevItems, newItem]);
      return [...prevItems, newItem];
    });
  }

  function removeFromCart(photoId) {
    setCartItems((prevItems) => {
      const result = prevItems.filter((item) => item.id !== photoId);
      setStoredCart(result);
      return result;
    });
  }

  const value = {
    photos,
    cartItems,
    favoriteList,
    toggleFavorite,
    addToCart,
    removeFromCart,
  };
  return (
    <GalleryContext.Provider value={value} {...props}></GalleryContext.Provider>
  );
}

function useGallery() {
  const context = useContext(GalleryContext);
  if (typeof context === "undefined")
    throw new Error("useCount mus be used within a GalleryProvider");
  return context;
}

export { useGallery, GalleryProvider };
