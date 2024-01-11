// FriendContext.js
import React, { createContext, useContext,useState } from "react";
import axios from "axios";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [showFriendLists, setShowFriendLists] = useState(true);
    const [showPostListsWithSearch, setShowPostListsWithSearch] = useState(true);

    const handleSearchFriend = async () => {
        if (searchTerm.trim() !== "") {
          setShowFriendLists(false);
          try {
            const response = await axios.get(
              `https://meowblog.onrender.com/users/search?searchTerm=${searchTerm}`
            );
              setSearchResults(response.data.data);
          } catch (error) {
            console.error("Error searching users:", error);
            // Xử lý lỗi tìm kiếm nếu cần
          } finally {
            setSearchTerm("");
          }
        }
    };  
    const handleSearchPost= async () => {
      if (searchTerm.trim() !== "") {
          setShowPostListsWithSearch(false);
            try {
              const response = await axios.get(
                `https://meowblog.onrender.com/posts/search?searchTerm=${searchTerm}`
              );
              setSearchResults(response.data.data);
            } catch (error) {
              console.error("Error searching users:", error);
              // Xử lý lỗi tìm kiếm nếu cần
            } finally {
              setSearchTerm("");
            }
          }
    };
    const values = {
        handleSearchFriend,
        handleSearchPost,
        searchTerm,
        searchResults,
        showFriendLists,
        setSearchTerm,
        setSearchResults,
        setShowFriendLists,
        showPostListsWithSearch,
        setShowPostListsWithSearch,
    };

  return (
    <SearchContext.Provider value={values}>
      {children}
    </SearchContext.Provider>
  );
};
